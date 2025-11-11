import { Text } from "@radix-ui/themes";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import { tripsQueries } from "@/entities/trips/model";
import { PAGE_ROUTES } from "@/shared/config";
import { CardItem, CardItemSkeleton, DataFetchState, withAsyncBoundary } from "@/shared/ui";
import * as styles from "./index.css";

function RecentTrips() {
  const { data: trips } = useSuspenseQuery(tripsQueries.list());
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
          <CardItem
            key={trip.id}
            name={trip.title}
            city={trip.region}
            date={trip.startDate}
            imgUrl={trip.imageUrl}
            conversationId={trip.chatRoomId}
            tripPlanId={trip.id}
          />
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
