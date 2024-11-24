import { setError, setLoading } from "@/core/challenge/utils/settingUtils";
import { useGetUserInfo } from "@/core/user/composables/useGetUserInfo";
import { getUserInfoFetch } from "@/core/user/UserApi";
import { AxiosResponse } from "axios";
import { ref } from "vue";
import Goal from "../GoalType";
import { Ref } from "vue";

export const useGoalSetting = (
  createUserGoalFetch: (goalData: {
    startDate: string
    endDate: string
    targetAmount: number
    goalType: number
    unitType: number
  }) => Promise<AxiosResponse>
) => {

  const loading = ref(false);
  const error = ref('');
  const showGoalSettingModal = ref(false);
  const myGoals: Ref<Goal[]> = ref([]);

  const {  } = useGetUserInfo(getUserInfoFetch);

  const openGoalSettingModal = () => {
    showGoalSettingModal.value = true
  }

  const closeGoalSettingModal = () => {
    showGoalSettingModal.value = false
  }

  const handleGoalSubmit = async (goalData: {
    startDate: string
    endDate: string
    targetAmount: number
    goalType: number
    unitType: number
  }) => {
    const state = { loading, error }
    setLoading(state, true)
    setError(state, '')

    try {
      const response = await createUserGoalFetch(goalData)
      console.log(response)
      closeGoalSettingModal()
      getUserInfo() // 목표 설정 후 사용자 정보 새로고침
    } catch (err: any) {
      setError(state, err.response?.data?.message || '목표 설정에 실패했습니다.')
      console.error('목표 설정에 실패했습니다:', err)
    } finally {
      setLoading(state, false)
    }
  }

  return {
    loading,
    error,
    showGoalSettingModal,
    myGoals,
    openGoalSettingModal,
    closeGoalSettingModal,
    handleGoalSubmit
  }
}
