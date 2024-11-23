import { ref } from "vue"
import type { Challenge } from "../ChallengeType"
import { setLoading, setError } from '../utils/settingUtils'

export const useGetChallenge = (
  getChallengeDetailFetch: (challengeId: number) => Promise<Challenge>
) => {
  const loading = ref(false)
  const error = ref('')
  const challenge = ref<Challenge | null>(null)
  const isParticipating = ref(false)

  const setChallenge = (data: Challenge): void => {
    challenge.value = data
  }

  const getParticipationRate = (): number => {
    return Math.round(
      ((challenge.value?.challengeParticipantCnt ?? 0) /
      (challenge.value?.challengeTargetCnt ?? 1)) * 100
    )
  }

  const fetchChallengeDetail = async (challengeId: number) => {
    const state = { loading, error }
    setLoading(state, true)
    setError(state, '')

    try {
      const response = await getChallengeDetailFetch(challengeId)
      setChallenge(response)
      if(challenge.value?.challengeIsParticipant || challenge.value?.challengeIsEnded) {
        isParticipating.value = true
      }
    } catch (err) {
      setError(state, '챌린지 정보를 불러오는데 실패했습니다.')
      console.error('Error fetching challenge detail:', err)
    } finally {
      setLoading(state, false)
    }
  }

  return {
    loading,
    error,
    challenge,
    isParticipating,
    getParticipationRate,
    fetchChallengeDetail
  }
}
