import { Flex, Text } from "@radix-ui/themes";
import type { LoadingStep } from "./constants";
import * as styles from "./index.css";
import { JobState } from "./job-state";

interface LoadingStepItemProps {
  step: LoadingStep;
  completed: boolean;
}

export const LoadingStepItem = ({ step, completed }: LoadingStepItemProps) => {
  const Icon = step.icon;

  return (
    <Flex justify="between" align="center">
      <Flex align="center" gap="3">
        <div className={styles.iconBox({ type: step.iconType })}>
          <Icon weight="fill" />
        </div>
        <Text size="2">{step.label}</Text>
      </Flex>
      <JobState completed={completed} />
    </Flex>
  );
};
