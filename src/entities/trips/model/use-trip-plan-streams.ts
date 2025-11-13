import type { Client, IFrame, StompSubscription } from "@stomp/stompjs";
import { useEffect, useMemo, useRef, useState } from "react";
import { type ChatStream, useChatStore } from "@/entities/chats/model";
import { createStompClient } from "@/shared/lib";
import type { ErrorMessage, ScheduleMessage } from "./trips.model";

type Props = {
  chatRoomId: number;
  tripPlanId: number;
  brokerURL?: string;
  token?: string;
  onReady?: () => void;
  enabled?: boolean;
  onChat?: (m: ChatStream) => void;
  onSchedule?: (p: ScheduleMessage) => void;
  onErrorMsg?: (e: ErrorMessage) => void;
};

export function useTripPlanStreams({
  chatRoomId,
  tripPlanId,
  brokerURL = "wss://airoad.luigi99.cloud/ws-stomp",
  token,
  onReady,
  onChat,
  onSchedule,
  onErrorMsg,
}: Props) {
  const clientRef = useRef<Client | null>(null);
  const subsRef = useRef<StompSubscription[]>([]);

  const [error, setError] = useState<ErrorMessage>();
  const [schedule, setSchedule] = useState<ScheduleMessage[]>([]);

  const addChat = useChatStore((state) => state.addChat);

  const paths = useMemo(
    () => ({
      chat: `/user/sub/chat/${chatRoomId}`,
      schedule: `/user/sub/schedule/${tripPlanId}`,
      errors: `/user/sub/errors/${chatRoomId}`,
    }),
    [chatRoomId, tripPlanId],
  );

  const cleanup = () => {
    for (const s of subsRef.current) s.unsubscribe();
    subsRef.current = [];
    clientRef.current?.deactivate();
    clientRef.current = null;
  };
  const connect = () => {
    if (!chatRoomId || !tripPlanId || !token) return;

    const client = createStompClient(brokerURL, token);
    clientRef.current = client;

    client.onConnect = () => {
      let receiptCount = 0;
      const onReceipt = () => {
        console.log("onReceipt 호출");
        receiptCount += 1;
        console.log("onReceipt 호출", receiptCount);
        if (receiptCount === 3) {
          onReady?.();
        }
      };

      const errSub = client.subscribe(
        paths.errors,
        (msg) => {
          const err = JSON.parse(msg.body) as ErrorMessage;
          setError(err);
          onErrorMsg?.(err);
        },
        { receipt: "sub-errors" },
      );
      client.watchForReceipt("sub-errors", onReceipt);

      const chatSub = client.subscribe(
        paths.chat,
        (msg) => {
          const data = JSON.parse(msg.body) as ChatStream;
          onChat?.(data);
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
          onSchedule?.(data);
        },
        { receipt: "sub-schedule" },
      );
      client.watchForReceipt("sub-schedule", onReceipt);

      subsRef.current = [errSub, chatSub, schedSub];
    };

    client.onStompError = (frame) => {
      const error = {
        code: "STOMP_ERROR",
        message: "STOMP 구독 중 오류가 발생했습니다.",
        detail: frame.body,
      } as ErrorMessage;
      setError(error);
      onErrorMsg?.(error);
    };

    client.onWebSocketError = (err) => {
      const error = {
        code: "WEBSOCKET_ERROR",
        message: "웹소켓 연결에 실패했습니다.",
        detail: err,
      } as ErrorMessage;
      setError(error);
      onErrorMsg?.(error);
    };

    client.activate();
  };

  useEffect(() => {
    connect();
    return cleanup;
  }, [chatRoomId, tripPlanId, brokerURL, token]);

  const reconnect = () => {
    setError(undefined);
    cleanup();
    connect();
  };

  const sendMessage = (content: string, type: "TEXT" | "IMAGE" = "TEXT") => {
    if (!clientRef.current) return;

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

  return { sendMessage, schedule, error, reconnect };
}
