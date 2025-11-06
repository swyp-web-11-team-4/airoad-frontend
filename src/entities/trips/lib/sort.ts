import { order } from "@/shared/config";
import { createOrderString } from "@/shared/lib";
import { type Field, field } from "../config/field.ts";
export const createTripSort = (value: Field) => {
  if (value === field.createdAt) {
    return createOrderString(field.createdAt, order.asc);
  }
  return createOrderString(field.startDate, order.desc);
};
