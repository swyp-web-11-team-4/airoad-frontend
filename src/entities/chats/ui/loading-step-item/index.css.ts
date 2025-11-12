import { recipe } from "@vanilla-extract/recipes";

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
