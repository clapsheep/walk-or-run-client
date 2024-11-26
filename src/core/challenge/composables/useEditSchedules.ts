import ApiResponse from '@/core/common/types/ApiResponse'
import { AxiosResponse } from 'axios'
import { onMounted, ref } from 'vue'
import { deleteChallengeScheduleFetch, getChallengeScheduleFetch } from '../AdminChallengeApi'
import { ScheduleType } from '../ScheduleType'
import { useModalStore } from '@/stores/modalStore'
import { navigateToAdminSchedule } from '../services/challengesService'


export const useEditSchedules = (
  challengeId: number,
  updateChallengeScheduleFetch: (challengeId : number, schedule: ScheduleType) => Promise<AxiosResponse<ApiResponse>>
) => {
  const isLoading = ref(false)
  const error = ref('')
  const modalStore = useModalStore()

const schedule = ref<ScheduleType>({
  challengeCategoryCode : 0,
  challengeTitle :  '',
  challengeDescription : '',
  challengeTargetCnt : 0,
  challengeCreateDate : '',
  challengeDeleteDate : '',
  challengeSchedulerCycle : 1
})
onMounted(async() => {
  const response = await getChallengeScheduleFetch(challengeId)
  const { challengeCategoryCode,challengeTitle,challengeDescription, challengeTargetCnt, challengeCreateDate, challengeDeleteDate,challengeSchedulerCycle } = response.data as ScheduleType
  schedule.value = {
    challengeCategoryCode,challengeTitle,challengeDescription, challengeTargetCnt, challengeCreateDate, challengeDeleteDate,challengeSchedulerCycle
  }


})

  const handleSubmit = async (): Promise<void> => {
    isLoading.value = true
    error.value = ''

    try {
      const formattedSchedule = {
      ...schedule.value,
      challengeCreateDate: new Date(schedule.value.challengeCreateDate).toISOString().split('T')[0],
      challengeDeleteDate: new Date(schedule.value.challengeDeleteDate).toISOString().split('T')[0]
    }
    await updateChallengeScheduleFetch(challengeId, formattedSchedule)
      modalStore.openModal({
        title: '스케쥴 수정 성공',
        content: '스케쥴을 수정하었습니다.',
        onConfirm: () => {
          modalStore.closeModal()
          navigateToAdminSchedule()
        }
      })
    } catch (err: any) {
      error.value = '스케쥴 수정에 실패했습니다.'
    } finally {
      isLoading.value = false
    }
  }
  const handleStopRepeatSchedule = async() =>{
    isLoading.value = true
    error.value = ''
    try {
      await deleteChallengeScheduleFetch(challengeId)
      modalStore.openModal({
        title: '스케쥴 반복 해제',
        content: '챌린지가 더이상 반복되지 않습니다.',
        onConfirm: () => {
          modalStore.closeModal()
          navigateToAdminSchedule()
        }
      })
    } catch (err: any) {
      error.value = '스케쥴 수정에 실패했습니다.'
    } finally {
      isLoading.value = false
    }
  }

  return {
    schedule,
    isLoading,
    error,
    handleSubmit,
    handleStopRepeatSchedule
  }
}
