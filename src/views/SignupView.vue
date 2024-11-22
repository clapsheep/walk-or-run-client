<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import BasicButton from '@/components/atoms/BasicButton.vue'
import BasicInput from '@/components/atoms/BasicInput.vue'
import BasicSelect from '@/components/molecules/BasicSelect.vue'
import {
  validateEmailFormat,
  passwordValidation,
  matchPasswordValidation,
  secondPasswordValidation,
  nameValidation,
  queryValidation,
  queryAnswerValidation,
} from '@/utils/inputValidation'
import { getPasswordQuestionFetch, checkEmailDuplicatedFetch, registerFetch } from '@/apis/auth'

const inputData = ref({
  userEmail: '',
  userPassword: '',
  userPasswordVaild: '',
  userName: '',
  userNickName: '',
  userPhoneNumber: '',
  userPasswordQuestionId: '',
  userPasswordQuestionAnswer: '',
})

const isEmailChecked = ref(false)
const isEmailCheckLoading = ref(false)
const queryList = ref({})

const errors = ref({
  email: '',
  password: '',
  passwordValid: '',
  name: '',
  nickname: '',
  phone: '',
  passwordQuestionId: '',
  passwordQuestionAnswer: '',
})

watch(
  inputData,
  (newValue: Record<string, any>, oldValue) => {
    // 변경된 속성 찾기
    const changedKey = Object.keys(newValue).find((key: string) => newValue[key] !== oldValue[key])

    // 변경된 속성에 따른 유효성 검사
    switch (changedKey) {
      case 'email':
        isEmailChecked.value = false
        errors.value.email = validateEmailFormat(newValue.email)
        break
      case 'password':
        errors.value.password = passwordValidation(newValue.password)
        errors.value.passwordValid = matchPasswordValidation(
          newValue.password,
          newValue.passwordValid,
        )
        break
      case 'passwordValid':
        errors.value.passwordValid = secondPasswordValidation(
          newValue.passwordValid,
          newValue.password,
        )
        break
      case 'name':
        errors.value.name = nameValidation(newValue.name, '이름')
        break
      case 'nickname':
        errors.value.nickname = nameValidation(newValue.nickname, '닉네임')
        break
      case 'phone':
        errors.value.phone = nameValidation(newValue.phone, '휴대폰 번호')
        break
      case 'passwordQuestionId':
        errors.value.passwordQuestionId = queryValidation(newValue.passwordQuestionId)
        break
      case 'passwordQuestionAnswer':
        errors.value.passwordQuestionAnswer = queryAnswerValidation(newValue.passwordQuestionAnswer)
        break
    }
  },
  { deep: true },
)

// 이메일 중복 확인
const checkEmail = async () => {
  if (!inputData.value.userEmail || errors.value.email) return

  isEmailCheckLoading.value = true
  try {
    const { data } = await checkEmailDuplicatedFetch(inputData.value.userEmail)
    console.log(data)

    if (data.message === '1') {
      errors.value.email = '이미 사용 중인 이메일입니다'
      isEmailChecked.value = false
    } else {
      isEmailChecked.value = true
      errors.value.email = ''
    }
  } catch (error) {
    errors.value.email = '이메일 중복 확인에 실패했습니다'
    isEmailChecked.value = false
  } finally {
    isEmailCheckLoading.value = false
  }
}

const validateForm = () => {
  return (
    !errors.value.email &&
    !errors.value.password &&
    !errors.value.passwordValid &&
    !errors.value.name &&
    !errors.value.nickname &&
    !errors.value.passwordQuestionId &&
    !errors.value.passwordQuestionAnswer &&
    isEmailChecked.value
  )
}

const onSubmit = async () => {
  if (!validateForm()) return
  const userData = {
    userEmail: inputData.value.userEmail,
    userPassword: inputData.value.userPassword,
    userName: inputData.value.userName,
    userNickname: inputData.value.userNickName,
    userPhoneNumber: inputData.value.userPhoneNumber,
    userPasswordQuestionId: inputData.value.userPasswordQuestionId,
    userPasswordAnswer: inputData.value.userPasswordQuestionAnswer,
  }

  try {
    await registerFetch(userData)
  } catch (error) {
    console.error('회원가입 실패:', error)
  }
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
                  :error="errors.email"
                  class="w-full"
                  direction="col"
                  hideLabel
                />
              </div>
              <BasicButton
                type="button"
                @click="checkEmail"
                :disabled="!inputData.userEmail || !!errors.email || isEmailCheckLoading"
                class="h-[42px] w-32"
                :color="isEmailChecked ? 'success' : 'primary'"
              >
                {{ isEmailChecked ? '확인완료' : '중복확인' }}
              </BasicButton>
            </div>
            <p v-if="isEmailChecked && !errors.email" class="mt-1 text-sm text-success-500">
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
            :error="errors.password"
          />

          <BasicInput
            id="userPasswordValid"
            label="비밀번호 확인"
            name="userPasswordValid"
            type="password"
            placeholder="비밀번호를 한번 더 입력해주세요"
            direction="col"
            v-model="inputData.userPasswordVaild"
            :error="errors.passwordValid"
          />

          <!-- 사용자 정보 섹션 -->
          <BasicInput
            id="name"
            label="이름"
            name="userName"
            placeholder="이름을 입력해주세요"
            direction="col"
            v-model="inputData.userName"
            :error="errors.name"
          />

          <BasicInput
            id="nickname"
            label="닉네임"
            name="userNickname"
            placeholder="닉네임을 입력해주세요"
            direction="col"
            v-model="inputData.userNickName"
            :error="errors.nickname"
          />
          <BasicInput
            id="phone"
            name="userPhone"
            label="휴대폰 번호"
            placeholder="휴대폰 번호를 입력해주세요"
            direction="col"
            v-model="inputData.userPhoneNumber"
            :error="errors.phone"
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
            :error="errors.passwordQuestionId"
          />
          <BasicInput
            id="queryAnswer"
            name="userPasswordAnswer"
            label="답변"
            placeholder="질문의 답을 입력해주세요"
            direction="col"
            v-model="inputData.userPasswordQuestionAnswer"
            :error="errors.passwordQuestionAnswer"
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
