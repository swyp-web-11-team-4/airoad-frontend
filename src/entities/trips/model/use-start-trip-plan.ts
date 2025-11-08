import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postTripPlan } from "@/entities/trips/api";
import { tripsQueries } from "@/entities/trips/model";

export function useStartTripPlan() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => postTripPlan(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: tripsQueries.all() });
    },
    onError: (err) => {
      console.error("[Trip Plan] failed:", err);
    },
  });
}
