import type { PageResponse } from '@/core/common/types/PageType'
import type { Challenge } from '../ChallengeType'
import router from '@/router'

export interface ChallengeState {
  loading: boolean
  error: string
}

// 챌린지 데이터 포맷팅
export const formatChallengeResponse = (data: PageResponse<Challenge>): PageResponse<Challenge> => {
  return {
    content: data.content,
    pageInfo: {
      currentPage: data.pageInfo.currentPage,
      pageSize: data.pageInfo.pageSize,
      totalElements: data.pageInfo.totalElements,
      totalPages: data.pageInfo.totalPages,
    },
  }
}

// 챌린지 상세 페이지 이동
export const navigateToDetail = (challengeId?: number) => {
  if (challengeId) {
    router.push(`/challenge/${challengeId}`)
  }
}
export const navigateToEdit = (challengeId: number) => {
  router.push(`/admin/challenges/edit/${challengeId}`)
}

export const navigateToAdminChallenge = () => {
  router.push(`/admin/challenges/ongoing`)
}

export const navigateToEditSchedule = (challengeId: number) => {
  router.push(`/admin/schedule/edit/${challengeId}`)
}
export const navigateToAdminSchedule = () => {
  router.push(`/admin/challenges/schedule`)
}
// 에러 메시지 처리
export const handleError = (error: any): string => {
  return error?.response?.data?.message || '챌린지 목록을 불러오는데 실패했습니다.'
}

export const changePage = async (
  fetchFunction: (page: number, pageSize: number) => Promise<PageResponse<Challenge>>,
  page: number,
  pageSize: number,
): Promise<PageResponse<Challenge>> => {
  const response = await fetchFunction(page, pageSize)
  return response
}
