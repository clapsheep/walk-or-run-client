<script setup lang="ts">
import { ref } from 'vue'
import BasicButton from '@/components/atoms/BasicButton.vue';
import BasicInput from '@/components/atoms/BasicInput.vue';
import axios from 'axios'

const nameRef = ref('');
const phoneRef = ref('');
const isCorrectInfoRef = ref(false);
const emailRef = ref('');

const onFindId = async () => {
  try {
    const response = await axios.post('/api/auth/email', {
      userName: nameRef.value,
      userPhoneNumber: phoneRef.value,
    })
    if(true) { // 만약 ApiResponse가 "success"면
      isCorrectInfoRef.value = true;
      emailRef.value = response.data["userEmail"];
    }
    console.log('아이디 찾기 결과:', response.data);
  } catch (error) {
    console.log('가입되지 않은 사용자입니다');
  }
}
</script>

<template>
  <div class="flex min-h-screen items-center justify-center bg-gray-100">
    <div class="w-full max-w-md rounded-lg bg-white p-8 shadow-md">
      <h1 class="mb-8 text-center text-2xl font-bold text-gray-800">
        아이디 찾기
      </h1>

      <form class="space-y-6">
        <BasicInput
          id="userName"
          label="이름"
          placeholder="이름을 입력해주세요"
          direction="col"
          v-model="nameRef"
        />
        <BasicInput
          id="userPhone"
          label="휴대폰 번호"
          placeholder="휴대폰 번호를 입력해주세요"
          direction="col"
          v-model="phoneRef"
        />
        <BasicButton type="submit" class="w-full" @submit="onFindId">찾기</BasicButton>
      </form>

      <p class="text-success-600 text-base" v-if="isCorrectInfoRef">{{ emailRef }}</p>

      <div class="mt-4 text-right text-sm text-gray-600">
        <RouterLink
          to="find-password"
          class="w-full"
          variant="ghost"
        >
          비밀번호를 모르시나요?
        </RouterLink>
      </div>
    </div>
  </div>
</template>
