import { Text } from "@radix-ui/themes";
import { Link } from "react-router-dom";
import { TravelCard } from "@/shared/ui/travel-card/travel-card";
import * as styles from "./recent-travel.css";

// 추후 dto에 맞게 수정될 예정
type Trip = { id: number; name: string; date: string; city: string };

const trips: Trip[] = [
  { id: 1, name: "Trip A", date: "2025.11.24", city: "서울" },
  { id: 2, name: "Trip B", date: "2025.12.02", city: "부산" },
  { id: 3, name: "Trip C", date: "2026.01.05", city: "제주" },
  { id: 4, name: "Trip D", date: "2026.02.18", city: "서울" },
];
export default function RecentTravel() {
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
        {trips.map((trip) => (
          <TravelCard key={trip.id} name={trip.name} city={trip.city} date={trip.date} />
        ))}
      </div>
    </div>
  );
}
