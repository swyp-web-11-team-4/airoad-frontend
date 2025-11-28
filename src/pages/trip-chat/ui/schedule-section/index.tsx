import { Tabs } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import { tripsQueries } from "@/entities/trips/model";
import type { DayPlanData, StatusMessage } from "@/entities/trips/model/trips.model";
import { ScheduleBox } from "../schedule-box";
import { ScheduleTap } from "../schedule-tap";
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

  const total = tripInfo?.duration ?? 0;

  const [tabValue, setTabValue] = useState("1");
  useEffect(() => {
    console.log(status);
  }, [status]);
  useEffect(() => {
    if (schedule.length > 0) {
      const latest = schedule[schedule.length - 1].dayNumber;
      setTabValue(String(latest));
    }
  }, [schedule]);

  if (!dailyPlans) {
    return (
      <div className={styles.container}>
        <Tabs.Root value={tabValue} onValueChange={setTabValue}>
          <ScheduleTap.Skeleton dayNumber={total || 1} />
          <div className={styles.box}>
            <ScheduleBox.Skeleton />
          </div>
        </Tabs.Root>
      </div>
    );
  }

  const dailyPlanList = Array.from(
    [...dailyPlans, ...schedule]
      .reduce((map, item) => map.set(item.dayNumber, item), new Map())
      .values(),
  );

  const days = Array.from({ length: total || 1 }, (_, i) => i + 1);

  if (dailyPlanList.length === 0) {
    return (
      <div className={styles.container}>
        <Tabs.Root value={tabValue} onValueChange={setTabValue}>
          <ScheduleTap.Skeleton dayNumber={total || 1} />
          <div className={styles.box}>
            {days.map((day) => (
              <Tabs.Content className={styles.tabContainer} key={day} value={String(day)}>
                <ScheduleBox.Skeleton />
              </Tabs.Content>
            ))}
          </div>
        </Tabs.Root>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <Tabs.Root value={tabValue} onValueChange={setTabValue} style={{ height: "100%" }}>
        <ScheduleTap dayNumber={total} />
        <div className={styles.box}>
          {days.map((day) => {
            const plan = dailyPlanList.find((p) => p.dayNumber === day);

            return (
              <Tabs.Content className={styles.tabContainer} key={day} value={String(day)}>
                {plan ? <ScheduleBox {...plan} /> : <ScheduleBox.Skeleton />}
              </Tabs.Content>
            );
          })}
        </div>
      </Tabs.Root>
    </div>
  );
}
