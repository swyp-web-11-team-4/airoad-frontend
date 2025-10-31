import { queryOptions } from "@tanstack/react-query";
import { getTripsList } from "../api/trips.api";

export const tripsQueries = {
  lists: () => ["trips"],
  list: () =>
    queryOptions({
      queryKey: tripsQueries.lists(),
      queryFn: () => getTripsList(),
      select: (res) => res.data.content,
    }),
};
