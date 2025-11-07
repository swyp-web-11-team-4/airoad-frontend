import { useAuthStore } from "@/entities/auth/model";
import CreateTrip from "./create-trip";
import * as styles from "./index.css";
import { InfoBox } from "./info-box";
import RecentTrips from "./recent-trips";

export function MainPage() {
  const accessToken = useAuthStore((s) => s.accessToken);

  return (
    <div className={styles.container}>
      <CreateTrip />
      {!!accessToken && <RecentTrips />}
      <InfoBox />
    </div>
  );
}
