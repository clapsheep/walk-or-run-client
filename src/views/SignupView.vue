<script setup lang="ts">
import BasicButton from '@/components/atoms/BasicButton.vue'
import BasicInput from '@/components/atoms/BasicInput.vue'
import BasicSelect from '@/components/molecules/BasicSelect.vue'
import { checkEmailDuplicatedFetch, getPasswordQuestionFetch, registerFetch } from '@/core/auth/AuthApi'
import { useRegisterForm } from '@/core/auth/composables/useRegisterForm'
import { onMounted, ref } from 'vue'

const queryList = ref({})

const {
  form,
  errors,
  emailError,
  isEmailCheckLoading,
  isEmailChecked,
  isSubmitting,
  checkEmail,
  handleSubmit,
  validateField,
} = useRegisterForm({
  registerFetch,
  checkEmailFetch: checkEmailDuplicatedFetch,
})

onMounted(async () => {
  const { data } = await getPasswordQuestionFetch()
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
        <form class="space-y-6" @submit.prevent="handleSubmit">
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
                  v-model="form.userEmail"
                  :error="emailError || errors.userEmail"
                  @update:model-value="validateField('userEmail')"
                  class="w-full"
                  direction="col"
                  autocomplete="email"
                />
              </div>
              <BasicButton
                type="button"
                @click="checkEmail"
                :disabled="!form.userEmail || isEmailCheckLoading"
                class="h-[42px] w-32"
                :color="isEmailChecked ? 'success' : 'primary'"
              >
                {{ isEmailChecked ? '확인완료' : '중복확인' }}
              </BasicButton>
            </div>
            <p v-if="isEmailChecked && !emailError" class="mt-1 text-sm text-success-500">
              사용 가능한 이메일입니다
            </p>
          </div>

          <!-- 비밀번호 섹션 -->
          <BasicInput
            id="userPassword"
            label="비밀번호"
            name="userPassword"
            placeholder="비밀번호를 입력해주세요"
            type="password"
            v-model="form.userPassword"
            :error="errors.userPassword"
            @update:model-value="validateField('userPassword')"
            direction="col"
            autocomplete="new-password"
          />

          <BasicInput
            id="userPasswordConfirm"
            label="비밀번호 확인"
            name="userPasswordConfirm"
            placeholder="비밀번호를 확인해주세요"
            type="password"
            v-model="form.userPasswordConfirm"
            :error="errors.userPasswordConfirm"
            @update:model-value="validateField('userPasswordConfirm')"
            direction="col"
            autocomplete="new-password"
          />

          <!-- 사용자 정보 섹션 -->
          <BasicInput
            id="userName"
            label="이름"
            name="userName"
            placeholder="이름을 입력해주세요"
            v-model="form.userName"
            :error="errors.userName"
            @update:model-value="validateField('userName')"
            direction="col"
          />

          <BasicInput
            id="userNickname"
            label="닉네임"
            name="userNickname"
            placeholder="닉네임을 입력해주세요"
            v-model="form.userNickname"
            :error="errors.userNickname"
            @update:model-value="validateField('userNickname')"
            direction="col"
          />

          <BasicInput
            id="userPhoneNumber"
            name="userPhoneNumber"
            label="휴대폰 번호"
            placeholder="휴대폰 번호를 입력해주세요(-)제외"
            v-model="form.userPhoneNumber"
            :error="errors.userPhoneNumber"
            @update:model-value="validateField('userPhoneNumber')"
            direction="col"
            type="tel"
          />

          <!-- 보안 질문 섹션 -->
          <BasicSelect
            id="userPasswordQuestionId"
            label="비밀번호 확인 질문"
            v-model="form.userPasswordQuestionId"
            name="userPasswordQuestionId"
            :options="queryList"
            :error="errors.userPasswordQuestionId"
            @update:model-value="validateField('userPasswordQuestionId')"
            direction="col"
            placeholder="질문을 선택해주세요"
            size="md"
          />

          <BasicInput
            id="userPasswordAnswer"
            name="userPasswordAnswer"
            label="답변"
            placeholder="답변을 입력해주세요"
            v-model="form.userPasswordAnswer"
            :error="errors.userPasswordAnswer"
            @update:model-value="validateField('userPasswordAnswer')"
            direction="col"
            type="text"
          />

          <!-- 제출 버튼 -->
          <div class="pt-4">
            <BasicButton type="submit" class="w-full py-3" :disabled="isSubmitting">
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
