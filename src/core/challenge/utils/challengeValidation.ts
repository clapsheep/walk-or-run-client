import { Challenge } from "../ChallengeType"
import { useCreateChallenge } from "../composables/useCreateChallenge"

export type ChallengeErrors = {
  challengeTitle?: string
  challengeDescription?: string
  challengeTargetCnt?: string
  challengeCategoryCode?: string
  challengeCreateDate?: string
  challengeDeleteDate?: string
  challengeSchedulerCycle?: string
}

export const validateChallengeForm = (form: Challenge): ChallengeErrors => {
  const errors: ChallengeErrors = {}
  const { isRecurring } = useCreateChallenge();

  if (!form.challengeTitle?.trim()) {
    errors.challengeTitle = '챌린지 제목을 입력해주세요.'
  }

  if (!form.challengeDescription?.trim()) {
    errors.challengeDescription = '챌린지 설명을 입력해주세요.'
  }

  if (!form.challengeTargetCnt || form.challengeTargetCnt <= 0) {
    errors.challengeTargetCnt = '유효한 목표 인원 수를 입력해주세요.'
  }

  if (!form.challengeCategoryCode) {
    errors.challengeCategoryCode = '카테고리를 선택해주세요.'
  }

  if (!form.challengeCreateDate) {
    errors.challengeCreateDate = '시작 날짜를 선택해주세요.'
  }

  if (!form.challengeDeleteDate) {
    errors.challengeDeleteDate = '종료 날짜를 선택해주세요.'
  }

  if (isRecurring.value && !form.challengeSchedulerCycle) {
    errors.challengeSchedulerCycle = '반복 주기를 선택해주세요.'
  }

  // 시작 날짜가 종료 날짜보다 늦은 경우
  if (form.challengeCreateDate && form.challengeDeleteDate && new Date(form.challengeCreateDate) > new Date(form.challengeDeleteDate)) {
    errors.challengeDeleteDate = '종료 날짜는 시작 날짜보다 늦어야 합니다.'
  }

  return errors
}
