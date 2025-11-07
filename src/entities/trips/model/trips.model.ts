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

export type GetTripsResponse = ApiResponse<Trips>;
