type Challenge = {
  challengeId?: number
  challengeTitle?: string
  challengeDescription?: string
  startDate?: string
  endDate?: string
  isEnded?: boolean
  challengeCategoryName?: string
  author?: string
  currentParticipants?: number
  maxParticipants?: number
  dday?: string
}

export default Challenge
