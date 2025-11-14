import { globalStyle, style } from "@vanilla-extract/css";
import { mediaQuery } from "@/shared/styles";

export const container = style({
  width: "100%",
  maxHeight: "700px",
  overflow: "hidden",
  position: "relative",
});

export const imgBox = style({
  width: "100%",
  height: "700px",
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
  gap: "48px",
  background: "#0000004D",
});

export const titleBox = style({
  width: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: "16px",
  color: "#fff",
});

export const formBox = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
  padding: "0 80px",
  "@media": {
    [mediaQuery.tablet]: { padding: "0 40px" },
    [mediaQuery.mobile]: { padding: "0 16px" },
  },
});

export const selectBox = style({
  width: "100%",
  display: "grid",
  alignItems: "center",

  "@media": {
    [mediaQuery.desktop]: {
      gridTemplateColumns: "repeat(4, 20.94%) 12.5%",
      gap: "1.25%",
    },
    [mediaQuery.tablet]: {
      gridTemplateColumns: "repeat(2, minmax(220px, 1fr))",
      gap: "12px",
    },
    [mediaQuery.mobile]: {
      gridTemplateColumns: "1fr",
      gap: "8px",
    },
  },
});

export const dropdownContent = style({
  width: "var(--radix-dropdown-menu-trigger-width)",
});

export const popoverContent = style({
  width: "var(--radix-popover-trigger-width)",
  maxWidth: "100%",
  overflow: "hidden",
  boxSizing: "border-box",
  padding: 8,
});
export const personBox = style({
  display: "flex",
  alignContent: "center",
  justifyContent: "space-between",
  width: "100%",
  alignItems: "center",
  gap: "7px",
});

export const cardWrap = style({
  position: "relative",
  width: "100%",
});
export const radioItem = style({
  width: "100%",
  vars: {
    "--radio-cards-item-border-radius": "99px",
    "--radio-cards-item-padding-y": "11px",
    "--radio-cards-item-padding-x": "32px",
  },
  transition: "box-shadow 0.2s ease",
  boxShadow: "0px 2px 3px -2px var(--ColorsNeutralNeutralAlpha3)",
  selectors: {
    "&:hover": {
      boxShadow: "0px 3px 12px -4px var(--OverlaysBlackAlpha2)",
    },
    "&[data-state='checked']": {
      boxShadow: "0px 4px 16px -8px var(--OverlaysBlackAlpha2)",
    },
  },
});

export const overlayTrigger = style({
  position: "absolute",
  inset: 0,
  width: "100%",
  height: "100%",
  background: "transparent",
  border: 0,
  padding: 0,
  cursor: "pointer",
  outline: "none",
});

export const iconBtn = style({
  width: 24,
  height: 24,
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  background: "transparent",
  border: 0,
  padding: 0,
  cursor: "pointer",
  outline: "none",
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
