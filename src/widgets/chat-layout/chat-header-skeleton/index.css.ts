import { style } from "@vanilla-extract/css";

export const skeletonLogo = style({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "var(--space-7)",
  height: "var(--space-7)",
  borderRadius: "var(--radius-4)",
  backgroundColor: "#DBEFFF",
});

export const skeletonInfoList = style({
  display: "flex",
  alignItems: "center",
});
