import { Skeleton } from "@radix-ui/themes";
import { Fragment } from "react/jsx-runtime";
import * as styles from "./index.css";

export function ScheduleBoxSkeleton() {
  const days = Array.from({ length: 5 });

  return (
    <div className={styles.skeletonBox}>
      <div className={styles.skeletonHeader}>
        <Skeleton width="110px" height="28px" />
        <Skeleton width="180px" height="30px" />
        <Skeleton width="129px" height="20px" />
      </div>

      <div className={styles.skeletonDayContainer}>
        {days.map((_, idx) => (
          /* biome-ignore lint/suspicious/noArrayIndexKey: static skeleton, order won't change  */
          <Fragment key={idx}>
            <div className={styles.skeletonDayBox}>
              <Skeleton width="128px" height="128px" />
              <div className={styles.skeletonDayInfo}>
                <div className={styles.skeletonDayTag}>
                  <Skeleton width="56px" height="24px" />
                  <Skeleton width="56px" height="24px" />
                </div>

                <Skeleton width="172px" height="24px" />
                <Skeleton width="402px" height="68px" />
              </div>
            </div>
            <div className={styles.skeletonTimeBox}>
              <Skeleton width="128px" height="28px" />
            </div>
          </Fragment>
        ))}
      </div>
    </div>
  );
}
