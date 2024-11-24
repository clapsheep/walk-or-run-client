import User from "@/core/user/UserType"
import { ref, onMounted } from "vue"
import { userInfoService } from "../services/userInfoService"
import { setError, setLoading } from "@/core/challenge/utils/settingUtils"

export const useGetUserInfo = (
  getUserInfoFetch: () => Promise<User>
) => {
  const loading = ref(false)
  const error = ref('')
  const userInfo = ref<User>({})
  const { navigateToChangePassword, navigateToGoalSetting } = userInfoService

  const fetchUserInfo = async () => {
    const state = { loading, error }
    setLoading(state, true)
    setError(state, '')

    try {
      const data = await getUserInfoFetch()
      userInfo.value = data
    } catch (err) {
      setError(state, '사용자 정보를 불러오는데 실패했습니다.')
      console.error('Error fetching user info:', err)
    } finally {
      setLoading(state, false)
    }
  }

  const goToChangePassword = () => {
    navigateToChangePassword()
  }

  // 컴포저블이 생성될 때 자동으로 데이터를 불러옵니다
  onMounted(fetchUserInfo)

  return {
    loading,
    error,
    userInfo,
    goToChangePassword,
    fetchUserInfo
  }
}
