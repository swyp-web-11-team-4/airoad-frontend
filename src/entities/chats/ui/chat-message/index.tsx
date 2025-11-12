import type { ChatMessage as ChatMessageType } from "../../model";
import { AssistantMessage } from "../assistant-message";
import { UserMessage } from "../user-message";

interface ChatMessageProps extends Pick<ChatMessageType, "content" | "messageType"> {
  animate?: boolean;
}

export const ChatMessage = ({ messageType, content, animate }: ChatMessageProps) => {
  switch (messageType) {
    case "ASSISTANT":
      return <AssistantMessage content={content} animate={animate} />;
    case "USER":
      return <UserMessage content={content} animate={animate} />;
    default:
      return null;
  }
};
