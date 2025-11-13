export type MessageType = "USER" | "ASSISTANT";

export type MessageContentType = "TEXT" | "IMAGE" | "FILE" | "LOCATION" | "SYSTEM";

export type ChatStreamType = "DAILY_PLAN_GENERATED" | "COMPLETED" | "ERROR" | "CHAT";

export interface ChatMessage {
  id: number;
  messageType: MessageType;
  content: string;
  messageContentType: MessageContentType;
  mediaUrl: string | null;
  createdAt: string;
}

export interface ChatStream {
  messageStreamType: ChatStreamType;
  message: string;
  isComplete: boolean;
  timestamp: string;
}
