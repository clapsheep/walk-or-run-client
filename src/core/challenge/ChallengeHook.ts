import { ref, type Ref } from 'vue'
import { getChallengeDetailFetch, getChallengesFetch, participateChallengeFetch } from './ChallengeApi'
import type { PageResponse } from '@/core/common/PageType'
import type Challenge from './ChallengeType'
import router from '@/router'

// 챌린지 목록 관련 Hook
// 상태 관리
export const loading = ref(false)
export const error = ref('')
export const challenges = ref<PageResponse<Challenge>>({
  content: [],
  pageInfo: {
    currentPage: 0,
    pageSize: 9,
    totalElements: 0,
    totalPages: 0
  }
})

// 로딩 상태 설정
export const setLoading = (isLoading: boolean): void => {
  loading.value = isLoading
}

// 에러 상태 설정
export const setError = (errorMessage: string): void => {
  error.value = errorMessage
}

// 챌린지 데이터 설정
export const setChallenges = (data: PageResponse<Challenge>): void => {
  challenges.value = data
}

// 상태 초기화
export const resetState = (): void => {
  setLoading(false)
  setError('')
}

// 챌린지 목록 조회
export const fetchChallenges = async (page: number = 1): Promise<void> => {
  setLoading(true)
  setError('')

  try {
    const response = await getChallengesFetch(page)
    setChallenges(response)
  } catch (err: any) {
    setError('챌린지 목록을 불러오는데 실패했습니다.')
    console.error('챌린지 목록을 불러오는데 실패했습니다:', err)
  } finally {
    setLoading(false)
  }
}

export const goToDetail = (challenge?: Challenge) => {
  router.push(`/challenge/${challenge?.challengeId}`)
}

// 페이지 변경
export const changePage = async (page: number): Promise<void> => {
  await fetchChallenges(page)
}

export const fetchChallengeDetail = async (challengeId: number) => {
  try {
    setLoading(true)
    setError('')

    const data = await getChallengeDetailFetch(challengeId);
    return { data, loading, error: ref('') }
  } catch (err) {
    setError('챌린지 정보를 불러오는데 실패했습니다.')
    console.error('Error fetching challenge detail:', err)
  } finally {
    setLoading(false)
  }
}

export const handleParticipate = async (challengeId: number) => {
  try {
    participateChallengeFetch(challengeId);
  } catch (err) {
    error.value = '챌린지에 참여할 수 없습니다.'
    console.error('Error participating in challenge:', err)
  }
}
