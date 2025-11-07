export const order = {
  desc: "desc",
  asc: "asc",
} as const;

export type Order = keyof typeof order;
