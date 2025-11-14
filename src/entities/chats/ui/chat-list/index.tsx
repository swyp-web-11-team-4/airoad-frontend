import { Flex } from "@radix-ui/themes";
import { useInfiniteQuery } from "@tanstack/react-query";
import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from "react";
import { v4 as uuidv4 } from "uuid";
import { CHAT_LIST_SIZE, chatsQueries, useChatStore } from "@/entities/chats/model";
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
    const [isAtBottom, setIsAtBottom] = useState(true);
    const [showScrollButton, setShowScrollButton] = useState(false);
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

    const { sentinelRef, containerRef } = useInfiniteScroll({
      hasNextPage,
      fetchNextPage,
      isFetchingNextPage,
    });

    useImperativeHandle(forwardedRef, () => containerRef.current as HTMLDivElement);

    const sortedPreviousChats = useMemo(() => {
      if (!previousChatsData) return [];

      const allMessages = previousChatsData.pages.flatMap((page) => page.data.content);

      return allMessages.sort((a, b) => a.createdAt.localeCompare(b.createdAt));
    }, [previousChatsData]);

    const restChats = currentChats.length > 1 ? currentChats.slice(0, -1) : currentChats;
    const recentChat = currentChats.length > 1 ? currentChats.at(-1) : undefined;

    const checkIfAtBottom = useCallback(() => {
      if (!containerRef.current) return false;

      const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
      const distanceFromBottom = scrollHeight - scrollTop - clientHeight;

      return distanceFromBottom < 1;
    }, [containerRef]);

    const scrollToBottom = useCallback(() => {
      if (containerRef.current) {
        containerRef.current.scrollTo({
          top: containerRef.current.scrollHeight,
        });
        setIsAtBottom(true);
        setShowScrollButton(false);
      }
    }, [containerRef]);

    const handleScroll = useCallback(() => {
      const atBottom = checkIfAtBottom();
      setIsAtBottom(atBottom);

      if (atBottom) {
        setShowScrollButton(false);
      }
    }, [checkIfAtBottom]);

    useEffect(() => {
      const container = containerRef.current;
      if (!container) return;

      container.addEventListener("scroll", handleScroll);
      return () => {
        container.removeEventListener("scroll", handleScroll);
      };
    }, [containerRef, handleScroll]);

    useEffect(() => {
      const lastChat = currentChats.at(-1);
      if (lastChat?.messageType === "ASSISTANT") {
        setWaitingResponse(false);
      }
    }, [currentChats, setWaitingResponse]);

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

      if (hasNewMessage) {
        const lastChat = currentChats.at(-1);
        const isUserMessage = lastChat?.messageType === "USER";
        const isAssistantMessage = lastChat?.messageType === "ASSISTANT";

        if (isUserMessage) {
          scrollToBottom();
        } else if (isAtBottom) {
          scrollToBottom();
        } else if (isAssistantMessage && !showScrollButton) {
          setShowScrollButton(true);
        }
      }

      previousChatCountRef.current = currentChatCount;
    }, [currentChats, isAtBottom, showScrollButton, scrollToBottom]);

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
