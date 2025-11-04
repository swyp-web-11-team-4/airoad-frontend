import { API_PATHS } from "@/shared/config";
import { api } from "@/shared/lib/axios";
import type { GetMeResponse } from "../model";

export const getMe = async () => {
  const { data } = await api.get<GetMeResponse>(API_PATHS.MEMBERS.ME._);
  return data;
};
