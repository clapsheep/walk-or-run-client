
export const useGoalSetting = () => {

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
      // createUserGoalFetch 함수는 구현되지 않았습니다.
      // await createUserGoalFetch(goalData)
      closeGoalSettingModal()
      getUserInfo() // 목표 설정 후 사용자 정보 새로고침
    } catch (err: any) {
      setError(state, err.response?.data?.message || '목표 설정에 실패했습니다.')
      console.error('목표 설정에 실패했습니다:', err)
    } finally {
      setLoading(state, false)
    }
  }
}
