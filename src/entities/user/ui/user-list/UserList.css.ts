import { style } from "@vanilla-extract/css";

export const container = style({
  padding: "20px",
});

export const title = style({
  marginBottom: "16px",
  fontSize: "24px",
  fontWeight: "600",
});

export const listContainer = style({
  display: "flex",
  flexDirection: "column",
  gap: "16px",
});

export const userCard = style({
  border: "1px solid #ddd",
  borderRadius: "8px",
  padding: "16px",
  backgroundColor: "#f9f9f9",
  transition: "box-shadow 0.2s ease",
  ":hover": {
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
  },
});

export const userName = style({
  margin: "0 0 8px 0",
  fontSize: "20px",
  fontWeight: "500",
  color: "#333",
});

export const userInfo = style({
  margin: "4px 0",
  color: "#666",
  fontSize: "14px",
});

export const label = style({
  fontWeight: "600",
  marginRight: "4px",
});
