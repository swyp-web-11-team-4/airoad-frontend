import { style } from "@vanilla-extract/css";

export const mapContainer = style({
  width: "100%",
  height: "100%",
  position: "relative",
});

export const loadingContainer = style({
  width: "100%",
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "#f5f5f5",
  color: "#666",
  fontSize: "14px",
});

export const errorContainer = style({
  width: "100%",
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "#fff5f5",
  color: "#d32f2f",
  fontSize: "14px",
  padding: "20px",
  textAlign: "center",
});
