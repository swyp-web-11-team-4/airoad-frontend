import { XCircleIcon } from "@phosphor-icons/react";
import { Flex, Text } from "@radix-ui/themes";
import { type ScheduledPlaceRef as ScheduledPlaceRefType, useChatStore } from "../../model";
import * as styles from "./index.css";

export const ScheduledPlaceRef = ({
  id,
  name,
  dayNumber,
  category,
  imageUrl,
}: ScheduledPlaceRefType) => {
  const removeScheduledPlaceRef = useChatStore((state) => state.removeScheduledPlaceRef);
  return (
    <div className={styles.wrapper}>
      {imageUrl ? (
        <img className={styles.img} src={imageUrl} alt="태그 이미지" width={40} height={40} />
      ) : (
        <div className={styles.img} />
      )}

      <Flex gap="1" width="100%" align="start">
        <Flex direction="column" width="100%">
          <Text size="3" weight="regular" className={styles.name}>
            {name}
          </Text>
          <Text size="1" weight="regular" color="gray">
            {dayNumber}일차, {category}
          </Text>
        </Flex>

        <button className={styles.button} type="button" onClick={() => removeScheduledPlaceRef(id)}>
          <XCircleIcon width={16} height={16} />
        </button>
      </Flex>
    </div>
  );
};
