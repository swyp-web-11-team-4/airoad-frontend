import { api } from "@/shared/lib";
import { API_PATHS } from "../config/api-paths";
import type { GetTripsResponse } from "../model/trips.model";

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

export const deleteTrip = async (id: number) => {
  await api.delete(`${API_PATHS.TRIPS.INFO._}/${id}`);
  return id;
};
