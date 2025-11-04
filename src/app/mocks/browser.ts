import { setupWorker } from "msw/browser";
import { userHandlers } from "@/entities/member";
import { deleteTripHandlers, getTripsListHandlers } from "@/entities/trips/api/trips.handlers";

export const worker = setupWorker(...userHandlers, ...getTripsListHandlers, ...deleteTripHandlers);
