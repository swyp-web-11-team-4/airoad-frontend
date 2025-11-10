import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { useSearchParams } from "react-router";
import { tripsQueries } from "@/entities/trips/model";
import type { ScheduleMessage } from "@/entities/trips/model/trips.model";
import { ScheduleBox } from "../schedule-box";
import { ScheduleBoxSkeleton } from "../schedule-box-skeleton";
import * as styles from "./index.css";
export function ScheduleSection({ messages }: { messages: ScheduleMessage[] }) {
  const [params] = useSearchParams();
  const tripPlanId = Number(params.get("tripPlanId"));
  const { data } = useQuery(tripsQueries.info(tripPlanId));

  const total = data?.duration ?? 0;
  const filled = messages.length;
  const remain = Math.max(total - filled, 0);

  const skeletonIds = useMemo(
    () => Array.from({ length: remain }, () => crypto.randomUUID()),
    [remain],
  );

  return (
    <div className={styles.container}>
      {messages.map((msg) => (
        <ScheduleBox key={msg.tripPlanId} {...msg.dailyPlan} />
      ))}

      {skeletonIds.map((id) => (
        <ScheduleBoxSkeleton key={id} />
      ))}
    </div>
  );
}
