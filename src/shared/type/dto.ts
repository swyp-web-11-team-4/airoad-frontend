export type ApiResponse<D extends object> = {
  success: boolean;
  status: number;
  data: D;
};
