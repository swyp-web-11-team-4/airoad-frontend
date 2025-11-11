import { queryOptions } from "@tanstack/react-query";
import { useAuthStore } from "@/entities/auth/model";
import { getMe } from "../api/member.api";

export const memberQueries = {
  all: () => ["members"],
  me: () => {
    const accessToken = useAuthStore.getState().accessToken;
    return queryOptions({
      queryKey: [...memberQueries.all(), "me"],
      queryFn: getMe,
      select: (res) => res.data,
      enabled: !!accessToken,
    });
  },
};
