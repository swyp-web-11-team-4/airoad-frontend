import type { Client, IFrame, StompSubscription } from "@stomp/stompjs";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useMemo, useRef, useState } from "react";
import { useChatStore } from "@/entities/chats/model";
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

  const [connected, setConnected] = useState(false);
  const [error, setError] = useState<ErrorMessage>();
  const [schedule, setSchedule] = useState<ScheduleMessage[]>([]);

  const addChat = useChatStore((state) => state.addChat);

  const queryClient = useQueryClient();

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

    client.onConnect = (data) => {
      const errSub = client.subscribe(
        paths.errors,
        (msg) => {
          const err = JSON.parse(msg.body) as ErrorMessage;
          setError(err);
        },
        { receipt: "sub-errors" },
      );
      client.watchForReceipt("sub-errors", (frame: IFrame) => {
        console.log("sub-errors: 에러 채널 구독 응답값", frame);
        console.log("headers:", frame.headers);
        console.log("body:", frame.body);
      });

      const chatSub = client.subscribe(
        paths.chat,
        (msg) => {
          const data = JSON.parse(msg.body) as ChatMessage;
          addChat({ messageType: "ASSISTANT", ...data });
        },
        { receipt: "sub-chat" },
      );
      client.watchForReceipt("sub-chat", (frame: IFrame) => {
        console.log("sub-chat: 채팅 채널 구독 응답값", frame);
        console.log("headers:", frame.headers);
        console.log("body:", frame.body);
      });

      const schedSub = client.subscribe(
        paths.schedule,
        (msg) => {
          const data = JSON.parse(msg.body) as ScheduleMessage;
          setSchedule((prev) => [...prev, data]);

          if (data.type === "COMPLETED") {
            queryClient.invalidateQueries({ queryKey: tripsQueries.info(tripPlanId).queryKey });
          }
        },
        { receipt: "sub-schedule" },
      );
      client.watchForReceipt("sub-schedule", (frame: IFrame) => {
        console.log("sub-schedule: 일정 채널 구독 응답값", frame);
        console.log("headers:", frame.headers);
        console.log("body:", frame.body);
      });

      if (data.command === "CONNECTED") setConnected(true);

      subsRef.current = [errSub, chatSub, schedSub];
    };

    client.onStompError = (frame) => {
      console.error("stomp 구독 에러 발생", frame.body);
      setConnected(false);
    };
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

    addChat({
      messageType: "USER",
      isComplete: true,
      message: content,
      timestamp: new Date().toISOString(),
    });
  };

  return { connected, sendMessage, schedule, error };
}
