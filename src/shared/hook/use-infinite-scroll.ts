import { useEffect, useRef } from "react";

interface UseInfiniteScrollOptions {
  hasNextPage: boolean;
  fetchNextPage: () => Promise<unknown>;
  isFetchingNextPage: boolean;
  rootMargin?: string;
  threshold?: number;
  onBeforeFetch?: (container: HTMLElement) => { scrollHeight: number; scrollTop: number };
  onAfterFetch?: (
    container: HTMLElement,
    beforeState: { scrollHeight: number; scrollTop: number },
  ) => void;
}

export const useInfiniteScroll = ({
  hasNextPage,
  fetchNextPage,
  isFetchingNextPage,
  rootMargin = "100px 0px 0px 0px",
  threshold = 0,
  onBeforeFetch,
  onAfterFetch,
}: UseInfiniteScrollOptions) => {
  const sentinelRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const fetchNextPageRef = useRef(fetchNextPage);
  const isFetchingRef = useRef(isFetchingNextPage);

  fetchNextPageRef.current = fetchNextPage;
  isFetchingRef.current = isFetchingNextPage;

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
