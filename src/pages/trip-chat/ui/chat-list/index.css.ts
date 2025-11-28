import { style } from "@vanilla-extract/css";

export const container = style({
  position: "relative",
  display: "flex",
  flexDirection: "column",
  flexGrow: 1,
  minHeight: 0,
});

export const list = style({
  selectors: {
    "&::-webkit-scrollbar": {
      width: "4px",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "#00083046",
      borderRadius: "8px",
    },
    "&::-webkit-scrollbar-track": {
      background: "#0000330F",
    },
    "&::-webkit-scrollbar:horizontal": {
      display: "none",
      height: "0",
    },
  },
});
