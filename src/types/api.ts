export type ApiResponse<T, U> = {
  success: boolean,
  data: T | null,
  error: U | null,
}
