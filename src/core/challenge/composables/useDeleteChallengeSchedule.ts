import { ref } from 'vue'
import { setLoading, setError } from '../utils/settingUtils'
import { handleError } from '../services/challengesService'
import { Challenge } from '../ChallengeType'
import { AxiosResponse } from 'axios'
import ApiResponse from '@/core/common/types/ApiResponse'

export const useDeleteChallengeSchedule = (
  deleteChallengeScheduleFetch: (challengeId: number) => Promise<AxiosResponse<ApiResponse>>
) => {
  const loading = ref(false)
  const error = ref('')

  const deleteSchedule = async (schedule: Challenge): Promise<AxiosResponse<ApiResponse>> => {
    const state = { loading, error }
    setLoading(state, true)
    setError(state, '')

    try {
      if(schedule.challengeId) {
        const response =await deleteChallengeScheduleFetch(schedule.challengeId)
        return response
      } else {
        return {} as AxiosResponse<ApiResponse>
      }
    } catch (err: any) {
      setError(state, handleError(err))
      console.error('스케줄 삭제에 실패했습니다:', err)
      return {} as AxiosResponse<ApiResponse>
    } finally {
      setLoading(state, false)
    }
  }

  return {
    loading,
    error,
    deleteSchedule
  }
}
