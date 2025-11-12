import { Flex, Text } from "@radix-ui/themes";
import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { type FormEventHandler, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "react-router";
import { chatsQueries, type MessageType, useChatStore } from "@/entities/chats/model";
import { tripsQueries } from "@/entities/trips/model";
import type { Chat } from "@/entities/trips/model/trips.model";
import type { useTripPlanStreams } from "@/entities/trips/model/use-trip-plan-streams";
import { AssistantMessage } from "../assistant-message";
import { ChatForm } from "../chat-form";
import { ScheduleCreatingChat } from "../schedule-creating-chat";
import { UserMessage } from "../user-message";

interface ChatSectionProps {
  conversationId: number;
  sendMessage: ReturnType<typeof useTripPlanStreams>["sendMessage"];
}

export const ChatSection = ({ conversationId, sendMessage }: ChatSectionProps) => {
  const chatListRef = useRef<HTMLDivElement>(null);
  const [showScheduleCreating, setShowScheduleCreating] = useState(true);

  const chats = useChatStore((state) => state.chats);
  const reset = useChatStore((state) => state.reset);

  const [params] = useSearchParams();
  const tripPlanId = Number(params.get("tripPlanId"));

  const { data: tripInfo } = useQuery(tripsQueries.info(tripPlanId));

  const { data: previousChats } = useSuspenseQuery(chatsQueries.messageList(conversationId));

  const restChats = chats.length > 1 ? chats.slice(0, -1) : chats;
  const recentChat = chats.length > 1 ? chats.at(-1) : undefined;

  const sortedPreviousChats = useMemo(
    () => [...previousChats.content].sort((a, b) => a.createdAt.localeCompare(b.createdAt)),
    [previousChats.content],
  );

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
      sendMessage(value, "TEXT");
      event.currentTarget.reset();
    }
  };

  useEffect(() => {
    if (previousChats.content.length > 0) {
      scrollToBottom();
    }
  }, [previousChats.content.length, scrollToBottom]);

  useEffect(() => {
    if (chats.length) {
      scrollToBottom();
    }
  }, [chats.length, scrollToBottom]);

  useEffect(() => {
    if (tripInfo?.isCompleted) {
      const timer = setTimeout(() => {
        setShowScheduleCreating(false);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [tripInfo?.isCompleted]);

  useEffect(() => {
    return () => {
      reset();
    };
  }, [reset]);

  return (
    <Flex gap="5" direction="column" width="588px">
      <Flex
        ref={chatListRef}
        gap="5"
        direction="column"
        pt="20px"
        px="20px"
        flexGrow="1"
        overflowY="auto"
      >
        {sortedPreviousChats.map(({ id, content, messageType }) => (
          <Message key={id} message={content} messageType={messageType} />
        ))}

        {chats?.length > 0 ? (
          <>
            {restChats.map(({ messageType, message, timestamp }) => {
              return <Message key={timestamp} message={message} messageType={messageType} />;
            })}
            {recentChat && (
              <Message message={recentChat.message} messageType={recentChat.messageType} animate />
            )}
          </>
        ) : null}

        {showScheduleCreating && (
          <AssistantMessage
            content={<ScheduleCreatingChat isCompleted={tripInfo?.isCompleted} />}
          />
        )}
      </Flex>
      <Flex direction="column" px="20px" pb="4" gap="4">
        <ChatForm disabled={!tripInfo?.isCompleted} onSubmit={submitMessage} />
        <Text color="gray" size="1" weight="regular" align="center">
          더 정확한 여행을 위해, 중요한 정보는 한 번 더 확인해주세요.
        </Text>
      </Flex>
    </Flex>
  );
};

const Message = ({
  messageType,
  message,
  animate,
}: {
  messageType: MessageType;
  message: string;
  animate?: boolean;
}) => {
  switch (messageType) {
    case "ASSISTANT":
      return <AssistantMessage content={message} animate={animate} />;
    case "USER":
      return <UserMessage text={message} animate={animate} />;
    default:
      return null;
  }
};
