import { useMutation, useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { createUser, userQueries } from "@/entities/user";
export const useUsers = (filters?: Record<string, unknown>) => {
  return useSuspenseQuery(userQueries.list(filters));
};

export const useUser = (id: number) => {
  return useSuspenseQuery(userQueries.detail(id));
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
