import { api } from "@/shared/lib";
import { API_PATHS } from "../config/api-paths";
import type {
  CreateTrip,
  GetDailyPlanListResponse,
  GetStateTripIdResponse,
  GetTripPlanInfoResponse,
  GetTripsResponse,
} from "../model/trips.model";

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

export const getTripInfo = async (tripPlanId: number) => {
  const { data } = await api.get<GetTripPlanInfoResponse>(
    `${API_PATHS.TRIPS.INFO._}/${tripPlanId}`,
  );
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

export const deleteTrip = async (tripPlanId: number) => {
  await api.delete(`${API_PATHS.TRIPS.INFO._}/${tripPlanId}`);
  return tripPlanId;
};

export const postTripPlan = async (id: number) => {
  await api.post(`${API_PATHS.TRIPS.INFO._}/${id}`);
  return id;
};

export const getDailyPlans = async (tripPlanId: number) => {
  const { data } = await api.get<GetDailyPlanListResponse>(
    API_PATHS.TRIPS.INFO.DAILY_PLANS(tripPlanId),
  );
  return data;
};
