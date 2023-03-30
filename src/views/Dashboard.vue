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
      <CreateTaskForm @onCreate="onCreate" />

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
import { onMounted, ref } from 'vue'
import { Task } from '../types/models'
import { getTasks, deleteTask } from '../api/tasks'
import CreateTaskForm from '../components/Tasks/Create.vue';

const tasks = ref<Task[]>([])
const errorMessage = ref('')

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

const onCreate = (task: Task) => {
  tasks.value = [task, ...tasks.value]
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
