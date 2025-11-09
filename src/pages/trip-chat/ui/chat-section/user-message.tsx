import { Avatar, Flex, Text } from "@radix-ui/themes";

import * as styles from "./user-message.css";

interface UserMessageProps {
  text: string;
}

export const UserMessage = ({ text }: UserMessageProps) => {
  return (
    <Flex align="end" direction="column" gap="10px">
      <Avatar radius="full" fallback="U" className={styles.avatar} />
      <div className={styles.messageBubble}>
        <Text size="3" weight="regular">
          {text}
        </Text>
      </div>
    </Flex>
  );
};
