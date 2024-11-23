
import { useUserStore } from '@/stores/userStore'
import { validateEmailFormat } from '../../../utils/inputVaildation'

export type AuthCredentials = {
  userEmail: string
  userPassword: string
}

export type AuthResponse = {
  message: string
  access_token?: string
  refresh_token?: string
}

export type AuthError = {
  message: string
  status: number
}

export type TokenPayload = {
  userId: string
  sub: string
  userRole: string
}


// 토큰 관리
export const setToken = (token: string) => localStorage.setItem('access_token', `Bearer ${token}`)
export const removeToken = () => localStorage.removeItem('access_token')
export const getToken = () => localStorage.getItem('access_token')
export const isAuthenticated = () => !!getToken()

// 토큰 디코딩
export const decodeToken = (token: string): TokenPayload | null => {
  try {
    // Bearer 제거
    const actualToken = token.replace('Bearer ', '')
    const base64Url = actualToken.split('.')[1]
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    )
    return JSON.parse(jsonPayload)
  } catch (error) {
    console.error('Token decode error:', error)
    return null
  }
}

// 사용자 정보 설정
export const setUserInfo = (payload: TokenPayload) => {
  const userStore = useUserStore()

  userStore.setUserInfo(
    payload.userId,
    payload.sub,
    payload.userRole
  )
}

// 로그인 성공 처리
export const handleLoginSuccess = (accessToken: string) => {
  setToken(accessToken)
  const payload = decodeToken(`Bearer ${accessToken}`)
  if (payload) {
    setUserInfo(payload)
    return true
  }
  return false
}

// 로그아웃 처리
export const handleLogout = () => {
  const userStore = useUserStore()
  removeToken()
  userStore.$reset()
}

// 폼 검증
export interface LoginErrors {
  userEmail?: string
  userPassword?: string
}

export const validateLoginForm = (form: AuthCredentials): LoginErrors => {
  const errors: LoginErrors = {}


  errors.userEmail = validateEmailFormat(form.userEmail).message

  // 비밀번호 검증
  if (!form.userPassword) {
    errors.userPassword = '비밀번호를 입력해주세요'
  }

  return errors
}

export const hasLoginErrors = (errors: LoginErrors): boolean => {
  return Object.values(errors).some(error => !!error)
}
