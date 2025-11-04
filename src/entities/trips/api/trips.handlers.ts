import { HttpResponse } from "msw";
import { createHandlers } from "@/shared/lib/msw";
import { API_PATHS } from "../config/api-paths";
import { tripsMockResponse } from "../config/trips.fixtures";
export const getTripsListHandlers = [
  createHandlers.get(API_PATHS.TRIPS.INFO._, () => tripsMockResponse),
];

export const deleteTripHandlers = [
  createHandlers.delete(`${API_PATHS.TRIPS.INFO._}/:id`, async () => {
    return new HttpResponse(null, { status: 204 });
  }),
];
