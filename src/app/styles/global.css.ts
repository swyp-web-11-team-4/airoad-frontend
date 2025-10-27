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

  vars: {
    "--accent-1": "#f8f9ff",
    "--accent-2": "#f0f2ff",
    "--accent-3": "#e0e3ff",
    "--accent-4": "#d0d3ff",
    "--accent-5": "#bfc2ff",
    "--accent-6": "#a7abff",
    "--accent-7": "#8e93ff",
    "--accent-8": "#787dff",
    "--accent-9": "#666dfb",
    "--accent-10": "#5758e8",
    "--accent-11": "#4a4cd5",
    "--accent-12": "#1f2085",
  },
});
