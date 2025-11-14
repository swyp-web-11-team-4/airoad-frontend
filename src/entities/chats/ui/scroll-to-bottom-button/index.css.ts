import { style } from "@vanilla-extract/css";

export const container = style({
  position: "absolute",
  bottom: "24px",
  left: "50%",
  transform: "translateX(-50%)",
  zIndex: 10,
});

export const button = style({
  borderRadius: 9999,
});
