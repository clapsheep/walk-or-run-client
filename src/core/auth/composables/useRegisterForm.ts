import ApiResponse from '@/core/common/types/ApiResponse'
import type User from '@/core/user/UserType'
import { useModalStore } from '@/stores/modalStore'
import type { AxiosResponse } from 'axios'
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import type { ValidationErrors } from '@/utils/inputVaildation'
import { hasErrors, validateRegisterForm } from '@/utils/inputVaildation'
import { useEmailCheck } from './useEmailCheck'

export interface RegisterFormOptions {
  registerFetch: (user: User) => Promise<AxiosResponse<ApiResponse>>
  checkEmailFetch: (email: string) => Promise<AxiosResponse<ApiResponse>>
}

export const useRegisterForm = ({ registerFetch, checkEmailFetch }: RegisterFormOptions) => {
  const router = useRouter()
  const modalStore = useModalStore()

  const form = reactive<User>({
    userEmail: '',
    userName: '',
    userNickname: '',
    userPhoneNumber: '',
    userPassword: '',
    userPasswordConfirm: '',
    userPasswordQuestionId: '',
    userPasswordAnswer: '',
  })

  const errors = reactive<ValidationErrors>({})
  const isSubmitting = ref(false)

  const {
    isLoading: isEmailCheckLoading,
    isChecked: isEmailChecked,
    error: emailError,
    validateAvailability,
    watchEmail,
  } = useEmailCheck('signup',checkEmailFetch)

  // 이메일 실시간 검증 설정
  watchEmail(() => form.userEmail as string)

  // 실시간 필드 검증
  const validateField = (field: keyof User) => {
    const validationResult = validateRegisterForm(form)
    errors[field as keyof ValidationErrors] = validationResult[field as keyof ValidationErrors] || ''
  }

  // 이메일 중복 확인
  const checkEmail = () => validateAvailability(form.userEmail as string)

  // 폼 검증
  const validateForm = () => {
    Object.assign(errors, validateRegisterForm(form))
    return !hasErrors(errors) && isEmailChecked.value && !emailError.value
  }

  // 폼 제출
  const handleSubmit = async () => {
    if (!validateForm() || isSubmitting.value) {
      modalStore.openModal({
        title: '입력 오류',
        content: '모든 필드를 올바르게 입력해주세요.',
      })
      return
    }

    isSubmitting.value = true
    try {
      const { userPasswordConfirm, ...userData } = form
      await registerFetch(userData)
      modalStore.openModal({
        title: '회원가입 완료',
        content: '회원가입이 완료되었습니다.',
        onConfirm: () => router.push('/signin')
      })
    } catch (error) {
      modalStore.openModal({
        title: '오류',
        content: '회원가입 중 오류가 발생했습니다.',
      })
    } finally {
      isSubmitting.value = false
    }
  }

  return {
    form,
    errors,
    emailError,
    isEmailCheckLoading,
    isEmailChecked,
    isSubmitting,
    checkEmail,
    handleSubmit,
    validateField,
  }
}
