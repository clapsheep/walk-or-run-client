import type ApiResponse from '@/core/common/ApiResponse'
import type User from '@/core/user/UserType'
import type { AuthCredentials, AuthResponse } from './AuthType'
import axios, { type AxiosResponse } from 'axios'

const { VITE_API_URL } = import.meta.env

export const loginFetch = async (credentials: AuthCredentials): Promise<AxiosResponse<AuthResponse>> => {
  const response = await axios.post(`${VITE_API_URL}/auth/login`, credentials, {
    headers: {
      'Content-Type': 'application/json',
    }
  })
  return response
}

export const getPasswordQuestionFetch = async (): Promise<AxiosResponse<ApiResponse | { string: string }>> => {
  const { data } = await axios.get(`${VITE_API_URL}/auth/password-question`)
  return data
}

export const checkEmailDuplicatedFetch = async (email: string): Promise<AxiosResponse<ApiResponse>> => {
  const res = await axios.get(`${VITE_API_URL}/auth/valid-email`, {
    params: { email },
  })
  return res
}

export const registerFetch = async (user: User): Promise<AxiosResponse> => {
  const res = await axios.post(`${VITE_API_URL}/auth/register`, user)
  return res
}

export const findPasswordFetch = async (userData: User): Promise<AxiosResponse> => {
  const res = await axios.post(`${VITE_API_URL}/auth/find-password`, userData)
  return res
}
