import { ref, onMounted } from "vue"
import type { Challenge } from "../ChallengeType"
import { setLoading, setError } from '../utils/settingUtils'
import { useParticipateChallenge } from "./useParticipateChallenge"
import { participateChallengeFetch } from "../ChallengeApi"
import { AxiosResponse } from "axios"

export const useGetChallenge = (
  getChallengeDetailFetch: (challengeId: number) => Promise<AxiosResponse<Challenge>>,
  challengeId: number
) => {
  const loading = ref(false)
  const error = ref('')
  const challenge = ref<Challenge | null>(null)

  const {
    handleParticipate
  } = useParticipateChallenge(participateChallengeFetch)

  const participate = async (challengeId: number) => {
    const response = await handleParticipate(challengeId);
    if(response?.data?.message === 'success') {
    }
  }

  const fetchChallengeDetail = async (challengeId: number) => {
    const state = { loading, error }
    setLoading(state, true)
    setError(state, '')

    try {
      const response = await getChallengeDetailFetch(challengeId)
      challenge.value = response.data
      console.log(response)
    } catch (err) {
      setError(state, '챌린지 정보를 불러오는데 실패했습니다.')
      console.error('Error fetching challenge detail:', err)
    } finally {
      setLoading(state, false)
    }
  }

  const getParticipationRate = () => {
    if (!challenge.value) return 0
    console.log(challenge.value.challengeParticipantCnt, challenge.value.challengeTargetCnt);
    return Math.round(
      ((challenge.value.challengeParticipantCnt ?? 0) /
      (challenge.value.challengeTargetCnt ?? 1)) * 100
    )
  }

  return {
    loading,
    error,
    challenge,
    getParticipationRate,
    fetchChallengeDetail,
    participate,
    handleParticipate
  }
}
