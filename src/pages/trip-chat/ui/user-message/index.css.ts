import { style } from "@vanilla-extract/css";

export const avatar = style({
  width: 36,
  height: 36,
});

export const messageBubble = style({
  padding: "8px 16px",
  borderRadius: "var(--radius-5)",
  background: "var(--accent-3)",
});
