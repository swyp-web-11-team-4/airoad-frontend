import { Flex } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { useSearchParams } from "react-router";
import type { MarkerOptions } from "@/entities/map/model";
import { KakaoMap } from "@/entities/map/ui";
import { tripsQueries } from "@/entities/trips/model";
import type { DayPlanData, SchedulePlaceData } from "@/entities/trips/model/trips.model";
import { ShinyText } from "@/shared/ui";

const DAY_COLORS = ["#FF5252", "#FF9800", "#FFC107", "#4CAF50", "#2196F3", "#9C27B0"];

const createMarkerSvg = (orderNumber: number, color: string): string => {
  const svg = `
    <svg width="30" height="38" viewBox="0 0 30 38" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="0" dy="2" stdDeviation="3" flood-opacity="0.3"/>
        </filter>
      </defs>
      <path d="M15 0C6.716 0 0 6.716 0 15c0 8.284 15 23 15 23s15-14.716 15-23C30 6.716 23.284 0 15 0z" fill="${color}" filter="url(#shadow)"/>
      <text x="15" y="22" font-size="18" font-weight="bold" text-anchor="middle" fill="white">${orderNumber}</text>
    </svg>
  `;
  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
};

export const MapSection = () => {
  const [params] = useSearchParams();
  const tripPlanId = Number(params.get("tripPlanId"));

  const { data: dailyPlans, isLoading } = useQuery(tripsQueries.dailyPlan(tripPlanId));

  const markers: MarkerOptions[] = useMemo(() => {
    if (!dailyPlans) return [];

    return dailyPlans.flatMap((dayPlan: DayPlanData) => {
      const dayIndex = dayPlan.dayNumber - 1;
      const color = DAY_COLORS[dayIndex % DAY_COLORS.length];

      return dayPlan.scheduledPlaces.map((scheduledPlace: SchedulePlaceData) => ({
        position: {
          lat: scheduledPlace.place.latitude,
          lng: scheduledPlace.place.longitude,
        },
        title: `${dayPlan.dayNumber}일차 ${scheduledPlace.visitOrder}번 - ${scheduledPlace.place.name}`,
        image: {
          src: createMarkerSvg(scheduledPlace.visitOrder, color),
          size: { width: 30, height: 38 },
        },
      }));
    });
  }, [dailyPlans]);

  const center = useMemo(() => {
    if (markers.length > 0) {
      return markers[0].position;
    }
    return { lat: 36.2683, lng: 127.6358 };
  }, [markers]);

  if (isLoading)
    return (
      <Flex flexGrow="1" justify="center" align="center">
        <ShinyText>일정을 불러오는 중입니다 ...</ShinyText>
      </Flex>
    );

  return (
    <Flex flexGrow="1">
      <KakaoMap center={center} markers={markers} level={8} />
    </Flex>
  );
};
