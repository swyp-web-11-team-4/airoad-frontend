import CreatePlan from "./create-plan/create-plan";
import * as styles from "./index.css";
import { InfoBox } from "./info-box/info-box";
import { PlanLog } from "./plan-log/plan-log";
export function MainPage() {
  return (
    <div className={styles.container}>
      <CreatePlan />
      <PlanLog />
      <InfoBox />
    </div>
  );
}
