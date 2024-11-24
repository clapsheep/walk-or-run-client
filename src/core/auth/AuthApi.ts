import type ApiResponse from '@/core/common/types/ApiResponse'
import type User from '@/core/user/UserType'
import axios, { type AxiosResponse } from 'axios'
import { AuthCredentials, AuthResponse, getToken } from './services/loginService'
import { FindEmailForm } from './composables/useFindEmail'
import { FindPasswordForm } from './composables/useFindPassword'

const { VITE_API_URL } = import.meta.env

export const loginFetch = async (credentials: AuthCredentials): Promise<AxiosResponse<AuthResponse>> => {
  const response = await axios.post(`${VITE_API_URL}/auth/login`, credentials)
  return response
}
export const registerFetch = async (user: User): Promise<AxiosResponse<ApiResponse>> => {
  const response = await axios.post(`${VITE_API_URL}/auth/register`, user)
  return response
}
export const logoutFetch = async (): Promise<AxiosResponse<ApiResponse>> => {
  const response = await axios.post(`${VITE_API_URL}/user/logout`, null, {
    headers: {
      Authorization: getToken()
    }
  })
  return response
}

export const findPasswordFetch = async ({userEmail, userPasswordQuestionId, userPasswordAnswer}: FindPasswordForm): Promise<AxiosResponse<ApiResponse>> => {
  const response = await axios.post(`${VITE_API_URL}/auth/password/find`, {
     userEmail,
     userPasswordQuestionId,
     userPasswordAnswer})
  return response
}

export const findEmailFetch = async ({userName, userPhoneNumber}: FindEmailForm): Promise<AxiosResponse<string|ApiResponse>> => {
  const response = await axios.post(`${VITE_API_URL}/auth/email`, {
     userName,
     userPhoneNumber})
  return response
}

export const changePasswordFetch = async (email: string, password: string): Promise<AxiosResponse<ApiResponse>> => {
  console.log(email, password);

  const response = await axios.post(`${VITE_API_URL}/auth/password/change`, {
    userEmail: email,
    userPassword: password
  })
  return response
}

export const getPasswordQuestionFetch = async (): Promise<AxiosResponse<ApiResponse | { string: string }>> => {
  const response = await axios.get(`${VITE_API_URL}/auth/password-question`)
  return response
}

export const checkEmailDuplicatedFetch = async (email: string): Promise<AxiosResponse<ApiResponse>> => {
  const response = await axios.get(`${VITE_API_URL}/auth/valid-email`, {
    params: { email },
  })
  return response
}

