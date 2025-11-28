import { Tabs } from "@radix-ui/themes";
import * as styles from "./index.css";

type ScheduleTapProps = {
  dayNumber: number;
};

export function ScheduleTap({ dayNumber }: ScheduleTapProps) {
  const days = Array.from({ length: dayNumber }, (_, i) => i + 1);
  return (
    <Tabs.List className={styles.tabBox}>
      {days.map((day) => (
        <Tabs.Trigger
          key={day}
          value={String(day)}
          className={styles.tabItem({ dayNumber: day as 1 | 2 | 3 | 4 | 5 | 6 })}
        >
          {day}일차
        </Tabs.Trigger>
      ))}
    </Tabs.List>
  );
}
