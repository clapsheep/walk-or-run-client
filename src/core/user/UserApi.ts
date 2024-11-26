import { getToken } from '../auth/services/loginService'
import { useUserStore } from '@/stores/userStore'
import User from './UserType'
import axios from 'axios'
import ApiResponse from '../common/types/ApiResponse'
import { PageResponse } from '../common/types/PageType'
import { UserForm } from './composables/useChangeProfile'

const { VITE_API_URL } = import.meta.env

export const getUserInfoFetch = async (): Promise<User> => {
  const userStore = useUserStore()
  const { data } = await axios.get(`${VITE_API_URL}/user/${userStore.userId}`, {
    headers: {
      Authorization: getToken(),
    },
  })
  return data
}

export const changeUserPasswordFetch = async (data: {
  userId: number
  userPassword: string
  newPassword: string
  userPasswordQuestionId: number
  userPasswordAnswer: string
}): Promise<ApiResponse> => {

  const { data: response } = await axios.post(`${VITE_API_URL}/user/${data.userId}/password/change`, data, {
    headers: {
      Authorization: getToken(),
    },
  })

  return response
}

export const changeUserInfoFetch = async (data: UserForm): Promise<ApiResponse> => {
  const { data: response } = await axios.put(`${VITE_API_URL}/user/${data.userId}`, data, {
    headers: {
      Authorization: getToken(),
    },
  })
  return response
}

export const searchUsersFetch = async (
  key: string,
  value: string,
  page: number = 1,
  size: number = 10,
): Promise<PageResponse<User>> => {
  const { data } = await axios.get(`${VITE_API_URL}/search/user`, {
    params: {
      key,
      value,
      page, // 서버는 0-based pagination 사용
      size,
    },
    headers: {
      Authorization: getToken(),
    },
  })
  return data
}
