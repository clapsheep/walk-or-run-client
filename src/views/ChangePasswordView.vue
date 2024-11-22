<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import BasicButton from '@/components/atoms/BasicButton.vue'
import BasicInput from '@/components/atoms/BasicInput.vue'
import axios from 'axios'
import { passwordValidation, matchPasswordValidation } from '@/utils/inputValidation'

const { VITE_API_URL } = import.meta.env
const router = useRouter()
const route = useRoute()

const emailRef = ref(route.query.email as string)
const passwordRef = ref('')
const confirmPasswordRef = ref('')
const errors = ref({
  password: '',
  confirmPassword: '',
})

const isFormValid = computed(() => {
  return !errors.value.password && !errors.value.confirmPassword && passwordRef.value && confirmPasswordRef.value
})

// 비밀번호 입력 시 유효성 검사
const validatePassword = () => {
  const passwordError = passwordValidation(passwordRef.value)
  errors.value.password = passwordError
  validateConfirmPassword()
}

// 비밀번호 확인 입력 시 유효성 검사
const validateConfirmPassword = () => {
  if (!confirmPasswordRef.value) {
    errors.value.confirmPassword = '비밀번호가 일치하지 않습니다.'
    return
  }
  const confirmError = matchPasswordValidation(passwordRef.value, confirmPasswordRef.value)
  errors.value.confirmPassword = confirmError
}

const onChangePassword = async (e: Event) => {
  e.preventDefault()
  if (!isFormValid.value) return

  try {
    const { data } = await axios.patch(`${VITE_API_URL}/auth/password/change`, {
      userEmail: emailRef.value,
      userPassword: passwordRef.value,
    })

    if (data.message === "success") {
      alert('비밀번호가 성공적으로 변경되었습니다.')
      router.push('/login')
    }
  } catch (error: any) {
    console.error('비밀번호 변경 중 오류:', error)
    alert('비밀번호 변경에 실패했습니다. 다시 시도해주세요.')
  }
}
</script>

<template>
  <div class="flex min-h-screen items-center justify-center bg-gray-100">
    <div class="w-full max-w-md rounded-lg bg-white p-8 shadow-md">
      <h1 class="mb-8 text-center text-2xl font-bold text-gray-800">
        비밀번호 변경
      </h1>

      <form class="space-y-6" @submit="onChangePassword">
        <div class="space-y-1">
          <label class="block text-md font-medium text-gray-700">이메일</label>
          <p class="text-base text-gray-900 border-b border-gray-200 pb-2">{{ emailRef }}</p>
        </div>

        <div>
          <BasicInput
            id="password"
            label="새 비밀번호"
            type="password"
            placeholder="새 비밀번호를 입력해주세요"
            v-model="passwordRef"
            @input="validatePassword"
            direction="col"
          />
          <span v-if="errors.password" class="block mt-1 text-sm text-right text-red-500">{{ errors.password }}</span>
        </div>

        <div>
          <BasicInput
            id="confirmPassword"
            label="새 비밀번호 확인"
            type="password"
            placeholder="새 비밀번호를 한번 더 입력해주세요"
            v-model="confirmPasswordRef"
            @input="validateConfirmPassword"
            direction="col"
          />
          <span v-if="errors.confirmPassword" class="block mt-1 text-sm text-right text-red-500">{{ errors.confirmPassword }}</span>
        </div>

        <BasicButton
          type="submit"
          class="w-full"
          :disabled="!isFormValid"
          @submit.prevent="onChangePassword">
          변경하기
        </BasicButton>
      </form>
    </div>
  </div>
</template>
