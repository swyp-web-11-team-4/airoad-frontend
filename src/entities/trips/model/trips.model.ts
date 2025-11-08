import type { ApiResponse } from "@/shared/type";

export interface Trip {
  id: number;
  imageUrl: string;
  title: string;
  startDate: string;
  region: string;
}

export interface Trips {
  content: Trip[];
  nextCursor: number | null;
  hasNext: boolean;
  size: number;
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

export type SchedulePlaceData = {
  id: number;
  placeId: number;
  visitOrder: number;
  category: "MORNING" | "LUNCH" | "AFTERNOON" | "DINNER";
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
  dailyPlan: {
    id: number;
    dayNumber: number;
    date: string;
    title: string;
    description: string;
    scheduledPlaces: SchedulePlaceData[];
  };
};

export type GetTripsResponse = ApiResponse<Trips>;
export type GetStateTripIdResponse = ApiResponse<TripId>;
