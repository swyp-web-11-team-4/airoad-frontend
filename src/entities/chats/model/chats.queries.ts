import { queryOptions } from "@tanstack/react-query";
import { getChatMessages } from "../api";

export const chatsQueries = {
  all: () => ["chats"] as const,
  messageLists: () => [...chatsQueries.all(), "messageList"] as const,
  messageList: (chatRoomId: number) =>
    queryOptions({
      queryKey: [...chatsQueries.messageLists(), chatRoomId],
      queryFn: async () => await getChatMessages(chatRoomId),
      select: (res) => res.data,
    }),
};
