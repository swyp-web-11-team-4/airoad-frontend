import { useQuery } from "@tanstack/react-query";
import { useEffect, useMemo, useRef } from "react";
import { useSearchParams } from "react-router";
import { tripsQueries } from "@/entities/trips/model";
import type { DayPlanData, StatusMessage } from "@/entities/trips/model/trips.model";
import { ScheduleBox } from "../schedule-box";
import { ScheduleBoxSkeleton } from "../schedule-box-skeleton";
import * as styles from "./index.css";

export function ScheduleSection({
  schedule,
  status,
}: {
  schedule: DayPlanData[];
  status: StatusMessage[];
}) {
  const [params] = useSearchParams();
  const tripPlanId = Number(params.get("tripPlanId"));

  const { data: tripInfo } = useQuery(tripsQueries.info(tripPlanId));
  const { data: dailyPlans } = useQuery(tripsQueries.dailyPlan(tripPlanId));

  const lastRef = useRef<HTMLDivElement>(null);

  const total = tripInfo?.duration ?? 0;

  useEffect(() => {
    console.log(status);
  }, [status]);

  const dayPlanList = useMemo(() => {
    if (!total) return [];

    const result: (DayPlanData | null)[] = Array.from({ length: total }, () => null);

    (dailyPlans ?? []).forEach((plan) => {
      if (plan.dayNumber == null) return;
      const idx = plan.dayNumber - 1;
      if (idx < 0 || idx >= total) return;
      result[idx] = plan;
    });

    (schedule ?? []).forEach((plan) => {
      if (plan?.dayNumber == null) return;
      const idx = plan.dayNumber - 1;
      if (idx < 0 || idx >= total) return;
      result[idx] = plan;
    });

    return result;
  }, [dailyPlans, schedule, total]);

  const lastPlanIndex = useMemo(() => {
    for (let i = dayPlanList.length - 1; i >= 0; i -= 1) {
      if (dayPlanList[i]) return i;
    }
    return -1;
  }, [dayPlanList]);

  useEffect(() => {
    if (lastPlanIndex < 0) return;
    if (!lastRef.current) return;
    lastRef.current.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
    });
  }, [lastPlanIndex]);

  return (
    <div className={styles.container}>
      {dayPlanList.map((plan, idx) => {
        if (plan) {
          return (
            <ScheduleBox
              key={plan.id}
              ref={idx === lastPlanIndex ? lastRef : undefined}
              {...plan}
            />
          );
        }
        // biome-ignore lint/suspicious/noArrayIndexKey: index와 dayNumber를 1:1로 매칭하기 위함
        return <ScheduleBoxSkeleton key={idx} />;
      })}
    </div>
  );
}
