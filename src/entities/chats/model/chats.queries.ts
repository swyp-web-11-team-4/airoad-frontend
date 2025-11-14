import { infiniteQueryOptions, queryOptions } from "@tanstack/react-query";
import { getChatMessages } from "../api";
import type { GetChatMessageRequest } from "./chat.dto";

export const chatsQueries = {
  all: () => ["chats"] as const,
  messageLists: () => [...chatsQueries.all(), "messageList"] as const,
  messageList: (chatRoomId: number) =>
    queryOptions({
      queryKey: [...chatsQueries.messageLists(), chatRoomId],
      queryFn: async () => await getChatMessages({ chatRoomId }),
      select: (res) => res.data,
    }),
  infiniteMessageLists: () => [...chatsQueries.messageLists(), "infinite"] as const,
  infiniteMessageList: ({ chatRoomId, size }: Omit<GetChatMessageRequest, "cursor">) =>
    infiniteQueryOptions({
      queryKey: [...chatsQueries.infiniteMessageLists(), chatRoomId],
      queryFn: async ({ pageParam }: { pageParam: number | undefined }) =>
        await getChatMessages({ chatRoomId, size, cursor: pageParam }),
      initialPageParam: undefined,
      getNextPageParam: (lastPage) =>
        lastPage.data.hasNext ? lastPage.data.nextCursor : undefined,
    }),
};
