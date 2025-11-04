import type { ApiResponse, TokenData } from "@/shared/type";

export type RefreshAccessTokenRequest = Pick<TokenData, "refreshToken">;

export type RefreshAccessTokenResponse = ApiResponse<TokenData>;
