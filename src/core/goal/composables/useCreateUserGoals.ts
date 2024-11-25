// core/goal/composables/useCreateUserGoals.ts
import type ApiResponse from '@/core/common/types/ApiResponse'
import { useModalStore } from '@/stores/modalStore'
import {
  validateDate,
  validateDateRange,
  validateNumber,
  validateSelect,
  type ValidationErrors,
} from '@/utils/inputVaildation'
import type { AxiosResponse } from 'axios'
import { ref } from 'vue'
import type Goal from '../GoalType'

export const useCreateUserGoals = (
  createGoalFetch: (data: Goal) => Promise<AxiosResponse<ApiResponse>>,
  onCreateSuccess?: () => Promise<void>,
) => {
  const loading = ref(false)
  const error = ref<string>('')
  const errors = ref<ValidationErrors>({})
  const modalStore = useModalStore()

  const form = ref<Goal>({
    challengeCategoryCode: 0,
    challengeCategoryUnitCode: 0,
    targetAmount: 0,
    startDate: '',
    endDate: '',
  })

  const categoryOptions = [
    { code: 1, name: '걷기' },
    { code: 2, name: '뛰기' },
  ]

  const unitOptions = [
    { code: 1, name: '시간', unit: 'hour' },
    { code: 2, name: '거리', unit: 'km' },
  ]

  const resetForm = () => {
    form.value = {
      challengeCategoryCode: 0,
      challengeCategoryUnitCode: 0,
      targetAmount: 0,
      startDate: '',
      endDate: '',
    }
    error.value = ''
    errors.value = {}
  }

  const validateForm = (): boolean => {
    errors.value = {}

    const categoryError = validateSelect(form.value.challengeCategoryCode, '카테고리')
    if (categoryError) {
      errors.value.challengeCategoryCode = categoryError
    }

    const unitError = validateSelect(form.value.challengeCategoryUnitCode, '단위')
    if (unitError) {
      errors.value.challengeCategoryUnitCode = unitError
    }

    const targetError = validateNumber(form.value.targetAmount, '목표량')
    if (targetError) {
      errors.value.targetAmount = targetError
    }

    const startDateError = validateDate(form.value.startDate, '시작 날짜')
    if (startDateError) {
      errors.value.startDate = startDateError
    }

    const endDateError = validateDate(form.value.endDate, '최종 날짜')
    if (endDateError) {
      errors.value.endDate = endDateError
    }

    if (form.value.startDate && form.value.endDate) {
      const dateRangeError = validateDateRange(form.value.startDate, form.value.endDate)
      if (dateRangeError) {
        errors.value.endDate = dateRangeError
      }
    }

    return Object.keys(errors.value).length === 0
  }

  const createGoal = async (): Promise<boolean> => {
    if (!validateForm()) {
      return false
    }

    loading.value = true
    error.value = ''

    try {
      const response = await createGoalFetch(form.value)
      if (response.data.code !== 201) {
        throw new Error(response.data.message || '목표 생성에 실패했습니다.')
      }

      if (onCreateSuccess) {
        await onCreateSuccess()
      }

      modalStore.openModal({
        title: '목표 설정 완료',
        content: '새로운 목표가 설정되었습니다.',
        confirmText: '확인',
        onConfirm: () => {
          modalStore.closeModal()
          resetForm()
        },
      })

      return true
    } catch (e) {
      error.value = e instanceof Error ? e.message : '목표 생성 중 오류가 발생했습니다.'
      modalStore.openModal({
        title: '오류',
        content: error.value,
        confirmText: '확인',
      })
      return false
    } finally {
      loading.value = false
    }
  }

  return {
    form,
    errors,
    loading,
    error,
    categoryOptions,
    unitOptions,
    createGoal,
    resetForm,
  }
}
