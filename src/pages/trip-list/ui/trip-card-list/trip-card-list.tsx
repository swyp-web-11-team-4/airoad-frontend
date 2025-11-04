import { AlertDialog, Button } from "@radix-ui/themes";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useNavigate } from "react-router-dom";
import type { Trip } from "@/entities/trips/model/trips.model";
import { tripsQueries } from "@/entities/trips/model/trips.queries";
import { useDeleteTrip } from "@/pages/main/model/use-delete-trip";
import { PAGE_ROUTES } from "@/shared/config/page-routers";
import withAsyncBoundary from "@/shared/lib/with-async-boundary";
import { CardItem } from "@/shared/ui";
import { CardItemSkeleton } from "@/shared/ui/card-item-skeleton/card-item-skeleton";
import { DataFetchState } from "@/shared/ui/data-fetch-state/data-fetch-state";
import type { Field } from "../../config";
import * as styles from "./trip-card-list.css";

function TripCardList({ sortParam }: { sortParam: Field }) {
  const navigate = useNavigate();
  const [selectedTrip, setSelectedTrip] = useState<Trip | null>(null);
  const { mutate: removeTrip, isPending } = useDeleteTrip();
  const {
    data: trips = [],
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isError,
  } = useInfiniteQuery(tripsQueries.infinite(sortParam, 20));

  if (trips.length === 0)
    return (
      <DataFetchState
        type="empty"
        title="저장된 여행 계획이 없습니다!"
        description="메인 홈에서 여행 계획을 생성해보세요!"
        actionText="홈으로 가기"
        onAction={() => navigate(PAGE_ROUTES.ROOT)}
      />
    );
  return (
    <InfiniteScroll
      dataLength={trips.length}
      hasMore={!isError && !!hasNextPage}
      next={fetchNextPage}
      className={styles.cardContainer}
      loader={isFetchingNextPage ? <CardItemSkeleton size={4} /> : null}
    >
      {trips.map((trip) => (
        <AlertDialog.Root key={trip.id}>
          <AlertDialog.Trigger>
            <CardItem
              name={trip.title}
              city={trip.region}
              date={trip.startDate}
              imgUrl={trip.imageUrl}
              onDelete={() => setSelectedTrip(trip)}
              showDelete
            />
          </AlertDialog.Trigger>

          <AlertDialog.Content maxWidth="360px">
            <AlertDialog.Title>{selectedTrip?.title} 일정을 삭제하시겠습니까?</AlertDialog.Title>
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
                  disabled={isPending}
                  onClick={() => {
                    if (selectedTrip) removeTrip(selectedTrip.id);
                  }}
                >
                  일정 삭제
                </Button>
              </AlertDialog.Action>
            </div>
          </AlertDialog.Content>
        </AlertDialog.Root>
      ))}
    </InfiniteScroll>
  );
}

export default withAsyncBoundary(TripCardList, {
  rejectedFallback: ({ error, reset }) => (
    <DataFetchState
      type="error"
      title="요청 실패"
      description={String(error?.message ?? "잠시 후 다시 시도해주세요.")}
      actionText="다시 시도"
      onAction={reset}
    />
  ),
  pendingFallback: (
    <div className={styles.cardContainer}>
      <CardItemSkeleton size={20} />
    </div>
  ),
});
