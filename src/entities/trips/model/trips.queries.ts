import { infiniteQueryOptions, queryOptions } from "@tanstack/react-query";
import type { ApiErrorResponse } from "@/shared/type";
import { getTripsList } from "../api/trips.api";
import type { GetTripsResponse, Trip } from "../model/trips.model";

export const tripsQueries = {
  all: () => ["trips"] as const,

  list: (sort = "createdAt:desc", size = 20) =>
    queryOptions({
      queryKey: ["trips", "list", sort, size],
      queryFn: () => getTripsList(undefined, sort, size),
      select: (res) => res.data.content,
    }),

  infinite: (sort = "createdAt:desc", size = 20) =>
    infiniteQueryOptions<
      GetTripsResponse,
      ApiErrorResponse,
      Trip[],
      (string | number)[],
      number | null
    >({
      queryKey: ["trips", "infinite", sort, size],
      initialPageParam: null,
      queryFn: ({ pageParam }) => getTripsList(pageParam, sort, size),
      getNextPageParam: (last) =>
        last.data.hasNext ? (last.data.nextCursor ?? undefined) : undefined,
      select: (data) => data.pages.flatMap((page) => page.data.content),
    }),
};
