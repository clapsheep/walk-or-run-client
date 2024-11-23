import { useModalStore } from '@/stores/modalStore'
import type { AxiosResponse } from 'axios'
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'

import { AuthCredentials, AuthResponse, handleLoginSuccess, validateLoginForm, type LoginErrors } from '../services/loginService'

export const useLogin = (
  loginFetch: (credentials: AuthCredentials) => Promise<AxiosResponse<AuthResponse>>
) => {
  const router = useRouter()
  const modalStore = useModalStore()
  const isLoading = ref(false)
  const error = ref('')
  const errors = ref<LoginErrors>({})
  const form = ref<AuthCredentials>({
    userEmail: '',
    userPassword: ''
  })


  const validateForm = () => {
    errors.value = validateLoginForm(form.value)
    return Object.keys(errors.value).length === 0
  }

  const isFormValid = computed(() => {
    return form.value.userEmail &&
           form.value.userPassword &&
           Object.keys(errors.value).length === 0
  })

  const login = async (credentials: AuthCredentials) => {
    if (isLoading.value) return false

    form.value = credentials


    isLoading.value = true
    error.value = ''

    try {
      const { data } = await loginFetch(credentials)

      if (data.access_token) {
        const success = handleLoginSuccess(data.access_token)
        if (success) {
          modalStore.openModal({
            title: '로그인 성공',
            content: '환영합니다!',
            onConfirm: () => router.push('/')
          })
          return true
        }
      }

      error.value = data.message || '로그인에 실패했습니다.'
      return false
    } catch (err: any) {
      error.value = err.response?.data?.message || '로그인 중 오류가 발생했습니다.'
      modalStore.openModal({
        title: '오류',
        content: error.value
      })
      return false
    } finally {
      isLoading.value = false
    }
  }

  return {
    login,
    form,
    errors,
    isLoading,
    error,
    isFormValid
  }
}
