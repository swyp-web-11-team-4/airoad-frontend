import { Avatar, Flex, Text } from "@radix-ui/themes";
import { useMeQuery } from "@/entities/member/api";
import defaultUserImage from "@/shared/asset/default-user.jpg";
import * as styles from "./user-message.css";

interface UserMessageProps {
  text: string;
}

export const UserMessage = ({ text }: UserMessageProps) => {
  const { data: user } = useMeQuery();

  return (
    <Flex align="end" direction="column" gap="10px">
      <Avatar
        src={user?.data.imageUrl ?? defaultUserImage}
        radius="full"
        fallback={user?.data.name[0] ?? "U"}
        className={styles.avatar}
      />
      <div className={styles.messageBubble}>
        <Text size="3" weight="regular" aria-label="사용자 메시지">
          {text}
        </Text>
      </div>
    </Flex>
  );
};
