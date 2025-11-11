import { useAuthStore } from "@/entities/auth/model";
import { useMeQuery } from "@/entities/member/api";
import CreateTrip from "./create-trip";
import * as styles from "./index.css";
import { InfoBox } from "./info-box";
import RecentTrips from "./recent-trips";

export function MainPage() {
  const accessToken = useAuthStore((s) => s.accessToken);
  const { data: user } = useMeQuery({
    enabled: !!accessToken,
  });
  return (
    <div className={styles.container}>
      <CreateTrip />
      {user !== undefined && <RecentTrips />}
      <InfoBox />
    </div>
  );
}
