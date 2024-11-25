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
  <div class="space-y-6">
    <!-- 로딩 상태 (스켈레톤 UI) -->
    <div v-if="loading" class="bg-white rounded-lg shadow-sm p-6 space-y-4">
      <div class="animate-pulse">
        <div class="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
        <div class="space-y-3">
          <div class="h-4 bg-gray-200 rounded w-3/4"></div>
          <div class="h-4 bg-gray-200 rounded w-2/3"></div>
        </div>
        <div class="mt-6 space-y-3">
          <div class="h-4 bg-gray-200 rounded w-1/4"></div>
          <div class="h-4 bg-gray-200 rounded w-1/3"></div>
        </div>
        <div class="mt-6 flex space-x-4">
          <div class="h-10 bg-gray-200 rounded w-32"></div>
          <div class="h-10 bg-gray-200 rounded w-32"></div>
        </div>
      </div>
    </div>

    <!-- 에러 상태 -->
    <div v-else-if="error" class="bg-white rounded-lg shadow-sm p-6">
      <p class="text-red-500 text-center">{{ error }}</p>
    </div>

    <!-- 사용자 정보 -->
    <div v-else class="bg-white rounded-lg shadow-sm p-6">

      <div class="space-y-6">
        <div class="flex items-center justify-between">
          <h2 class="text-2xl font-bold text-gray-800">프로필 정보</h2>
          <BasicButton
            v-if="!isEditing"
            @click="handleEdit"
            color="primary"
            variant="outlined"
          >
            수정하기
          </BasicButton>
          <BasicButton
            v-else
            @click="handleSave"
            color="primary"
            variant="filled"
          >
            저장하기
          </BasicButton>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg">
          <div class="space-y-3">
            <div class="flex items-center text-gray-600">
              <span class="font-semibold w-24">이름:</span>
              <span>{{ userInfo.userName }}</span>
            </div>
            <div class="flex items-center text-gray-600">
              <span class="font-semibold w-24">이메일:</span>
              <span>{{ userInfo.userEmail }}</span>
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
              />
              <div v-else class="flex items-center text-gray-600">
                <span class="font-semibold w-24">닉네임:</span>
                <span>{{ userInfo.userNickname }}</span>
              </div>
            </div>
          </div>
          <div class="space-y-3">
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
            />
            <div v-else class="flex items-center text-gray-600">
              <span class="font-semibold w-24">휴대폰:</span>
              <span>{{ userInfo?.userPhoneNumber }}</span>
            </div>
            <div class="flex items-center text-gray-600">
              <span class="font-semibold w-24">가입일:</span>
              <span>{{ userInfo.userJoinDate }}</span>
            </div>
          </div>

        </div>
        <div class="flex justify-end">
          <BasicButton
            @click="goToChangePassword"
            color="primary"
            variant="filled"
          >
            비밀번호 변경
          </BasicButton>
        </div>
      </div>
    </div>
  </div>
</template>
