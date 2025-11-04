import { infiniteQueryOptions, queryOptions } from "@tanstack/react-query";
<<<<<<< HEAD
import { type Field, field } from "@/pages/trip-list/config";
import { createTripSort } from "@/pages/trip-list/lib/sort";
=======
import { type Field, field } from "@/pages/travel-list/config";
import { createTravelSort } from "@/pages/travel-list/lib/sort";
>>>>>>> 115c321 (feat: 에러 바운더리 추가 및 데이터 복합 컴포넌트 추가)
import type { ApiErrorResponse } from "@/shared/type";
import { getTripsList } from "../api/trips.api";
import type { GetTripsResponse, Trip } from "../model/trips.model";

export const tripsQueries = {
  all: () => ["trips"] as const,
  list: (sort = field.createdAt, size = 20) =>
    queryOptions({
      queryKey: ["trips", "list", sort, size],
<<<<<<< HEAD
      queryFn: () => getTripsList(undefined, createTripSort(sort), size),
=======
      queryFn: () => getTripsList(undefined, createTravelSort(sort), size),
>>>>>>> 115c321 (feat: 에러 바운더리 추가 및 데이터 복합 컴포넌트 추가)
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
<<<<<<< HEAD
      queryFn: ({ pageParam }) => getTripsList(pageParam, createTripSort(sort), size),
=======
      queryFn: ({ pageParam }) => getTripsList(pageParam, createTravelSort(sort), size),
>>>>>>> 115c321 (feat: 에러 바운더리 추가 및 데이터 복합 컴포넌트 추가)
      getNextPageParam: (last) => {
        if (!last.data.hasNext) return undefined;
        return last.data.nextCursor;
      },
      select: (data) => data.pages.flatMap((page) => page.data.content),
    }),
};
