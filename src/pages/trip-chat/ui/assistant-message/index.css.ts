import { keyframes, style } from "@vanilla-extract/css";

const fadeIn = keyframes({
  from: {
    opacity: 0,
  },
  to: {
    opacity: 1,
  },
});

export const avatar = style({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: 36,
  height: 36,
  borderRadius: 9999,
  background: "var(--accent-a3)",
});

export const content = style({
  animation: `${fadeIn} 0.1s ease-in`,
});

export const markdown = {
  ol: style({
    marginLeft: 20,
    marginBottom: 4,
  }),
  ul: style({
    listStyle: "outside",
    marginLeft: 20,
    marginBottom: 4,
  }),
  li: style({
    marginBottom: 4,
  }),
  p: style({
    marginBottom: 4,
  }),
};
