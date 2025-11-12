import { style } from "@vanilla-extract/css";
export const skeletonBox = style({
  width: "578px",
  height: "100%",
  background: "#fff",
  borderTopLeftRadius: "16px",
  borderTopRightRadius: "16px",
  borderBottomLeftRadius: "4px",
  borderBottomRightRadius: "4px",
  overflow: "hidden",
  display: "flex",
  flexDirection: "column",
  flexShrink: 0,
});

export const skeletonHeader = style({
  position: "relative",
  padding: "28px 24px 20px 24px",
  display: "flex",
  flexDirection: "column",
  gap: "4px",
  borderTopLeftRadius: "16px",
  borderTopRightRadius: "16px",
  flex: "0 0 auto",
  overflow: "hidden",
  "::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: "8px",
    borderTopLeftRadius: "16px",
    borderTopRightRadius: "16px",
    background: "#00002D17",
  },
});

export const skeletonDayContainer = style({
  height: "100%",
  width: "100%",
  display: "flex",
  flexDirection: "column",
  overflowY: "auto",
  alignItems: "center",
  justifyContent: "flex-start",
  selectors: {
    "&::-webkit-scrollbar": {
      width: "4px",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "#00083046",
      borderRadius: "8px",
    },
    "&::-webkit-scrollbar-track": {
      background: "#0000330F",
    },
  },
});

export const skeletonDayBox = style({
  padding: "16px",
  display: "flex",
  gap: "16px",
  alignItems: "center",
  borderTop: "1px solid var(--gray-3)",
  borderBottom: "1px solid var(--gray-3)",
  flexShrink: 0,
  width: "100%",
});
export const skeletonDayInfo = style({
  display: "flex",
  flexDirection: "column",
  gap: "4px",
});

export const skeletonDayTag = style({
  display: "flex",
  gap: "8px",
  marginBottom: "4px",
});

export const skeletonTimeBox = style({
  width: "100%",
  height: "60px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexShrink: "0",
});
