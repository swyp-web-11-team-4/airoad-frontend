import { keyframes, style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";

export const content = style({
  display: "flex",
  flexDirection: "column",
  gap: 12,
  width: "100%",
  padding: "16px 14px",
  border: "1px solid var(--gray-a4)",
  borderRadius: "var(--radius-6)",
});

export const iconBox = recipe({
  base: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: 32,
    height: 32,
    borderRadius: "var(--radius-2)",
  },
  variants: {
    type: {
      place: {
        backgroundColor: "var(--sky-4)",
        color: "var(--sky-11)",
      },
      restaurant: {
        backgroundColor: "var(--pink-3)",
        color: "var(--pink-10)",
      },
      route: {
        backgroundColor: "var(--mint-3)",
        color: "var(--mint-11)",
      },
    },
  },
});

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
