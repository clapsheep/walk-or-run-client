import { PageResponse } from "@/core/common/types/PageType";
import type { Challenge } from "../ChallengeType";
import { ref } from "vue";
import { setLoading, setError } from '../utils/settingUtils';
import router from "@/router";

export const useGetAllChallenges = (
  getChallengesFetch: (page: number) => Promise<PageResponse<Challenge>>
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

  // 챌린지 데이터 설정
  const setChallenges = (data: PageResponse<Challenge>): void => {
    challenges.value = data
  }

  // 챌린지 목록 조회
  const fetchChallenges = async (page: number = 1): Promise<void> => {
    const state = { loading, error }
    setLoading(state, true)
    setError(state, '')

    try {
      const response = await getChallengesFetch(page)
      setChallenges(response)
    } catch (err: any) {
      setError(state, '챌린지 목록을 불러오는데 실패했습니다.')
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
    router.push(`/challenge/${challenge?.challengeId}`)
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
