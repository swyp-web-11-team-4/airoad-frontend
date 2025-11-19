import { style } from "@vanilla-extract/css";

export const content = style({
  display: "flex",
  flexDirection: "column",
  gap: 16,
  width: "100%",
  padding: "16px 14px",
  border: "1px solid var(--gray-a4)",
  borderRadius: "var(--radius-6)",
});

export const loadingImage = style({
  width: "100%",
  borderRadius: "var(--radius-6)",
});
