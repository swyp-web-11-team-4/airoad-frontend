import { infiniteQueryOptions, queryOptions } from "@tanstack/react-query";
import type { ApiErrorResponse } from "@/shared/type";
import { getTripsList } from "../api/trips.api";
import { type Field, field } from "../config/field";
import { createTripSort } from "../lib/sort";
import type { GetTripsResponse, Trip } from "../model/trips.model";

export const tripsQueries = {
  all: () => ["trips"] as const,
  lists: () => [...tripsQueries.all(), "list"] as const,
  list: (sort = field.createdAt, size = 20) =>
    queryOptions({
      queryKey: [...tripsQueries.lists(), sort, size],
      queryFn: () => getTripsList(undefined, createTripSort(sort), size),
      select: (res) => res.data.content,
    }),
  infinites: () => [...tripsQueries.all(), "infinite"] as const,
  infinite: (sort: Field, size: number) =>
    infiniteQueryOptions<
      GetTripsResponse,
      ApiErrorResponse,
      Trip[],
      (string | number)[],
      number | null
    >({
      queryKey: [...tripsQueries.infinites(), sort, size],
      initialPageParam: null,
      queryFn: ({ pageParam }) => getTripsList(pageParam, createTripSort(sort), size),
      getNextPageParam: (last) => {
        if (!last.data.hasNext) return undefined;
        return last.data.nextCursor;
      },
      select: (data) => data.pages.flatMap((page) => page.data.content),
    }),
};
