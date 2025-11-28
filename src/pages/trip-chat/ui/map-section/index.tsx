import { Flex } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useMemo } from "react";
import { useSearchParams } from "react-router";
import {
  getCenterCoordinate,
  getMapLevel,
  type MarkerFilterOption,
  type MarkerOptions,
  useMapStore,
} from "@/entities/map/model";
import { KakaoMap, KakaoMapLoading } from "@/entities/map/ui";
import { tripsQueries } from "@/entities/trips/model";
import type { DayPlanData, SchedulePlaceData } from "@/entities/trips/model/trips.model";

const DAY_COLORS = ["#E60076", "#0093AD", "#861EFE", "#FF7A00", "#008F5D", "#A87D00"];

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

interface MapSectionProps {
  schedule: DayPlanData[];
}

export const MapSection = ({ schedule }: MapSectionProps) => {
  const [params] = useSearchParams();
  const tripPlanId = Number(params.get("tripPlanId"));

  const { data: tripInfo, isLoading: isTripInfoLoading } = useQuery(tripsQueries.info(tripPlanId));

  const { data: dailyPlans, isLoading: isDailyPlansLoading } = useQuery(
    tripsQueries.dailyPlan(tripPlanId),
  );

  const dailyPlanList = dailyPlans
    ? Array.from(
        [...dailyPlans, ...schedule]
          .reduce((map, item) => map.set(item.dayNumber, item), new Map())
          .values(),
      )
    : schedule;

  const markers: MarkerOptions[] = useMemo(() => {
    if (!dailyPlanList) return [];

    return dailyPlanList.flatMap((dayPlan: DayPlanData) => {
      const dayIndex = dayPlan.dayNumber - 1;
      const color = DAY_COLORS[dayIndex % DAY_COLORS.length];

      return dayPlan.scheduledPlaces.map((scheduledPlace: SchedulePlaceData) => ({
        position: {
          lat: scheduledPlace.place.latitude,
          lng: scheduledPlace.place.longitude,
        },
        title: `${dayPlan.dayNumber}일차 ${scheduledPlace.visitOrder}번 : ${scheduledPlace.place.name}`,
        image: {
          src: createMarkerSvg(scheduledPlace.visitOrder, color),
          size: { width: 30, height: 38 },
        },
        category: `day-${dayPlan.dayNumber}`,
      }));
    });
  }, [dailyPlanList]);

  const filterOptions: MarkerFilterOption[] = useMemo(() => {
    if (!dailyPlanList) return [];

    return dailyPlanList.map((dayPlan: DayPlanData) => {
      const dayIndex = dayPlan.dayNumber - 1;
      const color = DAY_COLORS[dayIndex % DAY_COLORS.length];

      return {
        label: `${dayPlan.dayNumber}일차`,
        value: `day-${dayPlan.dayNumber}`,
        labelColor: color,
      };
    });
  }, [dailyPlanList]);

  const coords = useMemo(() => markers.map(({ position }) => position), [markers]);

  const mapCenter = useMapStore((state) => state.center);
  const mapLevel = useMapStore((state) => state.level);

  const calculatedCenter = useMemo(() => {
    if (coords.length === 1) {
      return coords[0];
    }

    if (coords.length > 1) {
      return getCenterCoordinate(coords);
    }

    return { lat: 37.5665, lng: 126.978 };
  }, [coords]);

  const calculatedLevel = useMemo(() => getMapLevel(coords), [coords]);

  const center = mapCenter ?? calculatedCenter;
  const level = mapLevel ?? calculatedLevel;

  if (isTripInfoLoading || isDailyPlansLoading || !tripInfo?.isCompleted)
    return <KakaoMapLoading />;

  return (
    <Flex flexGrow="1">
      <KakaoMap center={center} markers={markers} filterOptions={filterOptions} level={level} />
    </Flex>
  );
};
