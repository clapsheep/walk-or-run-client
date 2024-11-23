import { useUserStore } from '@/stores/userStore'
import { removeToken } from './loginService'

// 로그아웃 처리
export const handleLogout = () => {
  const userStore = useUserStore()
  removeToken()
  userStore.clearUserInfo()
}
