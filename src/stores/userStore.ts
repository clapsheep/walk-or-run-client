import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore('user', () => {
  const userId = ref<string | null>(null)
  const userEmail = ref<string | null>(null)
  const userRole = ref<string | null>(null)

  const setUserInfo = (id: string, email: string, role: string) => {
    userId.value = id
    userEmail.value = email
    userRole.value = role
  }

  const clearUserInfo = () => {
    userId.value = null
    userEmail.value = null
    userRole.value = null
  }

  return {
    userId,
    userEmail,
    userRole,
    setUserInfo,
    clearUserInfo
  }
})
