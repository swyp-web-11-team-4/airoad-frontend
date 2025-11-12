import { keyframes, style } from "@vanilla-extract/css";

const rotate = keyframes({
  "0%": {
    transform: "rotate(0deg)",
  },
  "100%": {
    transform: "rotate(360deg)",
  },
});

export const loadingIcon = style({
  color: "var(--mauve-8)",
  animation: `${rotate} 1s linear infinite`,
});

export const completedIcon = style({
  color: "var(--green-9)",
});
