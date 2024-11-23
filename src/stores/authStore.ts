import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const tempEmail = ref('')
  
  const setTempEmail = (email: string) => {
    tempEmail.value = email
  }

  const clearTempEmail = () => {
    tempEmail.value = ''
  }

  return {
    tempEmail,
    setTempEmail,
    clearTempEmail
  }
})
