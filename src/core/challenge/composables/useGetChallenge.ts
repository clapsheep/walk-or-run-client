import { ref, onMounted } from "vue"
import type { Challenge } from "../ChallengeType"
import { setLoading, setError } from '../utils/settingUtils'

export const useGetChallenge = (
  getChallengeDetailFetch: (challengeId: number) => Promise<Challenge>,
  challengeId: number
) => {
  const loading = ref(false)
  const error = ref('')
  const challenge = ref<Challenge | null>(null)
  const isParticipating = ref(false)

  const fetchChallengeDetail = async () => {
    const state = { loading, error }
    setLoading(state, true)
    setError(state, '')

    try {
      const data = await getChallengeDetailFetch(challengeId)
      challenge.value = data
      console.log(data)
      isParticipating.value = !!data.challengeIsParticipant || !!data.challengeIsEnded
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

  // 컴포저블이 생성될 때 자동으로 데이터를 불러옵니다
  onMounted(fetchChallengeDetail)

  return {
    loading,
    error,
    challenge,
    isParticipating,
    getParticipationRate,
    fetchChallengeDetail
  }
}
