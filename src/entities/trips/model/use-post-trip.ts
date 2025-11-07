import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { postTrip } from "../api/trips.api";
import type { CreateTrip } from "./trips.model";

export function usePostTrip() {
  return useMutation({
    mutationFn: ({ themes, startDate, duration, region, peopleCount }: CreateTrip) =>
      postTrip({ themes, startDate, duration, region, peopleCount }),
    onSuccess: () => {
      toast.success("성공");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
}
