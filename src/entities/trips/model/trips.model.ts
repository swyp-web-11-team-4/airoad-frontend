import type { ApiResponse } from "@/shared/type";

export interface Trip {
  planId: number;
  imageUrl: string;
  title: string;
  startDate: string;
  region: string;
}

export interface Trips {
  content: Trip[];
}

export type GetTripsResponse = ApiResponse<Trips>;
