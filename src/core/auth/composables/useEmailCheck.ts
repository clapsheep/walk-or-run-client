
import type ApiResponse from '@/core/common/types/ApiResponse'
import { useModalStore } from '@/stores/modalStore'
import { validateEmailFormat } from '@/utils/inputVaildation'
import type { AxiosResponse } from 'axios'
import { ref, watch } from 'vue'

export type EmailValidationType = 'signup' | 'findPassword'

export const useEmailCheck = (
  type: EmailValidationType = 'signup',
  checkEmailFn: (email: string) => Promise<AxiosResponse<ApiResponse>>
) => {
  const modalStore = useModalStore()
  const isLoading = ref(false)
  const isChecked = ref(false)
  const error = ref('')

  // 실시간 형식 검증
  const validateFormat = (email: string) => {
    const formatResult = validateEmailFormat(email)
    if (formatResult.isValid) {
      error.value = ''
      isChecked.value = false
    } else {
      error.value = formatResult.message
      isChecked.value = false
    }
    return formatResult.isValid
  }

  // 중복/존재 검증
  const validateAvailability = async (email: string): Promise<boolean> => {
    if (!validateFormat(email)) return false

    isLoading.value = true
    try {
      const { data } = await checkEmailFn(email)
      const emailExists = data.message === '1'

      // type에 따라 다른 검증 로직 적용
      const isValid = type === 'signup' ? !emailExists : emailExists

      error.value = type === 'signup'
        ? (emailExists ? '이미 사용 중인 이메일입니다' : '')
        : (emailExists ? '' : '존재하지 않는 이메일입니다')

      isChecked.value = isValid

      if (isValid) {
        modalStore.openModal({
          title: '이메일 확인',
          content: type === 'signup'
            ? '사용 가능한 이메일입니다.'
            : '확인되었습니다.',
        })
      }

      return isValid
    } catch (error: any) {
      error.value = '이메일 확인에 실패했습니다'
      return false
    } finally {
      isLoading.value = false
    }
  }

  // watch를 통한 실시간 검증 설정
  const watchEmail = (getEmail: () => string) => {
    watch(getEmail, (newValue) => {
      validateFormat(newValue)
    })
  }

  const resetState = () => {
    isChecked.value = false
    error.value = ''
  }

  return {
    isLoading,
    isChecked,
    error,
    validateFormat,
    validateAvailability,
    watchEmail,
    resetState,
  }
}
