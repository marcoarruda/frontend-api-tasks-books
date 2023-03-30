import { Task } from "../../../types/models";
import { TaskCreateForm } from "../../../types/forms";

export const stubTaskFormFailure = (): TaskCreateForm => ({
  titulo: 'Must have at least 3 characters',
})

export const stubTask = (): Task => ({
  _id: '123',
  completed_at: new Date(),
  created_at: new Date(),
  titulo: 'Test task',
  user_id: '123',
})