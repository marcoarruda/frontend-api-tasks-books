import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: ''
  }),
  actions: {
    setToken(token: string) {
      this.token = token
    },
    logout() {
      this.token = ''
    },
  },
  getters: {
    getToken(): string {
      return this.token
    },
    isLogged () : boolean {
      return !!this.token
    },
  },
})
