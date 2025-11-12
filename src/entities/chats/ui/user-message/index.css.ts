import { keyframes, style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";

const fadeIn = keyframes({
  from: {
    opacity: 0,
  },
  to: {
    opacity: 1,
  },
});

export const avatar = style({
  width: 36,
  height: 36,
});

export const messageBubble = recipe({
  base: {
    padding: "8px 16px",
    borderRadius: "var(--radius-5)",
    background: "var(--accent-3)",
  },
  variants: {
    animate: {
      true: {
        animation: `${fadeIn} 0.1s ease-in`,
      },
    },
  },
  defaultVariants: {
    animate: false,
  },
});
