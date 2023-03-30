<script lang="ts" setup>
import { ref, reactive, defineEmits } from 'vue'
import { createTask } from '../../api/tasks';
import { TaskCreateForm } from '../../types/forms';
import { Task } from '../../types/models';

const emits = defineEmits<{
  (e: 'onCreate', task: Task): void
}>()

const form = reactive<TaskCreateForm>({
  titulo: '',
})
const formError = reactive<TaskCreateForm>({
  titulo: '',
})
const createErrorMessage = ref('')

const onSubmit = async () => {
  try {
    createErrorMessage.value = ''
    formError.titulo = ''
    const response = await createTask(form)

    if (response.success) {
      emits('onCreate', response.data as Task)
      form.titulo = ''
    } else {
      if (response.error) {
        createErrorMessage.value = response.error
      } else Object.assign(formError, response.data)
    }
  } catch (error: unknown) {
    console.log(error)
    createErrorMessage.value = error instanceof Error ? error.message : 'Unknown error'
  }
}
</script>

<template>
  <div>
    <h3 class="text-lg font-normal">Create a task</h3>
    <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" @submit.prevent="onSubmit">
      <div class="mb-4">
        <label for="titulo" class="block text-gray-700 text-sm-font-bold mb-2">Titulo</label>
        <input
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="username" type="text" placeholder="Username" v-model="form.titulo">
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
</template>