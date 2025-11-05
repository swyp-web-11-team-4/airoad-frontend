import { isAxiosError } from "axios";
import type { ErrorCode } from "@/shared/config/error-code";
import type { ApiErrorResponse } from "@/shared/type";

export const getErrorCode = (e: unknown): ErrorCode | undefined =>
  isAxiosError<ApiErrorResponse>(e)
    ? e.response?.data.data.code
    : (e as ApiErrorResponse)?.data?.code;

export const getErrorMessage = (e: unknown): string =>
  isAxiosError<ApiErrorResponse>(e)
    ? (e.response?.data.data.message ?? "요청에 실패했습니다.")
    : ((e as ApiErrorResponse)?.data?.message ??
      (e instanceof Error ? e.message : "오류가 발생했습니다."));
