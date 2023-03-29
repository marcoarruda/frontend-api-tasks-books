<template>
  <nav class="flex-no-wrap relative flex w-full items-center justify-between bg-neutral-100 py-4 shadow-md">
    <div class="relative flex items-start px-4">
      Frontend Project
    </div>
    <div class="relative flex items-center px-4">
      <button class="bg-red-400 hover:bg-red-600 text-white py-2 px-4 rounded" @click="logout">
        Logout
      </button>
    </div>
  </nav>
</template>

<script lang="ts" setup>
import router from '../router';
import { useAuthStore } from '../stores/auth';

const authStore = useAuthStore();


const logout = () => {
  authStore.logout()

  router.push('/')
}
</script>
