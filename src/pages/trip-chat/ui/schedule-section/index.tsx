import { Tabs } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
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
  useEffect(() => {
    console.log(JSON.stringify(status));
  });

  if (!dailyPlans) return;
  const dailyPlanList = Array.from(
    [...dailyPlans, ...schedule]
      .reduce((map, item) => map.set(item.dayNumber, item), new Map())
      .values(),
  );

  return (
    <div className={styles.container}>
      <Tabs.Root defaultValue={"1"} style={{ height: "100%" }}>
        <ScheduleTap dayNumber={total} />
        <div className={styles.box}>
          {dailyPlanList.map((plan, idx) => {
            const dayValue = String(idx + 1);
            return (
              <Tabs.Content className={styles.tabContainer} key={plan?.id ?? idx} value={dayValue}>
                <ScheduleBox {...plan} />
              </Tabs.Content>
            );
          })}
        </div>
      </Tabs.Root>
    </div>
  );
}
