import { LoadingState } from "../ChallengeType"

  // 로딩 상태 설정
export const setLoading = (state: LoadingState, isLoading: boolean): void => {
  state.loading.value = isLoading
}

// 에러 상태 설정
export const setError = (state: LoadingState, errorMessage: string): void => {
  state.error.value = errorMessage
}

// 상태 초기화
export const resetState = (state: LoadingState): void => {
  setLoading(state, false)
  setError(state, '')
}
