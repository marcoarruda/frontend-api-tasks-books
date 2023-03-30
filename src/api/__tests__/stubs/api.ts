import { ApiResponse } from "../../../types/api";

export const stubApiResponse = <T, U>(success?: boolean, data?: T | U | null, error?: string | null): ApiResponse<T, U> => ({
  success: success ?? true,
  data: data ?? null,
  error: error ?? null,
})
