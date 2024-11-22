import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useModalStore } from '@/stores/modalStore'
import { useUserStore } from '@/stores/userStore'
import * as AuthApi from './AuthApi'
import type User from '@/core/user/UserType'
import type { AuthCredentials, TokenPayload } from './AuthType'

export const useLoading = () => {
  const loading = ref(false)
  const error = ref('')
  return { loading, error }
}

// 토큰 관련 함수들
export const setToken = (token: string) => localStorage.setItem('access_token', token)
export const getToken = () => localStorage.getItem('access_token')
export const removeToken = () => localStorage.removeItem('access_token')
export const isAuthenticated = () => !!getToken()

// 토큰 디코딩
export const decodeToken = (token: string): TokenPayload | null => {
  try {
    const base64Payload = token.split('.')[1]
    const payload = JSON.parse(atob(base64Payload))
    return payload
  } catch (error) {
    console.error('토큰 디코딩 실패:', error)
    return null
  }
}

// 사용자 정보 설정
export const setUserInfo = (payload: TokenPayload) => {
  const userStore = useUserStore()
  userStore.setUserInfo(
    payload.userId,
    payload.userEmail,
    payload.userRole
  )
  console.log(payload);
}

// 로그인 처리
export const handleLogin = async (credentials: AuthCredentials) => {
  const loading = ref(false)
  const error = ref('')

  loading.value = true

  try {
    const response = await AuthApi.loginFetch(credentials)
    const { access_token } = response.data

    if (!access_token) {
      error.value = '아이디나 비밀번호가 틀립니다. 다시 시도해주세요.'
      throw error.value
    }

    setToken(access_token)
    const payload = decodeToken(access_token)

    if (!payload) {
      error.value = '로그인 처리 중 오류가 발생했습니다.'
      throw error.value
    }

    setUserInfo(payload)
    return { loading, error: ref('') }

  } catch (err: any) {
    error.value = '아이디나 비밀번호가 틀립니다. 다시 시도해주세요.'
    throw error.value
  } finally {
    loading.value = false
  }

  return { loading, error, success: false }
}

// 로그아웃 처리
export const handleLogout = () => {
  const router = useRouter()
  const userStore = useUserStore()

  removeToken()
  userStore.clearUserInfo()
  router.push('/signin')
}

// 회원가입 처리
export const handleRegister = async (user: User) => {
  const modalStore = useModalStore()
  const loading = ref(false)
  const error = ref('')

  loading.value = true
  error.value = ''

  if (
    !user.userEmail ||
    !user.userPassword ||
    !user.userName ||
    !user.userNickname ||
    !user.userPhoneNumber ||
    !user.userPasswordQuestionId ||
    !user.userPasswordAnswer
  ) {
    modalStore.openModal('basicModal', {
      title: '입력 오류',
      content: '모든 필드를 입력해주세요.',
    })
    return { success: false, loading, error }
  }

  try {
    await AuthApi.registerFetch(user)

    modalStore.openModal('basicModal', {
      title: '회원가입 성공',
      content: '회원가입이 완료되었습니다.',
      redirectPath: '/signin',
    })

    return { success: true, loading, error }
  } catch (err: any) {
    error.value = err.response?.data?.message || '회원가입 중 오류가 발생했습니다.'
    throw error.value
  } finally {
    loading.value = false
  }
}
