import { Select, Text } from "@radix-ui/themes";

import { useState } from "react";
import type { Field } from "@/entities/trips/config";
import { field } from "@/entities/trips/config/field";
import * as styles from "./index.css";
import TarvelCardList from "./trip-card-list";

export default function TripList() {
  const [sortParam, setSortParam] = useState<Field>(field.createdAt);

  return (
    <div className={styles.logBox}>
      <div className={styles.titleBox}>
        <Text size="6" weight="bold">
          여행 계획 목록
        </Text>

        <Select.Root value={sortParam} onValueChange={(value: Field) => setSortParam(value)}>
          <Select.Trigger className={styles.selectBox} />
          <Select.Content variant="soft" color="gray">
            <Select.Item value={field.createdAt}>최신순</Select.Item>
            <Select.Item value={field.startDate}>날짜순</Select.Item>
          </Select.Content>
        </Select.Root>
      </div>
      <TarvelCardList sortParam={sortParam} />
    </div>
  );
}
