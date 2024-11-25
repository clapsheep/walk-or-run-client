import { Ref } from "vue"

export type Challenge = {
  challengeId?: number
  challengeTitle?: string
  challengeDescription?: string
  challengeCreateDate?: string
  challengeDeleteDate?: string
  challengeIsEnded?: number
  challengeCategoryName?: string
  challengeAuthorId?: string
  challengeParticipantCnt?: number
  challengeTargetCnt?: number
  challengeIsParticipant?: number
  challengeCategoryCode?: number
  challengeSchedulerCycle?: number
  dday?: string
}

export type LoadingState = {
  loading: Ref<boolean>
  error: Ref<string>
}
