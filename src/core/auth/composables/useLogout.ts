import type { AxiosResponse } from 'axios'
import type ApiResponse from '@/core/common/types/ApiResponse'
import { useRouter } from 'vue-router'
import { useModalStore } from '@/stores/modalStore'
import { handleLogout } from '../services/logoutService'
import { ref } from 'vue'

export const useLogout = (
  logoutFetch: () => Promise<AxiosResponse<ApiResponse>>
) => {
  const router = useRouter()
  const modalStore = useModalStore()
  const isLoading = ref(false)
  const error = ref('')

  const logout = async () => {
    if (isLoading.value) return false


    isLoading.value = true
    error.value = ''

    try {
      await logoutFetch()
        handleLogout()
        modalStore.openModal({
          title: '로그아웃',
          content: '로그아웃되었습니다.',
          confirmText: '확인',
          onConfirm: () => {
            router.push('/signin')
          }
        })
        return true
    } catch (err: any) {
      error.value = err.response?.data?.message || '로그아웃 중 오류가 발생했습니다.'
      modalStore.openModal({
        title: '오류',
        content: error.value,
        confirmText: '확인'
      })
      return false
    } finally {
      isLoading.value = false
    }
  }

  return {
    isLoading,
    error,
    logout
  }
}
