import { Button } from "@radix-ui/themes";
import type { ComponentProps } from "react";
import * as styles from "./index.css";

export const ScrollToBottomButton = ({
  className,
  ...props
}: Omit<ComponentProps<"button">, "color">) => {
  return (
    <div className={styles.container}>
      <Button className={`${styles.button} ${className}`} color="gray" variant="surface" {...props}>
        최근 메시지 확인
      </Button>
    </div>
  );
};
