import { ArrowUpIcon } from "@radix-ui/react-icons";
import { Flex, Grid, IconButton } from "@radix-ui/themes";
import { type ChangeEvent, type FormEventHandler, type KeyboardEvent, useState } from "react";
import { useChatStore } from "@/entities/chats/model";
import { ScheduledPlaceRef } from "@/entities/chats/ui";
import { useChatSection } from "../../model";
import * as styles from "./index.css";

interface ChatFormProps {
  onSubmit: FormEventHandler<HTMLFormElement>;
}

export const ChatForm = ({ onSubmit }: ChatFormProps) => {
  const [isValid, setIsValid] = useState(false);

  const scheduledPlaceRefList = useChatStore((state) => state.scheduledPlaceRefList);
  const { isChatLoading, isScheduleCreating } = useChatSection();

  const disabled = isScheduleCreating || isChatLoading || !isValid;

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
      {scheduledPlaceRefList.length > 0 && (
        <Grid
          className={styles.refList}
          rows={scheduledPlaceRefList.length > 2 ? "2" : "1"}
          columns="2"
          gap="1"
        >
          {scheduledPlaceRefList.map((scheduledPlaceRef) => (
            <ScheduledPlaceRef key={scheduledPlaceRef.id} {...scheduledPlaceRef} />
          ))}
        </Grid>
      )}
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
          disabled={disabled}
        >
          <ArrowUpIcon width={16} height={16} />
        </IconButton>
      </Flex>
    </form>
  );
};
