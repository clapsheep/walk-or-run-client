import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { Challenge } from '../ChallengeType'
import { AxiosResponse } from 'axios'
import ApiResponse from '@/core/common/types/ApiResponse'

export const useScheduleManage = (
  getChallengeScheduleFetch: (
    challengeId: number,
  ) => Promise<AxiosResponse<Challenge | ApiResponse>>,
  updateChallengeScheduleFetch: (form: Challenge) => Promise<AxiosResponse<ApiResponse>>,
  deleteChallengeScheduleFetch: (challengeId: number) => Promise<AxiosResponse<ApiResponse>>,
) => {
  const router = useRouter()
  const isLoading = ref(false)

  const form = ref<Challenge>({
    challengeId: 0,
    challengeTitle: '',
    challengeDescription: '',
    challengeTargetCnt: 0,
    challengeSchedulerCycle: 0,
    challengeCreateDate: '',
    challengeDeleteDate: '',
    challengeCategoryCode: 0,
    challengeIsEnded: 0,
    challengeCategoryName: '',
    challengeAuthorId: '',
    challengeParticipantCnt: 0,
    challengeParticipants: [],
    dday: '',
  })

  const fetchScheduleDetail = async (challengeId: number) => {
    try {
      isLoading.value = true
      const response = await getChallengeScheduleFetch(challengeId)
      console.log('response', response)

      if (response.status === 200) {
        const data = response.data as Challenge
        // 날짜 형식 변환
        const createDate = new Date(data.challengeCreateDate)
        const deleteDate = new Date(data.challengeDeleteDate)
        console.log(createDate, deleteDate)

        form.value = {
          ...data,
          challengeCreateDate: createDate.toISOString().slice(0, 16),
          challengeDeleteDate: deleteDate.toISOString().slice(0, 16),
        }
      }
    } catch (error) {
      console.error('스케줄 정보 조회 실패:', error)
    } finally {
      isLoading.value = false
    }
  }

  const submitForm = async () => {
    try {
      isLoading.value = true
      await updateChallengeScheduleFetch(form.value)
      router.push('/admin/challenges/schedule')
    } catch (error) {
      console.error('스케줄 수정 실패:', error)
    } finally {
      isLoading.value = false
    }
  }

  const deleteSchedule = async (challengeId: number) => {
    try {
      isLoading.value = true
      await deleteChallengeScheduleFetch(challengeId)
      router.push('/admin/challenges/schedule')
    } catch (error) {
      console.error('스케줄 삭제 실패:', error)
    } finally {
      isLoading.value = false
    }
  }

  const goToList = () => router.push('/admin/challenges/schedule')

  return {
    form,
    isLoading,
    fetchScheduleDetail,
    submitForm,
    deleteSchedule,
    goToList,
  }
}
