import CreateTravel from "./create-travel/create-travel";
import * as styles from "./index.css";
import { InfoBox } from "./info-box/info-box";
import RecentTravel from "./recent-travel/recent-travel";
export function MainPage() {
  return (
    <div className={styles.container}>
      <CreateTravel />
      <RecentTravel />
      <InfoBox />
    </div>
  );
}
