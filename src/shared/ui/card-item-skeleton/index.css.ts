import { style } from "@vanilla-extract/css";

export const skeletonBox = style({
  position: "relative",
  padding: "24px",
  display: "flex",
  flexDirection: "column",
  gap: "12px",
  cursor: "pointer",
});
export const skeletonImg = style({
  borderRadius: "12px",
  aspectRatio: "1 / 1",
});
export const skeletonData = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  gap: "4px",
});
