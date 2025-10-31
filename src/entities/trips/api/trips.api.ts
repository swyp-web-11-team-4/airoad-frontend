import { api } from "@/shared/lib";
import { API_PATHS } from "../config/api-paths";
import type { GetTripsResponse } from "../model/trips.model";

export const getTripsList = async () => {
  const { data } = await api.get<GetTripsResponse>(API_PATHS.TRIPS.INFO._);
  return data;
};
