import { useQuery } from "@tanstack/react-query";
import { useMemo, useRef } from "react";
import { useSearchParams } from "react-router";
import { tripsQueries } from "@/entities/trips/model";
import type { DayPlanData, ScheduleMessage } from "@/entities/trips/model/trips.model";
import { ScheduleBox } from "../schedule-box";
import { ScheduleBoxSkeleton } from "../schedule-box-skeleton";
import * as styles from "./index.css";

export function ScheduleSection({ schedule }: { schedule: ScheduleMessage[] }) {
  const [params] = useSearchParams();
  const tripPlanId = Number(params.get("tripPlanId"));

  const { data: tripInfo } = useQuery(tripsQueries.info(tripPlanId));
  const { data: dailyPlans } = useQuery(tripsQueries.dailyPlan(tripPlanId));

  const lastRef = useRef<HTMLDivElement>(null);
  const scheduleData = useMemo(() => {
    if (!dailyPlans && schedule.length === 0) return [];

    const ids = new Set<number>();
    const plans: DayPlanData[] = [];

    const apiList = Array.isArray(dailyPlans) ? dailyPlans : dailyPlans ? [dailyPlans] : [];
    const socketList = schedule
      .map((s) => s.dailyPlan)
      .filter((p): p is DayPlanData => !!p && typeof p.id === "number");

    for (const plan of [...apiList, ...socketList]) {
      if (ids.has(plan.id)) continue;
      ids.add(plan.id);
      plans.push(plan);
    }

    return plans.sort((a, b) => a.dayNumber - b.dayNumber);
  }, [dailyPlans, schedule]);

  const total = tripInfo?.duration ?? 0;
  const remain = Math.max(total - scheduleData.length, 0);

  return (
    <div className={styles.container}>
      {scheduleData.map((plan, idx) => (
        <ScheduleBox
          key={plan.id}
          ref={idx === scheduleData.length - 1 ? lastRef : undefined}
          {...plan}
        />
      ))}
      {/* biome-ignore lint/suspicious/noArrayIndexKey: static skeleton, order won't change */}
      {remain > 0 && Array.from({ length: remain }).map((_, i) => <ScheduleBoxSkeleton key={i} />)}
    </div>
  );
}
