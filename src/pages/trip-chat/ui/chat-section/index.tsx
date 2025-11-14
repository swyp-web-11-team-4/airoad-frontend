import { Flex, Text } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import { type FormEventHandler, useEffect } from "react";
import { useSearchParams } from "react-router";
import { useChatStore } from "@/entities/chats/model";
import { ChatForm, ChatList } from "@/entities/chats/ui";
import { tripsQueries } from "@/entities/trips/model";
import type { useTripPlanStreams } from "@/entities/trips/model/use-trip-plan-streams";

interface ChatSectionProps {
  conversationId: number;
  sendMessage: ReturnType<typeof useTripPlanStreams>["sendMessage"];
}

export const ChatSection = ({ conversationId, sendMessage }: ChatSectionProps) => {
  const reset = useChatStore((state) => state.reset);
  const setWaitingResponse = useChatStore((state) => state.setWaitingResponse);

  const [params] = useSearchParams();
  const tripPlanId = Number(params.get("tripPlanId"));

  const { data: tripInfo } = useQuery(tripsQueries.info(tripPlanId));

  const submitMessage: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    const value = new FormData(event.currentTarget).get("chat");

    if (typeof value === "string" && value.trim()) {
      setWaitingResponse(true);
      sendMessage(value, "TEXT");
      event.currentTarget.reset();
    }
  };

  useEffect(() => reset, [reset]);

  return (
    <Flex direction="column" width="588px">
      <ChatList conversationId={conversationId} isTripCreated={tripInfo?.isCompleted} />
      <Flex direction="column" px="20px" pb="4" gap="4">
        <ChatForm disabled={!tripInfo?.isCompleted} onSubmit={submitMessage} />
        <Text color="gray" size="1" weight="regular" align="center">
          더 정확한 여행을 위해, 중요한 정보는 한 번 더 확인해주세요.
        </Text>
      </Flex>
    </Flex>
  );
};
