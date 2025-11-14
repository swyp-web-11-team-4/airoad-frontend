import type { ApiResponse } from "@/shared/type";

export interface Trip {
  id: number;
  imageUrl: string;
  title: string;
  startDate: string;
  region: string;
  chatRoomId: number;
  isCompleted: boolean;
}

export interface Trips {
  content: Trip[];
  nextCursor: number | null;
  hasNext: boolean;
  size: number;
}

export interface TripPlanInfo {
  tripPlanId: number;
  title: string;
  region: string;
  startDate: string;
  duration: number;
  peopleCount: number;
  themes: string[];
  isCompleted: boolean;
}

export type TripId = {
  conversationId: number;
  tripPlanId: number;
};

export type CreateTrip = {
  themes: string[];
  startDate: string;
  duration: number;
  region: string;
  peopleCount: number;
};

export type CategoryType = "MORNING" | "AFTERNOON" | "EVENING";

export type ThemeType =
  | "FAMOUS_SPOT"
  | "EXPERIENCE_ACTIVITY"
  | "SNS_HOTSPOT"
  | "HEALING"
  | "CULTURE_ART"
  | "SHOPPING";

export type Place = {
  id: number;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  description: string;
  imageUrl: string;
  operatingHours: string | null;
  holidayInfo: string | null;
  isMustVisit: boolean;
  themes: ThemeType[];
};

export type SchedulePlaceData = {
  id: number;
  visitOrder: number;
  category: CategoryType;
  startTime: string;
  endTime: string;
  travelTime: number;
  transportation: "PUBLIC_TRANSIT" | "WALKING" | "CAR";
  place: Place;
};

export type DayPlanData = {
  id: number;
  dayNumber: 1 | 2 | 3 | 4 | 5 | 6;
  date: string;
  title: string;
  description: string;
  scheduledPlaces: SchedulePlaceData[];
};

export type ErrorMessage = {
  code: string;
  message: string;
  detail?: unknown;
};

export type ScheduleMessage = {
  type: "DAILY_PLAN_GENERATED" | "COMPLETED";
  tripPlanId: number;
  dailyPlan: DayPlanData;
  message: string;
};
export type GetTripsResponse = ApiResponse<Trips>;
export type GetStateTripIdResponse = ApiResponse<TripId>;
export type GetTripPlanInfoResponse = ApiResponse<TripPlanInfo>;
export type GetDailyPlanListResponse = ApiResponse<DayPlanData[]>;
