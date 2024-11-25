import { ref } from 'vue'
import { unfollowUserFetch } from '../FollowApi'
import { AxiosResponse } from 'axios'
import ApiResponse from '@/core/common/types/ApiResponse'
import { setError, setLoading } from '@/core/challenge/utils/settingUtils'

export const useUserUnfollow = (
  unfollowUserFetch: (targetUserId: number) => Promise<AxiosResponse<ApiResponse>>
) => {
  const loading = ref(false)
  const error = ref('')

  const handleUnfollow = async (targetUserId: number) => {
    const state = { loading, error }
    setLoading(state, true)
    setError(state, '')

    try {
      const response = await unfollowUserFetch(targetUserId)
      return response
    } catch (e) {
      error.value = '언팔로우에 실패했습니다.'
      console.error(e)
      return false
    } finally {
      loading.value = false
    }
  }

  return {
    loading,
    error,
    handleUnfollow
  }
}
