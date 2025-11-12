import { Flex, Text } from "@radix-ui/themes";
import { LOADING_STEPS, useLoadingProgress } from "@/entities/chats/model";
import { LoadingStepItem } from "../loading-step-item";
import * as styles from "./index.css";

interface ScheduleCreatingChatProps {
  isCompleted?: boolean;
}

export const ScheduleCreatingChat = ({ isCompleted = false }: ScheduleCreatingChatProps) => {
  const { currentStep } = useLoadingProgress({ isCompleted });

  return (
    <Flex direction="column" gap="2" width="100%">
      <Text size="3" weight="regular">
        일정을 생성중 입니다..
      </Text>

      <div className={styles.content}>
        {LOADING_STEPS.map((step, index) => (
          <LoadingStepItem key={step.id} step={step} completed={currentStep > index} />
        ))}
      </div>
    </Flex>
  );
};
