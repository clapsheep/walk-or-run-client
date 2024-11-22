import axios from 'axios'
const { VITE_API_URL } = import.meta.env

// 인터페이스 정의
type AuthCredentials = {
  userEmail: string
  userPassword: string
}

type AuthResponse = {
  message: string
  accessToken?: string
}

type AuthError = {
  message: string
  status: number
}

// 로그인
export const signIn = async (credentials: AuthCredentials): Promise<AuthResponse> => {
  try {
    console.log(credentials.userEmail, credentials.userPassword);
    const response = await axios.post(`${VITE_API_URL}/auth/login`, credentials)
    const { data } = response
    console.log(data);

    if (data.access_token) {
      console.log(data.access_token);
      localStorage.setItem('access_token', data.access_token)
    }
    return data
  } catch (error: any) {
    throw {
      message: error.response?.data?.message || '아이디 혹은 비밀번호가 틀립니다. 다시 시도해주세요.',
      status: error.response?.status || 500
    } as AuthError
  }
}

// 로그아웃
export const logout = (): void => {
  localStorage.removeItem('access_token')
}

// 토큰 가져오기
export const getToken = (): string | null => {
  return localStorage.getItem('access_token')
}

// 로그인 상태 확인
export const isAuthenticated = (): boolean => {
  const token = localStorage.getItem('access_token')
  return !!token
}

// 인증 상태 확인
export const checkAuthStatus = (): boolean => {
  const token = localStorage.getItem('access_token')
  return !!token
}
