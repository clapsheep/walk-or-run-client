<script setup lang="ts">
import BasicButton from '@/components/atoms/BasicButton.vue'
import BasicInput from '@/components/atoms/BasicInput.vue'
import BasicSelect from '@/components/molecules/BasicSelect.vue'
import { findPasswordFetch } from '@/core/auth/AuthApi'
import { useFindPassword } from '@/core/auth/composables/useFindPassword'
import axios from 'axios'
import { onMounted, ref } from 'vue'

const { VITE_API_URL } = import.meta.env

const {
  form,
  errors,
  isLoading,
  error: findPasswordError,
  isFormValid,
  findPassword,
  isEmailCheckLoading,
  isEmailChecked,
  emailError,
  validateAvailability,
  validateEmail
} = useFindPassword(findPasswordFetch)

const queryList = ref({})

const onSubmit = async () => {
  if (!isFormValid.value || isLoading.value) return
  await findPassword({
    userEmail: form.value.userEmail,
    userPasswordQuestionId: form.value.userPasswordQuestionId,
    userPasswordAnswer: form.value.userPasswordAnswer
  })
}

onMounted(async () => {
  try {
    const { data } = await axios.get(`${VITE_API_URL}/auth/password-question`)
    queryList.value = data
  } catch (error) {
    console.error('비밀번호 확인 질문을 가져오는데 실패했습니다:', error)
  }
})
</script>

<template>
  <div class="flex min-h-screen items-center justify-center bg-gray-100">
    <div class="w-full max-w-md rounded-lg bg-white p-8 shadow-md">
      <h1 class="mb-8 text-center text-2xl font-bold text-gray-800">비밀번호 찾기</h1>

      <form class="space-y-6" @submit.prevent="onSubmit">
        <div class="space-y-1">
            <label for="userEmail" class="block text-sm font-medium text-gray-700"> 이메일 </label>
            <div class="flex gap-2">
              <div class="flex-1">
            <BasicInput
              id="userEmail"
              type="email"
              name="userEmail"
              autocomplete="email"
              placeholder="이메일을 입력해주세요"
              v-model="form.userEmail"
              class="w-full"
              direction="col"
              :error="errors.userEmail || emailError"
            />
          </div>
          <BasicButton
            type="button"
            @click="validateEmail"
            :isLoading="isEmailCheckLoading"
            :disabled="!!errors.userEmail || isEmailCheckLoading"
            class="h-[42px] w-32"
            :color="isEmailChecked ? 'success' : 'primary'"
          >
            {{ isEmailCheckLoading ? '확인중...' : isEmailChecked ? '확인완료' : '이메일 확인' }}
          </BasicButton>
        </div>
        <span v-if="errors.userEmail" class="block mt-1 text-sm text-right text-red-500">{{ errors.userEmail }}</span>
      </div>
        <BasicSelect
          id="query"
          label="비밀번호 확인 질문"
          v-model="form.userPasswordQuestionId"
          name="userPasswordQuestionId"
          :options="queryList"
          value-key="query_id"
          label-key="query_name"
          direction="col"
          placeholder="비밀번호 확인 질문을 선택해주세요"
          size="md"
          :error="errors.userPasswordQuestionId"
        />

        <BasicInput
          id="queryAnswer"
          name="userPasswordAnswer"
          label="비밀번호 확인 답변"
          placeholder="질문의 답을 입력해주세요"
          direction="col"
          v-model="form.userPasswordAnswer"
          :error="errors.userPasswordAnswer"
        />

        <BasicButton
          type="submit"
          class="w-full"
          :disabled="!isFormValid || isLoading"
          :isLoading="isLoading"
        >
          {{ isLoading ? '처리중...' : '찾기' }}
        </BasicButton>
      </form>

      <div class="mt-4 text-right text-sm text-gray-600">
        <RouterLink to="/find-email" class="text-primary hover:underline">이메일을 잊으셨나요?</RouterLink>
      </div>
    </div>
  </div>
</template>
