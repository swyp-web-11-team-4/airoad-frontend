import { Flex, Text } from "@radix-ui/themes";
import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { type FormEventHandler, useCallback, useEffect, useMemo, useRef } from "react";
import { useSearchParams } from "react-router";
import { chatsQueries, useChatStore } from "@/entities/chats/model";
import { ChatForm } from "@/entities/chats/ui";
import { tripsQueries } from "@/entities/trips/model";
import type { useTripPlanStreams } from "@/entities/trips/model/use-trip-plan-streams";
import { ChatList } from "../chat-list";

interface ChatSectionProps {
  conversationId: number;
  sendMessage: ReturnType<typeof useTripPlanStreams>["sendMessage"];
}

export const ChatSection = ({ conversationId, sendMessage }: ChatSectionProps) => {
  const chatListRef = useRef<HTMLDivElement>(null);

  const { chats, isWaitingResponse, setWaitingResponse, reset } = useChatStore();

  const [params] = useSearchParams();
  const tripPlanId = Number(params.get("tripPlanId"));

  const { data: tripInfo } = useQuery(tripsQueries.info(tripPlanId));
  const { data: previousChats } = useSuspenseQuery(chatsQueries.messageList(conversationId));

  const sortedPreviousChats = useMemo(
    () => [...previousChats.content].sort((a, b) => a.createdAt.localeCompare(b.createdAt)),
    [previousChats.content],
  );

  const showScheduleCreating = !tripInfo?.isCompleted;

  const scrollToBottom = useCallback(() => {
    if (chatListRef.current) {
      chatListRef.current.scrollTo({
        top: chatListRef.current.scrollHeight,
      });
    }
  }, []);

  const submitMessage: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    const value = new FormData(event.currentTarget).get("chat");

    if (typeof value === "string" && value.trim()) {
      setWaitingResponse(true);
      sendMessage(value, "TEXT");
      event.currentTarget.reset();
    }
  };

  useEffect(() => {
    if (previousChats.content.length > 0 || chats.length > 0) {
      scrollToBottom();
    }
  }, [previousChats.content.length, chats.length, scrollToBottom]);

  useEffect(() => {
    const lastChat = chats.at(-1);
    if (lastChat?.messageType === "ASSISTANT") {
      setWaitingResponse(false);
    }
  }, [chats, setWaitingResponse]);

  useEffect(() => reset, [reset]);

  return (
    <Flex gap="5" direction="column" width="588px">
      <ChatList
        ref={chatListRef}
        previousChats={sortedPreviousChats}
        currentChats={chats}
        isWaitingResponse={isWaitingResponse}
        showScheduleCreating={showScheduleCreating}
        tripCompleted={tripInfo?.isCompleted}
      />
      <Flex direction="column" px="20px" pb="4" gap="4">
        <ChatForm disabled={!tripInfo?.isCompleted} onSubmit={submitMessage} />
        <Text color="gray" size="1" weight="regular" align="center">
          더 정확한 여행을 위해, 중요한 정보는 한 번 더 확인해주세요.
        </Text>
      </Flex>
    </Flex>
  );
};
