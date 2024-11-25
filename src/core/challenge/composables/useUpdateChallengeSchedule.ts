import { ref } from 'vue'
import { setLoading, setError } from '../utils/settingUtils'
import { handleError } from '../services/challengesService'
import { Challenge } from '../ChallengeType'
import { AxiosResponse } from 'axios'
import ApiResponse from '@/core/common/types/ApiResponse'

export const useUpdateChallengeSchedule = (
  updateChallengeScheduleFetch: (challenge: Challenge) => Promise<AxiosResponse<ApiResponse>>
) => {
  const loading = ref(false)
  const error = ref('')

  const updateSchedule = async (schedule: Challenge, cycle: number): Promise<AxiosResponse<ApiResponse>> => {
    const state = { loading, error }
    setLoading(state, true)
    setError(state, '')

    try {
      const updatedSchedule = {
        ...schedule,
        challengeSchedulerCycle: cycle,
      }

      const response = await updateChallengeScheduleFetch(updatedSchedule)
      return response
    } catch (err: any) {
      setError(state, handleError(err))
      console.error('스케줄 업데이트에 실패했습니다:', err)
      return {} as AxiosResponse<ApiResponse>
    } finally {
      setLoading(state, false)
    }
  }

  return {
    loading,
    error,
    updateSchedule
  }
}
