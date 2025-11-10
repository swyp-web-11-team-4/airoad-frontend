import type { ApiResponse } from "@/shared/type";

export interface Trip {
  id: number;
  imageUrl: string;
  title: string;
  startDate: string;
  region: string;
  chatRoomId: number;
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
export type DayPlanData = {
  id: number;
  dayNumber: 1 | 2 | 3 | 4 | 5 | 6;
  date: string;
  title: string;
  description: string;
  scheduledPlaces: SchedulePlaceData[];
};
export type SchedulePlaceData = {
  id: number;
  placeId: number;
  visitOrder: number;
  category: "MORNING" | "LUNCH" | "AFTERNOON" | "DINNER" | "EVENING";
  startTime: string;
  endTime: string;
  travelTime: number;
  transportation: "PUBLIC_TRANSIT" | "WALKING" | "CAR";
};
export type ChatMessage = {
  type: "COMPLETED";
  content: string;
  createdAt?: string;
};

export type ErrorMessage = {
  code: string;
  message: string;
  detail?: unknown;
};

export type ScheduleMessage = {
  type: "DAILY_PLAN_GENERATED";
  tripPlanId: number;
  dailyPlan: DayPlanData;
};

export type GetTripsResponse = ApiResponse<Trips>;
export type GetStateTripIdResponse = ApiResponse<TripId>;
export type GetTripPlanInfoResponse = ApiResponse<TripPlanInfo>;
