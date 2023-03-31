<script lang="ts" setup>
import { onMounted } from 'vue';
import { Task } from '../../types/models';

const emit = defineEmits<{
  (e: 'onDelete', id: string): void
}>()

const props = defineProps<{
  task: Task
}>()

const formatDate = (dateString: Date) => {
  const date = new Date(dateString)
  return date.toLocaleString()
}
</script>

<template>
  <div class="bg-white rounded-lg shadow-md p-4">
    <h3 class="text-lg font-bold">{{ task.titulo }}</h3>
    <p>{{ task.titulo }}</p>
    <div class="flex justify-between items-center mt-4">
      <span class="text-gray-500">{{ formatDate(task.created_at) }}</span>
      <button class="bg-red-400 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg"
        @click="emit('onDelete', task._id)">Delete</button>
    </div>
  </div>
</template>