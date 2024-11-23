<script setup lang="ts">
import BasicButton from '@/components/atoms/BasicButton.vue'
import BasicInput from '@/components/atoms/BasicInput.vue'
import { changePasswordFetch } from '@/core/auth/AuthApi'
import { useChangePassword } from '@/core/auth/composables/useChangePassword'
import { useAuthStore } from '@/stores/authStore'
import { useModalStore } from '@/stores/modalStore'
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
const authStore = useAuthStore()
const modalStore = useModalStore()

// 컴포저블 사용
const {
  form,
  errors,
  isLoading,
  isFormValid,
  validatePasswordField,
  validateConfirmPassword,
  changePassword
} = useChangePassword(changePasswordFetch)

// 컴포넌트 마운트 시 이메일 확인
onMounted(() => {
  if (!authStore.tempEmail) {
    modalStore.openModal({
      title: '알림',
      content: '비밀번호 찾기를 다시 진행해주세요.',
      confirmText: '확인',
      onConfirm: () => {
        router.push('/find-password')
      }
    })
    return
  }
})
</script>

<template>
  <div class="flex min-h-screen items-center justify-center bg-gray-100">
    <div class="w-full max-w-md rounded-lg bg-white p-8 shadow-md">
      <h1 class="mb-8 text-center text-2xl font-bold text-gray-800">비밀번호 변경</h1>

      <form class="space-y-6" @submit.prevent="changePassword">
        <div class="space-y-1">
          <label class="block text-sm font-medium text-gray-700">이메일</label>
          <span class="block text-base text-gray-900 border-b border-gray-200 pb-2">{{ authStore.tempEmail }}</span>
        </div>

        <BasicInput
          id="password"
          type="password"
          label="새 비밀번호"
          name="password"
          v-model="form.password"
          @input="validatePasswordField"
          :error="errors.password"
          direction="col"
        />

        <BasicInput
          id="confirmPassword"
          type="password"
          label="새 비밀번호 확인"
          name="confirmPassword"
          v-model="form.confirmPassword"
          @input="validateConfirmPassword"
          :error="errors.confirmPassword"
          direction="col"
        />

        <BasicButton
          type="submit"
          class="w-full"
          :disabled="!isFormValid"
          :isLoading="isLoading"
        >
          변경하기
        </BasicButton>
      </form>
    </div>
  </div>
</template>
