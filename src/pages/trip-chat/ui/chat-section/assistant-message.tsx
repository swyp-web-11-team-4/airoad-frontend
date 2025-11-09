import { Flex } from "@radix-ui/themes";
import type { ReactNode } from "react";
import iconLogo from "@/shared/asset/icon-logo.png";

import * as styles from "./assistant-message.css";

interface AssistantMessageProps {
  content: ReactNode;
}

export const AssistantMessage = ({ content }: AssistantMessageProps) => {
  return (
    <Flex align="start" direction="column" gap="4" width="460px">
      <div className={styles.avatar}>
        <img src={iconLogo} alt="어시스턴트 이미지" />
      </div>
      {content}
    </Flex>
  );
};
