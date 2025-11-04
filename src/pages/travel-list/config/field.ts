export const field = {
  createdAt: "createdAt",
  startDate: "startDate",
} as const;

export type Field = keyof typeof field;
