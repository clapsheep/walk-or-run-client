import { ref } from 'vue'
import { AxiosResponse } from 'axios'
import ApiResponse from '@/core/common/types/ApiResponse'
import { setError, setLoading } from '@/core/challenge/utils/settingUtils'

export const useUserFollow = (
  followUserFetch: (targetUserId: number) => Promise<AxiosResponse<ApiResponse>>
) => {
  const loading = ref(false)
  const error = ref('')

  const handleFollow = async (targetUserId: number) => {
    const state = { loading, error }
    setLoading(state, true)
    setError(state, '')

    try {
      const response =await followUserFetch(targetUserId)
      return response
    } catch (e) {
      error.value = '팔로우에 실패했습니다.'
      console.error(e)
    } finally {
      loading.value = false
    }
  }

  return {
    loading,
    error,
    handleFollow
  }
}
