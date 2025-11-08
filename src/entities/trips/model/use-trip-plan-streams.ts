import type { Client, StompSubscription } from "@stomp/stompjs";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useMemo, useRef, useState } from "react";
import { toast } from "sonner";
import { createStompClient } from "@/shared/lib";
import type { ChatMessage, ErrorMessage, ScheduleMessage } from "./trips.model";
import { tripsQueries } from "./trips.queries";

type Props = {
  chatRoomId: number;
  tripPlanId: number;
  brokerURL?: string;
  token?: string;
  enabled?: boolean;
  onChat?: (m: ChatMessage) => void;
  onSchedule?: (p: ScheduleMessage) => void;
  onErrorMsg?: (e: ErrorMessage) => void;
};

export function useTripPlanStreams({
  chatRoomId,
  tripPlanId,
  brokerURL = "wss://airoad.luigi99.cloud/ws-stomp",
  token,
}: Props) {
  const clientRef = useRef<Client | null>(null);
  const subsRef = useRef<StompSubscription[]>([]);
  const queryClient = useQueryClient();
  const [connected, setConnected] = useState(false);
  const [chat, setChat] = useState<ChatMessage[]>([]);
  const [error, setError] = useState<ErrorMessage>();
  const [schedule, setSchedule] = useState<ScheduleMessage[]>([]);

  const paths = useMemo(
    () => ({
      chat: `/user/sub/chat/${chatRoomId}`,
      schedule: `/user/sub/scdule/${tripPlanId}`,
      errors: `/user/sub/errs/${chatRoomId}`,
    }),
    [chatRoomId, tripPlanId],
  );

  useEffect(() => {
    if (!chatRoomId || !tripPlanId || !token) return;
    const client = createStompClient(brokerURL, token);
    clientRef.current = client;

    client.onConnect = (data) => {
      const errSub = client.subscribe(
        paths.errors,
        (msg) => {
          const err = JSON.parse(msg.body) as ErrorMessage;
          setError(err);
        },
        { receipt: "sub-errors" },
      );

      const chatSub = client.subscribe(
        paths.chat,
        (msg) => {
          const data = JSON.parse(msg.body) as ChatMessage;
          setChat((prev) => [...prev, data]);
        },
        { receipt: "sub-chat" },
      );

      const schedSub = client.subscribe(
        paths.schedule,
        (msg) => {
          const data = JSON.parse(msg.body) as ScheduleMessage;
          setSchedule((prev) => [...prev, data]);
        },
        { receipt: "sub-schedule" },
      );

      if (data.command === "CONNECTED") setConnected(true);

      subsRef.current = [errSub, chatSub, schedSub];
    };

    client.onWebSocketError(() => {
      setConnected(false);
    });
    client.onWebSocketError(() => {
      setConnected(false);
    });

    client.activate();

    return () => {
      for (const s of subsRef.current) s.unsubscribe();
      subsRef.current = [];
      client.deactivate();
      clientRef.current = null;
      setConnected(false);
    };
  }, [chatRoomId, tripPlanId]);

  const sendMessage = (content: string, type: "TEXT" | "IMAGE" = "TEXT") => {
    if (!clientRef.current || !connected) return;
    clientRef.current.publish({
      destination: `/pub/chat/${chatRoomId}/message`,
      body: JSON.stringify({ content, messageType: type }),
    });
  };

  return { connected, sendMessage, chat, schedule, error };
}
