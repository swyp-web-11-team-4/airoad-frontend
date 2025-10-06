import { style } from "@vanilla-extract/css";

export const pageContainer = style({
  minHeight: "100vh",
  backgroundColor: "#f5f5f5",
  paddingBottom: "40px",
});

export const header = style({
  padding: "20px",
  margin: 0,
  borderBottom: "2px solid #333",
  fontSize: "32px",
  fontWeight: "700",
  backgroundColor: "#fff",
});

export const errorContainer = style({
  padding: "20px",
  color: "#d32f2f",
});

export const errorTitle = style({
  fontSize: "20px",
  marginBottom: "12px",
  fontWeight: "600",
});

export const errorMessage = style({
  whiteSpace: "pre-wrap",
  padding: "12px",
  backgroundColor: "#ffebee",
  borderRadius: "4px",
  fontSize: "14px",
  fontFamily: "monospace",
});

export const retryButton = style({
  marginTop: "16px",
  padding: "10px 20px",
  cursor: "pointer",
  backgroundColor: "#1976d2",
  color: "#fff",
  border: "none",
  borderRadius: "4px",
  fontSize: "14px",
  fontWeight: "500",
  transition: "background-color 0.2s ease",
  ":hover": {
    backgroundColor: "#1565c0",
  },
});

export const loadingContainer = style({
  padding: "20px",
  fontSize: "16px",
  color: "#666",
});
