import { style } from "@vanilla-extract/css";

export const container = style({
  padding: "20px",
  backgroundColor: "#fff",
  borderRadius: "8px",
  border: "1px solid #e0e0e0",
  marginBottom: "24px",
});

export const title = style({
  fontSize: "20px",
  fontWeight: "600",
  marginBottom: "16px",
  color: "#333",
});

export const form = style({
  display: "flex",
  flexDirection: "column",
  gap: "12px",
});

export const formGroup = style({
  display: "flex",
  flexDirection: "column",
  gap: "4px",
});

export const label = style({
  fontSize: "14px",
  fontWeight: "500",
  color: "#555",
});

export const successMessage = style({
  padding: "12px",
  backgroundColor: "#e8f5e9",
  color: "#2e7d32",
  borderRadius: "4px",
  fontSize: "14px",
  fontWeight: "500",
});

export const errorMessage = style({
  padding: "12px",
  backgroundColor: "#ffebee",
  color: "#c62828",
  borderRadius: "4px",
  fontSize: "14px",
  fontWeight: "500",
});
