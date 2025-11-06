import { API_PATHS } from "@/shared/config";
import { api } from "@/shared/lib";
import type { RefreshAccessTokenRequest, RefreshAccessTokenResponse } from "../model/auth.dto";

export const refreshAccessToken = async ({ refreshToken }: RefreshAccessTokenRequest) => {
  const { data } = await api.post<RefreshAccessTokenResponse>(API_PATHS.AUTH.REISSUE._, {
    refreshToken,
  });
  return data;
};

export const logout = async () => {
  const { data } = await api.post(API_PATHS.AUTH.LOGOUT._);
  return data;
};
