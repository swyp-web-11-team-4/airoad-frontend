import { Flex } from "@radix-ui/themes";
import type { ReactNode } from "react";
import ReactMarkdown, { type Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import iconLogo from "@/shared/asset/icon-logo.png";

import * as styles from "./index.css";

interface AssistantMessageProps {
  content: ReactNode;
}

export const AssistantMessage = ({ content }: AssistantMessageProps) => {
  return (
    <Flex align="start" direction="column" gap="4" width="460px">
      <div className={styles.avatar}>
        <img src={iconLogo} alt="어시스턴트 이미지" />
      </div>
      <Flex direction="column">
        {(() => {
          switch (typeof content) {
            case "string":
              return (
                <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
                  {content}
                </ReactMarkdown>
              );
            default:
              return content;
          }
        })()}
      </Flex>
    </Flex>
  );
};

const markdownComponents: Components = {
  ul: (props) => <ul className={styles.markdown.ul} {...props} />,
  ol: (props) => <ol className={styles.markdown.ol} {...props} />,
  li: (props) => <li className={styles.markdown.li} {...props} />,
  p: (props) => <p className={styles.markdown.p} {...props} />,
};
