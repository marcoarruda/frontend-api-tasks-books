import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: ''
  }),
  actions: {
    setToken(token: string) {
      this.token = token
    }
  },
  getters: {
    getToken(): string {
      return this.token
    },
  },
})
