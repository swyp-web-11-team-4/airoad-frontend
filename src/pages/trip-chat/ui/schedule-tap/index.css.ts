import { createVar, globalStyle, style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";

export const tabBox = style({
  display: "flex",
  padding: "0 20px",
  height: "69px",
  alignItems: "flex-end",
});

const dayBgVar = createVar();

export const tabItem = recipe({
  base: {
    width: "80px",
    height: "38px",
    borderRadius: "8px 8px 0 0",
    padding: "0",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",

    background: "transparent",
    color: "#AAAAAA",
    fontSize: "18px",
    fontWeight: "bold",
    transition: "all 0.2s ease",

    vars: {
      [dayBgVar]: "#E60076",
    },
  },

  variants: {
    dayNumber: {
      1: { vars: { [dayBgVar]: "#E60076" } },
      2: { vars: { [dayBgVar]: "#0093AD" } },
      3: { vars: { [dayBgVar]: "#861EFE" } },
      4: { vars: { [dayBgVar]: "#FF7A00" } },
      5: { vars: { [dayBgVar]: "#008F5D" } },
      6: { vars: { [dayBgVar]: "#A87D00" } },
    },
  },

  defaultVariants: {
    dayNumber: 1,
  },
});

globalStyle(`.${tabBox}.rt-TabsList`, {
  boxShadow: "none",
  borderBottom: "none",
});

globalStyle(".rt-BaseTabListTrigger::before", {
  content: "none",
  display: "none",
});

globalStyle(".rt-TabsTrigger[data-state='active']", {
  background: dayBgVar,
  color: "#fff",
  boxShadow: "none",
  borderBottom: "none",
});

globalStyle(
  `
  .rt-TabsTrigger[data-state='active'] .rt-TabsTriggerInner
`,
  {
    fontWeight: "700 !important",
  },
);

globalStyle(
  `
  .rt-BaseTabListTrigger[data-state='inactive'] .rt-BaseTabListTriggerInner,
  .rt-BaseTabListTrigger[data-state='inactive'] .rt-TabsTriggerInner,
  .rt-TabsTrigger[data-state='inactive'] .rt-BaseTabListTriggerInner,
  .rt-TabsTrigger[data-state='inactive'] .rt-TabsTriggerInner
`,
  {
    background: "transparent !important",
    boxShadow: "none !important",
    color: "inherit !important",
  },
);
