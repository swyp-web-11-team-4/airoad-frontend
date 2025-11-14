import { Flex } from "@radix-ui/themes";
import { useInfiniteQuery } from "@tanstack/react-query";
import { forwardRef, useEffect, useImperativeHandle, useMemo, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import { CHAT_LIST_SIZE, chatsQueries, useChatScroll, useChatStore } from "@/entities/chats/model";
import {
  AssistantMessage,
  ChatLoadingPlaceholder,
  ChatMessage,
  ScheduleCreatingChat,
  ScrollToBottomButton,
} from "@/entities/chats/ui";
import { useInfiniteScroll } from "@/shared/hook";
import * as styles from "./index.css";

interface ChatListProps {
  conversationId: number;
  isTripCreated?: boolean;
}

export const ChatList = forwardRef<HTMLDivElement, ChatListProps>(
  ({ conversationId, isTripCreated = false }, forwardedRef) => {
    const isInitialLoadRef = useRef(true);
    const previousChatCountRef = useRef(0);

    const currentChats = useChatStore((state) => state.chats);
    const isWaitingResponse = useChatStore((state) => state.isWaitingResponse);
    const setWaitingResponse = useChatStore((state) => state.setWaitingResponse);

    const {
      data: previousChatsData,
      fetchNextPage,
      hasNextPage,
      isFetchingNextPage,
    } = useInfiniteQuery(
      chatsQueries.infiniteMessageList({
        chatRoomId: conversationId,
        size: CHAT_LIST_SIZE,
      }),
    );

    const { containerRef, showScrollButton, scrollToBottom, handleNewMessage } = useChatScroll();

    const { sentinelRef } = useInfiniteScroll({
      hasNextPage,
      fetchNextPage,
      isFetchingNextPage,
      containerRef,
    });

    useImperativeHandle(forwardedRef, () => containerRef.current as HTMLDivElement);

    const sortedPreviousChats = useMemo(() => {
      if (!previousChatsData) return [];

      const allMessages = previousChatsData.pages.flatMap((page) => page.data.content);

      return allMessages.sort((a, b) => a.createdAt.localeCompare(b.createdAt));
    }, [previousChatsData]);

    const lastChat = currentChats.at(-1);
    const restChats = currentChats.length > 1 ? currentChats.slice(0, -1) : currentChats;
    const recentChat = currentChats.length > 1 ? lastChat : undefined;

    useEffect(() => {
      if (lastChat?.messageType === "ASSISTANT") {
        setWaitingResponse(false);
      }
    }, [lastChat?.messageType, setWaitingResponse]);

    useEffect(() => {
      if (isInitialLoadRef.current && sortedPreviousChats.length > 0) {
        scrollToBottom();
        isInitialLoadRef.current = false;
      }
    }, [sortedPreviousChats.length, scrollToBottom]);

    useEffect(() => {
      if (isInitialLoadRef.current) return;

      const currentChatCount = currentChats.length;
      const hasNewMessage = currentChatCount > previousChatCountRef.current;

      if (hasNewMessage && lastChat) {
        const isUserMessage = lastChat.messageType === "USER";
        const isAssistantMessage = lastChat.messageType === "ASSISTANT";

        handleNewMessage({ isUserMessage, isAssistantMessage });
      }

      previousChatCountRef.current = currentChatCount;
    }, [currentChats.length, lastChat, handleNewMessage]);

    return (
      <div className={styles.container}>
        <Flex
          ref={containerRef}
          gap="5"
          direction="column"
          py="20px"
          px="20px"
          flexGrow="1"
          overflowY="auto"
        >
          {hasNextPage && <div ref={sentinelRef} style={{ height: "1px" }} />}

          {isFetchingNextPage && (
            <Flex justify="center" py="3">
              <ChatLoadingPlaceholder />
            </Flex>
          )}

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

        {showScrollButton && <ScrollToBottomButton onClick={scrollToBottom} />}
      </div>
    );
  },
);

ChatList.displayName = "ChatList";
