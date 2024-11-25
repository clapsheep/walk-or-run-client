import axios, { AxiosResponse } from 'axios'
import { getToken } from '../auth/services/loginService'
import { useUserStore } from '@/stores/userStore'
import Goal from './GoalType'
import ApiResponse from '../common/types/ApiResponse'

const { VITE_API_URL } = import.meta.env
const userStore = useUserStore()

export const getUserGoalFetch = async (): Promise<AxiosResponse<Goal[] | ApiResponse>> => {
  const response = await axios.get(`${VITE_API_URL}/user/${userStore.userId}/goal`, {
    headers: {
      Authorization: getToken(),
    },
  })
  return response
}

export const getUserGoalDetailFetch = async (goalId: number): Promise<AxiosResponse | Goal> => {
  const response = await axios.get(`${VITE_API_URL}/user/${userStore.userId}/goal/${goalId}`, {
    headers: {
      Authorization: getToken(),
    },
  })
  return response
}

export const createUserGoalFetch = async (goal: Goal): Promise<AxiosResponse<ApiResponse>> => {
  const response = await axios.post(`${VITE_API_URL}/user/${userStore.userId}/goal`, goal, {
    headers: {
      Authorization: getToken(),
    },
  })
  return response
}

export const updateUserGoalFetch = async (
  goalId: number,
  goal: Goal,
): Promise<AxiosResponse<ApiResponse>> => {
  const response = await axios.put(
    `${VITE_API_URL}/user/${userStore.userId}/goal/${goalId}`,
    goal,
    {
      headers: {
        Authorization: getToken(),
      },
    },
  )
  return response
}

export const deleteUserGoalFetch = async (goalId: number): Promise<AxiosResponse<ApiResponse>> => {
  const response = await axios.delete(`${VITE_API_URL}/user/${userStore.userId}/goal/${goalId}`, {
    headers: {
      Authorization: getToken(),
    },
  })
  return response
}
