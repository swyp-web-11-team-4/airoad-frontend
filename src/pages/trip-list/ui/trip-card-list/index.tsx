import { AlertDialog, Button } from "@radix-ui/themes";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import type { Field } from "@/entities/trips/config";
import { type Trip, tripsQueries, useDeleteTrip } from "@/entities/trips/model";
import { PAGE_ROUTES } from "@/shared/config";
import { CardItem, CardItemSkeleton, DataFetchState, withAsyncBoundary } from "@/shared/ui";
import * as styles from "./index.css";

function TripCardList({ sortParam }: { sortParam: Field }) {
  const navigate = useNavigate();
  const [selectedTrip, setSelectedTrip] = useState<Trip | null>(null);
  const { mutate: removeTrip, isPending } = useDeleteTrip();
  const {
    data: trips,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isError,
  } = useInfiniteQuery(tripsQueries.infinite(sortParam, 20));

  const onDelete = () => {
    if (selectedTrip) {
      removeTrip(selectedTrip.id, {
        onSuccess: () => {
          toast.success("여행일정을 삭제했습니다.");
        },
        onError: (error) => {
          toast.error(error.message);
        },
      });
    }
  };

  if (!trips || trips.length === 0)
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
              tripPlanId={trip.id}
              conversationId={trip.chatRoomId}
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
                <Button color="red" variant="solid" disabled={isPending} onClick={onDelete}>
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
      title="여행 계획 목록"
      actionText="다시 시도"
      onAction={reset}
      error={error}
    />
  ),
  pendingFallback: (
    <div className={styles.cardContainer}>
      <CardItemSkeleton size={20} />
    </div>
  ),
});
