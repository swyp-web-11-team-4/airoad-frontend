import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { api } from "@/shared/lib/axios";
import type { User } from "../model/types";

async function fetchUsers(): Promise<User[]> {
  const { data } = await api.get<User[]>("/users");
  return data;
}

async function fetchUser(id: number): Promise<User> {
  const { data } = await api.get<User>(`/users/${id}`);
  return data;
}

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

export function useUsers(filters?: Record<string, unknown>) {
  return useSuspenseQuery(userQueries.list(filters));
}

export function useUser(id: number) {
  return useSuspenseQuery(userQueries.detail(id));
}
