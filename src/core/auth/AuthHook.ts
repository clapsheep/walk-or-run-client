import { ref } from 'vue'
import { findPasswordFetch } from './AuthApi'
import type User from '../user/UserType'
import type ApiResponse from '../common/ApiResponse'

export const useFindPassword = () => {
  const error = ref('')
  const isLoading = ref(false)

  const findPassword = async (userData: User): Promise<boolean> => {
    isLoading.value = true
    error.value = ''

    try {
      const response = await findPasswordFetch(userData)
      const data = response.data as ApiResponse

      if (data.message === 'success') {
        return true
      }
      return false
    } catch (err: any) {
      console.error('비밀번호 찾기 중 오류:', err)
      error.value = '입력하신 정보가 일치하지 않습니다'
      throw err
    } finally {
      isLoading.value = false
    }
  }

  return {
    findPassword,
    error,
    isLoading
  }
}
