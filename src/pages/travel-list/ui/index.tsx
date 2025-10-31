import { AlertDialog, Button, Select, Text } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import type { Trip } from "@/entities/trips/model/trips.model";
import { tripsQueries } from "@/entities/trips/model/trips.queries";
import { TravelCard } from "@/shared/ui/travel-card/travel-card";
import * as styles from "./index.css";

export default function TravelList() {
  const { data: trips } = useQuery(tripsQueries.list());
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
          {trips?.map((trip) => (
            <TravelCard
              key={trip.planId}
              name={trip.title}
              city={trip.region}
              date={trip.startDate}
              imgUrl={trip.imageUrl}
              showDelete
              onDelete={() => setSelectedTrip(trip)}
            />
          ))}
        </div>

        <AlertDialog.Content maxWidth="360px">
          <AlertDialog.Title>
            {selectedTrip
              ? `${selectedTrip.title} 일정을 삭제하시겠습니까?`
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
