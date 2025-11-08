import { api } from "@/shared/lib";
import { API_PATHS } from "../config/api-paths";
import type { CreateTrip, GetStateTripIdResponse, GetTripsResponse } from "../model/trips.model";

export const getTripsList = async (
  cursor?: number | null,
  sort: string = "createdAt:desc",
  size = 20,
) => {
  const { data } = await api.get<GetTripsResponse>(API_PATHS.TRIPS.INFO._, {
    params: { cursor, sort, size },
  });

  return data;
};

export const postTrip = async ({
  themes,
  startDate,
  duration,
  region,
  peopleCount,
}: CreateTrip) => {
  const { data } = await api.post<GetStateTripIdResponse>(API_PATHS.TRIPS.INFO._, {
    themes,
    startDate,
    duration,
    region,
    peopleCount,
  });

  return data;
};

export const deleteTrip = async (id: number) => {
  await api.delete(`${API_PATHS.TRIPS.INFO._}/${id}`);
  return id;
};

export const postTripPlan = async (id: number) => {
  await api.post(`${API_PATHS.TRIPS.INFO._}/${id}`);
  return id;
};
