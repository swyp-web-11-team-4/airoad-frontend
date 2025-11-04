import { order } from "@/shared/config";
import { createOrderString } from "@/shared/lib";
import { type Field, field } from "../config";
export const createTravelSort = (value: Field) => {
  if (value === field.createdAt) {
    return createOrderString(field.createdAt, order.asc);
  }
  return createOrderString(field.startDate, order.desc);
};
