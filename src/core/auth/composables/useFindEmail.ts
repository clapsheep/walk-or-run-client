import ApiResponse from "@/core/common/types/ApiResponse";
import User from "@/core/user/UserType";
import { AxiosResponse } from "axios";
import { computed, ref } from "vue";

import { useModalStore } from "@/stores/modalStore";
import { useRouter } from "vue-router";
import { validatePhoneNumber } from "@/utils/inputVaildation";
import { validateRequired } from "@/utils/inputVaildation";

export type FindEmailForm = {
  userName?: string
  userPhoneNumber?: string
}

export const useFindEmail = (
  findEmailFetch : ({userName, userPhoneNumber}:FindEmailForm)=>Promise<AxiosResponse<string | ApiResponse>>
)=>{
  const router = useRouter()
  const modalStore = useModalStore()
  const isLoading = ref(false)
  const error = ref('')
  const errors= ref<FindEmailForm>({})
  const form = ref<User>({
    userName: '',
    userPhoneNumber: ''
  })


  const validateForm = () => {
    errors.value = {}

    // 각 필드를 독립적으로 검증
    if (form.value.userName) {
      errors.value.userName = validateRequired(form.value.userName, '이름')
    }

    if (form.value.userPhoneNumber) {
      errors.value.userPhoneNumber = validatePhoneNumber(form.value.userPhoneNumber)
    }

    return Object.keys(errors.value).length === 0
  }
  const isFormValid = computed(() => {
    return form.value.userName &&
           form.value.userPhoneNumber &&
           Object.keys(errors.value).length === 0
  })
  const findEmail = async (credentials: FindEmailForm) => {

    if (isLoading.value) return false

    form.value = credentials

    console.log(3);
    isLoading.value = true
    error.value = ''
    console.log(4);
    try {
      const { data } = await findEmailFetch(credentials)


      if(typeof data === 'string') {
      modalStore.openModal({
        title: '이메일 찾기 완료',
        content: data,
        confirmText: '로그인',
        cancelText: '비밀번호 찾기',
        onConfirm: () => router.push('/signin'),
        onCancel: () => router.push('/find-password')
      })
    }
      return true
    } catch (err: any) {
      console.error('이메일 찾기 중 오류:', err)
      modalStore.openModal({
        title: '이메일 찾기 실패',
        content: "입력하신 정보를 다시 확인해주세요.",
      })
      return false
    } finally {
      isLoading.value = false
    }
  }

  return {
    form,
    errors,
    validateForm,
    isLoading,
    error,
    isFormValid,
    findEmail
  }
}
