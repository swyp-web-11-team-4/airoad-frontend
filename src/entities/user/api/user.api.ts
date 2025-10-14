import { api } from "@/shared/lib/axios";
import type { User } from "../model";

export const fetchUsers = async (): Promise<User[]> => {
  const { data } = await api.get<User[]>("/users");
  return data;
};

export const fetchUser = async (id: number): Promise<User> => {
  const { data } = await api.get<User>(`/users/${id}`);
  return data;
};
