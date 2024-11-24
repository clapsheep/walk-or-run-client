// core/goal/composables/useGoalSetting.ts
import { ref } from 'vue'
import type { AxiosResponse } from 'axios'
import type ApiResponse from '@/core/common/types/ApiResponse'
import { setError, setLoading } from '@/core/challenge/utils/settingUtils'
import Goal from '../GoalType'

export const useGoalSetting = (
  createGoalFetch: (data: Goal) => Promise<AxiosResponse<ApiResponse>>
) => {
  const loading = ref(false)
  const error = ref('')


  const form = ref<Goal>({
    challengeCategoryCode: 1,
    challengeCategoryUnitCode: 1,
    targetAmount: 0,
    startDate: '',
    endDate: ''
  })

  const categoryOptions = [
    { code: '1', name: '걷기' },
    { code: '2', name: '뛰기' }
  ]

  const unitOptions = [
    { code: '1', name: '시간', unit: 'hour' },
    { code: '2', name: '거리', unit: 'km' }
  ]

  const resetForm = () => {
    form.value = {
      challengeCategoryCode: 1,
      challengeCategoryUnitCode: 1,
      targetAmount: 0,
      startDate: '',
      endDate: ''
    }
  }

  const handleSubmit = async () => {
    const state = { loading, error }
    setLoading(state, true)
    setError(state, '')

    try {
      const response = await createGoalFetch(form.value)
      console.log(response)
      if (response.data.message === 'success') {
        resetForm()
        return true
      }
      return false
    } catch (err: any) {
      setError(state, err.response?.data?.message || '목표 설정에 실패했습니다.')
      return false
    } finally {
      setLoading(state, false)
    }
  }

  return {
    loading,
    error,
    form,
    categoryOptions,
    unitOptions,
    handleSubmit,
    resetForm
  }
}
