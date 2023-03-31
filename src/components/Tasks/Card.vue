<script lang="ts" setup>
import { computed } from 'vue';
import { Task } from '../../types/models';

const emit = defineEmits<{
  (e: 'onDelete', id: string): void,
  (e: 'onComplete', id: string): void,
}>()

const props = defineProps<{
  task: Task
}>()

const completed = computed(() => props.task.completed_at !== null)

const formatDate = (dateString: Date) => {
  const date = new Date(dateString)
  return date.toLocaleString()
}
</script>

<template>
  <div class="rounded-lg shadow-md p-4" :class="[completed ? 'bg-gray-200 text-gray-500' : 'bg-white']">
    <h3 class="text-lg flex font-bold justify-between">
      <span>{{ task.titulo }}</span>
      <!-- Is completed ? -->
      <span v-if="completed" style="height: 32px; line-height: 32px;">✅</span>
      <span v-else>
        <button
          data-testid="btn-complete"
          class="bg-green-600 h-8 border-green-600 border-solid border-2 text-white text-sm font-bold px-1 py-0 rounded"
          @click="emit('onComplete', task._id)">
          Mark as done ?
        </button>
      </span>
    </h3>
    <p>{{ task.titulo }}</p>
    <div class="flex justify-between items-center mt-4">
      <span class="text-gray-500">{{ formatDate(task.created_at) }}</span>
      <button v-if="!completed" data-testid="btn-delete" class="bg-red-400 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg"
        @click="emit('onDelete', task._id)">Delete</button>
    </div>
  </div>
</template>