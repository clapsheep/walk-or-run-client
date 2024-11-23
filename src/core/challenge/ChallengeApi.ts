import type { PageResponse } from '@/core/common/PageType'
import type Challenge from '@/core/challenge/ChallengeType'
import axios from 'axios'
import { getToken } from '@/core/auth/AuthHook'
import { useUserStore } from '@/stores/userStore'

const { VITE_API_URL } = import.meta.env
const userStore = useUserStore()

export const getChallengesFetch = async (page: number = 1): Promise<PageResponse<Challenge>> => {
  const token = getToken()
  const { data } = await axios.get(`${VITE_API_URL}/challenge`, {
    params: {
      page,
      size: 10
    },
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  return data
}

export const getChallengeDetailFetch = async (challengeId: number): Promise<Challenge> => {
  const token = getToken()
  const { data } = await axios.get(`${VITE_API_URL}/challenge/${challengeId}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  return data
}

export const participateChallengeFetch = async (challengeId: number): Promise<Challenge> => {
  const token = getToken()
  const { data } = await axios.post(`${VITE_API_URL}/challenge/${challengeId}/participate`, null, {
    params: {
      userId: userStore.userId
    },
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  return data
}
