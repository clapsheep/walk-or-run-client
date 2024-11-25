import { PageResponse } from "@/core/common/types/PageType";
import type { Challenge } from "../ChallengeType";
import { ref } from "vue";
import { setLoading, setError } from '../utils/settingUtils';
import router from "@/router";
import { challengeService } from "../services/challengesService";

export const useGetAllChallenges = (
  getChallengesFetch: (page: number, pageSize: number) => Promise<PageResponse<Challenge>>
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
  const fetchChallenges = async (page: number = 1, pageSize: number = 10): Promise<void> => {
    const state = { loading, error }
    setLoading(state, true)
    setError(state, '')

    try {
      const response = await getChallengesFetch(page, pageSize)
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
  const changePage = async (page: number, pageSize: number): Promise<void> => {
    await fetchChallenges(page, pageSize);
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
