import { Flex, Text } from "@radix-ui/themes";
import { useSuspenseQuery } from "@tanstack/react-query";
import { type FormEventHandler, useCallback, useEffect, useMemo, useRef } from "react";
import { chatsQueries, type MessageType } from "@/entities/chats/model";
import type { Chat } from "@/entities/trips/model/trips.model";
import type { useTripPlanStreams } from "@/entities/trips/model/use-trip-plan-streams";
import { AssistantMessage } from "../assistant-message";
import { ChatForm } from "../chat-form";
import { UserMessage } from "../user-message";

interface ChatSectionProps {
  conversationId: number;
  chat: Chat[];
  sendMessage: ReturnType<typeof useTripPlanStreams>["sendMessage"];
}

export const ChatSection = ({ conversationId, chat, sendMessage }: ChatSectionProps) => {
  const chatListRef = useRef<HTMLDivElement>(null);

  const { data: previousChats } = useSuspenseQuery(chatsQueries.messageList(conversationId));

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

    if (typeof value === "string") {
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
    if (chat.length) {
      scrollToBottom();
    }
  }, [chat.length, scrollToBottom]);

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
        {chat?.length > 0
          ? chat.map(({ messageType, message, timestamp }) => {
              return <Message key={timestamp} message={message} messageType={messageType} />;
            })
          : null}
      </Flex>
      <Flex direction="column" px="20px" pb="4" gap="4">
        <ChatForm onSubmit={submitMessage} />
        <Text color="gray" size="1" weight="regular" align="center">
          더 정확한 여행을 위해, 중요한 정보는 한 번 더 확인해주세요.
        </Text>
      </Flex>
    </Flex>
  );
};

const Message = ({ messageType, message }: { messageType: MessageType; message: string }) => {
  switch (messageType) {
    case "ASSISTANT":
      return <AssistantMessage content={message} />;
    case "USER":
      return <UserMessage text={message} />;
    default:
      return null;
  }
};
