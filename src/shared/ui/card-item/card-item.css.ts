import { style } from "@vanilla-extract/css";

export const cardBox = style({
  position: "relative",
  padding: "24px",
  display: "flex",
  flexDirection: "column",
  gap: "12px",
  cursor: "pointer",
});
export const cardImg = style({
  width: "100%",
  borderRadius: "12px",
});
export const cardData = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  gap: "4px",
});
export const cardDeleteBtn = style({
  position: "absolute",
  top: "12px",
  right: "12px",
  opacity: 0,
  transform: "scale(0.9)",
  transition: "opacity 0.25s ease, transform 0.25s ease",
  selectors: {
    [`${cardBox}:hover &`]: {
      opacity: 1,
      transform: "scale(1)",
    },
  },
});

export const buttonBox = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  gap: "8px",
});
