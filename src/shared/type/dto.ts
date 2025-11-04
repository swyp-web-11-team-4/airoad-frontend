import type { ERROR_CODE } from "../config";

export type ApiResponse<D extends object> = {
  success: boolean;
  status: number;
  data: D;
};

export interface ApiError {
  code: (typeof ERROR_CODE)[keyof typeof ERROR_CODE];
  message: string;
  path: string;
  timestamp: string;
}

export type ApiErrorResponse = ApiResponse<ApiError>;
