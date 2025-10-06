export const env = {
  API_BASE_URL: import.meta.env.VITE_API_BASE_URL || "",
  MODE: import.meta.env.MODE,
  DEV: import.meta.env.DEV,
  PROD: import.meta.env.PROD,
} as const;
