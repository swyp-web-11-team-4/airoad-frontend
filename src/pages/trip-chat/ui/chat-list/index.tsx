import { Flex } from "@radix-ui/themes";
import { forwardRef } from "react";
import type { Chat } from "@/entities/chats/model/chat.types";
import {
  AssistantMessage,
  ChatLoadingPlaceholder,
  ChatMessage,
  ScheduleCreatingChat,
} from "@/entities/chats/ui";

interface ChatListProps {
  previousChats: Array<{
    id: number;
    content: string;
    messageType: "USER" | "ASSISTANT";
  }>;
  currentChats: Chat[];
  isWaitingResponse: boolean;
  showScheduleCreating: boolean;
  tripCompleted?: boolean;
}

export const ChatList = forwardRef<HTMLDivElement, ChatListProps>(
  (
    { previousChats, currentChats, isWaitingResponse, showScheduleCreating, tripCompleted },
    ref,
  ) => {
    const restChats = currentChats.length > 1 ? currentChats.slice(0, -1) : currentChats;
    const recentChat = currentChats.length > 1 ? currentChats.at(-1) : undefined;

    return (
      <Flex ref={ref} gap="5" direction="column" pt="20px" px="20px" flexGrow="1" overflowY="auto">
        {previousChats.map(({ id, content, messageType }) => (
          <ChatMessage key={id} content={content} messageType={messageType} />
        ))}

        {currentChats.length > 0 && (
          <>
            {restChats.map(({ messageType, message, timestamp }) => (
              <ChatMessage key={timestamp} content={message} messageType={messageType} />
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

        {showScheduleCreating && (
          <AssistantMessage content={<ScheduleCreatingChat isCompleted={tripCompleted} />} />
        )}
      </Flex>
    );
  },
);

ChatList.displayName = "ChatList";
