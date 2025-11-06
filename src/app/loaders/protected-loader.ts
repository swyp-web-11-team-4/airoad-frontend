import type { QueryClient } from "@tanstack/react-query";
import { type LoaderFunctionArgs, redirect } from "react-router";
import { useAuthStore } from "@/entities/auth/model";
import { getMe, memberQueries } from "@/entities/member/api";
import { PAGE_ROUTES, SESSION_STORAGE_KEYS } from "@/shared/config";

export const createProtectedLoader =
  (queryClient: QueryClient) =>
  async ({ request }: LoaderFunctionArgs) => {
    const accessToken = useAuthStore.getState().accessToken;

    const url = new URL(request.url);

    if (!accessToken) {
      sessionStorage.setItem(SESSION_STORAGE_KEYS.AUTH_REDIRECT_TARGET, url.pathname + url.search);
      throw redirect(PAGE_ROUTES.ROOT);
    }

    try {
      await queryClient.ensureQueryData({ queryKey: memberQueries.me(), queryFn: getMe });
    } catch {
      throw redirect(PAGE_ROUTES.ROOT);
    }
  };
