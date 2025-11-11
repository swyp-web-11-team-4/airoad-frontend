import { style } from "@vanilla-extract/css";

export const container = style({
  padding: "24px 0 24px 24px",
  display: "flex",
  gap: "16px",
  flex: 1,
  height: "100%",
  overflowX: "auto",
  background: "#ECF1FF",
});

export const box = style({
  display: "flex",
});
