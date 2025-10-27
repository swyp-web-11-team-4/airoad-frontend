// src/shared/styles/global.css.ts
import { globalStyle } from "@vanilla-extract/css";

globalStyle("*, *::before, *::after", {
  margin: 0,
  padding: 0,
  boxSizing: "border-box",
});

globalStyle("*", {
  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  WebkitFontSmoothing: "antialiased",
  MozOsxFontSmoothing: "grayscale",
});
