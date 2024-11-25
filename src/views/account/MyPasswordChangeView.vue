<script setup lang="ts">
import { onMounted, ref } from 'vue'
import BasicInput from '@/components/atoms/BasicInput.vue'
import BasicButton from '@/components/atoms/BasicButton.vue'
import BasicSelect from '@/components/molecules/BasicSelect.vue'
import { useChangeUserPassword } from '@/core/user/composables/useChangeUserPassword'
import { changeUserPasswordFetch } from '@/core/user/UserApi'
import { getPasswordQuestionFetch } from '@/core/auth/AuthApi'

const {
  form,
  errors,
  loading,
  handleSubmit,
  handleCancel
} = useChangeUserPassword(changeUserPasswordFetch)

const queryList = ref({})

onMounted(async () => {
  try {
    const { data } = await getPasswordQuestionFetch();
    queryList.value = data
  } catch (error) {
    console.error('비밀번호 확인 질문을 가져오는데 실패했습니다:', error)
  }
})
</script>

<template>
  <div class="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow">
      <div>
        <h2 class="text-center text-3xl font-extrabold text-gray-900">
          비밀번호 변경
        </h2>
      </div>
      <form class="mt-8 space-y-6" @submit.prevent="handleSubmit">
        <div class="space-y-4">
          <BasicInput
          id="cur-password"
          type="password"
          label="현재 비밀번호"
          name="password"
          v-model="form.currentPassword"
          :error="errors.currentPassword"
          direction="col"
        />

          <BasicInput
          id="password"
          type="password"
          label="새 비밀번호"
          name="password"
          v-model="form.newPassword"
          :error="errors.newPassword"
          direction="col"
        />

        <BasicInput
          id="confirmPassword"
          type="password"
          label="새 비밀번호 확인"
          name="confirmPassword"
          v-model="form.confirmPassword"
          :error="errors.confirmPassword"
          direction="col"
        />

        <BasicSelect
          id="query"
          label="비밀번호 확인 질문"
          v-model="form.securityQuestionId"
          name="userPasswordQuestionId"
          :options="queryList"
          value-key="query_id"
          label-key="query_name"
          direction="col"
          placeholder="비밀번호 확인 질문을 선택해주세요"
          size="md"
          :error="errors.securityQuestionId"
        />

        <BasicInput
          id="securityAnswer"
          type="text"
          label="보안 질문 답변"
          name="securityAnswer"
          v-model="form.securityAnswer"
          :error="errors.securityAnswer"
          direction="col"
        />
        </div>

        <div class="flex justify-end space-x-4">
          <BasicButton
            type="button"
            @click="handleCancel"
            color="secondary"
          >
            취소
          </BasicButton>
          <BasicButton
            type="submit"
            :loading="loading"
          >
            변경하기
          </BasicButton>
        </div>
      </form>
    </div>
  </div>
</template>
