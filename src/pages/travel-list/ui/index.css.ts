import { style } from "@vanilla-extract/css";

export const logBox = style({
  display: "flex",
  flexDirection: "column",
  gap: "16px",
  padding: "60px 80px",
  width: "100%",
});
export const titleBox = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
});

export const orderBox = style({
  width: "160px",
});

export const cardContainer = style({
  display: "grid",
  gridTemplateColumns: "repeat(4, 1fr)",
  gap: "24px",
  width: "100%",
});
export const selectBox = style({
  width: "120px",
});

export const buttonBox = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  gap: "8px",
});
