<script setup>
import { ref, watch } from 'vue'
import BasicButton from '@/components/atoms/BasicButton.vue'
import BasicInput from '@/components/atoms/BasicInput.vue'
import BasicSelect from '@/components/molecules/BasicSelect.vue'

const emailRef = ref('')
const passwordRef = ref('')
const passwordValidRef = ref('')
const nameRef = ref('')
const nicknameRef = ref('')
const queryRef = ref('')
const isEmailChecked = ref(false)
const isEmailCheckLoading = ref(false)

const errors = ref({
  email: '',
  password: '',
  passwordValid: '',
  name: '',
  nickname: '',
  query: '',
})

// 이메일 실시간 검증
watch(emailRef, (newValue) => {
  isEmailChecked.value = false // 이메일이 변경되면 중복확인 초기화
  if (!newValue) {
    errors.value.email = '이메일을 입력해주세요'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newValue)) {
    errors.value.email = '올바른 이메일 형식이 아닙니다'
  } else {
    errors.value.email = ''
  }
})

// 비밀번호 실시간 검증
watch(passwordRef, (newValue) => {
  if (!newValue) {
    errors.value.password = '비밀번호를 입력해주세요'
  } else if (newValue.length < 8) {
    errors.value.password = '비밀번호는 8자 이상이어야 합니다'
  } else {
    errors.value.password = ''
  }

  // 비밀번호 확인 필드가 비어있지 않은 경우 일치 여부 검사
  if (passwordValidRef.value) {
    if (newValue !== passwordValidRef.value) {
      errors.value.passwordValid = '비밀번호가 일치하지 않습니다'
    } else {
      errors.value.passwordValid = ''
    }
  }
})

// 비밀번호 확인 실시간 검증
watch(passwordValidRef, (newValue) => {
  if (!newValue) {
    errors.value.passwordValid = '비밀번호를 한번 더 입력해주세요'
  } else if (newValue !== passwordRef.value) {
    errors.value.passwordValid = '비밀번호가 일치하지 않습니다'
  } else {
    errors.value.passwordValid = ''
  }
})

// 이름 실시간 검증
watch(nameRef, (newValue) => {
  if (!newValue) {
    errors.value.name = '이름을 입력해주세요'
  } else {
    errors.value.name = ''
  }
})

// 닉네임 실시간 검증
watch(nicknameRef, (newValue) => {
  if (!newValue) {
    errors.value.nickname = '닉네임을 입력해주세요'
  } else {
    errors.value.nickname = ''
  }
})

// 질문 선택 실시간 검증
watch(queryRef, (newValue) => {
  if (!newValue) {
    errors.value.query = '질문을 선택해주세요'
  } else {
    errors.value.query = ''
  }
})

// 이메일 중복 확인
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

const validateForm = () => {
  return (
    !errors.value.email &&
    !errors.value.password &&
    !errors.value.passwordValid &&
    !errors.value.name &&
    !errors.value.nickname &&
    !errors.value.query &&
    isEmailChecked.value
  )
}

const onSubmit = async () => {
  if (!validateForm()) return

  try {
    const userData = {
      email: emailRef.value,
      password: passwordRef.value,
      name: nameRef.value,
      nickname: nicknameRef.value,
      securityQuestion: queryRef.value,
    }
    console.log('회원가입 시도:', userData)
  } catch (error) {
    console.error('회원가입 실패:', error)
  }
}
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
                  placeholder="이메일을 입력해주세요"
                  v-model="emailRef"
                  :error="errors.email"
                  class="w-full"
                  direction="col"
                  hideLabel
                />
              </div>
              <BasicButton
                type="button"
                @click="checkEmail"
                :disabled="!emailRef || !!errors.email || isEmailCheckLoading"
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
            type="password"
            placeholder="비밀번호를 입력해주세요"
            direction="col"
            v-model="passwordRef"
            :error="errors.password"
          />

          <BasicInput
            id="userPasswordValid"
            label="비밀번호 확인"
            type="password"
            placeholder="비밀번호를 한번 더 입력해주세요"
            direction="col"
            v-model="passwordValidRef"
            :error="errors.passwordValid"
          />

          <!-- 사용자 정보 섹션 -->

          <BasicInput
            id="name"
            label="이름"
            placeholder="이름을 입력해주세요"
            direction="col"
            v-model="nameRef"
            :error="errors.name"
          />

          <BasicInput
            id="nickname"
            label="닉네임"
            placeholder="닉네임을 입력해주세요"
            direction="col"
            v-model="nicknameRef"
            :error="errors.nickname"
          />

          <!-- 보안 질문 섹션 -->
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
