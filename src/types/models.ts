export type Task = {
  _id: string
  user_id: string
  titulo: string
  created_at: Date
  completed_at: Date | null
}