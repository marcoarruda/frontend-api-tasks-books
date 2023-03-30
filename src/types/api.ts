export type ApiResponse<T, U> = {
  success: boolean,
  data: T | U,
  error: string | null,
}

export type ApiGenericError = {
  msg: string,
}
