import { Ref } from "vue"
import User from "../user/UserType"

export type Challenge = {
  challengeId: number
  challengeTitle: string
  challengeDescription: string
  challengeCreateDate: string
  challengeDeleteDate: string
  challengeIsEnded: number
  challengeCategoryName: string
  challengeAuthorId: string
  challengeParticipantCnt: number
  challengeTargetCnt: number
  challengeIsParticipant: number
  challengeCategoryCode: number
  challengeSchedulerCycle: number
  challengeParticipants: User[]
  dday: string
}

export type LoadingState = {
  loading: Ref<boolean>
  error: Ref<string>
}
