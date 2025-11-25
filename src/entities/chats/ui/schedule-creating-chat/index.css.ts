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

export const imageWrapper = style({
  position: "relative",
  width: 438,
  height: 140,
  borderRadius: "var(--radius-6)",
  overflowX: "hidden",
});

export const loadingImage = style({
  position: "absolute",
  width: "100%",
  height: "100%",
  objectFit: "cover",
  objectPosition: "center",
});
