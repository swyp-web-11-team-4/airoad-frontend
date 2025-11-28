import { globalStyle, style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import { mediaQuery } from "@/shared/styles";
export const container = style({
  width: "100%",
  height: "730px",
  overflow: "hidden",
  position: "relative",
});

export const imgBox = style({
  width: "100%",
  height: "730px",
});

export const img = style({
  width: "100%",
  height: "100%",
  objectFit: "cover",
  display: "block",
});

export const layoutBox = style({
  position: "absolute",
  inset: 0,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  marginBottom: "60px",
  gap: "44px",
});

export const titleBox = style({
  width: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: "12px",
});
export const mainTitle = style({
  fontSize: "60px",
  fontWeight: "700",
  background: "linear-gradient(90deg, #FF057C 0%, #8D0B93 50%, #321575 100%)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
});

export const subTitle = style({
  fontSize: "24.8px",
});

export const formBox = style({
  background: "#0000004D",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  padding: "36px 40px",
  borderRadius: "36px",
  width: "920px",
  gap: "18px",
  "@media": {
    [mediaQuery.tablet]: { padding: "0 40px" },
    [mediaQuery.mobile]: { padding: "0 16px" },
  },
});

export const selectBox = recipe({
  base: {
    alignItems: "center",
    display: "flex",
    borderRadius: "16px",
    height: "74px",
    width: "100%",
    transition: "background-color 0.15s ease",
  },

  variants: {
    empty: {
      true: {
        background: "#EBEBEB",
      },
      false: {
        background: "#fff",
      },
    },
  },

  defaultVariants: {
    empty: false,
  },
});
export const chatBox = style({
  alignItems: "center",
  display: "flex",
  flexDirection: "column",
  background: "#fff",
  padding: "20px 24px 24px 24px",
  borderRadius: "16px",
  width: "100%",
  gap: "24px",
});

export const selectLine = style({
  width: "1px",
  height: "38px",
  background: "#DDDDDD",
});

export const selectItem = recipe({
  base: {
    padding: "18px 20px",
    display: "flex",
    flexDirection: "column",
    width: "180px",
    borderRadius: "16px",

    selectors: {
      "&:hover": {
        backgroundColor: "#EBEBEB",
        cursor: "pointer",
      },
    },
  },

  variants: {
    active: {
      true: {
        backgroundColor: "#fff",
      },

      false: {
        backgroundColor: "#EBEBEB",

        selectors: {
          "&:hover": {
            backgroundColor: "#DDDDDD",
          },
        },
      },
    },
  },
});

export const chatTextarea = style({
  overflowY: "auto",
  border: "none",
  height: "52px",
  width: "100%",
  margin: "0",
  boxShadow: "none",
  outline: "none",
  fontSize: "16px",

  selectors: {
    "&:focus": {
      border: "none",
      boxShadow: "none",
      outline: "none",
    },
    "&:focus-visible": {
      border: "none",
      boxShadow: "none",
      outline: "none",
    },
  },
});

export const dropdownContent = style({});

export const popoverContent = style({
  width: "300px",
  maxWidth: "100%",
  overflow: "hidden",
  boxSizing: "border-box",
  padding: 8,
});

export const createButton = style({
  background: "linear-gradient(180deg, #434FF9 -6.82%, #4DB4FF 100%)",
  padding: "16px 30px",
  fontSize: "14.6px",
});

export const calendar = style({
  width: "100%",
  maxWidth: "100%",
  vars: {
    "--rdp-accent-color": "#666DFB",
    "--rdp-accent-background": "#eef2ff",
    "--rdp-outline": "2px solid #666DFB",
  },
});

globalStyle(`${calendar} .rdp-month_grid`, {
  width: "100%",
  tableLayout: "fixed",
});
