import { ref } from 'vue'
import { getFollowersFetch } from '../FollowApi'
import User from '../UserType'
import { setError, setLoading } from '@/core/challenge/utils/settingUtils'
import { AxiosResponse } from 'axios'
import ApiResponse from '@/core/common/types/ApiResponse'

export const useUserFollowerList = (
  getFollowersFetch: () => Promise<AxiosResponse<User[] | ApiResponse>>
) => {
  const followers = ref<User[]>([])
  const loading = ref(false)
  const error = ref('')

  const fetchFollowers = async () => {
    const state = { loading, error }
    setLoading(state, true)
    setError(state, '')

    try {
      const response = await getFollowersFetch()
      return response
    } catch (e) {
      error.value = '팔로워 목록을 불러오는데 실패했습니다.'
      console.error(e)
    } finally {
      loading.value = false
    }
  }

  return {
    followers,
    loading,
    error,
    fetchFollowers
  }
}
