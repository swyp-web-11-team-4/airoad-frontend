import { CheckCircleIcon, CircleNotchIcon } from "@phosphor-icons/react";
import * as styles from "./index.css";

interface JobStateProps {
  completed: boolean;
}

export const JobState = ({ completed }: JobStateProps) => {
  if (completed)
    return <CheckCircleIcon size={16} weight="fill" className={styles.completedIcon} />;
  return <CircleNotchIcon size={16} weight="bold" className={styles.loadingIcon} />;
};
