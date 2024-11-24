import User from "@/core/user/UserType";
import { useUserStore } from "@/stores/userStore";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { userInfoService } from "../services/userInfoService";
import { setError, setLoading } from "@/core/challenge/utils/settingUtils";

export const useGetUserInfo = (
  getUserInfoFetch : () => Promise<User>
) => {
  const router = useRouter()
  const loading = ref(false)
  const error = ref('')
  const userInfo = ref<User>({})
  const { navigateToChangePassword, navigateToGoalSetting } = userInfoService

  const setUserInfo = (data: User) => {
    userInfo.value = data
  }

  const getUserInfo = async () => {
    const state = { loading, error }
    setLoading(state, true)
    setError(state, '')

    try {
      const response = await getUserInfoFetch()
      console.log(response);
      setUserInfo(response);
      console.log(userInfo.value);
    } catch (err: any) {
      setError(state, '사용자 정보를 불러오는데 실패했습니다.')
      console.error('사용자 정보를 불러오는데 실패했습니다:', err)
    } finally {
      setLoading(state, false)
    }
  }

  const goToChangePassword = () => {
    navigateToChangePassword();
  }

  const goToGoalSetting = () => {
    navigateToGoalSetting();
  }

  return {
    loading,
    error,
    userInfo,
    goToChangePassword,
    goToGoalSetting,
    getUserInfo
  }
}
