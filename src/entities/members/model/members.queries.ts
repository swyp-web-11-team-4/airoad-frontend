import { queryOptions } from "@tanstack/react-query";
import { useAuthStore } from "@/entities/auth/model";
import { getMe } from "../api/members.api";

export const membersQueries = {
  all: () => ["members"],
  me: () => {
    const accessToken = useAuthStore.getState().accessToken;
    return queryOptions({
      queryKey: [...membersQueries.all(), "me"],
      queryFn: getMe,
      select: (res) => res.data,
      enabled: !!accessToken,
    });
  },
};
