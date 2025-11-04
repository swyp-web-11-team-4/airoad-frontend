import { useQuery } from "@tanstack/react-query";
import { tripsQueries } from "@/entities/trips/model/trips.queries";
import CreateTrip from "./create-trip/create-trip";
import * as styles from "./index.css";
import { InfoBox } from "./info-box/info-box";
import RecentTrips from "./recent-trips/recent-trips";
export function MainPage() {
  const { data: trips } = useQuery(tripsQueries.list());
  return (
    <div className={styles.container}>
      <CreateTrip />
      <RecentTrips trips={trips} />
      <InfoBox />
    </div>
  );
}
