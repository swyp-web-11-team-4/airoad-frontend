export const ERROR_CODE = {
  AUTH002: "AUTH002",
} as const;

export type ErrorCode = keyof typeof ERROR_CODE;

export const ERROR_MESSAGE: Record<ErrorCode, string> = {
  AUTH002: "로그인이 만료되었습니다. 다시 로그인해주세요.",
};
