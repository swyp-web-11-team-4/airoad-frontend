import { Skeleton } from "@radix-ui/themes";
import * as styles from "./index.css";

export function ScheduleBoxSkeleton() {
  const days = Array.from({ length: 5 });

  return (
    <div className={styles.box}>
      <div className={styles.header}>
        <Skeleton width="110px" height="28px" />
        <Skeleton width="180px" height="30px" />
        <Skeleton width="129px" height="20px" />
      </div>

      <div className={styles.dayContainer}>
        {days.map((_, idx) => (
          <>
            {/* biome-ignore lint/suspicious/noArrayIndexKey: static skeleton, order won't change  */}
            <div key={idx} className={styles.dayBox}>
              <Skeleton width="128px" height="128px" />
              <div className={styles.dayInfo}>
                <div className={styles.dayTag}>
                  <Skeleton width="56px" height="24px" />
                  <Skeleton width="56px" height="24px" />
                </div>

                <Skeleton width="172px" height="24px" />
                <Skeleton width="402px" height="68px" />
              </div>
            </div>
            <div className={styles.timeBox}>
              <Skeleton width="128px" height="28px" />
            </div>
          </>
        ))}
      </div>
    </div>
  );
}
