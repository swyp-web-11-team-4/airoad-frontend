import { infiniteQueryOptions, queryOptions } from "@tanstack/react-query";
import { type Field, field } from "@/pages/travel-list/config";
import { createTravelSort } from "@/pages/travel-list/lib/sort";
import type { ApiErrorResponse } from "@/shared/type";
import { getTripsList } from "../api/trips.api";
import type { GetTripsResponse, Trip } from "../model/trips.model";

export const tripsQueries = {
  all: () => ["trips"] as const,
  list: (sort = field.createdAt, size = 20) =>
    queryOptions({
      queryKey: ["trips", "list", sort, size],
      queryFn: () => getTripsList(undefined, createTravelSort(sort), size),
      select: (res) => res.data.content,
    }),
  infinite: (sort: Field, size: number) =>
    infiniteQueryOptions<
      GetTripsResponse,
      ApiErrorResponse,
      Trip[],
      (string | number)[],
      number | null
    >({
      queryKey: ["trips", "infinite", sort, size],
      initialPageParam: null,
      queryFn: ({ pageParam }) => getTripsList(pageParam, createTravelSort(sort), size),
      getNextPageParam: (last) => {
        if (!last.data.hasNext) return undefined;
        return last.data.nextCursor;
      },
      select: (data) => data.pages.flatMap((page) => page.data.content),
    }),
};
