// challengeService.ts
import type { PageResponse } from "@/core/common/PageType"
import type { Challenge } from "../ChallengeType"
import router from "@/router"

export interface ChallengeState {
  loading: boolean
  error: string
}

// 챌린지 데이터 처리
export const challengeService = {
  // 챌린지 데이터 포맷팅
  formatChallengeResponse(data: PageResponse<Challenge>): PageResponse<Challenge> {
    return {
      content: data.content,
      pageInfo: {
        currentPage: data.pageInfo.currentPage,
        pageSize: data.pageInfo.pageSize,
        totalElements: data.pageInfo.totalElements,
        totalPages: data.pageInfo.totalPages
      }
    }
  },

  // 챌린지 상세 페이지 이동
  navigateToDetail(challengeId?: number) {
    if (challengeId) {
      router.push(`/challenge/${challengeId}`)
    }
  },

  // 에러 메시지 처리
  handleError(error: any): string {
    return error?.response?.data?.message || '챌린지 목록을 불러오는데 실패했습니다.'
  }
}
