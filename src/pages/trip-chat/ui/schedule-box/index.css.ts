import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";

export const box = style({
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

export const header = recipe({
  base: {
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
    },
  },
  variants: {
    dayNumber: {
      1: { background: "#FEF9FB", "::before": { background: "#E60076" } },
      2: { background: "#F0FDFA", "::before": { background: "#0093AD" } },
      3: { background: "#FAF9FF", "::before": { background: "#861EFE" } },
      4: { background: "#FFF8F0", "::before": { background: "#FF7A00" } },
      5: { background: "#F1FFF7", "::before": { background: "#008F5D" } },
      6: { background: "#FFFBEF", "::before": { background: "#A87D00" } },
    },
  },
  defaultVariants: {
    dayNumber: 1,
  },
});

export const dayContainer = style({
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

export const dayTitle = recipe({
  variants: {
    dayNumber: {
      1: { color: "#E60076" },
      2: { color: "#0093AD" },
      3: { color: "#861EFE" },
      4: { color: "#FF7A00" },
      5: { color: "#008F5D" },
      6: { color: "#A87D00" },
    },
  },
  defaultVariants: {
    dayNumber: 1,
  },
});

export const dayBox = style({
  padding: "16px",
  display: "flex",
  gap: "16px",
  alignItems: "center",
  borderTop: "1px solid var(--gray-3)",
  borderBottom: "1px solid var(--gray-3)",
  flexShrink: 0,
  width: "100%",
});

export const dayImg = style({
  width: "108px",
  height: "108px",
  borderRadius: "10px",
  flexShrink: 0,
});

export const dayInfo = style({
  display: "flex",
  flexDirection: "column",
  gap: "8px",
  flex: 1,
});

export const dayTag = style({
  display: "flex",
  gap: "8px",
  alignItems: "center",
});

export const tagBadge = recipe({
  base: {
    fontWeight: 700,
  },

  variants: {
    category: {
      MORNING: { background: "#D6EBFF", color: "#004A9F" },
      AFTERNOON: { background: "#FFF8E5", color: "#FF7A00" },
      EVENING: { background: "#E4D8FF", color: "#4C2BB0" },
    },
  },
});

export const description = style({
  display: "-webkit-box",
  WebkitLineClamp: 2,
  WebkitBoxOrient: "vertical",
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "normal",
});

export const timeBox = style({
  height: "60px",
  position: "relative",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  flexShrink: 0,
});

export const timeLine = style({
  position: "absolute",
  top: 0,
  bottom: 0,
  left: "50%",
  width: "2px",
  borderLeft: "2px dashed var(--indigo-8)",
  transform: "translateX(-50%)",
  zIndex: 0,
});

export const timeLabel = style({
  position: "relative",
  display: "flex",
  alignItems: "center",
  gap: "4px",
  border: "1px solid var(--indigo-4)",
  borderRadius: "9999px",
  zIndex: 1,
  padding: "8px 12px",
  background: "linear-gradient(90deg, #EEF2FF 0%, #FAF5FF 100%)",
});
