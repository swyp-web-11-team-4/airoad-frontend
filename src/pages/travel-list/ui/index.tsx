import { AlertDialog, Button, Select, Text } from "@radix-ui/themes";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import type { Trip } from "@/entities/trips/model/trips.model";
import { tripsQueries } from "@/entities/trips/model/trips.queries";
import { TravelCard } from "@/shared/ui/travel-card/travel-card";
import * as styles from "./index.css";

export default function TravelList() {
  const [selectedTrip, setSelectedTrip] = useState<Trip | null>(null);
  const [sortParam, setSortParam] = useState<string>("createdAt:desc");

  const {
    data: trips = [],
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery(tripsQueries.infinite(sortParam, 12));

  return (
    <div className={styles.logBox}>
      <div className={styles.titleBox}>
        <Text size="6" weight="bold">
          여행 계획 목록
        </Text>

        <Select.Root value={sortParam} onValueChange={setSortParam}>
          <Select.Trigger className={styles.selectBox} />
          <Select.Content variant="soft" color="gray">
            <Select.Item value="createdAt:desc">최신순</Select.Item>
            <Select.Item value="startDate:asc">날짜순</Select.Item>
          </Select.Content>
        </Select.Root>
      </div>

      <InfiniteScroll
        dataLength={trips.length}
        hasMore={!!hasNextPage}
        next={fetchNextPage}
        loader={<div>{isFetchingNextPage ? "불러오는 중…" : " "}</div>}
      >
        <div className={styles.cardContainer}>
          {trips.map((trip) => (
            <AlertDialog.Root key={trip.id}>
              <AlertDialog.Trigger>
                <TravelCard
                  name={trip.title}
                  city={trip.region}
                  date={trip.startDate}
                  imgUrl={trip.imageUrl}
                  showDelete
                />
              </AlertDialog.Trigger>

              <AlertDialog.Content maxWidth="360px">
                <AlertDialog.Title>{trip.title} 일정을 삭제하시겠습니까?</AlertDialog.Title>
                <div className={styles.buttonBox}>
                  <AlertDialog.Cancel>
                    <Button variant="soft" color="gray">
                      취소
                    </Button>
                  </AlertDialog.Cancel>
                  <AlertDialog.Action>
                    <Button
                      color="red"
                      variant="solid"
                      onClick={() => console.log(`${trip.id} 삭제`)}
                    >
                      일정 삭제
                    </Button>
                  </AlertDialog.Action>
                </div>
              </AlertDialog.Content>
            </AlertDialog.Root>
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
}
