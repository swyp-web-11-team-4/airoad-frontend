import { ArrowUpIcon } from "@radix-ui/react-icons";
import { Flex, IconButton } from "@radix-ui/themes";
import type { FormEventHandler } from "react";
import * as styles from "./index.css";

interface ChatFormProps {
  onSubmit: FormEventHandler<HTMLFormElement>;
}

export const ChatForm = ({ onSubmit }: ChatFormProps) => {
  return (
    <form className={styles.wrapper} onSubmit={onSubmit}>
      <textarea name="chat" className={styles.textarea} placeholder="무엇이든 물어보세요" />
      <Flex justify="end">
        <IconButton size="2" variant="solid" color="indigo" radius="full" type="submit">
          <ArrowUpIcon width={16} height={16} />
        </IconButton>
      </Flex>
    </form>
  );
};
