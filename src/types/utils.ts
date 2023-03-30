export type Paginator<T> = {
  totalPages: number,
  totalTask: number,
  tasks: T[],
}