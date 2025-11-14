import { Badge, IconButton, Text } from "@radix-ui/themes";
import dayjs from "dayjs";
import { forwardRef } from "react";
import { Fragment } from "react/jsx-runtime";
import { CATEGORY_OPTIONS, THEME_OPTIONS } from "@/entities/trips/config/category";
import type { DayPlanData } from "@/entities/trips/model/trips.model";
import Ai from "@/shared/asset/ai.svg";
import Bus from "@/shared/asset/bus.svg";
import * as styles from "./index.css";
export const ScheduleBox = forwardRef<HTMLDivElement, DayPlanData>(
  ({ dayNumber, date, title, scheduledPlaces }, ref) => {
    return (
      <div ref={ref} className={styles.box}>
        <div className={styles.header({ dayNumber })}>
          <Text size="5" weight="bold" className={styles.dayTitle({ dayNumber })}>
            {dayNumber}일차
          </Text>
          <Text size="6" weight="bold">
            {title}
          </Text>
          <Text size="2">{dayjs(date).format("YYYY년 MM월 DD일, dddd")}</Text>
        </div>
        <div className={styles.dayContainer}>
          {scheduledPlaces?.map((place, idx) => (
            <Fragment key={place.id}>
              <div className={styles.dayBox} key={place.id}>
                <img
                  className={styles.dayImg}
                  src={place.place.imageUrl || "/images/day-card.png"}
                  alt="일정 이미지"
                />
                <div className={styles.dayInfo}>
                  <div className={styles.dayTag}>
                    <Badge size="2" className={styles.tagBadge({ category: place.category })}>
                      {CATEGORY_OPTIONS[place.category]}
                    </Badge>
                    {place.place.themes?.length ? (
                      place.place.themes.map((id) => {
                        const options = [
                          ...THEME_OPTIONS,
                          { id: "RESTAURANT", label: "음식점", emoji: "🥘" },
                        ];

                        const theme = options.find((theme) => theme.id === id);

                        return (
                          <Badge key={id} size="2" variant="outline">
                            {theme ? `${theme.emoji} ${theme.label}` : id}
                          </Badge>
                        );
                      })
                    ) : (
                      <Badge size="2" variant="outline">
                        -s
                      </Badge>
                    )}
                  </div>
                  <IconButton className={styles.editButton} size="1" variant="outline" color="gray">
                    <img src={Ai} alt="ai" />
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
          ))}
        </div>
      </div>
    );
  },
);
