<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { ref } from 'vue'
import BasicButton from '@/components/atoms/BasicButton.vue'
import BasicInput from '@/components/atoms/BasicInput.vue'

const emailRef = ref('')
const passwordRef = ref('')
console.log(emailRef.value)

const onSubmit = () => {
  console.log(emailRef.value, passwordRef.value)
}
</script>

<template>
  <div class="flex min-h-screen items-center justify-center bg-gray-100">
    <div class="w-full max-w-md rounded-lg bg-white p-8 shadow-md">
      <!-- 로고나 타이틀 -->
      <h1 class="mb-8 text-center text-2xl font-bold text-gray-800">로그인</h1>

      <form class="space-y-6" @submit.prevent="onSubmit">
        <BasicInput
          id="userEmail"
          label="이메일"
          type="text"
          placeholder="이메일을 입력해주세요"
          direction="col"
          v-model="emailRef"
        />

        <BasicInput
          id="userPassword"
          label="비밀번호"
          type="password"
          placeholder="비밀번호를 입력해주세요"
          direction="col"
          v-model="passwordRef"
        />

        <!-- 아이디/비밀번호 찾기 -->
        <div class="flex justify-end">
          <RouterLink to="/find-email" class="text-sm text-gray-600 hover:text-primary-500">
            아이디/비밀번호 찾기
          </RouterLink>
        </div>

        <BasicButton type="submit" class="w-full"> 로그인 </BasicButton>

        <!-- 회원가입 유도 -->
        <div class="text-center text-sm text-gray-600">
          아직 회원이 아니신가요?
          <RouterLink to="/signup" class="ml-1 font-medium text-primary-500 hover:text-primary-600">
            회원가입하기
          </RouterLink>
        </div>
      </form>

      <!-- 소셜 로그인 섹션 (선택적) -->
      <div class="mt-8">
        <div class="relative">
          <div class="absolute inset-0 flex items-center">
            <div class="w-full border-t border-gray-200"></div>
          </div>
          <div class="relative flex justify-center text-sm">
            <span class="bg-white px-2 text-gray-500"> 또는 </span>
          </div>
        </div>

        <div class="mt-6 space-y-4">
          <button
            class="flex w-full items-center justify-center gap-2 rounded-lg border border-gray-300 px-4 py-2 text-gray-700 transition-colors hover:bg-gray-50"
          >
            <span>Google로 계속하기</span>
          </button>
          <button
            class="flex w-full items-center justify-center gap-2 rounded-lg border border-gray-300 px-4 py-2 text-gray-700 transition-colors hover:bg-gray-50"
          >
            <span>Kakao로 계속하기</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
