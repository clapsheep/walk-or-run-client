import type { AxiosResponse } from 'axios'
import type ApiResponse from '@/core/common/types/ApiResponse'
import { useModalStore } from '@/stores/modalStore'
import { useAuthStore } from '@/stores/authStore'
import { useRouter } from 'vue-router'
import { computed, ref } from 'vue'
import { validatePassword, validatePasswordMatched } from '@/utils/inputVaildation'

export interface ChangePasswordForm {
  password: string
  confirmPassword: string
}

export interface ChangePasswordErrors {
  password?: string
  confirmPassword?: string
}

export const useChangePassword = (
  changePasswordFetch: (email: string, password: string) => Promise<AxiosResponse<ApiResponse>>
) => {
  const router = useRouter()
  const modalStore = useModalStore()
  const authStore = useAuthStore()

  const isLoading = ref(false)
  const error = ref('')
  const errors = ref<ChangePasswordErrors>({})

  const form = ref<ChangePasswordForm>({
    password: '',
    confirmPassword: ''
  })

  // 비밀번호 유효성 검사
  const validatePasswordField = () => {
    const validation = validatePassword(form.value.password)
    errors.value.password = validation
    return validation
  }

  // 비밀번호 확인 일치 검사
  const validateConfirmPassword = () => {
    const validation = validatePasswordMatched(form.value.password, form.value.confirmPassword)
    errors.value.confirmPassword = validation
    return validation
  }

  // 폼 전체 유효성 검사
  const validateForm = () => {
    const isPasswordValid = validatePasswordField()
    const isConfirmValid = validateConfirmPassword()
    return isPasswordValid && isConfirmValid
  }

  // 폼 유효성 상태
  const isFormValid = computed(() => {
    return form.value.password &&
           form.value.confirmPassword &&
           !errors.value.password &&
           !errors.value.confirmPassword
  })

  // 비밀번호 변경 요청
  const changePassword = async () => {

    if (isLoading.value || !authStore.tempEmail) return false


    isLoading.value = true
    error.value = ''
    console.log(authStore.tempEmail,
      form.value.password);

    try {
      const { data } = await changePasswordFetch(
        authStore.tempEmail,
        form.value.password
      )

      if (data.message === 'success') {
        modalStore.openModal({
          title: '비밀번호 변경 완료',
          content: '로그인 페이지로 이동합니다.',
          confirmText: '확인',
          onConfirm: () => {
            authStore.clearTempEmail()
            router.push('/signin')
          }
        })
        return true
      } else {
        modalStore.openModal({
          title: '비밀번호 변경 실패',
          content: '다시 시도해주세요.',
          confirmText: '확인'
        })
        return false
      }
    } catch (err: any) {
      console.error('비밀번호 변경 중 오류:', err)
      modalStore.openModal({
        title: '비밀번호 변경 실패',
        content: '서버 오류가 발생했습니다. 다시 시도해주세요.',
        confirmText: '확인'
      })
      return false
    } finally {
      isLoading.value = false
    }
  }

  return {
    form,
    errors,
    isLoading,
    error,
    isFormValid,
    validatePasswordField,
    validateConfirmPassword,
    changePassword
  }
}
