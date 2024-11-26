import { AxiosResponse } from 'axios'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import type { Challenge } from '../ChallengeType'
import ApiResponse from '@/core/common/types/ApiResponse'
import { getChallengeDetailFetch } from '../ChallengeApi'

type ChallengeForm = {
  challengeCategoryCode: number
  challengeTitle: string
  challengeDescription: string
  challengeTargetCnt: number
  challengeCreateDate: string
  challengeDeleteDate: string
}

export const useEditChallenge = (
  challengeId: number,
  editChallengeFetch: (id: number, challenge: Challenge) => Promise<AxiosResponse<ApiResponse>>,
  closeChallengeFetch: (id: number) => Promise<AxiosResponse<ApiResponse>>,
) => {
  const router = useRouter()
  const isLoading = ref(false)

  onMounted(async () => {
    const response = await getChallengeDetailFetch(challengeId)
    if (response.status === 200) {
      const data = response.data as Challenge

      // 날짜 형식 변환
      const createDate = new Date(data.challengeCreateDate)
      const deleteDate = new Date(data.challengeDeleteDate)

      form.value = {
        challengeCategoryCode: data.challengeCategoryCode,
        challengeTitle: data.challengeTitle,
        challengeDescription: data.challengeDescription,
        challengeTargetCnt: data.challengeTargetCnt,
        challengeCreateDate: createDate.toISOString().slice(0, 16),
        challengeDeleteDate: deleteDate.toISOString().slice(0, 16),
      }
    }
  })

  const form = ref<ChallengeForm>({
    challengeCategoryCode: 0,
    challengeTitle: '',
    challengeDescription: '',
    challengeTargetCnt: 0,
    challengeCreateDate: '',
    challengeDeleteDate: '',
  })

  const handleSubmitForm = async (challengeId: number) => {
    try {
      isLoading.value = true

      // 날짜 형식을 서버 형식으로 변환 (YYYY-MM-DD HH:mm:ss)
      const formattedData = {
        ...form.value,
        challengeCreateDate: form.value.challengeCreateDate.replace('T', ' ') + ':00',
        challengeDeleteDate: form.value.challengeDeleteDate.replace('T', ' ') + ':00',
      }
      const response = await editChallengeFetch(challengeId, formattedData as Challenge)
      console.log(response)
      if (response.status === 200) {
        router.push(`/admin/challenges/ongoing`)
      }
    } catch (error) {
      console.error('Failed to update challenge:', error)
    } finally {
      isLoading.value = false
    }
  }

  const handleCloseChallenge = async (challengeId: number) => {
    try {
      isLoading.value = true
      await closeChallengeFetch(challengeId)
      router.push(`/admin/challenges/ongoing`)
    } catch (error) {
      console.error('Failed to delete challenge:', error)
    } finally {
      isLoading.value = false
    }
  }

  return {
    form,
    isLoading,
    handleSubmitForm,
    handleCloseChallenge,
  }
}
