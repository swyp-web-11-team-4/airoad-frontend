import { style } from "@vanilla-extract/css";

export const buttonBox = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  gap: "8px",
});

export const cardContainer = style({
  display: "grid",
  gridTemplateColumns: "repeat(4, 1fr)",
  gap: "24px",
  width: "100%",
});
