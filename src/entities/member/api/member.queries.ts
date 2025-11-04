import { type UseQueryOptions, useQuery } from "@tanstack/react-query";
import type { GetMeResponse } from "../model";
import { getMe } from "./member.api";

export const memberQueries = {
  all: () => ["members"],
  me: () => [...memberQueries.all(), "me"],
};

export const useMeQuery = (options?: Omit<UseQueryOptions<GetMeResponse>, "queryKey">) => {
  return useQuery({ queryKey: memberQueries.me(), queryFn: getMe, ...options });
};
