import { createHandlers } from "@/shared/lib/msw";
import { API_PATHS } from "../config/api-paths";
import { tripsMockResponse } from "../config/trips.fixtures";
export const getTripsListHandlers = [
  createHandlers.get(API_PATHS.TRIPS.INFO._, () => tripsMockResponse),
];
