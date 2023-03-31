import { Task } from "../../../types/models";
import { TaskCreateForm } from "../../../types/forms";

import { faker } from '@faker-js/faker'

export const stubTaskFormFailure = (): TaskCreateForm => ({
  titulo: 'Must have at least 3 characters',
})

export const stubTask = (data: Partial<Task> = {}): Task => ({
  _id: faker.database.mongodbObjectId(),
  user_id: faker.database.mongodbObjectId(),
  completed_at: faker.helpers.arrayElement([faker.date.recent(2), null]),
  created_at: faker.date.recent(10),
  titulo: faker.lorem.words(3),
  ...data,
})
