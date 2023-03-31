import { API_ADDRESS } from ".";

import { useAuthStore } from "../stores/auth";
import { ApiGenericError, ApiResponse } from "../types/api";
import { TaskCreateForm } from "../types/forms";
import { Task } from "../types/models";
import { Paginator } from "../types/utils";

export default {
  getTasks: async function (page: number, limit: number): Promise<Paginator<Task>> {
    const store = useAuthStore()

    const response = await fetch(`${API_ADDRESS}/tasks?page=${page}&limit=${limit}`, {
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

    const paginator = await response.json();

    return paginator
  },

  createTask: async function (form: TaskCreateForm): Promise<ApiResponse<Task, TaskCreateForm | ApiGenericError>> {
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
      body: JSON.stringify(form),
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
  },

  deleteTask: async function (id: string): Promise<ApiResponse<ApiGenericError, ApiGenericError>> {
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
  },

  completeTask: async function (id: string): Promise<ApiResponse<Task, ApiGenericError>> {
    let success = true
    let data = null
    let error = null

    const store = useAuthStore()

    const response = await fetch(`${API_ADDRESS}/tasks/${id}/completed`, {
      method: "PUT",
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
  },

}