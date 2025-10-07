import { useMutation, useQueryClient } from "@tanstack/react-query";

import { userQueries } from "@/entities/user";
import { api } from "@/shared/lib/axios";
import type { User } from "@/shared/type";

const createUser = async (userData: Omit<User, "id">): Promise<User> => {
  const { data } = await api.post<User>("/users", userData);
  return data;
};

export const useCreateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: userQueries.lists() });
    },
  });
};
