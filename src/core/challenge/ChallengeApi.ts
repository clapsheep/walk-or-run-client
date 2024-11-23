import type { PageResponse } from '@/core/common/PageType'
import type Challenge from '@/core/challenge/ChallengeType'
import axios from 'axios'
import { getToken } from '@/core/auth/AuthHook'

const { VITE_API_URL } = import.meta.env

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
