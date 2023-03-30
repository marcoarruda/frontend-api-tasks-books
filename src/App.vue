<script setup lang="ts">
import { onMounted } from 'vue';
import NavBar from './components/NavBar.vue';
import router from './router';
import { useAuthStore } from './stores/auth';

const authStore = useAuthStore();

onMounted(() => {
  if(authStore.checkAuth()) {
    router.push('/dashboard')
  }
})

</script>

<template>
  <!-- navbar -->
  <NavBar v-if="authStore.isLogged" />

  <!-- current page -->
  <div class="mt-10">
    <RouterView v-slot="{ Component }">
      <transition enter-active-class="duration-300 ease-out" enter-from-class="transform opacity-0"
        enter-to-class="opacity-100" leave-active-class="duration-300 ease-in" leave-from-class="opacity-100"
        leave-to-class="transform opacity-0">
        <Component :is="Component" :key="$route.fullPath" />
      </transition>
    </RouterView>
  </div>
</template>
