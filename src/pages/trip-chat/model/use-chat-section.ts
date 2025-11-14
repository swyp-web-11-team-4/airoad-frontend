import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router";
import { useChatStore } from "@/entities/chats/model";
import { tripsQueries } from "@/entities/trips/model";

export const useChatSection = () => {
  const [params] = useSearchParams();

  const tripPlanId = Number(params.get("tripPlanId"));
  const conversationId = Number(params.get("conversationId"));

  const { data: tripInfo } = useQuery(tripsQueries.info(tripPlanId));

  const isTripCreated = tripInfo?.isCompleted ?? true;

  const currentChats = useChatStore((state) => state.chats);

  const recentChat = currentChats.length > 0 ? currentChats.at(-1) : undefined;
  const restChats = currentChats.length > 1 ? currentChats.slice(0, -1) : [];

  const isUserRequesting = recentChat?.messageType === "USER";
  const isScheduleCreating = !isTripCreated && currentChats.length === 0;
  const isChatLoading = (!isTripCreated && currentChats.length > 0) || isUserRequesting;

  return {
    conversationId,
    currentChats,
    recentChat,
    restChats,
    isTripCreated,
    isChatLoading,
    isScheduleCreating,
  };
};
