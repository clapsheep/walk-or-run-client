import type { AxiosResponse } from 'axios'
import type ApiResponse from '@/core/common/types/ApiResponse'
import type User from '@/core/user/UserType'
import { useModalStore } from '@/stores/modalStore'
import { useAuthStore } from '@/stores/authStore'
import { useRouter } from 'vue-router'
import { computed, ref } from 'vue'
import { validateEmailFormat, validateRequired } from '@/utils/inputVaildation'
import { useEmailCheck } from './useEmailCheck'
import { checkEmailDuplicatedFetch } from '../AuthApi'

export type FindPasswordForm = {
  userEmail?: string
  userPasswordQuestionId?: string
  userPasswordAnswer?: string
}

export interface FindPasswordErrors {
  userEmail?: string
  userPasswordQuestionId?: string
  userPasswordAnswer?: string
}

export const useFindPassword = (
  findPasswordFetch: (user: User) => Promise<AxiosResponse<ApiResponse>>
) => {
  const router = useRouter()
  const modalStore = useModalStore()
  const authStore = useAuthStore()
  const isLoading = ref(false)
  const error = ref('')
  const errors = ref<FindPasswordErrors>({})

  const form = ref<FindPasswordForm>({
    userEmail: '',
    userPasswordQuestionId: '',
    userPasswordAnswer: ''
  })

  // 이메일 검증 컴포저블 사용
  const {
    isLoading: isEmailCheckLoading,
    isChecked: isEmailChecked,
    error: emailError,
    validateAvailability,
    watchEmail,
  } = useEmailCheck('findPassword', checkEmailDuplicatedFetch)

  // 이메일 실시간 검증 설정
  watchEmail(() => form.value.userEmail as string)

  const validateForm = () => {
    errors.value = {}

    // 각 필드를 독립적으로 검증
    if (form.value.userEmail) {
      errors.value.userEmail = validateEmailFormat(form.value.userEmail)?.message
    }

    if (form.value.userPasswordQuestionId) {
      errors.value.userPasswordQuestionId = validateRequired(form.value.userPasswordQuestionId, '비밀번호 찾기 질문')
    }

    if (form.value.userPasswordAnswer) {
      errors.value.userPasswordAnswer = validateRequired(form.value.userPasswordAnswer, '비밀번호 찾기 답변')
    }

    return Object.keys(errors.value).length === 0
  }

  const isFormValid = computed(() => {
    return form.value.userEmail &&
           isEmailChecked.value &&
           form.value.userPasswordQuestionId &&
           form.value.userPasswordAnswer &&
           Object.keys(errors.value).length === 0
  })

  // validateAvailability 래퍼 함수 추가
  const validateEmail = () => {
    if (!form.value.userEmail) return
    return validateAvailability(form.value.userEmail)
  }
  const findPassword = async (credentials: FindPasswordForm) => {
    if (isLoading.value) return false
    form.value = credentials
    isLoading.value = true
    error.value = ''
    try {
      const { data } = await findPasswordFetch(credentials as User)

      if (data.message === 'success') {
        authStore.setTempEmail(credentials.userEmail || '')
        
        modalStore.openModal({
          title: '인증 완료',
          content: '비밀번호 수정 페이지로 이동합니다.',
          confirmText: '확인',
          onConfirm: () => router.push('/change-password')
        })
        return true
      } else {
        modalStore.openModal({
          title: '인증 실패',
          content: '입력하신 정보를 다시 확인해주세요.',
          confirmText: '확인'
        })
        return false
      }
    } catch (err: any) {
      console.error('비밀번호 찾기 중 오류:', err)
      modalStore.openModal({
        title: '비밀번호 찾기 실패',
        content: '입력하신 정보를 다시 확인해주세요.',
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
    validateForm,
    isFormValid,
    findPassword,
    // 이메일 검증 관련 상태 추가
    isEmailCheckLoading,
    isEmailChecked,
    emailError,
    validateAvailability,
    validateEmail
  }
}
