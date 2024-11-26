import ApiResponse from '@/core/common/types/ApiResponse'
import { AxiosResponse } from 'axios'
import { onMounted, ref } from 'vue'
import { Challenge } from '../ChallengeType'

export const useGetSchedules = (
  getChallengeSchedulesFetch: () => Promise<AxiosResponse<Challenge[] | ApiResponse>>
) => {
  const isLoading = ref(false)
  const error = ref('')
  const schedules = ref<Challenge[]>([])

  const fetchSchedules = async (): Promise<void> => {
    isLoading.value = true
    error.value = ''
    try {
      const response = await getChallengeSchedulesFetch()
      if (Array.isArray(response.data)) {
        schedules.value = response.data
      } else {
        error.value = '스케줄 목록이 없습니다.'
      }
    } catch (err: any) {
      console.error('스케줄 목록을 불러오는데 실패했습니다:', err)
    } finally {
      isLoading.value = false
    }
  }

  onMounted(async () => {
    await fetchSchedules()
  })


  return {
    isLoading,
    error,
    schedules,
    fetchSchedules,
  }
}
