import { ref } from 'vue'
import { useRouter } from 'vue-router'
import type { AxiosResponse } from 'axios'
import type ApiResponse from '@/core/common/types/ApiResponse'

export const useDeleteChallenge = (
  deleteChallengeFetch: (challengeId: number) => Promise<AxiosResponse<ApiResponse>>
) => {
  const router = useRouter()
  const loading = ref(false)
  const error = ref('')


  const handleDelete = async (challengeId: number) => {
    if (confirm('정말로 이 챌린지를 삭제하시겠습니까?')) {
      await deleteChallenge(challengeId)
    }
  }

  const deleteChallenge = async (challengeId: number): Promise<void> => {
    loading.value = true
    error.value = ''

    try {
      const response: AxiosResponse<ApiResponse> = await deleteChallengeFetch(challengeId)

      if (response.data.message === 'success') {
        // 삭제 성공 시 목록 페이지로 이동
        router.back()
      } else {
        error.value = response.data.message || '챌린지 삭제에 실패했습니다.'
      }
    } catch (e) {
      error.value = '챌린지 삭제 중 오류가 발생했습니다.'
      console.error('Delete challenge error:', e)
    } finally {
      loading.value = false
    }
  }

  return {
    loading,
    error,
    deleteChallenge,
    handleDelete
  }
}
