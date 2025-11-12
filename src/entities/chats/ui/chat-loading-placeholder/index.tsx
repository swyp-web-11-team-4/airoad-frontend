import { Flex, Text } from "@radix-ui/themes";
import { JobState } from "../job-state";

export const ChatLoadingPlaceholder = () => {
  return (
    <Flex gap="2" align="center">
      <Text size="3" color="gray" weight="regular">
        응답을 생성하는 중
      </Text>
      <JobState />
    </Flex>
  );
};
