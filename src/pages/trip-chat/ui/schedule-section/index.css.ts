import { style } from "@vanilla-extract/css";

export const container = style({
  display: "flex",
  flexDirection: "column",
  height: "100%",
  width: "49.2%",
  minWidth: "576px",
});

export const box = style({
  overflowY: "auto",
  height: "calc(100% - 69px)",
});

export const tabContainer = style({
  width: "100%",
  height: "100%",
});
