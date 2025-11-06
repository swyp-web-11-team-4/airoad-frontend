import { Card, Flex, Skeleton } from "@radix-ui/themes";
import * as styles from "./index.css";

export function CardItemSkeleton({ size = 4 }: { size?: number }) {
  return (
    <>
      {Array.from({ length: size }).map((_, idx) => (
        /* biome-ignore lint/suspicious/noArrayIndexKey: static skeleton, order won't change */
        <Card key={idx} size="2" className={styles.skeletonBox}>
          <Skeleton width="100%" height="242px" className={styles.skeletonImg} />
          <Flex direction="column" gap="2" className={styles.skeletonData}>
            <Skeleton width="100%" height="26px" />
            <Skeleton width="40%" height="18px" />
            <Skeleton width="40%" height="18px" />
          </Flex>
        </Card>
      ))}
    </>
  );
}
