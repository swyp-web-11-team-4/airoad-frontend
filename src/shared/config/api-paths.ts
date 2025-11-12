export const API_PATHS = {
  AUTH: {
    LOGOUT: {
      _: "/api/v1/auth/logout",
    },
    REISSUE: {
      _: "/api/v1/auth/reissue",
    },
  },
  MEMBERS: {
    ME: {
      _: "/api/v1/members/me",
    },
  },
  CHATS: {
    BY_CHAT_ROOM_ID: (chatRoomId: number) => ({
      MESSAGES: {
        _: `/api/v1/chats/${chatRoomId}/messages`,
      },
    }),
  },
} as const;
