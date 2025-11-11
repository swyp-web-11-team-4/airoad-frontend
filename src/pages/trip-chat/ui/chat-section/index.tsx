import { Flex, Text } from "@radix-ui/themes";
import { AssistantMessage } from "../assistant-message";
import { ChatInput } from "../chat-input";
import { UserMessage } from "../user-message";

export const ChatSection = () => {
  return (
    <Flex gap="5" direction="column" width="588px">
      <Flex gap="5" direction="column" pl="20px" pr="8px">
        <AssistantMessage content="이런 일정이 있어요! 이런 일정이 있어요!이런 일정이 있어요!이런 일정이 있어요!이런 일정이 있어요!이런 일정이 있어요!이런 일정이 있어요!이런 일정이 있어요!이런 일정이 있어요!이런 일정이 있어요!이런 일정이 있어요!이런 일정이 있어요!이런 일정이 있어요!이런 일정이 있어요!이런 일정이 있어요!이런 일정이 있어요!이런 일정이 있어요!이런 일정이 있어요!이런 일정이 있어요!이런 일정이 있어요!이런 일정이 있어요!이런 일정이 있어요!" />
        <UserMessage text="내가 선택한 일정 다른걸로 바꿔줘!" />
      </Flex>
      <Flex direction="column" px="20px" pb="4" gap="4">
        <ChatInput />
        <Text color="gray" size="1" weight="regular" align="center">
          더 정확한 여행을 위해, 중요한 정보는 한 번 더 확인해주세요.
        </Text>
      </Flex>
    </Flex>
  );
};
