export const PAGE_ROUTES = {
  ROOT: "/",
  SIGN_IN: "/sign-in",
  REDIRECT: "/redirect",
  TRIP_LIST: "/trip/list",
  TRIP_CHAT: (id?: number) => `/trip/chat/${id ?? ":id"}`,
} as const;
