import { style } from "@vanilla-extract/css";

export const dataFetchBox = style({
  width: " 100%",
  height: "100%",
  alignItems: "center",
  justifyContent: "center",
  display: "flex",
  flexDirection: "column",
});

export const noDataBox = style({
  maxWidth: "274px",
  maxHeight: "274px",
});

export const errorBox = style({
  maxWidth: "500px",
  maxHeight: "270px",
});

export const titleBox = style({
  textAlign: "center",
  color: "#60646C",
});

export const buttonBox = style({
  marginTop: "16px",
});
