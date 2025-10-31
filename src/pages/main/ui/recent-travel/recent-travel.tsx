import { Text } from "@radix-ui/themes";
import { Link } from "react-router-dom";
import type { Trip } from "@/entities/trips/model/trips.model";
import { TravelCard } from "@/shared/ui/travel-card/travel-card";
import * as styles from "./recent-travel.css";

export default function RecentTravel({ trips }: { trips?: Trip[] }) {
  return (
    <div className={styles.logBox}>
      <div className={styles.titleBox}>
        <Text size="6" weight="bold">
          최근 여행 계획
        </Text>
        <Link to="/travel/list" className={styles.linkBox}>
          <Text size="4" color="gray">
            전체보기
          </Text>
        </Link>
      </div>
      <div className={styles.cardContainer}>
        {trips?.slice(0, 4).map((trip) => (
          <TravelCard
            key={trip.planId}
            name={trip.title}
            city={trip.region}
            date={trip.startDate}
            imgUrl={trip.imageUrl}
          />
        ))}
      </div>
    </div>
  );
}
