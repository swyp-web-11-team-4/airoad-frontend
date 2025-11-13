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
} from "@/entities/chats/ui";

interface ChatListProps {
  conversationId: number;
  isTripCreated?: boolean;
}

export const ChatList = forwardRef<HTMLDivElement, ChatListProps>(
  ({ conversationId, isTripCreated = false }, forwardedRef) => {
    const chatListRef = useRef<HTMLDivElement>(null);
    const sentinelRef = useRef<HTMLDivElement>(null);

    const currentChats = useChatStore((state) => state.chats);
    const isWaitingResponse = useChatStore((state) => state.isWaitingResponse);
    const setWaitingResponse = useChatStore((state) => state.setWaitingResponse);

    useImperativeHandle(forwardedRef, () => chatListRef.current as HTMLDivElement);

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

    const [isFetchingPrevious, setIsFetchingPrevious] = useState(false);

    const sortedPreviousChats = useMemo(() => {
      if (!previousChatsData) return [];

      const allMessages = previousChatsData.pages.flatMap((page) => page.data.content);

      return allMessages.sort((a, b) => a.createdAt.localeCompare(b.createdAt));
    }, [previousChatsData]);

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
      if (sortedPreviousChats.length > 0 || currentChats.length > 0) {
        scrollToBottom();
      }
    }, [sortedPreviousChats.length, currentChats.length, scrollToBottom]);

    useEffect(() => {
      const sentinel = sentinelRef.current;
      const chatList = chatListRef.current;

      if (!sentinel || !chatList) return;

      const observer = new IntersectionObserver(
        async (entries) => {
          const [entry] = entries;

          if (entry.isIntersecting && hasNextPage && !isFetchingNextPage && !isFetchingPrevious) {
            setIsFetchingPrevious(true);
            const previousScrollHeight = chatList.scrollHeight;
            const previousScrollTop = chatList.scrollTop;

            await fetchNextPage();

            requestAnimationFrame(() => {
              const newScrollHeight = chatList.scrollHeight;
              const scrollDiff = newScrollHeight - previousScrollHeight;
              chatList.scrollTop = previousScrollTop + scrollDiff;
              setIsFetchingPrevious(false);
            });
          }
        },
        {
          root: chatList,
          rootMargin: "100px 0px 0px 0px",
          threshold: 0,
        },
      );

      observer.observe(sentinel);

      return () => {
        observer.disconnect();
      };
    }, [fetchNextPage, hasNextPage, isFetchingNextPage, isFetchingPrevious]);

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
        <div ref={sentinelRef} style={{ height: "1px" }} />

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
    );
  },
);

ChatList.displayName = "ChatList";
