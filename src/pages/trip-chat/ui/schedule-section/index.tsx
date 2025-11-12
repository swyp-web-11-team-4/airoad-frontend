import { useQuery } from "@tanstack/react-query";
import { useEffect, useRef } from "react";
import { useSearchParams } from "react-router";
import { tripsQueries } from "@/entities/trips/model";
import type { ScheduleMessage } from "@/entities/trips/model/trips.model";
import { ScheduleBox } from "../schedule-box";
import { ScheduleBoxSkeleton } from "../schedule-box-skeleton";
import * as styles from "./index.css";

export function ScheduleSection({ schedule }: { schedule: ScheduleMessage[] }) {
  const [params] = useSearchParams();
  const tripPlanId = Number(params.get("tripPlanId"));
  const { data } = useQuery(tripsQueries.info(tripPlanId));
  const lastRef = useRef<HTMLDivElement>(null);

  const total = data?.duration ?? 0;
  const filled = schedule.length;
  const remain = Math.max(total - filled, 0);

  return (
    <div className={styles.container}>
      {schedule.map((item, idx) => (
        <ScheduleBox
          key={item.dailyPlan?.id}
          ref={idx === schedule.length - 1 ? lastRef : undefined}
          {...item.dailyPlan}
        />
      ))}

      {Array.from({ length: remain }).map((_, i) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: static skeleton, order won't change
        <ScheduleBoxSkeleton key={i} />
      ))}
    </div>
  );
}
