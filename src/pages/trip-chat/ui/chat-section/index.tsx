import { Flex, Text } from "@radix-ui/themes";
import { type FormEventHandler, useEffect } from "react";
import { useChatStore } from "@/entities/chats/model";
import type { useTripPlanStreams } from "@/entities/trips/model";
import { ChatForm } from "../chat-form";
import { ChatList } from "../chat-list";

interface ChatSectionProps {
  sendMessage: ReturnType<typeof useTripPlanStreams>["sendMessage"];
}

export const ChatSection = ({ sendMessage }: ChatSectionProps) => {
  const reset = useChatStore((state) => state.reset);
  const scheduledPlaceRefList = useChatStore((state) => state.scheduledPlaceRefList);
  const resetScheduledPlaceRefList = useChatStore((state) => state.resetScheduledPlaceRefList);

  const submitMessage: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    const value = new FormData(event.currentTarget).get("chat");

    if (typeof value === "string" && value.trim()) {
      sendMessage(value, "TEXT", {
        scheduledPlaceIdList: scheduledPlaceRefList.map(({ id }) => id),
      });
      event.currentTarget.reset();
      resetScheduledPlaceRefList();
    }
  };

  useEffect(() => reset, [reset]);

  return (
    <Flex direction="column" width="588px">
      <ChatList />
      <Flex direction="column" px="20px" pb="4" gap="4">
        <ChatForm onSubmit={submitMessage} />
        <Text color="gray" size="1" weight="regular" align="center">
          더 정확한 여행을 위해, 중요한 정보는 한 번 더 확인해주세요.
        </Text>
      </Flex>
    </Flex>
  );
};
