import { style } from "@vanilla-extract/css";

export const container = style({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  width: "100%",
  height: 54,
  paddingInline: 40,
  borderBottom: "1px solid var(--gray-4)",
  backgroundColor: "var(--color-background)",
});
