export type ApiResponse<T, U> = {
  success: boolean,
  data: T | U | null,
  error: string | null,
}

export type ApiGenericError = {
  msg: string,
}
