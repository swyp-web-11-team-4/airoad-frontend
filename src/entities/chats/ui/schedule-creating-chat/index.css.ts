import { style } from "@vanilla-extract/css";

export const content = style({
  display: "flex",
  flexDirection: "column",
  gap: 12,
  width: "100%",
  padding: "16px 14px",
  border: "1px solid var(--gray-a4)",
  borderRadius: "var(--radius-6)",
});
