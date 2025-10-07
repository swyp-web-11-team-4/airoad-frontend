import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";

import { api } from "@/shared/lib/axios";
import type { User } from "@/shared/type";

const fetchUsers = async (): Promise<User[]> => {
  const { data } = await api.get<User[]>("/users");
  return data;
};

const fetchUser = async (id: number): Promise<User> => {
  const { data } = await api.get<User>(`/users/${id}`);
  return data;
};

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

export const useUsers = (filters?: Record<string, unknown>) => {
  return useSuspenseQuery(userQueries.list(filters));
};

export const useUser = (id: number) => {
  return useSuspenseQuery(userQueries.detail(id));
};
