import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useSearchParams } from "react-router";
import { useAuthStore } from "@/entities/auth/model";
import { tripsQueries } from "@/entities/trips/model";
import { useStartTripPlan } from "@/entities/trips/model/use-start-trip-plan";
import { useTripPlanStreams } from "@/entities/trips/model/use-trip-plan-streams";

export const TripChatPage = () => {
  const accessToken = useAuthStore.getState().accessToken;
  const [params] = useSearchParams();
  const conversationId = Number(params.get("conversationId"));
  const tripPlanId = Number(params.get("tripPlanId"));
  const { mutate: postTripPlan } = useStartTripPlan();
  const { connected } = useTripPlanStreams({
    chatRoomId: conversationId ?? 0,
    tripPlanId: tripPlanId ?? 0,
    token: accessToken,
  });

  useEffect(() => {
    if (connected) {
      postTripPlan(tripPlanId ?? 0);
    }
  }, [connected]);

  const { data: chats } = useQuery(tripsQueries.chatStream(tripPlanId));
  const { data: schedule } = useQuery(tripsQueries.scheduleStream(tripPlanId));
  const { data: errors } = useQuery(tripsQueries.errorStream(conversationId));

  useEffect(() => {
    console.log(JSON.stringify(chats));
    console.log(JSON.stringify(schedule));
    console.log(JSON.stringify(errors));
  });

  return (
    <div>
      {/* Chat Section */}
      {/* Schedule Section */}
    </div>
  );
};
