import { AlertDialog, Button, Text } from "@radix-ui/themes";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Link } from "react-router";
import { toast } from "sonner";
import { type Trip, tripsQueries, useDeleteTrip } from "@/entities/trips/model";
import { PAGE_ROUTES } from "@/shared/config";
import { CardItem, CardItemSkeleton, DataFetchState, withAsyncBoundary } from "@/shared/ui";
import * as styles from "./index.css";

function RecentTrips() {
  const { data: trips } = useSuspenseQuery(tripsQueries.list());
  const [selectedTrip, setSelectedTrip] = useState<Trip | null>(null);
  const { mutate: removeTrip, isPending } = useDeleteTrip();

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
      <div className={styles.logBox}>
        <DataFetchState
          type="empty"
          title="저장된 여행 계획이 없습니다!"
          description="여행 일정을 생성해보세요!"
          actionText="일정 생성하기"
          onAction={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        />
      </div>
    );

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
      {}
      <div className={styles.cardContainer}>
        {trips?.slice(0, 4).map((trip) => (
          <AlertDialog.Root key={trip.id}>
            <AlertDialog.Trigger>
              <CardItem
                key={trip.id}
                name={trip.title}
                city={trip.region}
                date={trip.startDate}
                imgUrl={trip.imageUrl}
                conversationId={trip.chatRoomId}
                tripPlanId={trip.id}
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
      </div>
    </div>
  );
}

export default withAsyncBoundary(RecentTrips, {
  rejectedFallback: ({ error, reset }) => (
    <div className={styles.logBox}>
      <DataFetchState
        type="error"
        title="최근 여행 리스트"
        actionText="다시 시도"
        onAction={reset}
        error={error}
      />
    </div>
  ),
  pendingFallback: (
    <div className={styles.cardContainer}>
      <CardItemSkeleton size={4} />
    </div>
  ),
});
