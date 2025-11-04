import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteTrip } from "@/entities/trips/api/trips.api";
import { tripsQueries } from "@/entities/trips/model/trips.queries";

export function useDeleteTrip() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteTrip(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: tripsQueries.all() });
    },
    onError: (err) => {
      console.error("[Trip Delete] failed:", err);
    },
  });
}
