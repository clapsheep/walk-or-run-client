<script setup lang="ts">
import { RouterLink, useRouter } from 'vue-router'
import { ref, computed } from 'vue'
import BasicButton from '@/components/atoms/BasicButton.vue'
import BasicInput from '@/components/atoms/BasicInput.vue'
import { validateEmailFormat } from '@/utils/inputValidation'
import { signIn } from '@/services/authService'
import type { AuthCredentials } from '@/services/authService'

const router = useRouter()

const emailRef = ref('')
const passwordRef = ref('')
const errors = ref({
  email: '',
  password: '',
})

const isFormValid = computed(() => {
  return !errors.value.email && emailRef.value && passwordRef.value
})

// 이메일 입력 시 유효성 검사
const validateEmail = () => {
  const emailError = validateEmailFormat(emailRef.value)
  errors.value.email = emailError
}
</script>

<template>
  <div class="flex min-h-screen items-center justify-center bg-gray-100">
    <div class="w-full max-w-md rounded-lg bg-white p-8 shadow-md">
      <h1 class="mb-8 text-center text-2xl font-bold text-gray-800">로그인</h1>

      <form class="space-y-6" @submit.prevent="signIn({
        userEmail: emailRef,
        userPassword: passwordRef
      })">
        <BasicInput
          id="email"
          type="email"
          label="이메일"
          placeholder="이메일을 입력해주세요"
          v-model="emailRef"
          @blur="validateEmail"
          :error="errors.email"
          direction="col"
        />

        <BasicInput
          id="password"
          type="password"
          label="비밀번호"
          placeholder="비밀번호를 입력해주세요"
          v-model="passwordRef"
          :error="errors.password"
          direction="col"
        />

        <BasicButton type="submit" class="w-full" :disabled="!isFormValid">로그인</BasicButton>
      </form>

      <div class="mt-4 flex justify-between text-sm text-gray-600">
        <RouterLink to="/find-email" class="text-primary hover:underline">이메일 찾기</RouterLink>
        <RouterLink to="/find-password" class="text-primary hover:underline">비밀번호 찾기</RouterLink>
        <RouterLink to="/signup" class="text-primary hover:underline">회원가입</RouterLink>
      </div>
    </div>
  </div>
</template>
