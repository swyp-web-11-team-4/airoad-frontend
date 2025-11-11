import { API_PATHS } from "@/shared/config";
import { api } from "@/shared/lib";
import type { GetChatMessagesResponse } from "../model/chat.dto";

export const getChatMessages = async (chatRoomId: number) => {
  const { data } = await api.get<GetChatMessagesResponse>(
    API_PATHS.CHATS.BY_CHAT_ROOM_ID(chatRoomId).MESSAGES._,
  );
  return data;
};
