import { Badge, Flex, IconButton, Skeleton, Text } from "@radix-ui/themes";
import dayjs from "dayjs";
import { Fragment } from "react/jsx-runtime";
import { useChatStore } from "@/entities/chats/model";
import { CATEGORY_OPTIONS, THEME_OPTIONS } from "@/entities/trips/config/category";
import type { DayPlanData } from "@/entities/trips/model/trips.model";
import Ai from "@/shared/asset/ai.svg";
import Bus from "@/shared/asset/bus.svg";
import * as styles from "./index.css";
export function ScheduleBox({ dayNumber, date, title, scheduledPlaces }: DayPlanData) {
  const scheduledPlaceRefList = useChatStore((state) => state.scheduledPlaceRefList);
  const addScheduledPlaceRef = useChatStore((state) => state.addScheduledPlaceRef);

  return (
    <div className={styles.box}>
      <div className={styles.header({ dayNumber })}>
        <Text size="6" weight="bold">
          {title}
        </Text>
        <Text size="2">{dayjs(date).format("YYYY년 MM월 DD일, dddd")}</Text>
      </div>
      <div className={styles.dayContainer}>
        {scheduledPlaces?.map((place, idx) => {
          const refDisabled =
            scheduledPlaceRefList.length >= 4 ||
            scheduledPlaceRefList.some((ref) => ref.id === place.id);
          return (
            <Fragment key={place.id}>
              <div className={styles.dayBox} key={place.id}>
                <div className={styles.imgBox}>
                  <img
                    className={styles.dayImg}
                    src={place.place.imageUrl || "/images/day-card.png"}
                    alt="일정 이미지"
                  />
                  <div className={styles.mapNumber({ dayNumber })}>
                    <Text size="2" weight="bold">
                      {idx + 1}
                    </Text>
                  </div>
                </div>

                <div className={styles.dayInfo}>
                  <div className={styles.dayTag}>
                    <Badge
                      size="2"
                      className={styles.tagBadge({
                        category: place.category,
                      })}
                    >
                      {CATEGORY_OPTIONS[place.category]}
                    </Badge>
                    <Flex gap="6.75px" align="center">
                      {place.place.themes?.length ? (
                        place.place.themes.map((id, index) => {
                          const options = [
                            ...THEME_OPTIONS,
                            { id: "RESTAURANT", label: "음식점", emoji: "🥘" },
                          ];

                          const theme = options.find((t) => t.id === id);

                          return (
                            <Fragment key={id}>
                              <Text size="1">{theme ? `${theme.emoji} ${theme.label}` : id}</Text>
                              {index < place.place.themes.length - 1 && (
                                <div className={styles.tagLine} />
                              )}
                            </Fragment>
                          );
                        })
                      ) : (
                        <Text size="1">-</Text>
                      )}
                    </Flex>
                  </div>
                  <IconButton
                    className={styles.editButton}
                    size="2"
                    color="gray"
                    disabled={refDisabled}
                    aria-label={`${place.place.name} 태그 제거`}
                    onClick={() =>
                      addScheduledPlaceRef({
                        id: place.id,
                        name: place.place.name,
                        dayNumber,
                        category: CATEGORY_OPTIONS[place.category],
                        imageUrl: place.place.imageUrl,
                      })
                    }
                  >
                    <img src={Ai} alt="ai" className={styles.iconImage} />
                  </IconButton>
                  <Text size="3" weight="bold">
                    {place.place.name}
                  </Text>
                  <Text size="2" className={styles.description}>
                    {place.place.description}
                  </Text>
                </div>
              </div>
              {idx < scheduledPlaces.length - 1 && (
                <div className={styles.timeBox}>
                  <div className={styles.timeLine} />
                  <div className={styles.timeLabel}>
                    <img src={Bus} alt="이동수단" width={16} height={16} />
                    <Text size="1">다음장소까지</Text>
                    <Text color="indigo" size="1" weight="bold">
                      {place.travelTime}분
                    </Text>
                  </div>
                </div>
              )}
            </Fragment>
          );
        })}
      </div>
    </div>
  );
}

function ScheduleBoxSkeleton() {
  const days = Array.from({ length: 5 });

  return (
    <div className={styles.box}>
      <div className={styles.headerSkeleton}>
        <Skeleton width="218px" height="30px" />
        <Skeleton width="130px" height="20px" />
      </div>
      <div className={styles.dayContainer}>
        {days.map((_, idx) => (
          /* biome-ignore lint/suspicious/noArrayIndexKey: static skeleton, order won't change  */
          <Fragment key={idx}>
            <div className={styles.dayBox}>
              <Skeleton width="136px" height="136px" />
              <div className={styles.dayInfo}>
                <div className={styles.dayTag}>
                  <Skeleton width="59px" height="24px" />
                  <Skeleton width="40px" height="24px" />
                  <Skeleton width="40px" height="24px" />
                  <Skeleton width="40px" height="24px" />
                  <Skeleton width="40px" height="24px" />
                  <Skeleton width="40px" height="24px" />
                </div>

                <Skeleton width="203px" height="24px" />
                <Skeleton width="369px" height="40px" />
              </div>
            </div>
            <div className={styles.timeBox}>
              <Skeleton width="121px" height="28px" />
            </div>
          </Fragment>
        ))}
      </div>
    </div>
  );
}

ScheduleBox.Skeleton = ScheduleBoxSkeleton;
