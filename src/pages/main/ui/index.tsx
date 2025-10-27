import CreatePlan from "./create-plan/create-plan";
import * as styles from "./index.css";
export function MainPage() {
  return (
    <div className={styles.container}>
      <CreatePlan />
    </div>
  );
}
