import { getToken } from '../auth/services/loginService'
import { useUserStore } from '@/stores/userStore'
import User from './UserType'
import axios from 'axios'
import ApiResponse from '../common/types/ApiResponse'

const { VITE_API_URL } = import.meta.env

export const getUserInfoFetch = async (): Promise<User> => {
  const userStore = useUserStore()
  console.log("getUserInfoFetch");
  const { data } = await axios.get(`${VITE_API_URL}/user/${userStore.userId}`, {
    headers: {
      Authorization: getToken()
    }
  })
  return data;
}

export const changeUserPasswordFetch = async (data: {
  userId: number;
  userPassword: string;
  newPassword: string;
  userPasswordQuestionId: number;
  userPasswordAnswer: string;
}): Promise<ApiResponse> => {
  const { data: response } = await axios.put(
    `${VITE_API_URL}/user/password`,
    data,
    {
      headers: {
        Authorization: getToken()
      }
    }
  )
  return response
}

export const changeUserInfoFetch = async (data: User): Promise<ApiResponse> => {
  const { data: response } = await axios.put(
    `${VITE_API_URL}/user/${data.userId}`,
    data,
    {
      headers: {
        Authorization: getToken()
      }
    }
  )
  return response
}
