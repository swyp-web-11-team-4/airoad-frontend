import { Avatar, Flex, Text } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import { memberQueries } from "@/entities/member/model";
import defaultUserImage from "@/shared/asset/default-user.jpg";
import * as styles from "./index.css";

interface UserMessageProps {
  text: string;
}

export const UserMessage = ({ text }: UserMessageProps) => {
  const { data: user } = useQuery(memberQueries.me());

  return (
    <Flex align="end" direction="column" gap="10px">
      <Avatar
        src={user?.imageUrl ?? defaultUserImage}
        radius="full"
        fallback={user?.name[0] ?? "U"}
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
