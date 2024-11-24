<script setup lang="ts">
import { onMounted, ref } from 'vue';
import GoalSettingModal from '@/components/molecules/GoalSettingModal.vue';
import { useGetUserInfo } from '@/core/user/composables/useGetUserInfo';
import { getUserInfoFetch } from '@/core/user/UserApi';
import { useUserStore } from '@/stores/userStore';
import { useAuthStore } from '@/stores/authStore';

const {
  userInfo,
  goToChangePassword,
  goToGoalSetting,
  getUserInfo
} = useGetUserInfo(getUserInfoFetch);

const myChallenges = ref([
  { id: 1, title: '매일 1만보 걷기', status: '진행중' },
  { id: 2, title: '30일 런닝 챌린지', status: '완료' },
]);

onMounted(async () => {
  await getUserInfo();
})
</script>

<template>
  <div class="min-h-screen bg-gray-100 p-6">
    <div class="container mx-auto">
      <div class="bg-white rounded-lg shadow-md p-6">
        <!-- 프로필 섹션 -->
        <div class="mb-8">
          <h1 class="text-2xl font-bold text-gray-800 mb-6">마이페이지</h1>
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
              <div class="flex items-center text-gray-600">
                <span class="font-semibold w-24">닉네임:</span>
                <span>{{ userInfo.userNickname }}</span>
              </div>
            </div>
            <div class="space-y-3">
              <div class="flex items-center text-gray-600">
                <span class="font-semibold w-24">휴대폰:</span>
                <span>{{ userInfo?.userPhoneNumber }}</span>
              </div>
              <div class="flex items-center text-gray-600">
                <span class="font-semibold w-24">가입일:</span>
                <span>{{ userInfo.userJoinDate }}</span>
              </div>
              <div class="flex items-center">
                <button
                  @click="goToChangePassword"
                  class="bg-primary-500 text-white px-4 py-2 rounded-md hover:bg-primary-600 transition-colors"
                >
                  비밀번호 변경
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- 챌린지 섹션 -->
        <div class="mb-8">
          <h2 class="text-xl font-semibold text-gray-800 mb-4">참여 중인 챌린지</h2>
          <div class="bg-gray-50 p-4 rounded-lg max-h-60 overflow-y-auto">
            <div v-for="challenge in myChallenges" :key="challenge.id" class="mb-3 last:mb-0">
              <div class="bg-white p-4 rounded-md shadow-sm">
                <div class="flex justify-between items-center">
                  <span class="font-medium text-gray-700">{{ challenge.title }}</span>
                  <span
                    :class="{
                      'bg-green-100 text-green-800': challenge.status === '진행중',
                      'bg-blue-100 text-blue-800': challenge.status === '완료'
                    }"
                    class="px-3 py-1 rounded-full text-sm"
                  >
                    {{ challenge.status }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 목표 섹션 -->
        <div class="mb-8">
          <div class="flex flex-col gap-4">
            <h2 class="text-xl font-bold">나의 목표</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div v-if="userInfo?.goals?.length > 0">
                <!-- 목표 목록 표시 -->
              </div>
              <div v-else class="text-gray-500">
                설정된 목표가 없습니다.
              </div>
              <button
                @click="goToGoalSetting"
                class="bg-primary-500 text-white px-4 py-2 rounded-md hover:bg-primary-600 transition-colors"
              >
                목표 설정하기
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <GoalSettingModal
      v-if="showGoalSettingModal"
      @close="closeGoalSettingModal"
      @submit="handleGoalSubmit"
    />
    <PasswordVerificationModal
      v-if="showPasswordVerificationModal"
      @close="closePasswordVerificationModal"
      @verify="handlePasswordVerify"
    />
  </div>
</template>
