import ApiResponse from '@/core/common/ApiResponse'
import User from '@/core/user/UserType'
import axios, { AxiosResponse } from 'axios'

const { VITE_API_URL } = import.meta.env

export const getPasswordQuestionFetch = async (): Promise<
  AxiosResponse<ApiResponse | { string: string }>
> => {
  const { data } = await axios.get(`${VITE_API_URL}/auth/password-question`)
  return data
}
export const checkEmailDuplicatedFetch = async (
  email: string,
): Promise<AxiosResponse<ApiResponse>> => {
  const res = await axios.get(`${VITE_API_URL}/auth/valid-email`, {
    params: { email },
  })
  return res
}
export const registerFetch = async (user: User): Promise<AxiosResponse> => {
  const res = await axios.post(`${VITE_API_URL}/auth/register`, user)
  return res
}
