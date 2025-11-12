import { useMutation } from "@tanstack/react-query";
import { postTripPlan } from "@/entities/trips/api";

export function useDailyPlans() {
  return useMutation({
    mutationFn: (id: number) => postTripPlan(id),
    onError: (err) => {
      console.error("일차별 조회 시 오류 발생:", err);
    },
  });
}
