import { style } from "@vanilla-extract/css";

export const wrapper = style({
  display: "flex",
  flexDirection: "column",
  padding: "16px 10px 12px",
  width: "100%",
  border: `1px solid var(--accent-6)`,
  borderRadius: "var(--radius-5)",
  boxShadow: `0px 0px 0px 0.5px var(--black-a1),
    0px 1px 4px 0px var(--gray-a4),
    0px 2px 1px -1px var(--black-a1),
    0px 1px 3px 0px var(--black-a1);`,
});

export const textarea = style({
  border: "none",
  outline: "none",
  resize: "none",
  fontSize: "var(--font-size-3)",
  lineHeight: "var(--line-height-3)",
  letterSpacing: "var(--letter-spacing-3)",
  fontWeight: "var(--font-weight-regular)",
  color: "var(--slate-12)",
  "::placeholder": {
    color: "var(--slate-9)",
  },
});
