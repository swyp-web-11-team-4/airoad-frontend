import { AlertDialog, Button, Select, Text } from "@radix-ui/themes";
import { useState } from "react";
import { TravelCard } from "@/shared/ui/travel-card/travel-card";
import * as styles from "./index.css";

// 추후 dto에 맞게 수정될 예정
type Trip = { id: number; name: string; date: string; city: string };

const trips: Trip[] = [
  { id: 1, name: "Trip A", date: "2025.11.24", city: "서울" },
  { id: 2, name: "Trip B", date: "2025.12.02", city: "부산" },
  { id: 3, name: "Trip C", date: "2026.01.05", city: "제주" },
  { id: 4, name: "Trip D", date: "2026.02.18", city: "서울" },
  { id: 5, name: "Trip A", date: "2025.11.24", city: "서울" },
  { id: 6, name: "Trip B", date: "2025.12.02", city: "부산" },
  { id: 7, name: "Trip C", date: "2026.01.05", city: "제주" },
  { id: 8, name: "Trip D", date: "2026.02.18", city: "서울" },
  { id: 9, name: "Trip A", date: "2025.11.24", city: "서울" },
  { id: 10, name: "Trip B", date: "2025.12.02", city: "부산" },
  { id: 11, name: "Trip C", date: "2026.01.05", city: "제주" },
  { id: 12, name: "Trip D", date: "2026.02.18", city: "서울" },
  { id: 13, name: "Trip A", date: "2025.11.24", city: "서울" },
  { id: 14, name: "Trip B", date: "2025.12.02", city: "부산" },
  { id: 15, name: "Trip C", date: "2026.01.05", city: "제주" },
  { id: 16, name: "Trip D", date: "2026.02.18", city: "서울" },
];
export default function TravelList() {
  const [selectedTrip, setSelectedTrip] = useState<Trip | null>(null);
  return (
    <AlertDialog.Root>
      <div className={styles.logBox}>
        <div className={styles.titleBox}>
          <Text size="6" weight="bold">
            여행 계획 목록
          </Text>

          <Select.Root defaultValue="latest">
            <Select.Trigger className={styles.selectBox} />
            <Select.Content variant="soft" color="gray">
              <Select.Item value="latest">최신순</Select.Item>
              <Select.Item value="date">날짜순</Select.Item>
            </Select.Content>
          </Select.Root>
        </div>

        <div className={styles.cardContainer}>
          {trips.map((trip) => (
            <TravelCard
              key={trip.id}
              name={trip.name}
              city={trip.city}
              date={trip.date}
              showDelete
              onDelete={() => setSelectedTrip(trip)}
            />
          ))}
        </div>

        <AlertDialog.Content maxWidth="360px">
          <AlertDialog.Title>
            {selectedTrip
              ? `${selectedTrip.name} 일정을 삭제하시겠습니까?`
              : "일정을 삭제하시겠습니까?"}
          </AlertDialog.Title>
          <div className={styles.buttonBox}>
            <AlertDialog.Cancel>
              <Button variant="soft" color="gray">
                취소
              </Button>
            </AlertDialog.Cancel>
            <AlertDialog.Action>
              <Button color="red" variant="solid">
                일정 삭제
              </Button>
            </AlertDialog.Action>
          </div>
        </AlertDialog.Content>
      </div>
    </AlertDialog.Root>
  );
}
