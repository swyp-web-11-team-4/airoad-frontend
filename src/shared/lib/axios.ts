import axios, { type AxiosError } from "axios";
import { useAuthStore } from "@/entities/auth/model/auth.store";
import { API_PATHS, env } from "@/shared/config";
import type { ApiErrorResponse, TokenData } from "../type";

type FailedRequestTokenData = Pick<TokenData, "accessToken">;

interface FailedRequest {
  resolve: (tokenData: FailedRequestTokenData) => void;
  reject: (error: unknown) => void;
}

let isRefreshing = false;
let queue: FailedRequest[] = [];

const processQueue = (error: unknown, tokenData: FailedRequestTokenData | null) => {
  queue.forEach((p) => {
    if (error) p.reject(error);
    else if (tokenData) p.resolve(tokenData);
  });
  queue = [];
};

export const api = axios.create({
  baseURL: env.API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

api.interceptors.request.use(
  (config) => {
    const accessToken = useAuthStore.getState().accessToken;

    if (!config.url?.includes(API_PATHS.AUTH.REISSUE._) && accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError<ApiErrorResponse>) => {
    const originalRequest = error.config;

    if (
      error.response?.status !== 401 ||
      originalRequest?.url?.includes(API_PATHS.AUTH.REISSUE._)
    ) {
      return Promise.reject(error);
    }

    if (isRefreshing && originalRequest) {
      return new Promise<FailedRequestTokenData>((resolve, reject) => {
        queue.push({ resolve, reject });
      }).then((tokenData) => {
        originalRequest.headers.Authorization = `Bearer ${tokenData.accessToken}`;
        return api(originalRequest);
      });
    }

    isRefreshing = true;

    try {
      const reissue = useAuthStore.getState().reissue;

      if (originalRequest) {
        const newTokenData = await reissue();

        api.defaults.headers.common.Authorization = `Bearer ${newTokenData.accessToken}`;

        processQueue(null, newTokenData);

        originalRequest.headers.Authorization = `Bearer ${newTokenData.accessToken}`;

        return api(originalRequest);
      }
    } catch (err) {
      processQueue(err, null);
      return Promise.reject(err);
    } finally {
      isRefreshing = false;
    }
  },
);
