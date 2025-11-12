import { ArrowUpIcon } from "@radix-ui/react-icons";
import { Flex, IconButton } from "@radix-ui/themes";
import { type ChangeEvent, type FormEventHandler, type KeyboardEvent, useState } from "react";

import * as styles from "./index.css";

interface ChatFormProps {
  disabled?: boolean;
  onSubmit: FormEventHandler<HTMLFormElement>;
}

export const ChatForm = ({ disabled, onSubmit }: ChatFormProps) => {
  const [isValid, setIsValid] = useState(false);

  const handleValid = ({ target: { value } }: ChangeEvent<HTMLTextAreaElement>) => {
    if (value.trim()) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey && !event.nativeEvent.isComposing) {
      event.preventDefault();
      event.currentTarget.form?.requestSubmit();
    }
  };

  return (
    <form
      className={styles.wrapper}
      onSubmit={(event) => {
        onSubmit(event);
        setIsValid(false);
      }}
      aria-disabled={disabled}
    >
      <textarea
        name="chat"
        className={styles.textarea}
        placeholder="무엇이든 물어보세요"
        onKeyDown={handleKeyDown}
        onChange={handleValid}
      />
      <Flex justify="end">
        <IconButton
          size="2"
          variant="solid"
          color="indigo"
          radius="full"
          type="submit"
          disabled={disabled || !isValid}
        >
          <ArrowUpIcon width={16} height={16} />
        </IconButton>
      </Flex>
    </form>
  );
};
