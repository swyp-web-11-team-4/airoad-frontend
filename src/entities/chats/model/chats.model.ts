export type MessageType = "USER" | "ASSISTANT";

export type MessageContentType = "TEXT" | "IMAGE";

export interface ChatMessage {
  id: number;
  messageType: MessageType;
  content: string;
  messageContentType: MessageContentType;
  mediaUrl: string | null;
  createdAt: string;
}
