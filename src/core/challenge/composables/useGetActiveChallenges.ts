import { PageResponse } from "@/core/common/types/PageType";
import type { Challenge } from "../ChallengeType";
import { ref } from "vue";
import { setLoading, setError } from '../utils/settingUtils';
import {
  navigateToDetail,
  handleError,
  changePage
} from "../services/challengesService";

export const useGetActiveChallenges = (
  getActiveChallengesFetch: (page: number, pageSize: number) => Promise<PageResponse<Challenge>>
) => {
  const loading = ref(false)
  const error = ref('')

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
      const response = await changePage(getActiveChallengesFetch, page, pageSize)
      challenges.value = response
    } catch (e) {
      setError(state, handleError(e))
    } finally {
      setLoading(state, false)
    }
  }

  const goToDetail = (challengeId: number) => {
    navigateToDetail(challengeId);
  }

  return {
    loading,
    error,
    challenges,
    fetchActiveChallenges,
    changePage: (fetchFn: any, page: number, size: number) => fetchActiveChallenges(page, size),
    goToDetail
  }
}
