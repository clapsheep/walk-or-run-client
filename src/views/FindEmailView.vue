<script setup lang="ts">
import BasicButton from '@/components/atoms/BasicButton.vue';
import BasicInput from '@/components/atoms/BasicInput.vue';
import { findEmailFetch } from '@/core/auth/AuthApi';
import { useFindEmail } from '@/core/auth/composables/useFindEmail';

const { findEmail, form, errors, isLoading, error: findEmailError, isFormValid  } = useFindEmail(findEmailFetch)

const onSubmit = async () => {
  if (!isFormValid.value || isLoading.value) return
  await findEmail(form.value)
}
</script>

<template>
  <div class="flex min-h-screen items-center justify-center bg-gray-100">
    <div class="w-full max-w-md rounded-lg bg-white p-8 shadow-md">
      <h1 class="mb-8 text-center text-2xl font-bold text-gray-800">
        아이디 찾기
      </h1>

      <form class="space-y-6" @submit.prevent="onSubmit">
        <BasicInput
          id="userName"
          label="이름"
          name="userName"
          autocomplete="name"
          placeholder="이름을 입력해주세요"
          direction="col"
          v-model="form.userName"
          :error="errors.userName || findEmailError"
        />
        <BasicInput
          id="userPhone"
          label="휴대폰 번호"
          name="userPhone"
          autocomplete="phone"
          placeholder="휴대폰 번호를 입력해주세요"
          direction="col"
          v-model="form.userPhoneNumber"
          :error="errors.userPhoneNumber "
        />
        <BasicButton
          type="submit"
          class="w-full"
          :disabled="!isFormValid"
          :isLoading="isLoading"
        >
          찾기
        </BasicButton>
      </form>

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
