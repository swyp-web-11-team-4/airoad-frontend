import { style } from "@vanilla-extract/css";

export const wrapper = style({
  display: "flex",
  alignItems: "center",
  gap: "var(--space-2)",
  paddingInline: "var(--space-2)",
  paddingBlock: 6,
  border: "1px solid var(--gray-a6)",
  borderRadius: "var(--radius-4)",
  background: "var(--white)",
});

export const img = style({
  width: 40,
  height: 40,
  borderRadius: "var(--radius-2)",
  aspectRatio: "1/1",
  objectFit: "cover",
  background: "var(--gray-6)",
});

export const name = style({
  maxWidth: 170,
  textOverflow: "ellipsis",
  overflow: "hidden",
  whiteSpace: "nowrap",
});

export const button = style({
  background: "var(--white)",
  border: "none",
  outline: "none",
  cursor: "pointer",
});
