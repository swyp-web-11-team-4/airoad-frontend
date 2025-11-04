import { setupWorker } from "msw/browser";
import { deleteTripHandlers, getTripsListHandlers } from "@/entities/trips/api/trips.handlers";
import { createUserHandlers, userHandlers } from "@/entities/user";

export const worker = setupWorker(
  ...userHandlers,
  ...createUserHandlers,
  ...getTripsListHandlers,
  ...deleteTripHandlers,
);
