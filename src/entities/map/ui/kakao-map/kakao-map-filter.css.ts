import { style } from "@vanilla-extract/css";

export const trigger = style({
  position: "absolute",
  top: "32px",
  left: "32px",
  zIndex: 10,
  display: "inline-flex",
  alignItems: "center",
  gap: 4,
  padding: "6px 16px",
  backgroundColor: "#ffffff",
  border: "1px solid #e0e0e0",
  borderRadius: "8px",
  fontSize: "14px",
  fontWeight: "500",
  cursor: "pointer",
  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
});

export const content = style({
  width: "276px",
  maxWidth: "320px",
  backgroundColor: "#ffffff",
  borderRadius: "12px",
  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.15)",
});

export const checkboxWrapper = style({
  padding: "6px 12px",
  borderRadius: "var(--radius-2)",
  cursor: "pointer",
  userSelect: "none",
  ":hover": {
    background: "var(--gray-a3)",
  },
});

export const filterList = style({
  maxHeight: "240px",
  overflowY: "auto",
  paddingRight: "4px",
});

export const button = style({
  flex: 1,
});
