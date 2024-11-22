<script setup lang="ts">
import { onMounted, reactive, Ref, ref, watch } from 'vue'
import BasicButton from '@/components/atoms/BasicButton.vue'
import BasicInput from '@/components/atoms/BasicInput.vue'
import BasicSelect from '@/components/molecules/BasicSelect.vue'
import {
  validateEmailFormat,
  passwordValidation,
  matchPasswordValidation,
  secondPasswordValidation,
  inputValidation,
  queryValidation,
  queryAnswerValidation,
} from '@/utils/inputValidation'
import { checkEmailDuplicatedFetch, getPasswordQuestionFetch } from '@/core/auth/AuthApi'
import User from '@/core/user/UserType'
import { useRegister } from '@/core/auth/AuthHook'

const isEmailChecked = ref(false)
const isEmailCheckLoading = ref(false)
const queryList = ref({})

const inputData = reactive<User>({
  userEmail: '',
  userPassword: '',
  userPasswordValid: '',
  userName: '',
  userNickname: '',
  userPhoneNumber: '',
  userPasswordQuestionId: '',
  userPasswordAnswer: '',
})

const errors = reactive<User>({
  userEmail: '',
  userPassword: '',
  userPasswordValid: '',
  userName: '',
  userNickname: '',
  userPhoneNumber: '',
  userPasswordQuestionId: '',
  userPasswordAnswer: '',
})

// 각 필드별로 개별적인 watch를 설정
watch(() => inputData.userEmail, (newValue, oldValue) => {
  if (newValue !== oldValue) {
    isEmailChecked.value = false
    errors.userEmail = validateEmailFormat(newValue)
  }
})

watch(() => inputData.userPassword, (newValue, oldValue) => {
  if (newValue !== oldValue) {
    errors.userPassword = passwordValidation(newValue)
    errors.userPasswordValid = matchPasswordValidation(
      newValue,
      inputData.userPasswordValid,
    )
  }
})

watch(() => inputData.userPasswordValid, (newValue, oldValue) => {
  if (newValue !== oldValue) {
    errors.userPasswordValid = secondPasswordValidation(
      newValue,
      inputData.userPassword
    )
  }
})

watch(() => inputData.userName, (newValue, oldValue) => {
  if (newValue !== oldValue) {
    errors.userName = inputValidation(newValue, '이름')
  }
})

watch(() => inputData.userNickname, (newValue, oldValue) => {
  if (newValue !== oldValue) {
    errors.userNickname = inputValidation(newValue, '닉네임')
  }
})

watch(() => inputData.userPhoneNumber, (newValue, oldValue) => {
  if (newValue !== oldValue) {
    errors.userPhoneNumber = inputValidation(newValue, '휴대폰 번호')
  }
})

watch(() => inputData.userPasswordQuestionId, (newValue, oldValue) => {
  if (newValue !== oldValue) {
    errors.userPasswordQuestionId = queryValidation(newValue)
  }
})

watch(() => inputData.userPasswordAnswer, (newValue, oldValue) => {
  if (newValue !== oldValue) {
    errors.userPasswordAnswer = queryAnswerValidation(newValue)
  }
})

// 이메일 중복 확인
const checkEmail = async () => {
  if (!inputData.userEmail || errors.userEmail) return

  isEmailCheckLoading.value = true
  try {
    const { data } = await checkEmailDuplicatedFetch(inputData.userEmail)
    console.log(data)

    if (data.message === '1') {
      errors.userEmail = '이미 사용 중인 이메일입니다'
      isEmailChecked.value = false
    } else {
      isEmailChecked.value = true
      errors.userEmail = ''
    }
  } catch (error) {
    errors.userEmail = '이메일 중복 확인에 실패했습니다'
    isEmailChecked.value = false
  } finally {
    isEmailCheckLoading.value = false
  }
}

const validateForm = () => {
  return (
    !errors.userEmail &&
    !errors.userPassword &&
    !errors.userPasswordValid &&
    !errors.userName &&
    !errors.userNickname &&
    !errors.userPasswordQuestionId &&
    !errors.userPasswordAnswer &&
    isEmailChecked.value
  )
}

const onSubmit = async () => {
  const userData: User = {
    userEmail: inputData.userEmail,
    userPassword: inputData.userPassword,
    userName: inputData.userName,
    userNickname: inputData.userNickname,
    userPhoneNumber: inputData.userPhoneNumber,
    userPasswordQuestionId: inputData.userPasswordQuestionId,
    userPasswordAnswer: inputData.userPasswordAnswer,
  }

  const result = await useRegister(userData)
}

