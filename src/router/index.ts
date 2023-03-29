import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'
import Dashboard from '../views/Dashboard.vue'

const publicRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
]

const guardedRoutes: Array<RouteRecordRaw> = [
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes: [...publicRoutes, ...guardedRoutes],
})

router.beforeEach(async (to, from, next) => {
  const publicPages = ['/']
  const authRequired = !publicPages.includes(to.path)
  const useAuthStore = () => import('../stores/auth').then(mod => mod.useAuthStore())
  const authStore = await useAuthStore()
  const loggedIn = authStore.getToken

  if (authRequired && !loggedIn) {
    return next('/')
  }

  next()
})

export default router
