import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { patchTripPlan } from "../api/trips.api";
import { tripsQueries } from "./trips.queries";

export function usePatchTrip() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, title }: { id: number; title: string }) => patchTripPlan(id, title),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: tripsQueries.infos() });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
}
