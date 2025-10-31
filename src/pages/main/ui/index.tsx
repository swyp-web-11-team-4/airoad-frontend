import { useQuery } from "@tanstack/react-query";
import { tripsQueries } from "@/entities/trips/model/trips.queries";
import CreateTravel from "./create-travel/create-travel";
import * as styles from "./index.css";
import { InfoBox } from "./info-box/info-box";
import RecentTravel from "./recent-travel/recent-travel";
export function MainPage() {
  const { data: trips } = useQuery(tripsQueries.list());
  return (
    <div className={styles.container}>
      <CreateTravel />
      <RecentTravel trips={trips} />
      <InfoBox />
    </div>
  );
}
