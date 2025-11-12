export type MessageType = "USER" | "ASSISTANT";

export type MessageContentType = "TEXT" | "IMAGE";

export interface ChatMessage {
  isComplete: boolean;
  message: string;
  timestamp: string;
}

export interface Chat extends ChatMessage {
  messageType: MessageType;
}

export interface ErrorMessage {
  code: string;
  message: string;
  detail?: unknown;
}
