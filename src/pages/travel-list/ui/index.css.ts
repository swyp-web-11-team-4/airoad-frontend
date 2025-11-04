import { style } from "@vanilla-extract/css";

export const logBox = style({
  display: "flex",
  flexDirection: "column",
  gap: "16px",
  padding: "60px 80px",
  width: "100%",
  height: "100dvh",
});
export const titleBox = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
});

export const orderBox = style({
  width: "160px",
});

export const selectBox = style({
  width: "120px",
});
