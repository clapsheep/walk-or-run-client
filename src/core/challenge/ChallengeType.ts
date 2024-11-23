import { Ref } from "vue"

export type Challenge = {
  challengeId?: number
  challengeTitle?: string
  challengeDescription?: string
  challengeCreateDate?: string
  challengeDeleteDate?: string
  challengeIsEnded?: number
  challengeCategoryName?: string
  challengeAuthorId?: number
  challengeParticipantCnt?: number
  challengeTargetCnt?: number
  challengeCategoryCode?: number
  challengeSchedulerCycle?: number
  dday?: string
}

export type LoadingState = {
  loading: Ref<boolean>
  error: Ref<string>
}
