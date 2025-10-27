import { style } from "@vanilla-extract/css";

export const infoBox = style({
  width: "100%",
  height: "520px",
  background: " var(--Colors-Accent-Accent-2, #F5F6FE)",
  padding: "60px 160px",
  alignContent: "center",
  justifyContent: "space-between",
  display: "flex",
});
export const titleBox = style({
  display: "flex",
  flexDirection: "column",
  gap: "20px",
  justifyContent: "center",
});
export const subtitleBox = style({
  display: "flex",
  flexDirection: "column",
  gap: "8px",
});

export const imgBox = style({
  width: "400px",
  height: "400px",
});
