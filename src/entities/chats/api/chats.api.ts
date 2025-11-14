import { API_PATHS } from "@/shared/config";
import { api } from "@/shared/lib";
import type { GetChatMessageRequest, GetChatMessagesResponse } from "../model";

export const getChatMessages = async ({ chatRoomId, size = 50, cursor }: GetChatMessageRequest) => {
  const { data } = await api.get<GetChatMessagesResponse>(
    API_PATHS.CHATS.BY_CHAT_ROOM_ID(chatRoomId).MESSAGES._,
    {
      params: {
        size,
        cursor,
      },
    },
  );
  return data;
};
