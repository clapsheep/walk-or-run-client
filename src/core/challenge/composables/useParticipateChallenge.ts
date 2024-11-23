import { ref } from "vue";
import { Challenge } from "../ChallengeType";
import { setError, setLoading } from "../utils/settingUtils";

export const useParticipateChallenge = (
  participateChallengeFetch: (challengeId: number) => Promise<Challenge>,
) => {
  const loading = ref(false)
  const error = ref('')

  const handleParticipate = async (challengeId: number) => {
    const state = { loading, error }
    setLoading(state, true);
    setError(state, '')

    try {
      console.log('Participating in challenge:', challengeId);
      const response = await participateChallengeFetch(challengeId);
      console.log(response);
    } catch (err) {
      setError(state, '챌린지에 참여할 수 없습니다.')
      console.error('Error participating in challenge:', err)
    } finally {
      setLoading(state, false)
    }
  }

  return {
    handleParticipate
  }
}
