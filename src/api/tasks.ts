import { API_ADDRESS } from ".";

import { useAuthStore } from "../stores/auth";
import { ApiGenericError, ApiResponse } from "../types/api";
import { TaskCreateForm } from "../types/forms";
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

export async function createTask(titulo: string): Promise<ApiResponse<Task, TaskCreateForm>> {
  let success = true
  let data = null
  let error = null

  const store = useAuthStore()

  const response = await fetch(`${API_ADDRESS}/tasks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${store.getToken}`
    },
    body: JSON.stringify({ titulo }),
  });


  if (!response.ok) {
    success = false
  }

  try {
    data = await response.json()
  } catch (error: unknown) {
    throw new Error(error instanceof Error ? error.message : 'Unknown error');
  }

  return { success, data, error }
}

export async function deleteTask(id: string): Promise<ApiResponse<ApiGenericError, ApiGenericError>> {
  let success = true
  let data = null
  let error = null

  const store = useAuthStore()

  const response = await fetch(`${API_ADDRESS}/tasks/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${store.getToken}`
    },
  });


  if (!response.ok) {
    success = false
  }

  try {
    data = await response.json()
  } catch (error: unknown) {
    throw new Error(error instanceof Error ? error.message : 'Unknown error');
  }

  return { success, data, error }
}
