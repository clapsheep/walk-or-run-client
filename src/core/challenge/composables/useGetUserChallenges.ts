import { AxiosResponse } from "axios";
import { ref } from "vue";
import { Challenge } from "../ChallengeType";
import { setError, setLoading } from "../utils/settingUtils";
import router from "@/router";

export const useGetUserChallenges = (
  getUserChallengeFetch: (userId: number) => Promise<AxiosResponse>
) => {
  const loading = ref(false)
  const error = ref('')
  const userChallenges = ref<Challenge[]>([])

  const setUserChallenges = (data: Challenge[]): void => {
    userChallenges.value = data
  }

  const fetchUserChallenges = async (userId: number) => {
    const state = { loading, error }
    setLoading(state, true)
    setError(state, '')

    try {
      const response = await getUserChallengeFetch(userId)
      setUserChallenges(response.data)
      if(response.data.length === 0) {
        error.value = '참여한 챌린지가 없습니다.'
      }
    } catch (err) {
      setError(state, '챌린지 목록을 불러오는데 실패했습니다.')
      console.error('Error fetching user challenges:', err)
    } finally {
      setLoading(state, false)
    }

  }

  const goToDetail = (challenge?: Challenge) => {
    router.push(`/challenge/${challenge?.challengeId}`)
  }

  return {
    loading,
    error,
    userChallenges,
    fetchUserChallenges,
    goToDetail
  }
}
