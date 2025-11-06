import { style } from "@vanilla-extract/css";
import { mediaQuery } from "@/shared/styles";

export const infoBox = style({
  width: "100%",
  height: "520px",
  background: " var(--Colors-Accent-Accent-2, #F5F6FE)",
  padding: "60px 160px",
  alignContent: "center",
  justifyContent: "space-between",
  display: "flex",
  "@media": {
    [mediaQuery.tablet]: {
      flexDirection: "column",
      height: "auto",
      padding: "60px",
      justifyContent: "center",
    },
  },
});
export const titleBox = style({
  display: "flex",
  flexDirection: "column",
  gap: "20px",
  justifyContent: "center",

  "@media": {
    [mediaQuery.tablet]: {
      textAlign: "center",
    },
  },
});
export const subtitleBox = style({
  display: "flex",
  flexDirection: "column",
  gap: "8px",
});

export const imgBox = style({
  width: "400px",
  height: "400px",
  "@media": {
    [mediaQuery.tablet]: {
      width: "auto",
      height: "auto",
    },
  },
});
