import { validatePassword } from "@/utils/inputVaildation"
import ApiResponse from "@/core/common/types/ApiResponse"
import { useModalStore } from "@/stores/modalStore"
import { useUserStore } from "@/stores/userStore"
import { validatePasswordMatched } from "@/utils/inputVaildation"
import { computed, ref } from "vue"
import { useRouter } from "vue-router"

interface ChangePasswordErrors {
  currentPassword?: string
  newPassword?: string
  confirmPassword?: string
  securityQuestionId?: string
  securityAnswer?: string
}

interface ChangePasswordForm {
  currentPassword: string
  newPassword: string
  confirmPassword: string
  securityQuestionId: number
  securityAnswer: string
}

export const useChangeUserPassword = (
  changeUserPasswordFetch: (data: {
    userId: number
    userPassword: string
    newPassword: string
    userPasswordQuestionId: number
    userPasswordAnswer: string
  }) => Promise<ApiResponse>
) => {
  const modalStore = useModalStore()
  const userStore = useUserStore()
  const router = useRouter()

  const loading = ref(false)
  const error = ref('')
  const errors = ref<ChangePasswordErrors>({})
  const form = ref<ChangePasswordForm>({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    securityQuestionId: 0,
    securityAnswer: ''
  })

  const validateCurPasswordField = () => {
    const validation = validatePassword(form.value.currentPassword)
    errors.value.currentPassword = validation
    return !validation
  }

  const validatePasswordField = () => {
    const validation = validatePassword(form.value.newPassword)
    errors.value.newPassword = validation
    return !validation
  }

  const validateConfirmPassword = () => {
    const validation = validatePasswordMatched(
      form.value.newPassword,
      form.value.confirmPassword
    )
    errors.value.confirmPassword = validation
    return !validation
  }

  const validateSecurityQuestion = () => {
    if (!form.value.securityQuestionId) {
      errors.value.securityQuestionId = '보안 질문을 선택해주세요'
      return false
    }
    return true
  }

  const validateSecurityAnswer = () => {
    if (!form.value.securityAnswer?.trim()) {
      errors.value.securityAnswer = '보안 질문 답변을 입력해주세요'
      return false
    }
    return true
  }

  const validateForm = () => {
    return validateCurPasswordField() &&
           validatePasswordField() &&
           validateConfirmPassword() &&
           validateSecurityQuestion() &&
           validateSecurityAnswer()
  }

  const isFormValid = computed(() => {
    return form.value.currentPassword &&
           form.value.newPassword &&
           form.value.confirmPassword &&
           form.value.securityQuestionId &&
           form.value.securityAnswer &&
           !errors.value.currentPassword &&
           !errors.value.newPassword &&
           !errors.value.confirmPassword &&
           !errors.value.securityQuestionId &&
           !errors.value.securityAnswer
  })

  const handleSubmit = async () => {
    if (!validateForm() || !isFormValid.value) return false

    loading.value = true
    error.value = ''

    try {
      const response = await changeUserPasswordFetch({
        userId: Number(userStore.userId),
        userPassword: form.value.currentPassword,
        newPassword: form.value.newPassword,
        userPasswordQuestionId: form.value.securityQuestionId,
        userPasswordAnswer: form.value.securityAnswer
      })

      if (response.message === 'success') {
        modalStore.openModal({
          title: '비밀번호 변경 완료',
          content: '비밀번호가 성공적으로 변경되었습니다.',
          onConfirm: () => router.push('/')
        })
        return true
      }
      return false
    } catch (err: any) {
      error.value = err.response?.data?.message || '비밀번호 변경에 실패했습니다.'
      modalStore.openModal({
        title: '오류',
        content: error.value
      })
      return false
    } finally {
      loading.value = false
    }
  }

  const handleCancel = () => {
    router.back()
  }

  return {
    form,
    errors,
    loading,
    error,
    isFormValid,
    validateCurPasswordField,
    validatePasswordField,
    validateConfirmPassword,
    handleSubmit,
    handleCancel
  }
}
