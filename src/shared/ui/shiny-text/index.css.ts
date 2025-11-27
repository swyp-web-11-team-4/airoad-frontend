import { keyframes, style } from "@vanilla-extract/css";

const shine = keyframes({
  "0%": {
    backgroundPosition: "100%",
  },
  "100%": {
    backgroundPosition: "-100%",
  },
});

export const shinyText = style({
  color: "var(--gray-6)",
  background: "linear-gradient(120deg, var(--gray-6) 40%, var(--iris-10) 70%, var(--gray-6) 60%)",
  backgroundSize: "200% 100%",
  WebkitBackgroundClip: "text",
  backgroundClip: "text",
  display: "inline-block",
  animation: `${shine} 5s linear infinite`,
});

export const disabled = style({
  animation: "none",
});
