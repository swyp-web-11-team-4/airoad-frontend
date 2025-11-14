import { useEffect, useRef } from "react";

interface UseInfiniteScrollOptions<TContainer extends HTMLElement, TSentinel extends HTMLElement> {
  hasNextPage: boolean;
  fetchNextPage: () => Promise<unknown>;
  isFetchingNextPage: boolean;
  rootMargin?: string;
  threshold?: number;
  containerRef?: React.RefObject<TContainer | null>;
  sentinelRef?: React.RefObject<TSentinel | null>;
  onBeforeFetch?: (container: TContainer) => { scrollHeight: number; scrollTop: number };
  onAfterFetch?: (
    container: TContainer,
    beforeState: { scrollHeight: number; scrollTop: number },
  ) => void;
}

export const useInfiniteScroll = <
  TContainer extends HTMLElement = HTMLDivElement,
  TSentinel extends HTMLElement = HTMLDivElement,
>({
  hasNextPage,
  fetchNextPage,
  isFetchingNextPage,
  rootMargin = "100px 0px 0px 0px",
  threshold = 0,
  containerRef: externalContainerRef,
  sentinelRef: externalSentinelRef,
  onBeforeFetch,
  onAfterFetch,
}: UseInfiniteScrollOptions<TContainer, TSentinel>) => {
  const internalSentinelRef = useRef<TSentinel>(null);
  const internalContainerRef = useRef<TContainer>(null);
  const sentinelRef = externalSentinelRef || internalSentinelRef;
  const containerRef = externalContainerRef || internalContainerRef;
  const fetchNextPageRef = useRef(fetchNextPage);
  const isFetchingRef = useRef(isFetchingNextPage);

  fetchNextPageRef.current = fetchNextPage;
  isFetchingRef.current = isFetchingNextPage;

  // biome-ignore lint/correctness/useExhaustiveDependencies: Return type by `useRef` Hook
  useEffect(() => {
    const sentinel = sentinelRef.current;
    const container = containerRef.current;

    if (!sentinel || !container || !hasNextPage) return;

    const observer = new IntersectionObserver(
      async (entries) => {
        const [entry] = entries;

        if (entry.isIntersecting && !isFetchingRef.current && fetchNextPageRef.current) {
          isFetchingRef.current = true;

          try {
            const beforeState = onBeforeFetch?.(container) || {
              scrollHeight: container.scrollHeight,
              scrollTop: container.scrollTop,
            };

            await fetchNextPageRef.current();

            requestAnimationFrame(() => {
              if (onAfterFetch) {
                onAfterFetch(container, beforeState);
              } else {
                const scrollDiff = container.scrollHeight - beforeState.scrollHeight;
                container.scrollTop = beforeState.scrollTop + scrollDiff;
              }
            });
          } finally {
            requestAnimationFrame(() => {
              isFetchingRef.current = false;
            });
          }
        }
      },
      {
        root: container,
        rootMargin,
        threshold,
      },
    );

    observer.observe(sentinel);

    return () => {
      observer.disconnect();
    };
  }, [hasNextPage, rootMargin, threshold, onBeforeFetch, onAfterFetch]);

  return { sentinelRef, containerRef };
};
