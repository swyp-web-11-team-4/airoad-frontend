import { Avatar, Flex, Text } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import { membersQueries } from "@/entities/members/model";
import defaultUserImage from "@/shared/asset/default-user.jpg";
import * as styles from "./index.css";

interface UserMessageProps {
  text: string;
  animate?: boolean;
}

export const UserMessage = ({ text, animate = false }: UserMessageProps) => {
  const { data: user } = useQuery(membersQueries.me());

  return (
    <Flex align="end" direction="column" gap="10px">
      <Avatar
        src={user?.imageUrl ?? defaultUserImage}
        radius="full"
        fallback={user?.name[0] ?? "U"}
        className={styles.avatar}
      />
      <div className={styles.messageBubble({ animate })}>
        <Text size="3" weight="regular" aria-label="사용자 메시지">
          {text}
        </Text>
      </div>
    </Flex>
  );
};
