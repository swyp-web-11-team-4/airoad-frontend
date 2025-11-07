import type { ComponentProps } from "react";
import * as styles from "./index.css";

export const Header = ({ className, children, ...props }: ComponentProps<"header">) => {
  return (
    <header className={`${styles.container} ${className}`} {...props}>
      {children}
    </header>
  );
};
