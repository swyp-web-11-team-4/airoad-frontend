import { ArrowUpIcon } from "@radix-ui/react-icons";
import { Flex, IconButton } from "@radix-ui/themes";
import * as styles from "./chat-input.css";

export const ChatInput = () => {
  return (
    <div className={styles.wrapper}>
      <textarea className={styles.textarea} placeholder="무엇이든 물어보세요" />
      <Flex justify="end">
        <IconButton size="2" variant="solid" color="indigo" radius="full">
          <ArrowUpIcon width={16} height={16} />
        </IconButton>
      </Flex>
    </div>
  );
};
