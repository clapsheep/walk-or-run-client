<!-- views/ProfileView.vue -->
<script setup lang="ts">
import { useChangeProfile } from '@/core/user/composables/useChangeProfile'
import { changeUserInfoFetch, getUserInfoFetch } from '@/core/user/UserApi'
import BasicButton from '@/components/atoms/BasicButton.vue'
import BasicInput from '@/components/atoms/BasicInput.vue'

const {
  form,
  errors,
  isEditing,
  handleEdit,
  handleSave,
  loading,
  error,
  userInfo,
  goToChangePassword,
} = useChangeProfile(changeUserInfoFetch, getUserInfoFetch)
</script>

<template>
  <div class="mx-auto max-w-4xl px-4 py-8">
    <!-- 로딩 상태 (스켈레톤 UI) -->
    <div v-if="loading" class="space-y-6 rounded-xl bg-white p-8 shadow-sm">
      <div class="animate-pulse">
        <div class="mb-6 h-10 w-1/3 rounded-lg bg-gray-200"></div>
        <div class="space-y-4">
          <div class="h-5 w-3/4 rounded-lg bg-gray-200"></div>
          <div class="h-5 w-2/3 rounded-lg bg-gray-200"></div>
        </div>
        <div class="mt-8 space-y-4">
          <div class="h-5 w-1/4 rounded-lg bg-gray-200"></div>
          <div class="h-5 w-1/3 rounded-lg bg-gray-200"></div>
        </div>
        <div class="mt-8 flex space-x-4">
          <div class="h-12 w-36 rounded-lg bg-gray-200"></div>
          <div class="h-12 w-36 rounded-lg bg-gray-200"></div>
        </div>
      </div>
    </div>

    <!-- 에러 상태 -->
    <div
      v-else-if="error"
      class="flex items-center justify-center rounded-xl bg-white p-8 shadow-sm"
    >
      <p class="text-lg text-red-500">{{ error }}</p>
    </div>

    <!-- 사용자 정보 -->
    <div v-else class="space-y-6">
      <!-- 헤더 섹션 -->
      <div class="rounded-xl bg-white p-8 shadow-sm">
        <div class="mb-8 flex items-center justify-between">
          <div class="space-y-1">
            <h2 class="text-2xl font-bold text-gray-800">프로필 정보</h2>
            <p class="text-sm text-gray-500">개인정보를 확인하고 수정할 수 있습니다</p>
          </div>
          <BasicButton
            v-if="!isEditing"
            @click="handleEdit"
            color="primary"
            variant="outlined"
            class="min-w-[100px]"
          >
            수정하기
          </BasicButton>
          <BasicButton
            v-else
            @click="handleSave"
            color="primary"
            variant="filled"
            class="min-w-[100px]"
          >
            저장하기
          </BasicButton>
        </div>

        <!-- 프로필 정보 그리드 -->
        <div class="grid grid-cols-1 gap-8 lg:grid-cols-2">
          <!-- 기본 정보 -->
          <div class="space-y-6">
            <div class="space-y-4">
              <h3 class="text-lg font-semibold text-gray-700">기본 정보</h3>
              <div class="space-y-3 rounded-lg bg-white p-4 shadow-sm ring-1 ring-gray-200">
                <div class="flex items-center text-gray-600">
                  <span class="w-24 font-medium">이름</span>
                  <span class="text-gray-800">{{ userInfo.userName }}</span>
                </div>
                <div class="flex items-center text-gray-600">
                  <span class="w-24 font-medium">이메일</span>
                  <span class="text-gray-800">{{ userInfo.userEmail }}</span>
                </div>
                <div>
                  <BasicInput
                    v-if="isEditing"
                    id="userNickname"
                    label="닉네임"
                    name="userNickname"
                    type="text"
                    placeholder="닉네임을 입력해주세요"
                    direction="row"
                    v-model="form.userNickname"
                    :error="errors.userNickname"
                    class="transition-all duration-200"
                  />
                  <div v-else class="flex items-center text-gray-600">
                    <span class="w-24 font-medium">닉네임</span>
                    <span class="text-gray-800">{{ userInfo.userNickname }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- 연락처 및 계정 정보 -->
          <div class="space-y-6">
            <div class="space-y-4">
              <h3 class="text-lg font-semibold text-gray-700">연락처 및 계정 정보</h3>
              <div class="space-y-3 rounded-lg bg-white p-4 shadow-sm ring-1 ring-gray-200">
                <div>
                  <BasicInput
                    v-if="isEditing"
                    id="userPhoneNumber"
                    label="휴대폰"
                    name="userPhoneNumber"
                    type="text"
                    placeholder="휴대폰 번호를 입력해주세요"
                    direction="row"
                    v-model="form.userPhoneNumber"
                    :error="errors.userPhoneNumber"
                    class="transition-all duration-200"
                  />
                  <div v-else class="flex items-center text-gray-600">
                    <span class="w-24 font-medium">휴대폰</span>
                    <span class="text-gray-800">{{ userInfo?.userPhoneNumber }}</span>
                  </div>
                </div>
                <div class="flex items-center text-gray-600">
                  <span class="w-24 font-medium">가입일</span>
                  <span class="text-gray-800">{{ userInfo.userJoinDate }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 보안 설정 섹션 -->
      <div class="rounded-xl bg-white p-8 shadow-sm">
        <div class="flex items-center justify-between">
          <div class="space-y-1">
            <h3 class="text-lg font-semibold text-gray-700">보안 설정</h3>
            <p class="text-sm text-gray-500">계정의 보안을 관리합니다</p>
          </div>
          <BasicButton
            @click="goToChangePassword"
            color="primary"
            variant="outlined"
            class="min-w-[140px]"
          >
            비밀번호 변경
          </BasicButton>
        </div>
      </div>
    </div>
  </div>
</template>
