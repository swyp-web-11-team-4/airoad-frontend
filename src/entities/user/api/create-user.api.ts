import { api } from "@/shared/lib";
import type { User } from "../model";

export const createUser = async (userData: Omit<User, "id">): Promise<User> => {
  const { data } = await api.post<User>("/users", userData);
  return data;
};
