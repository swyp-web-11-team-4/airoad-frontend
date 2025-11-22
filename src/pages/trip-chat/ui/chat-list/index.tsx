import { Flex } from "@radix-ui/themes";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useMemo, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import { CHAT_LIST_SIZE, chatsQueries, useChatScroll } from "@/entities/chats/model";
import {
  AssistantMessage,
  ChatLoadingPlaceholder,
  ChatMessage,
  ScheduleCreatingChat,
  ScrollToBottomButton,
} from "@/entities/chats/ui";
import { useInfiniteScroll } from "@/shared/hook";
import { useChatSection } from "../../model";
import * as styles from "./index.css";

export const ChatList = () => {
  const isInitialLoadRef = useRef(true);
  const previousChatCountRef = useRef(0);

  const {
    conversationId,
    currentChats,
    recentChat,
    restChats,
    isTripCreated,
    isChatLoading,
    isScheduleCreating,
  } = useChatSection();

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

  const sortedPreviousChats = useMemo(() => {
    if (!previousChatsData) return [];

    const allMessages = previousChatsData.pages.flatMap((page) => page.data.content);

    return allMessages.sort((a, b) => a.createdAt.localeCompare(b.createdAt));
  }, [previousChatsData]);

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

    if (hasNewMessage && recentChat) {
      const isUserMessage = recentChat.messageType === "USER";
      const isAssistantMessage = recentChat.messageType === "ASSISTANT";

      handleNewMessage({ isUserMessage, isAssistantMessage });
    }

    previousChatCountRef.current = currentChatCount;
  }, [currentChats.length, recentChat, handleNewMessage]);

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

        {isScheduleCreating && (
          <AssistantMessage content={<ScheduleCreatingChat isCompleted={isTripCreated} />} />
        )}

        <ScheduleCreatingChat isCompleted={false} />

        {isChatLoading && <AssistantMessage content={<ChatLoadingPlaceholder />} />}
      </Flex>

      {showScrollButton && <ScrollToBottomButton onClick={scrollToBottom} />}
    </div>
  );
};
