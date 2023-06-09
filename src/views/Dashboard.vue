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
        <div>
          <p>Total tasks: {{ paginator.total }} - Showing {{  countTasks }} tasks on page {{ `${currentPage}/${paginator.totalPages ?? 1}` }}</p>
          <button @click="onPrevPage" :disabled="!canPrev" :class="[ canPrev ? 'bg-blue-500 hover:bg-blue-700' : 'bg-gray-400' ]" class="mx-1 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">&lt;</button>
          <button @click="onNextPage" :disabled="!canNext" :class="[ canNext ? 'bg-blue-500 hover:bg-blue-700' : 'bg-gray-400' ]" class="mx-1 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">&gt;</button>
        </div>
        <TaskCard :task="task" v-for="task in tasks" :key="task._id" @onDelete="onDelete" @onComplete="onComplete" />
      </div>

      <!-- no tasks -->
      <div class="space-y-4" v-else>
        <h3 class="text-lg font-thin text-gray-500 text-center">- No tasks found -</h3>
      </div>
    </template>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, reactive, computed, ref } from 'vue'
import { Task } from '../types/models'
import apiTasks from '../api/tasks'
import CreateTaskForm from '../components/Tasks/Create.vue';
import TaskCard from '../components/Tasks/Card.vue';
import { ApiGenericError } from '../types/api';

const tasks = ref<Task[]>([])
const errorMessage = ref('')
const paginator = reactive({
  total: 0,
  totalPages: 0,
})

const currentPage = ref(1)
const tasksPerPage = 5

const canPrev = computed(() => currentPage.value > 1)
const canNext = computed(() => currentPage.value < paginator.totalPages)

const onPrevPage = () => {
  if (canPrev.value) {
    currentPage.value--
    fetchTasks()
  }
}

const onNextPage = () => {
  if (canNext.value) {
    currentPage.value++
    fetchTasks()
  }
}

const countTasks = computed(() => tasks.value.length)

const onDelete = async (id: string) => {
  try {
    const response = await apiTasks.deleteTask(id)
    if (response.success) {
      tasks.value = tasks.value.filter((task) => task._id !== id)

      if (tasks.value.length === 0 && currentPage.value > 1) {
        currentPage.value--
      }

      fetchTasks()
    } else {
      alert(response.data!.msg)
      console.error('Error deleting task:', response)
    }
  } catch (error) {
    console.error(error)
  }
}

const onComplete = async (id: string) => {
  try {
    const response = await apiTasks.completeTask(id)
    if (response.success) {
      tasks.value = tasks.value.map((task) => {
        if (task._id === id) {
          return (response.data! as Task)
        }
        return task
      })
    } else {
      alert((response.data! as ApiGenericError).msg)
      console.error('Error completing task:', response)
    }
  } catch (error) {
    console.error(error)
  }
}

const onCreate = (task: Task) => {
  currentPage.value = 1
  fetchTasks()
}

const fetchTasks = async () => {
  try {
    const response = await apiTasks.getTasks(currentPage.value, tasksPerPage)
    tasks.value = response.tasks
    paginator.total = response.totalTask
    paginator.totalPages = response.totalPages
  } catch (error: unknown) {
    errorMessage.value = error instanceof Error ? error.message : 'Unknown error'
  }
}

onMounted(fetchTasks)
</script>
