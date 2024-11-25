import { PageResponse } from "@/core/common/types/PageType";
import type { Challenge } from "../ChallengeType";
import { ref } from "vue";
import { setLoading, setError } from '../utils/settingUtils';
import { challengeService } from "../services/challengesService";
import { getActiveChallengesFetch } from '../ChallengeApi';

export const useGetActiveChallenges = () => {
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

  // 진행 중인 챌린지 목록 조회
  const fetchActiveChallenges = async (page: number = 1, pageSize: number = 10): Promise<void> => {
    const state = { loading, error }
    setLoading(state, true)
    setError(state, '')

    try {
      const response = await getActiveChallengesFetch(page, pageSize)
      console.log(response)
      challenges.value = formatChallengeResponse(response)
    } catch (err: any) {
      setError(state, handleError(err))
      console.error('진행 중인 챌린지 목록을 불러오는데 실패했습니다:', err)
    } finally {
      setLoading(state, false)
    }
  }

  // 페이지 변경
  const changePage = async (page: number, pageSize: number): Promise<void> => {
    await fetchActiveChallenges(page, pageSize);
  }

  const goToDetail = (challengeId: number) => {
    navigateToDetail(challengeId);
  }

  return {
    loading,
    error,
    challenges,
    fetchActiveChallenges,
    changePage,
    goToDetail
  }
}
