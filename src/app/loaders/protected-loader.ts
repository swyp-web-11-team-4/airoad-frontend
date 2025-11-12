import type { QueryClient } from "@tanstack/react-query";
import { type LoaderFunctionArgs, redirect } from "react-router";
import { useAuthStore } from "@/entities/auth/model";
import { membersQueries } from "@/entities/members/model";
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
      await queryClient.ensureQueryData(membersQueries.me());
    } catch {
      throw redirect(PAGE_ROUTES.ROOT);
    }
  };
