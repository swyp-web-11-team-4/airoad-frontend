import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { User } from "@/entities/user";
import { userKeys } from "@/entities/user";
import { api } from "@/shared/lib/axios";

async function createUser(userData: Omit<User, "id">): Promise<User> {
  const { data } = await api.post<User>("/users", userData);
  return data;
}

export function useCreateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: userKeys.lists() });
    },
  });
}
