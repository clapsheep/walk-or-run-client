import { ref } from 'vue'
import { getFollowingsFetch } from '../FollowApi'
import User from '../UserType'
import { setError, setLoading } from '@/core/challenge/utils/settingUtils'
import { AxiosResponse } from 'axios'
import ApiResponse from '@/core/common/types/ApiResponse'

export const useUserFollowingList = (
  getFollowingsFetch: () => Promise<AxiosResponse<User[] | ApiResponse>>
) => {
  const followings = ref<User[]>([])
  const loading = ref(false)
  const error = ref('')

  const fetchFollowings = async () => {
    const state = { loading, error }
    setLoading(state, true)
    setError(state, '')

    try {
      const response = await getFollowingsFetch()
      return response
    } catch (e) {
      error.value = '팔로잉 목록을 불러오는데 실패했습니다.'
      console.error(e)
    } finally {
      loading.value = false
    }
  }

  return {
    followings,
    loading,
    error,
    fetchFollowings
  }
}
