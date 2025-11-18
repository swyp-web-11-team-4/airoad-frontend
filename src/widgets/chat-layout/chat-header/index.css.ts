import { style } from "@vanilla-extract/css";

export const logo = style({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "var(--space-7)",
  height: "var(--space-7)",
  borderRadius: "var(--radius-4)",
  backgroundColor: "#DBEFFF",
  border: "none",
});

export const infoList = style({
  display: "flex",
  alignItems: "center",
  padding: "var(--space-1) var(--space-2)",
  border: "1px solid var(--gray-5)",
  borderRadius: "var(--radius-thumb)",
});

export const info = style({
  padding: "var(--space-1) var(--space-3)",
  borderRight: "1px solid var(--gray-5)",
  selectors: {
    "&:last-of-type": {
      border: "none",
    },
  },
});
