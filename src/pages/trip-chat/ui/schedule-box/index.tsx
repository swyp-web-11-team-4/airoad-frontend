import { Badge, Text } from "@radix-ui/themes";
import dayjs from "dayjs";
import { forwardRef, useEffect } from "react";
import { Fragment } from "react/jsx-runtime";
import { CATEGORY_OPTIONS, THEME_OPTIONS } from "@/entities/trips/config/category";
import type { DayPlanData } from "@/entities/trips/model/trips.model";
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
                    <Badge size="2" variant="outline">
                      {(() => {
                        const themes = place.place.themes;
                        if (!themes?.length) return "-";

                        const labels = themes.map((id) => {
                          const theme = THEME_OPTIONS.find((theme) => theme.id === id);
                          return theme ? `${theme.emoji} ${theme.label}` : id;
                        });

                        return labels.join(", ");
                      })()}
                    </Badge>
                  </div>
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
