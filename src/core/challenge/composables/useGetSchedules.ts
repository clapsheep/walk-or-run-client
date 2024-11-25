import { ref } from 'vue'
import { setLoading, setError } from '../utils/settingUtils'
import { handleError } from '../services/challengesService'
import router from '@/router'
import { AxiosResponse } from 'axios'
import ApiResponse from '@/core/common/types/ApiResponse'
import { Challenge } from '../ChallengeType'
import { updateChallengeFetch } from '../AdminChallengeApi'

export const useGetSchedules = (
  getChallengeSchedulesFetch: () => Promise<AxiosResponse<Challenge[] | ApiResponse>>
) => {
  const loading = ref(false)
  const error = ref('')
  const schedules = ref<Challenge[]>([])

  const fetchSchedules = async (): Promise<void> => {
    const state = { loading, error }
    setLoading(state, true)
    setError(state, '')

    try {
      const response = await getChallengeSchedulesFetch()
      if (Array.isArray(response.data)) {
        schedules.value = response.data
      } else {
        error.value = response.data.message
      }
    } catch (err: any) {
      setError(state, handleError(err))
      console.error('스케줄 목록을 불러오는데 실패했습니다:', err)
    } finally {
      setLoading(state, false)
    }
  }

  const goToDetail = (schedule: Challenge) => {
    router.push(`/challenge/${schedule.challengeId}`)
  }

  const toggleScheduleStatus = async (schedule: Challenge) => {
    const state = { loading, error }
    setLoading(state, true)
    setError(state, '')

    try {
      // 현재 상태의 반대로 설정
      const updatedSchedule = {
        ...schedule,
        challengeStatus: (schedule.challengeSchedulerCycle ?? 0) > 0 ? 'ACTIVE' : 'INACTIVE'
      }

      await updateChallengeFetch(updatedSchedule)
      // 성공 후 목록 새로고침
      await fetchSchedules()
    } catch (err: any) {
      setError(state, handleError(err))
      console.error('스케줄 상태 변경에 실패했습니다:', err)
    } finally {
      setLoading(state, false)
    }
  }

  return {
    loading,
    error,
    schedules,
    fetchSchedules,
    goToDetail,
    toggleScheduleStatus
  }
}