onMounted(async () => {
  const data = await getPasswordQuestionFetch()
  queryList.value = data
})
</script>

<template>
  <div class="min-h-screen bg-gray-100 px-4 py-12 sm:px-6 lg:px-8">
    <div class="mx-auto max-w-2xl">
      <!-- 헤더 섹션 -->
      <div class="mb-12 text-center">
        <h1 class="text-3xl font-bold text-gray-900">회원가입</h1>
        <p class="mt-2 text-base text-gray-600">러닝 커뮤니티에 오신 것을 환영합니다</p>
      </div>

      <!-- 메인 폼 -->
      <div class="rounded-lg bg-white px-8 py-10 shadow-sm">
        <form class="space-y-6" @submit.prevent="onSubmit">
          <!-- 이메일 입력 섹션 -->
          <div class="space-y-1">
            <label for="userEmail" class="block text-sm font-medium text-gray-700"> 이메일 </label>
            <div class="flex gap-2">
              <div class="flex-1">
                <BasicInput
                  id="userEmail"
                  type="email"
                  name="userEmail"
                  placeholder="이메일을 입력해주세요"
                  v-model="inputData.userEmail"
                  :error="errors.userEmail"
                  class="w-full"
                  direction="col"
                  hideLabel
                  autocomplete="email"
                />
              </div>
              <BasicButton
                type="button"
                @click="checkEmail"
                :disabled="!inputData.userEmail || !!errors.userEmail || isEmailCheckLoading"
                class="h-[42px] w-32"
                :color="isEmailChecked ? 'success' : 'primary'"
              >
                {{ isEmailChecked ? '확인완료' : '중복확인' }}
              </BasicButton>
            </div>
            <p v-if="isEmailChecked && !errors.userEmail" class="mt-1 text-sm text-success-500">
              사용 가능한 이메일입니다
            </p>
          </div>

          <!-- 비밀번호 섹션 -->
          <BasicInput
            id="userPassword"
            label="비밀번호"
            name="userPassword"
            type="password"
            placeholder="비밀번호를 입력해주세요"
            direction="col"
            v-model="inputData.userPassword"
            :error="errors.userPassword"
            autocomplete="new-password"
          />

          <BasicInput
            id="userPasswordValid"
            label="비밀번호 확인"
            name="userPasswordValid"
            type="password"
            placeholder="비밀번호를 한번 더 입력해주세요"
            direction="col"
            v-model="inputData.userPasswordValid"
            :error="errors.userPasswordValid"
            autocomplete="new-password"
          />

          <!-- 사용자 정보 섹션 -->
          <BasicInput
            id="name"
            label="이름"
            name="userName"
            placeholder="이름을 입력해주세요"
            direction="col"
            v-model="inputData.userName"
            :error="errors.userName"
          />

          <BasicInput
            id="nickname"
            label="닉네임"
            name="userNickname"
            placeholder="닉네임을 입력해주세요"
            direction="col"
            v-model="inputData.userNickname"
            :error="errors.userNickname"
          />
          <BasicInput
            id="phone"
            name="userPhone"
            label="휴대폰 번호"
            placeholder="휴대폰 번호를 입력해주세요"
            direction="col"
            v-model="inputData.userPhoneNumber"
            :error="errors.userPhoneNumber"
          />

          <!-- 보안 질문 섹션 -->
          <BasicSelect
            id="query"
            label="비밀번호 확인 질문"
            v-model="inputData.userPasswordQuestionId"
            name="userPasswordQuestionId"
            :options="queryList"
            direction="col"
            placeholder="질문을 선택해주세요"
            size="md"
            :error="errors.userPasswordQuestionId"
          />
          <BasicInput
            id="queryAnswer"
            name="userPasswordAnswer"
            label="답변"
            placeholder="질문의 답을 입력해주세요"
            direction="col"
            v-model="inputData.userPasswordAnswer"
            :error="errors.userPasswordAnswer"
          />

          <!-- 제출 버튼 -->
          <div class="pt-4">
            <BasicButton type="submit" class="w-full py-3" :disabled="!validateForm()">
              회원가입
            </BasicButton>
          </div>

          <!-- 로그인 링크 -->
          <div class="pt-2 text-center text-sm text-gray-600">
            이미 계정이 있으신가요?
            <RouterLink
              to="/signin"
              class="ml-1 font-medium text-primary-500 hover:text-primary-600"
            >
              로그인하기
            </RouterLink>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
