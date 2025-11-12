export const API_PATHS = {
  TRIPS: {
    INFO: {
      _: "/api/v1/trips",
      DAILY_PLANS: (tripPlanId: number) => `/api/v1/trips/daily-plans/${tripPlanId}`,
    },
  },
} as const;
