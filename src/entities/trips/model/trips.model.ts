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

export type ChatMessage = {
  type: "SYSTEM" | "USER" | "AI" | "STREAM";
  content: string;
  createdAt?: string;
};

export type StreamStatus = "PENDING" | "COMPLETED" | "CANCELLED";

export type DailyPlanItem = {
  day: number;
  places: Array<{
    name: string;
    time?: string;
  }>;
  transfers?: Array<{
    from: string;
    to: string;
    distanceKm?: number;
    durationMin?: number;
  }>;
};

export type DailyPlanSavedPayload = {
  tripPlanId: number;
  plans: DailyPlanItem[];
};

export type ErrorPayload = {
  code: string;
  message: string;
  detail?: unknown;
};

export type GetTripsResponse = ApiResponse<Trips>;
export type GetStateTripIdResponse = ApiResponse<TripId>;
