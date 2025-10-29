import { globalStyle } from "@vanilla-extract/css";

globalStyle("*, *::before, *::after", {
  margin: 0,
  padding: 0,
  boxSizing: "border-box",
});

globalStyle("*", {
  WebkitFontSmoothing: "antialiased",
  MozOsxFontSmoothing: "grayscale",
});

globalStyle(".radix-themes[data-accent-color='indigo']", {
  vars: {
    "--indigo-1": "#FDFDFE ",
    "--indigo-2": "#F5F6FE",
    "--indigo-3": "#EDF2FE",
    "--indigo-4": "#D2D4FE",
    "--indigo-5": "#B5B8FC",
    "--indigo-6": "#A1A6FC",
    "--indigo-7": "#8D93FB",
    "--indigo-8": "#747BFF",
    "--indigo-9": "#666DFB",
    "--indigo-10": "#3037B1",
    "--indigo-11": "#272C8E",
    "--indigo-12": "#1F2370",
  },
});

globalStyle('.radix-themes[data-theme="light"]', {
  vars: {
    "--accent-1": "#FDFDFE",
    "--accent-2": "#F5F6FE",
    "--accent-3": "#EDF2FE",
    "--accent-4": "#D2D4FE",
    "--accent-5": "#B5B8FC",
    "--accent-6": "#A1A6FC",
    "--accent-7": "#8D93FB",
    "--accent-8": "#747BFF",
    "--accent-9": "#666dfb",
    "--accent-10": "#3037B1",
    "--accent-11": "#272C8E",
    "--accent-12": "#1F2370",
  },
});
globalStyle('.radix-themes[data-theme="dark"]', {
  vars: {
    "--indigo-1": "#11131F",
    "--indigo-2": "#141726",
    "--indigo-3": "#182449",
    "--indigo-4": "#1D2E62",
    "--indigo-5": "#253974",
    "--indigo-6": "#304384",
    "--indigo-7": "#3A4F97",
    "--indigo-8": "#435DB1",
    "--indigo-9": "#3E63DD",
    "--indigo-10": "#5472E4",
    "--indigo-11": "#9EB1FF",
    "--indigo-12": "#D6E1FF",
  },
});

globalStyle("*", {
  fontFamily: 'Pretendard, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
});

globalStyle(
  `.radix-themes .rt-Text.rt-r-size-8,
   .radix-themes .rt-Text.rt-r-size-8 *,
   .radix-themes .rt-Text.rt-r-size-9,
   .radix-themes .rt-Text.rt-r-size-9 *`,
  {
    fontFamily: '"Noto Sans KR", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  },
);
