import { ref, onMounted } from 'vue'
import type { Challenge } from '../ChallengeType'
import { setLoading, setError } from '../utils/settingUtils'
import { useParticipateChallenge } from './useParticipateChallenge'
import { participateChallengeFetch } from '../ChallengeApi'
import { AxiosResponse } from 'axios'
import ApiResponse from '@/core/common/types/ApiResponse'

export const useGetChallenge = (
  getChallengeDetailFetch: (challengeId: number) => Promise<AxiosResponse<Challenge | ApiResponse>>,
  challengeId: number,
) => {
  const loading = ref(false)
  const error = ref('')
  const challenge = ref<Challenge>({
    challengeId: 0,
    challengeTitle: '',
    challengeDescription: '',
    challengeTargetCnt: 0,
    challengeSchedulerCycle: 0,
    challengeCreateDate: '',
    challengeDeleteDate: '',
    challengeCategoryCode: 0,
    challengeIsEnded: 0,
    challengeCategoryName: '',
    challengeAuthorId: '',
    challengeParticipantCnt: 0,
    challengeParticipants: [],
    dday: '',
  })

  const { handleParticipate } = useParticipateChallenge(participateChallengeFetch)

  const participate = async (challengeId: number) => {
    const response = await handleParticipate(challengeId)
    if (response?.data?.message === 'success') {
    }
  }

  const fetchChallengeDetail = async (challengeId: number) => {
    const state = { loading, error }
    setLoading(state, true)
    setError(state, '')

    try {
      const response = await getChallengeDetailFetch(challengeId)
      if (response.status === 200) {
        challenge.value = response.data as Challenge
      }
    } catch (err) {
      setError(state, '챌린지 정보를 불러오는데 실패했습니다.')
      console.error('Error fetching challenge detail:', err)
    } finally {
      setLoading(state, false)
    }
  }

  const getParticipationRate = () => {
    if (!challenge.value) return 0
    return Math.round(
      ((challenge.value.challengeParticipantCnt ?? 0) / (challenge.value.challengeTargetCnt ?? 1)) *
        100,
    )
  }

  return {
    loading,
    error,
    challenge,
    getParticipationRate,
    fetchChallengeDetail,
    participate,
    handleParticipate,
  }
}
