import * as styles from "./index.css";

export type ShinyTextProps = {
  children: string;
  disabled?: boolean;
  speed?: number;
  className?: string;
};

export const ShinyText = ({
  children,
  disabled = false,
  speed = 5,
  className = "",
}: ShinyTextProps) => {
  return (
    <div
      className={`${styles.shinyText} ${disabled ? styles.disabled : ""} ${className}`}
      style={{ animationDuration: `${speed}s` }}
    >
      {children}
    </div>
  );
};
