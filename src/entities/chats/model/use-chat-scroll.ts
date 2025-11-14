import { useCallback, useEffect, useRef, useState } from "react";

const SCROLL_THRESHOLD = 1;

interface UseChatScrollOptions<T extends HTMLElement> {
  enabled?: boolean;
  onScrollToBottom?: () => void;
  containerRef?: React.RefObject<T | null>;
}

interface UseChatScrollReturn<T extends HTMLElement> {
  containerRef: React.RefObject<T | null>;
  isAtBottom: boolean;
  showScrollButton: boolean;
  scrollToBottom: () => void;
  checkIfAtBottom: () => boolean;
  handleNewMessage: (options: { isUserMessage: boolean; isAssistantMessage: boolean }) => void;
}

export const useChatScroll = <T extends HTMLElement = HTMLDivElement>({
  enabled = true,
  onScrollToBottom,
  containerRef: externalContainerRef,
}: UseChatScrollOptions<T> = {}): UseChatScrollReturn<T> => {
  const internalContainerRef = useRef<T>(null);
  const containerRef = externalContainerRef || internalContainerRef;
  const [isAtBottom, setIsAtBottom] = useState(true);
  const [showScrollButton, setShowScrollButton] = useState(false);

  // biome-ignore lint/correctness/useExhaustiveDependencies: Return type by `useRef` Hook
  const checkIfAtBottom = useCallback(() => {
    const container = containerRef.current;
    if (!container) return false;

    const { scrollTop, scrollHeight, clientHeight } = container;
    const distanceFromBottom = scrollHeight - scrollTop - clientHeight;

    return distanceFromBottom < SCROLL_THRESHOLD;
  }, []);

  // biome-ignore lint/correctness/useExhaustiveDependencies: Return type by `useRef` Hook
  const scrollToBottom = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    container.scrollTo({
      top: container.scrollHeight,
    });
    setIsAtBottom(true);
    setShowScrollButton(false);
    onScrollToBottom?.();
  }, [onScrollToBottom]);

  const handleNewMessage = useCallback(
    ({
      isUserMessage,
      isAssistantMessage,
    }: {
      isUserMessage: boolean;
      isAssistantMessage: boolean;
    }) => {
      if (isUserMessage) {
        scrollToBottom();
      } else if (isAtBottom) {
        scrollToBottom();
      } else if (isAssistantMessage && !showScrollButton) {
        setShowScrollButton(true);
      }
    },
    [isAtBottom, showScrollButton, scrollToBottom],
  );

  // biome-ignore lint/correctness/useExhaustiveDependencies: Return type by `useRef` Hook
  useEffect(() => {
    if (!enabled) return;

    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const atBottom = checkIfAtBottom();
      setIsAtBottom(atBottom);

      if (atBottom) {
        setShowScrollButton(false);
      }
    };

    container.addEventListener("scroll", handleScroll);
    return () => {
      container.removeEventListener("scroll", handleScroll);
    };
  }, [enabled, checkIfAtBottom]);

  return {
    containerRef,
    isAtBottom,
    showScrollButton,
    scrollToBottom,
    checkIfAtBottom,
    handleNewMessage,
  };
};
