<script setup lang="ts">
import BasicButton from '@/components/atoms/BasicButton.vue'
import BasicInput from '@/components/atoms/BasicInput.vue'
import BasicSelect from '@/components/molecules/BasicSelect.vue'
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/userStore'
import axios from 'axios'

const { VITE_API_URL } = import.meta.env
const router = useRouter()
const userStore = useUserStore()

const form = ref({
  currentPassword: '',
  newPassword: '',
  confirmPassword: '',
  userPasswordQuestionId: '',
  userPasswordAnswer: ''
})

const errors = ref({
  currentPassword: '',
  newPassword: '',
  confirmPassword: '',
  userPasswordQuestionId: '',
  userPasswordAnswer: ''
})

const queryList = ref({})
const isLoading = ref(false)
const changePasswordError = ref('')
const isPasswordVerified = ref(false)

const validateForm = () => {
  let isValid = true
  errors.value = {
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    userPasswordQuestionId: '',
    userPasswordAnswer: ''
  }

  if (!isPasswordVerified.value) {
    if (!form.value.currentPassword) {
      errors.value.currentPassword = '현재 비밀번호를 입력해주세요'
      isValid = false
    }
    if (!form.value.userPasswordQuestionId) {
      errors.value.userPasswordQuestionId = '비밀번호 확인 질문을 선택해주세요'
      isValid = false
    }
    if (!form.value.userPasswordAnswer) {
      errors.value.userPasswordAnswer = '비밀번호 확인 답변을 입력해주세요'
      isValid = false
    }
  } else {
    if (!form.value.newPassword) {
      errors.value.newPassword = '새 비밀번호를 입력해주세요'
      isValid = false
    } else if (form.value.newPassword.length < 8) {
      errors.value.newPassword = '비밀번호는 8자 이상이어야 합니다'
      isValid = false
    }

    if (!form.value.confirmPassword) {
      errors.value.confirmPassword = '새 비밀번호를 다시 입력해주세요'
      isValid = false
    } else if (form.value.newPassword !== form.value.confirmPassword) {
      errors.value.confirmPassword = '새 비밀번호가 일치하지 않습니다'
      isValid = false
    }
  }

  return isValid
}

const verifyPassword = async () => {
  if (!validateForm() || isLoading.value) return

  isLoading.value = true
  changePasswordError.value = ''

  try {
    // TODO: API 연동
    // await verifyPasswordFetch({
    //   currentPassword: form.value.currentPassword,
    //   userPasswordQuestionId: form.value.userPasswordQuestionId,
    //   userPasswordAnswer: form.value.userPasswordAnswer
    // })
    isPasswordVerified.value = true
  } catch (error: any) {
    changePasswordError.value = error.response?.data?.message || '비밀번호 확인에 실패했습니다'
  } finally {
    isLoading.value = false
  }
}

const onSubmit = async () => {
  if (!validateForm() || isLoading.value) return

  isLoading.value = true
  changePasswordError.value = ''

  try {
    // TODO: API 연동
    // await changePasswordFetch({
    //   newPassword: form.value.newPassword
    // })
    alert('비밀번호가 성공적으로 변경되었습니다.')
    router.push('/account')
  } catch (error: any) {
    changePasswordError.value = error.response?.data?.message || '비밀번호 변경에 실패했습니다'
  } finally {
    isLoading.value = false
  }
}

const goBack = () => {
  router.push('/account')
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
      <div class="mb-8 flex items-center">
        <button 
          @click="goBack" 
          class="text-gray-600 hover:text-gray-800"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </button>
        <h1 class="ml-4 text-2xl font-bold text-gray-800">비밀번호 변경</h1>
      </div>

      <form class="space-y-6" @submit.prevent="isPasswordVerified ? onSubmit : verifyPassword">
        <template v-if="!isPasswordVerified">
          <BasicInput
            id="currentPassword"
            type="password"
            name="currentPassword"
            label="현재 비밀번호"
            placeholder="현재 비밀번호를 입력해주세요"
            v-model="form.currentPassword"
            direction="col"
            :error="errors.currentPassword"
          />

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
            v-model="form.userPasswordAnswer"
            direction="col"
            :error="errors.userPasswordAnswer"
          />
        </template>

        <template v-else>
          <BasicInput
            id="newPassword"
            type="password"
            name="newPassword"
            label="새 비밀번호"
            placeholder="새 비밀번호를 입력해주세요"
            v-model="form.newPassword"
            direction="col"
            :error="errors.newPassword"
          />

          <BasicInput
            id="confirmPassword"
            type="password"
            name="confirmPassword"
            label="새 비밀번호 확인"
            placeholder="새 비밀번호를 다시 입력해주세요"
            v-model="form.confirmPassword"
            direction="col"
            :error="errors.confirmPassword"
          />
        </template>

        <div v-if="changePasswordError" class="mt-2 text-center text-sm text-red-500">
          {{ changePasswordError }}
        </div>

        <div class="flex justify-end space-x-4">
          <BasicButton
            type="button"
            @click="goBack"
            color="secondary"
            class="w-24"
          >
            취소
          </BasicButton>
          <BasicButton
            type="submit"
            :isLoading="isLoading"
            class="w-24"
          >
            {{ isLoading ? '처리중...' : isPasswordVerified ? '변경하기' : '다음' }}
          </BasicButton>
        </div>
      </form>
    </div>
  </div>
</template>
