import { queryOptions } from "@tanstack/react-query";
import { fetchUser, fetchUsers } from "@/entities/user";

export const userQueries = {
  all: () => ["users"],
  lists: () => [...userQueries.all(), "list"],
  list: (filters?: Record<string, unknown>) =>
    queryOptions({
      queryKey: [...userQueries.lists(), filters],
      queryFn: fetchUsers,
    }),
  details: () => [...userQueries.all(), "detail"],
  detail: (id: number) =>
    queryOptions({
      queryKey: [...userQueries.details(), id],
      queryFn: () => fetchUser(id),
    }),
};
