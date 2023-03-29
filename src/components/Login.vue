<template>
  <div class="flex items-center justify-center">
    <div class="bg-white rounded-lg p-8 shadow-md">
      <h2 class="text-2xl font-bold mb-4">Login</h2>
      <form class="space-y-4" @submit.prevent="submitForm">
        <div>
          <label class="block font-medium">Email:</label>
          <input class="w-full px-3 py-2 border rounded-lg" type="email" v-model.trim="email" required>
        </div>
        <div>
          <label class="block font-medium">Password:</label>
          <input class="w-full px-3 py-2 border rounded-lg" type="password" v-model.trim="password" required>
        </div>
        <div>
          <button class="w-full py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-lg"
            type="submit">Login</button>
        </div>
        <div v-if="errorMessage" class="text-red-500">{{ errorMessage }}</div>
      </form>
    </div>
  </div>
</template>


<script lang="ts" setup>
import { ref } from 'vue'
import { useAuthStore } from '../stores/auth'
import { useLogin } from '../api/auth'
import router from '../router'
const email = ref('')
const password = ref('')
const errorMessage = ref('')
const authStore = useAuthStore()

async function submitForm() {
  try {
    const token = await useLogin(email.value, password.value) // make API call to login
    authStore.setToken(token) // save token in Pinia store
    router.push('/dashboard') // navigate to dashboard on successful login
  } catch (error) {
    console.log(error)
    // @ts-ignore
    errorMessage.value = error.message
  }
}
</script>