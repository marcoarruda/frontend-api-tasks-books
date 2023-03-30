import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: ''
  }),
  actions: {
    setToken(token: string) {
      this.token = token
      localStorage.setItem('token', token)
    },
    logout() {
      this.token = ''
      localStorage.removeItem('token')
    },
    checkAuth() {
      const token = localStorage.getItem('token')
      if (token) {
        this.setToken(token)
        return true
      }
      return false
    }
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
