<template>
  <div class="max-w-3xl mx-auto p-8">
    <h2 class="text-2xl font-bold mb-4">Tasks</h2>
    <!-- Error -->
    <div v-if="errorMessage" role="alert"
      class="space-y-4 bf-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
      {{ errorMessage }}
    </div>
    <template v-else>
      <!-- Create task form -->
      <div>
        <h3 class="text-lg font-normal">Create a task</h3>
        <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" @submit.prevent="onSubmit">
          <div class="mb-4">
            <label for="titulo" class="block text-gray-700 text-sm-font-bold mb-2">Titulo</label>
            <input
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="username" type="text" placeholder="Username" v-model="titulo">
            <div v-if="formError.titulo" class="text-sm text-red-500">{{ formError.titulo }}</div>
          </div>
          <div v-if="createErrorMessage" class="text-red-500">{{ createErrorMessage }}</div>
          <div class="flex items-center justify-between">
            <button
              class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button" @click="onSubmit">
              Create task
            </button>
          </div>
        </form>
      </div>

      <!-- Tasks -->
      <div class="space-y-4" v-if="tasks.length > 0">
        <div v-for="task in tasks" :key="task._id" class="bg-white rounded-lg shadow-md p-4">
          <h3 class="text-lg font-bold">{{ task.titulo }}</h3>
          <p>{{ task.titulo }}</p>
          <div class="flex justify-between items-center mt-4">
            <span class="text-gray-500">{{ formatDate(task.created_at) }}</span>
            <button class="bg-red-400 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg"
              @click="onDelete(task._id)">Delete</button>
          </div>
        </div>
      </div>

      <!-- no tasks -->
      <div class="space-y-4" v-else>
        <h3 class="text-lg font-thin text-gray-500 text-center">- No tasks found -</h3>
      </div>
    </template>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, reactive } from 'vue'
import { Task } from '../types/models'
import { getTasks, createTask, deleteTask } from '../api/tasks'
import { TaskCreateForm } from '../types/forms';

const tasks = ref<Task[]>([])
const titulo = ref('')
const errorMessage = ref('')
const formError = reactive<TaskCreateForm>({
  titulo: '',
})
const createErrorMessage = ref('')
const deleteErrorMessage = ref('')

const onDelete = async (id: string) => {
  try {
    const response = await deleteTask(id)
    if (response.success) {
      tasks.value = tasks.value.filter((task) => task._id !== id)
    } else {
      alert(response.data!.msg)
      console.error('Error deleting task:', response)
    }
  } catch (error) {
    console.error(error)
  }
}

const onSubmit = async () => {
  try {
    createErrorMessage.value = ''
    formError.titulo = ''
    const response = await createTask(titulo.value)

    if (response.success) {
      tasks.value = [...tasks.value, response.data!]
    } else {
      formError.titulo = response.data?.titulo ?? ''
    }
  } catch (error: unknown) {
    console.log(error)
    createErrorMessage.value = error instanceof Error ? error.message : 'Unknown error'
  }
}

const fetchTasks = async () => {
  try {
    tasks.value = await getTasks()
  } catch (error: unknown) {
    errorMessage.value = error instanceof Error ? error.message : 'Unknown error'
  }
}

const formatDate = (dateString: Date) => {
  const date = new Date(dateString)
  return date.toLocaleString()
}

onMounted(fetchTasks)
</script>
