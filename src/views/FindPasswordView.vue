<script setup>
import { ref } from 'vue'
import BasicButton from '@/components/atoms/BasicButton.vue';
import BasicInput from '@/components/atoms/BasicInput.vue';
import axios from 'axios'
import BasicSelect from '@/components/molecules/BasicSelect.vue';

const name = ref('')
const phone = ref('')
const userId = ref('')
const email = ref('')
const questionId = ref('')
const answer = ref('')
const isPasswordReset = ref(false)
const isEmailChecked = ref(false)
const isEmailCheckLoading = ref(false)
const queryRef = ref('')
const errors = ref({
  email: '',
  password: '',
  passwordValid: '',
  name: '',
  nickname: '',
  query: '',
})

const onFindPassword = async () => {
  try {
    const response = await axios.post('/api/user/password/find', {
      userId: userId.value,
      userName: name.value,
      userEmail: email.value,
      userPhoneNumber: phone.value,
      userPasswordQuestionId: questionId.value,
      userPasswordAnswer: answer.value,
    })
    // ApiResponse("success, "changePassword", 200)이 오면 비밀번호 수정 라우터로 이동
    console.log('비밀번호 찾기 결과:', response.data);
  } catch (error) {
    console.log('답변이 정확하지 않습니다.');
  }
}

const checkEmail = async () => {
  if (!emailRef.value || errors.value.email) return

  isEmailCheckLoading.value = true
  try {
    // 실제 API 호출로 대체 필요
    await new Promise((resolve) => setTimeout(resolve, 1000)) // 임시 딜레이
    // const response = await checkEmailDuplicate(emailRef.value)
    // if (response.isDuplicate) {
    //   errors.value.email = '이미 사용 중인 이메일입니다'
    //   isEmailChecked.value = false
    // } else {
    isEmailChecked.value = true
    errors.value.email = ''
    // }
  } catch (error) {
    errors.value.email = '이메일 중복 확인에 실패했습니다'
    isEmailChecked.value = false
  } finally {
    isEmailCheckLoading.value = false
  }
}
</script>

<template>
  <div class="flex min-h-screen items-center justify-center bg-gray-100">
    <div class="w-full max-w-md rounded-lg bg-white p-8 shadow-md">
      <h1 class="mb-8 text-center text-2xl font-bold text-gray-800">
        비밀번호 찾기
      </h1>

      <form class="space-y-6">
        <div class="flex gap-2">
          <div class="flex-1">
            <BasicInput
              id="userEmail"
              type="email"
              placeholder="이메일을 입력해주세요"
              v-model="email"
              :error="errors.email"
              class="w-full"
              direction="col"
              hideLabel
            />
          </div>
          <BasicButton
                type="button"
                @click="checkEmail"
                :disabled="!email || !!errors.email || isEmailCheckLoading"
                class="h-[42px] w-32"
                :color="isEmailChecked ? 'success' : 'primary'"
              >
              {{ isEmailChecked ? '확인완료' : '이메일 확인' }}
          </BasicButton>
        </div>
        <BasicSelect
            id="query"
            label="비밀번호 확인 질문"
            v-model="queryRef"
            :options="TESTQUERY"
            value-key="query_id"
            label-key="query_name"
            direction="col"
            size="md"
            :error="errors.query"
          />
        <BasicInput
          id="securityAnswer"
          label="비밀번호 답변"
          placeholder="비밀번호 답변을 입력해주세요"
          direction="col"
          v-model="answer"
        />

        <BasicButton type="submit" class="w-full" @submit="onFindPassword">찾기</BasicButton>
      </form>

      <div class="mt-4 text-right text-sm text-gray-600">
        <RouterLink
          to="find-email"
          class="w-full"
          variant="ghost"
        >
          아이디를 모르시나요?
        </RouterLink>
      </div>
    </div>
  </div>
</template>
