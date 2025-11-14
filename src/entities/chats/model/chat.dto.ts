import type { ApiResponse } from "@/shared/type";
import type { ChatMessage } from "./chats.model";

export interface GetChatMessageRequest {
  chatRoomId: number;
  size?: number;
  cursor?: number;
}

export type GetChatMessagesResponse = ApiResponse<{
  content: ChatMessage[];
  nextCursor: number;
  hasNext: boolean;
  size: number;
}>;
