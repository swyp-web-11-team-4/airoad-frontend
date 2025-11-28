import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";

export const box = style({
  width: "100%",
  height: "100%",
  background: "#fff",
  borderBottomLeftRadius: "4px",
  borderBottomRightRadius: "4px",
  display: "flex",
  flexDirection: "column",
});

export const headerSkeleton = style({
  position: "relative",
  padding: "28px 24px 20px 24px",
  display: "flex",
  flexDirection: "column",
  gap: "4px",
  flex: "0 0 auto",
  overflow: "hidden",
  background: "#FFF8F0",
  "::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: "3px",
    background: "#00002D17",
  },
});

export const header = recipe({
  base: {
    position: "relative",
    padding: "28px 24px 20px 24px",
    display: "flex",
    flexDirection: "column",
    gap: "4px",
    flex: "0 0 auto",
    overflow: "hidden",
    "::before": {
      content: '""',
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      height: "3px",
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
  padding: "20px",
  display: "flex",
  gap: "20px",
  alignItems: "center",
  borderTop: "1px solid var(--gray-3)",
  borderBottom: "1px solid var(--gray-3)",
  flexShrink: 0,
  width: "100%",
  position: "relative",
});
export const editButton = style({
  position: "absolute",
  top: "28px",
  right: "18px",
  background: "#F2F2F2",

  selectors: {
    "&[data-disabled]": {
      opacity: "0",
    },
  },
});

export const iconImage = style({
  width: "16px",
  height: "16px",

  selectors: {
    [`${editButton}[data-disabled] &`]: {
      filter:
        "invert(41%) sepia(5%) saturate(335%) hue-rotate(180deg) brightness(89%) contrast(90%)",
    },
  },
});

export const dayImg = style({
  width: "132px",
  height: "132px",
  borderRadius: "16px",
  flexShrink: 0,
  objectFit: "cover",
});

export const imgBox = style({
  position: "relative",
});

export const dayInfo = style({
  display: "flex",
  flexDirection: "column",
  flex: 1,
  height: "100%",
  padding: "8px 0",
  gap: "8px",
});

export const dayTag = style({
  display: "flex",
  alignItems: "center",
  gap: "8px",
  marginBottom: "8px",
});

export const mapNumber = recipe({
  base: {
    width: "24px",
    height: "24px",
    borderRadius: "50%",
    position: "absolute",
    top: "6px",
    left: "5.5px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#fff",
  },
  variants: {
    dayNumber: {
      1: { backgroundColor: "#E60076" },
      2: { backgroundColor: "#0093AD" },
      3: { backgroundColor: "#861EFE" },
      4: { backgroundColor: "#FF7A00" },
      5: { backgroundColor: "#008F5D" },
      6: { backgroundColor: "#A87D00" },
    },
  },
  defaultVariants: {
    dayNumber: 1,
  },
});

export const tagBadge = recipe({
  base: {
    fontWeight: 700,
  },

  variants: {
    category: {
      MORNING: { background: "#D6EBFF", color: "#004A9F" },
      LUNCH: { background: "#FFE7B2", color: "#8A4A00" },
      AFTERNOON: { background: "#FFE7B2", color: "#8A4A00" },
      DINNER: { background: "#E4D8FF", color: "#4C2BB0" },
      EVENING: { background: "#E4D8FF", color: "#4C2BB0" },
    },
  },
});

export const tagLine = style({
  width: "2.5px",
  height: "2.5px",
  background: "#000",
  borderRadius: "50%",
  display: "inline-block",
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
  height: "52px",
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
  borderRadius: "9999px",
  zIndex: 1,
  padding: "8px 12px",
  background: "#fff",
});
