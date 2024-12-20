import { getToken } from '@/core/auth/services/loginService'
import type { Challenge } from '@/core/challenge/ChallengeType'
import type { PageResponse } from '@/core/common/types/PageType'
import { useUserStore } from '@/stores/userStore'
import axios, { AxiosResponse } from 'axios'
import ApiResponse from '../common/types/ApiResponse'

const { VITE_API_URL } = import.meta.env
const userStore = useUserStore()

export const getChallengesFetch = async (
  page: number = 1,
  size: number = 10,
): Promise<PageResponse<Challenge>> => {
  const { data } = await axios.get(`${VITE_API_URL}/challenge`, {
    params: {
      page,
      size,
    },
    headers: {
      Authorization: getToken(),
    },
  })
  return data
}

export const getActiveChallengesFetch = async (
  page: number = 1,
  size: number = 10,
): Promise<PageResponse<Challenge>> => {
  const { data } = await axios.get(`${VITE_API_URL}/challenge/active`, {
    params: {
      page,
      size,
    },
    headers: {
      Authorization: getToken(),
    },
  })
  return data
}

export const getEndedChallengesFetch = async (
  page: number = 1,
  size: number = 10,
): Promise<PageResponse<Challenge>> => {
  const { data } = await axios.get(`${VITE_API_URL}/challenge/end`, {
    params: {
      page,
      size,
    },
    headers: {
      Authorization: getToken(),
    },
  })
  return data
}

export const getChallengeDetailFetch = async (
  challengeId: number,
): Promise<AxiosResponse<Challenge | ApiResponse>> => {
  const response = await axios.get(`${VITE_API_URL}/challenge/${challengeId}`, {
    headers: {
      Authorization: getToken(),
    },
  })

  return response
}

export const participateChallengeFetch = async (
  challengeId: number,
): Promise<AxiosResponse<ApiResponse>> => {
  const response = await axios.post(
    `${VITE_API_URL}/challenge/${challengeId}`,
    { userId: userStore.userId },
    {
      headers: {
        Authorization: getToken(),
      },
    },
  )
  return response
}

export const getUserChallengeFetch = async (
  userId: number,
  page: number = 0,
): Promise<PageResponse<Challenge>> => {
  const { data } = await axios.get(`${VITE_API_URL}/user/${userId}/challenge`, {
    params: {
      page,
      size: 10,
    },
    headers: {
      Authorization: getToken(),
    },
  })
  return data
}
export const editChallengeFetch = async (
  challengeId: number,
  challenge: Challenge,
): Promise<AxiosResponse<ApiResponse>> => {
  const response = await axios.put(
    `${VITE_API_URL}/admin/challenge/${challengeId}`,
    challenge,
    {
      headers: {
        Authorization: getToken(),
      },
    }
  )
  return response
}
export const closeChallengeFetch = async (
  challengeId: number,
): Promise<AxiosResponse<ApiResponse>> => {
  const response = await axios.delete(`${VITE_API_URL}/admin/challenge/${challengeId}`, {
    headers: {
      Authorization: getToken(),
    },
  })
  return response
}
