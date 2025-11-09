import { useEffect } from "react";
import { useLocation, useSearchParams } from "react-router";
import { useAuthStore } from "@/entities/auth/model";
import { useStartTripPlan } from "@/entities/trips/model/use-start-trip-plan";
import { useTripPlanStreams } from "@/entities/trips/model/use-trip-plan-streams";

export const TripChatPage = () => {
  const accessToken = useAuthStore.getState().accessToken;
  const [params] = useSearchParams();
  const { state } = useLocation();
  const conversationId = Number(params.get("conversationId"));
  const tripPlanId = Number(params.get("tripPlanId"));
  const isCreate = state?.create ?? false;
  const { mutate: postTripPlan } = useStartTripPlan();
  const { connected, chat, schedule, error } = useTripPlanStreams({
    chatRoomId: conversationId ?? 0,
    tripPlanId: tripPlanId ?? 0,
    token: accessToken,
  });

  useEffect(() => {
    if (connected && isCreate) {
      postTripPlan(tripPlanId ?? 0);
    }
  }, [connected]);

  useEffect(() => {
    console.log(chat);
  }, [chat]);

  useEffect(() => {
    console.log(JSON.stringify(chat));
    console.log(JSON.stringify(schedule));
    console.log(JSON.stringify(error));
  });

  return (
    <div>
      {/* Chat Section */}
      {/* Schedule Section */}
    </div>
  );
};
