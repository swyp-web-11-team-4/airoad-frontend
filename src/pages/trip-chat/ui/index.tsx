import { useQueryClient } from "@tanstack/react-query";
import { useLocation, useSearchParams } from "react-router";
import { useAuthStore } from "@/entities/auth/model";
import { useChatStore } from "@/entities/chats/model";
import { tripsQueries } from "@/entities/trips/model";
import { useStartTripPlan } from "@/entities/trips/model/use-start-trip-plan";
import { useTripPlanStreams } from "@/entities/trips/model/use-trip-plan-streams";
import { DataFetchState } from "@/shared/ui";
import { ChatSection } from "./chat-section";
import * as styles from "./index.css";
import { ScheduleSection } from "./schedule-section";

export const TripChatPage = () => {
  const [params] = useSearchParams();
  const { state } = useLocation();
  const conversationId = Number(params.get("conversationId"));
  const tripPlanId = Number(params.get("tripPlanId"));
  const POSTED_KEY = `trip:create:posted:${tripPlanId}`;

  const { mutate: postTripPlan } = useStartTripPlan();

  const accessToken = useAuthStore((state) => state.accessToken);
  const addChat = useChatStore((state) => state.addChat);

  const queryClient = useQueryClient();

  const { error, schedule, sendMessage, reconnect } = useTripPlanStreams({
    chatRoomId: conversationId ?? 0,
    tripPlanId: tripPlanId ?? 0,
    token: accessToken,

    onChat: (data) => {
      switch (data.messageStreamType) {
        case "CHAT":
          addChat({ messageType: "ASSISTANT", ...data });
          break;
        case "COMPLETED":
          queryClient.invalidateQueries({
            queryKey: tripsQueries.info(tripPlanId).queryKey,
          });
          break;
        default:
          break;
      }
    },

    onReady: () => {
      if (state?.create && !sessionStorage.getItem(POSTED_KEY)) {
        sessionStorage.setItem(POSTED_KEY, "1");
        postTripPlan(tripPlanId, {
          onError: () => {
            sessionStorage.removeItem(POSTED_KEY);
          },
        });
      }
    },
  });

  if (!conversationId || !tripPlanId) {
    return (
      <DataFetchState
        type="error"
        title="잘못된 접근"
        description="일정 정보가 없습니다."
        actionText="뒤로 가기"
        onAction={() => history.back()}
      />
    );
  }

  if (error)
    return (
      <div className={styles.container}>
        <DataFetchState
          type="error"
          description={error.message}
          actionText="다시 시도"
          onAction={reconnect}
        />
      </div>
    );
  return (
    <div className={styles.container}>
      <ChatSection conversationId={conversationId} sendMessage={sendMessage} />
      <ScheduleSection schedule={schedule} />
    </div>
  );
};
