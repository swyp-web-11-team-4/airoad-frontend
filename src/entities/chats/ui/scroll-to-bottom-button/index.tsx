import { Button } from "@radix-ui/themes";
import type { ComponentProps } from "react";
import * as styles from "./index.css";

export const ScrollToBottomButton = ({ onClick }: ComponentProps<"button">) => {
  return (
    <div className={styles.container}>
      <Button className={styles.button} color="gray" variant="surface" onClick={onClick}>
        최근 메시지 확인
      </Button>
    </div>
  );
};
