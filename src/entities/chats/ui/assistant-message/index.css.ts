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
  ul: style({
    paddingLeft: "1.5rem",
    margin: "0.5em 0",
    listStyleType: "disc",
  }),
  ol: style({
    paddingLeft: "1.5rem",
    margin: "0.5em 0",
    listStyleType: "decimal",
  }),
  li: style({
    margin: "0.5em 0",
  }),
  p: style({
    margin: "0.5em 0",
    lineHeight: 1.6,
  }),
  h1: style({
    fontSize: "2em",
    fontWeight: "var(--font-weight-bold)",
    margin: "1em 0",
  }),
  h2: style({
    fontSize: "1.5em",
    fontWeight: "var(--font-weight-bold)",
    margin: "0.75em 0",
  }),
  h3: style({
    fontSize: "1.25em",
    fontWeight: "var(--font-weight-bold)",
    margin: "0.5em 0",
  }),
  h4: style({
    fontWeight: "var(--font-weight-bold)",
    margin: "0.5em 0",
  }),
  h5: style({
    fontWeight: "var(--font-weight-bold)",
    margin: "0.5em 0",
  }),
  h6: style({
    fontWeight: "var(--font-weight-bold)",
    margin: "0.5em 0",
  }),
  a: style({
    color: "var(--accent-11)",
    textDecoration: "underline",
    ":hover": { textDecoration: "none" },
  }),
  blockquote: style({
    paddingLeft: "1rem",
    borderLeft: "3px solid var(--accent-7)",
    color: "var(--accent-11)",
    margin: "0.5em 0",
    fontStyle: "italic",
  }),
  em: style({
    fontStyle: "italic",
  }),
  strong: style({
    fontWeight: "var(--font-weight-bold)",
  }),
  img: style({
    width: "100%",
    aspectRatio: "1/1",
    objectFit: "contain",
  }),
};
