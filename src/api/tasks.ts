import { API_ADDRESS } from ".";

import { useAuthStore } from "../stores/auth";
import { Task } from "../types/models";

export async function getTasks(): Promise<Task[]> {
  const store = useAuthStore()

  const response = await fetch(`${API_ADDRESS}/tasks`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${store.getToken}`
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.msg);
  }

  const data = await response.json();
  const tasks: Task[] = data.tasks || [];

  return tasks
}