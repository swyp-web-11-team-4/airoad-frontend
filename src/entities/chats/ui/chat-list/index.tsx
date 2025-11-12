import { Flex } from "@radix-ui/themes";
import { useSuspenseQuery } from "@tanstack/react-query";
import { forwardRef, useCallback, useEffect, useImperativeHandle, useMemo, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import { chatsQueries, useChatStore } from "@/entities/chats/model";
import {
  AssistantMessage,
  ChatLoadingPlaceholder,
  ChatMessage,
  ScheduleCreatingChat,
} from "@/entities/chats/ui";

interface ChatListProps {
  conversationId: number;
  isTripCreated?: boolean;
}

export const ChatList = forwardRef<HTMLDivElement, ChatListProps>(
  ({ conversationId, isTripCreated = false }, forwardedRef) => {
    const chatListRef = useRef<HTMLDivElement>(null);

    const currentChats = useChatStore((state) => state.chats);
    const isWaitingResponse = useChatStore((state) => state.isWaitingResponse);
    const setWaitingResponse = useChatStore((state) => state.setWaitingResponse);

    useImperativeHandle(forwardedRef, () => chatListRef.current as HTMLDivElement);

    const { data: previousChats } = useSuspenseQuery(chatsQueries.messageList(conversationId));

    const sortedPreviousChats = useMemo(
      () => [...previousChats.content].sort((a, b) => a.createdAt.localeCompare(b.createdAt)),
      [previousChats.content],
    );

    const restChats = currentChats.length > 1 ? currentChats.slice(0, -1) : currentChats;
    const recentChat = currentChats.length > 1 ? currentChats.at(-1) : undefined;

    const scrollToBottom = useCallback(() => {
      if (chatListRef.current) {
        chatListRef.current.scrollTo({
          top: chatListRef.current.scrollHeight,
        });
      }
    }, []);

    useEffect(() => {
      const lastChat = currentChats.at(-1);
      if (lastChat?.messageType === "ASSISTANT") {
        setWaitingResponse(false);
      }
    }, [currentChats, setWaitingResponse]);

    useEffect(() => {
      if (previousChats.content.length > 0 || currentChats.length > 0) {
        scrollToBottom();
      }
    }, [previousChats.content.length, currentChats.length, scrollToBottom]);

    return (
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
          <ChatMessage key={id} content={content} messageType={messageType} />
        ))}

        {currentChats.length > 0 && (
          <>
            {restChats.map(({ messageType, message }) => (
              <ChatMessage key={uuidv4()} content={message} messageType={messageType} />
            ))}
            {recentChat && (
              <ChatMessage
                content={recentChat.message}
                messageType={recentChat.messageType}
                animate
              />
            )}
          </>
        )}

        {isWaitingResponse && <AssistantMessage content={<ChatLoadingPlaceholder />} />}

        {!isTripCreated && (
          <AssistantMessage content={<ScheduleCreatingChat isCompleted={isTripCreated} />} />
        )}
      </Flex>
    );
  },
);

ChatList.displayName = "ChatList";
