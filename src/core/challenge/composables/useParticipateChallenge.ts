import { ref } from "vue";
import { setError, setLoading } from "../utils/settingUtils";
import ApiResponse from "@/core/common/types/ApiResponse";
import { AxiosResponse } from "axios";

export const useParticipateChallenge = (
  participateChallengeFetch: (challengeId: number) => Promise<AxiosResponse<ApiResponse>>
) => {
  const loading = ref(false)
  const error = ref('')

  const handleParticipate = async (challengeId: number) => {
    const state = { loading, error }
    setLoading(state, true);
    setError(state, '')

    try {
      const response = await participateChallengeFetch(challengeId);
      console.log('Participation response:', response);
      if(response.data.message === 'SUCCESS') {

      }
      return response;
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
