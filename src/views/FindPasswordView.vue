<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import BasicButton from '@/components/atoms/BasicButton.vue'
import BasicInput from '@/components/atoms/BasicInput.vue'
import axios from 'axios'
import BasicSelect from '@/components/molecules/BasicSelect.vue'
import { validateEmailFormat } from '@/utils/inputValidation'
import { getPasswordQuestionFetch } from '@/core/auth/AuthApi'
import { useFindPassword } from '@/core/auth/AuthHook'

const { VITE_API_URL } = import.meta.env
const router = useRouter()

const isEmailCheckedRef = ref(false)
const isEmailCheckLoadingRef = ref(false)
const queryList = ref({})
const findPasswordError = ref('')
const findPasswordLoading = ref(false)

const inputData = ref({
  userEmail: '',
  userPasswordQuestionId: '',
  userPasswordAnswer: '',
})

const errors = ref({
  email: '',
  passwordQuestionId: '',
  passwordAnswer: '',
})

const isFormValid = computed(() => {
  return isEmailCheckedRef.value &&
         inputData.value.userPasswordQuestionId &&
         inputData.value.userPasswordAnswer
})

const validateEmail = () => {
  const emailError = validateEmailFormat(inputData.value.userEmail)
  errors.value.email = emailError
}

watch(() => inputData.value.userEmail, () => {
  isEmailCheckedRef.value = false
  validateEmail()
})

const checkEmail = async () => {
  if (errors.value.email) return

  isEmailCheckLoadingRef.value = true
  try {
    const { data } = await axios.get(`${VITE_API_URL}/auth/valid-email`, {
      params: { email: inputData.value.userEmail }
    })

    if (data.message === '1') {
      isEmailCheckedRef.value = true
      errors.value.email = ''
    } else {
      errors.value.email = '존재하지 않는 이메일입니다'
      isEmailCheckedRef.value = false
    }
  } catch (error: any) {
    console.error('이메일 확인 중 오류:', error)
    errors.value.email = '이메일 확인 중 오류가 발생했습니다'
    isEmailCheckedRef.value = false
  } finally {
    isEmailCheckLoadingRef.value = false
  }
}

const onFindPassword = async () => {
  if (!isFormValid.value) return

  try {
    const success = await useFindPassword({
      userEmail: inputData.value.userEmail,
      userPasswordQuestionId: inputData.value.userPasswordQuestionId,
      userPasswordAnswer: inputData.value.userPasswordAnswer,
    })

    if (success) {
      router.push({
        name: 'change-password',
        query: { email: inputData.value.userEmail }
      })
    }
  } catch (error) {
    console.error('비밀번호 찾기 중 오류:', error)
    errors.value.passwordAnswer = findPasswordError.value
  }
}

onMounted(async () => {
  try {
    const data = await getPasswordQuestionFetch()
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

      <form class="space-y-6" @submit.prevent="onFindPassword">
        <div class="flex gap-2">
          <div class="flex-1">
            <BasicInput
              id="userEmail"
              type="email"
              name="userEmail"
              placeholder="이메일을 입력해주세요"
              v-model="inputData.userEmail"
              class="w-full"
              direction="col"
              :error="errors.email"
              hideLabel
            />
          </div>
          <BasicButton
            type="button"
            @click="checkEmail"
            :disabled="!!errors.email || isEmailCheckLoadingRef"
            class="h-[42px] w-32"
            :color="isEmailCheckedRef ? 'success' : 'primary'"
          >
            {{ isEmailCheckLoadingRef ? '확인중...' : isEmailCheckedRef ? '확인완료' : '이메일 확인' }}
          </BasicButton>
        </div>
        <span v-if="errors.email" class="block mt-1 text-sm text-right text-red-500">{{ errors.email }}</span>

        <BasicSelect
          id="query"
          label="비밀번호 확인 질문"
          v-model="inputData.userPasswordQuestionId"
          name="userPasswordQuestionId"
          :options="queryList"
          value-key="query_id"
          label-key="query_name"
          direction="col"
          placeholder="질문을 선택해주세요"
          size="md"
          :error="errors.passwordQuestionId"
        />

        <BasicInput
          id="queryAnswer"
          name="userPasswordAnswer"
          label="답변"
          placeholder="질문의 답을 입력해주세요"
          direction="col"
          v-model="inputData.userPasswordAnswer"
          :error="errors.passwordAnswer"
        />

        <BasicButton
          type="submit"
          class="w-full"
          :disabled="!isFormValid || findPasswordLoading"
        >
          {{ findPasswordLoading ? '처리중...' : '찾기' }}
        </BasicButton>
      </form>

      <div class="mt-4 text-right text-sm text-gray-600">
        <RouterLink to="/find-email" class="text-primary hover:underline">이메일을 잊으셨나요?</RouterLink>
      </div>
    </div>
  </div>
</template>
