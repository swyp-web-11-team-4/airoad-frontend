import type { ApiResponse } from "@/shared/type";
import type { ChatMessage } from "./chats.model";

export type GetChatMessagesResponse = ApiResponse<{
  content: ChatMessage[];
}>;
