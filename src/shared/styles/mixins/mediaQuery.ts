import { breakpoints } from "../tokens/breakpoints";

export const mediaQuery = {
  desktop: `screen and (min-width: ${breakpoints.desktop}px)`,
  tablet: `screen and (max-width: ${breakpoints.desktop - 1}px)`,
  mobile: `screen and (max-width: ${breakpoints.tablet}px)`,
} as const;
