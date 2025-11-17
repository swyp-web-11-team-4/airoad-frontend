import type { Client, StompSubscription } from "@stomp/stompjs";
import { useEffect, useMemo, useRef, useState } from "react";
import { useAuthStore } from "@/entities/auth/model";
import { type ChatStream, useChatStore } from "@/entities/chats/model";
import { createStompClient } from "@/shared/lib";
import type {
  DayPlanData,
  ErrorMessage,
  ScheduleMessage,
  StatusMessage,
  StatusType,
} from "./trips.model";

type Props = {
  chatRoomId: number;
  tripPlanId: number;
  brokerURL?: string;
  token?: string;
  onReady?: () => void;
  enabled?: boolean;
  onChat?: (m: ChatStream) => void;
  onSchedule?: (p: DayPlanData) => void;
  onErrorMsg?: (e: ErrorMessage) => void;
  onStatusMsg?: (e: StatusMessage) => void;
};

export function useTripPlanStreams({
  chatRoomId,
  tripPlanId,
  brokerURL = import.meta.env.VITE_STOMP_BROKER_URL,
  token,
  onReady,
  onChat,
  onSchedule,
  onErrorMsg,
  onStatusMsg,
  enabled = true,
}: Props) {
  const clientRef = useRef<Client | null>(null);
  const subsRef = useRef<StompSubscription[]>([]);
  const tokenRef = useRef<string | undefined>(token);
  const autoReconnectRef = useRef(true);
  const isReissuingRef = useRef(false);

  const [error, setError] = useState<ErrorMessage>();
  const [schedule, setSchedule] = useState<DayPlanData[]>([]);
  const [status, setStatus] = useState<StatusMessage[]>([]);

  const addChat = useChatStore((state) => state.addChat);

  const reissue = useAuthStore((s) => s.reissue);

  useEffect(() => {
    tokenRef.current = token;
  }, [token]);

  const paths = useMemo(
    () => ({
      chat: `/user/sub/chat/${chatRoomId}`,
      schedule: `/user/sub/schedule/${tripPlanId}`,
      errors: `/user/sub/errors/${chatRoomId}`,
    }),
    [chatRoomId, tripPlanId],
  );

  const clearSubscriptions = () => {
    for (const s of subsRef.current) s.unsubscribe();
    subsRef.current = [];
  };

  const cleanup = () => {
    const client = clientRef.current;
    clearSubscriptions();
    clientRef.current = null;
    client?.deactivate();
  };

  const connect = () => {
    const accessToken = tokenRef.current;

    if (!enabled) return;
    if (!chatRoomId || !tripPlanId || !accessToken) return;

    const client = createStompClient(brokerURL, accessToken);
    clientRef.current = client;

    client.onConnect = () => {
      let receiptCount = 0;
      const onReceipt = () => {
        receiptCount += 1;
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
      client.watchForReceipt("sub-chat", onReceipt);

      const schedSub = client.subscribe(
        paths.schedule,
        (msg) => {
          const data = JSON.parse(msg.body) as ScheduleMessage | StatusMessage;

          if (data.type === "DAILY_PLAN_GENERATED") {
            setSchedule((prev) => [...prev, data.dailyPlan]);
            onSchedule?.(data.dailyPlan);
            return;
          }

          const statusMsg: StatusMessage = {
            type: data.type as StatusType,
            tripPlanId: data.tripPlanId,
            dailyPlan: null,
            message: data.message,
          };

          setStatus((prev) => [...prev, statusMsg]);
          onStatusMsg?.(statusMsg);
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

    client.onWebSocketClose = async () => {
      if (!autoReconnectRef.current) return;
      if (isReissuingRef.current) return;

      try {
        isReissuingRef.current = true;

        const { accessToken: newAccessToken } = await reissue();
        tokenRef.current = newAccessToken;

        clearSubscriptions();
        clientRef.current = null;

        setError(undefined);

        connect();
      } catch (err) {
        const authError: ErrorMessage = {
          code: "AUTH_EXPIRED",
          message: "로그인이 만료되었습니다. 다시 로그인해주세요.",
          detail: err,
        };
        setError(authError);
        onErrorMsg?.(authError);
      } finally {
        isReissuingRef.current = false;
      }
    };

    client.activate();
  };

  useEffect(() => {
    if (!enabled) return;

    autoReconnectRef.current = true;
    connect();

    return () => {
      autoReconnectRef.current = false;
      cleanup();
    };
  }, [chatRoomId, tripPlanId, brokerURL, enabled]);

  const reconnect = () => {
    setError(undefined);
    cleanup();
    autoReconnectRef.current = true;
    connect();
  };

  const sendMessage = (
    content: string,
    type: "TEXT" | "IMAGE" = "TEXT",
    options?: { scheduledPlaceIdList?: number[] },
  ) => {
    if (!clientRef.current) return;

    clientRef.current.publish({
      destination: `/pub/chat/${chatRoomId}/message`,
      body: JSON.stringify({
        content,
        messageType: type,
        ...(options?.scheduledPlaceIdList && {
          scheduledPlaceIdList: options.scheduledPlaceIdList,
        }),
      }),
    });

    addChat({
      messageType: "USER",
      isComplete: true,
      message: content,
      timestamp: new Date().toISOString(),
    });
  };

  return { sendMessage, schedule, status, error, reconnect };
}
