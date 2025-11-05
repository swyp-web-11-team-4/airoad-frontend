import { Text } from "@radix-ui/themes";
import { Link } from "react-router";
import type { Trip } from "@/entities/trips/model/trips.model";
import { PAGE_ROUTES } from "@/shared/config/page-routers";
import { CardItem } from "@/shared/ui";
import * as styles from "./recent-trips.css";

export default function RecentTrips({ trips }: { trips?: Trip[] }) {
  return (
    <div className={styles.logBox}>
      <div className={styles.titleBox}>
        <Text size="6" weight="bold">
          최근 여행 계획
        </Text>
        <Link to={PAGE_ROUTES.TRIP_LIST} className={styles.linkBox}>
          <Text size="4" color="gray">
            전체보기
          </Text>
        </Link>
      </div>
      <div className={styles.cardContainer}>
        {trips?.slice(0, 4).map((trip) => (
          <CardItem
            key={trip.id}
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
