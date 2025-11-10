import { style } from "@vanilla-extract/css";

export const avatar = style({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: 36,
  height: 36,
  borderRadius: 9999,
  background: "var(--accent-a3)",
});
