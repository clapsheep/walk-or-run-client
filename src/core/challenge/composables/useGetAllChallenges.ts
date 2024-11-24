import { ref, type Ref } from 'vue'
import type { PageResponse } from "@/core/common/PageType"
import type { Challenge } from "../ChallengeType"
import { challengeService } from '../services/challengesService'
import { setLoading, setError } from '../utils/settingUtils'

export const useGetAllChallenges = (
  getChallengesFetch: (page: number) => Promise<PageResponse<Challenge>>
) => {
  const loading = ref(false)
  const error = ref('')
  const { formatChallengeResponse, navigateToDetail, handleError } = challengeService
  const challenges = ref<PageResponse<Challenge>>({
    content: [],
    pageInfo: {
      currentPage: 0,
      pageSize: 10,
      totalElements: 0,
      totalPages: 0
    }
  })

  // 챌린지 목록 조회
  const fetchChallenges = async (page: number = 1): Promise<void> => {
    const state = { loading, error }
    setLoading(state, true)
    setError(state, '')

    try {
      const response = await getChallengesFetch(page)
      console.log(response)
      challenges.value = formatChallengeResponse(response)
    } catch (err: any) {
      setError(state, handleError(err))
      console.error('챌린지 목록을 불러오는데 실패했습니다:', err)
    } finally {
      setLoading(state, false)
    }
  }

  // 페이지 변경
  const changePage = async (page: number): Promise<void> => {
    await fetchChallenges(page)
  }

  const goToDetail = (challenge?: Challenge) => {
    navigateToDetail(challenge?.challengeId);
  }

  return {
    loading,
    error,
    challenges,
    fetchChallenges,
    changePage,
    goToDetail
  }
}
