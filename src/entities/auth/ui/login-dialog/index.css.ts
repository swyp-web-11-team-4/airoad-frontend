import { style } from "@vanilla-extract/css";

export const content = style({
  padding: `var(--space-6) !important`,
});

export const googleLoginButton = style({
  display: "inline-flex",
  alignItems: "center",
  gap: 10,
  margin: 4,
  width: "100%",
  border: `1px solid #747775`,
  borderRadius: 106,
  padding: `var(--space-4)`,
  fontSize: 14,
  fontWeight: 500,
  background: `var(--white-12)`,
  cursor: "pointer",

  ":focus": {
    outline: "none",
  },
});
