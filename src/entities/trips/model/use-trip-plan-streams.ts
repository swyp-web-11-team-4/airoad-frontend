import type { Client, StompSubscription } from "@stomp/stompjs";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useMemo, useRef, useState } from "react";
import { createStompClient } from "@/shared/lib";
import type {
  ChatMessage,
  DailyPlanItem,
  DailyPlanSavedPayload,
  ErrorPayload,
} from "./trips.model";
import { tripsQueries } from "./trips.queries";

type Props = {
  chatRoomId: number;
  tripPlanId: number;
  brokerURL?: string;
  token?: string;
  onChat?: (m: ChatMessage) => void;
  onSchedule?: (p: DailyPlanSavedPayload) => void;
  onErrorMsg?: (e: ErrorPayload) => void;
};

export function useTripPlanStreams({
  chatRoomId,
  tripPlanId,
  brokerURL = "wss://airoad.luigi99.cloud/ws-stomp",
  token,
  onChat,
  onSchedule,
  onErrorMsg,
}: Props) {
  const clientRef = useRef<Client | null>(null);
  const subsRef = useRef<StompSubscription[]>([]);
  const qc = useQueryClient();
  const [connected, setConnected] = useState(false);

  const paths = useMemo(
    () => ({
      chat: `/user/sub/chat/${chatRoomId}`,
      schedule: `/user/sub/schedule/${tripPlanId}`,
      errors: `/user/sub/errors/${chatRoomId}`,
    }),
    [chatRoomId, tripPlanId],
  );

  useEffect(() => {
    if (!chatRoomId || !tripPlanId || !token) return;

    const client = createStompClient(brokerURL, token);
    clientRef.current = client;

    client.onConnect = () => {
      setConnected(true);

      const errSub = client.subscribe(paths.errors, (msg) => {
        try {
          const err = JSON.parse(msg.body) as ErrorPayload;
          qc.setQueryData<ErrorPayload[]>(tripsQueries.errors(chatRoomId), (prev = []) => [
            ...prev,
            err,
          ]);
          onErrorMsg?.(err);
        } catch {}
      });

      const chatSub = client.subscribe(paths.chat, (msg) => {
        try {
          const data = JSON.parse(msg.body) as ChatMessage;
          qc.setQueryData<ChatMessage[]>(tripsQueries.chat(chatRoomId), (prev = []) => [
            ...prev,
            data,
          ]);
          onChat?.(data);
        } catch {}
      });

      const schedSub = client.subscribe(paths.schedule, (msg) => {
        try {
          const payload = JSON.parse(msg.body) as DailyPlanSavedPayload;
          qc.setQueryData<DailyPlanItem[]>(tripsQueries.schedule(tripPlanId), (prev = []) => {
            const map = new Map<number, DailyPlanItem>();

            for (const d of prev) map.set(d.day, d);
            for (const d of payload.plans) map.set(d.day, d);

            return [...map.values()].sort((a, b) => a.day - b.day);
          });
          onSchedule?.(payload);
        } catch {}
      });

      subsRef.current = [errSub, chatSub, schedSub];
    };

    client.activate();

    return () => {
      for (const s of subsRef.current) s.unsubscribe();
      subsRef.current = [];
      client.deactivate();
      clientRef.current = null;
      setConnected(false);
    };
  }, [brokerURL, token, paths, chatRoomId, tripPlanId, qc, onChat, onSchedule, onErrorMsg]);

  const sendMessage = (content: string, type: "TEXT" | "IMAGE" = "TEXT") => {
    if (!clientRef.current || !connected) return;
    clientRef.current.publish({
      destination: `/pub/chat/${chatRoomId}/message`,
      body: JSON.stringify({ content, messageType: type }),
    });
  };

  return { connected, sendMessage };
}
