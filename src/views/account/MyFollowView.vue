<script setup lang="ts">
import { ref, onMounted } from 'vue'
import BasicButton from '@/components/atoms/BasicButton.vue'
import { useMyFollows } from '@/core/user/composables/useMyFollows';
import { userFollowService } from '@/core/user/services/userFollowService';

// 컴포저블 함수들
const {
  activeTab,
  followers,
  following,
  loading,
  error,
  handleTabChange,
  isFollowing,
  toggleFollow
} = useMyFollows();

onMounted(async () => {
  await Promise.all([
    handleTabChange('followers'),
    handleTabChange('following')
  ])
})
</script>

<template>
  <div class="space-y-4">
    <!-- 팔로워/팔로잉 탭 -->
    <div class="flex border-b border-gray-200">
      <button
        v-for="tab in ['followers', 'following']"
        :key="tab"
        class="px-4 py-2 -mb-px text-sm font-medium flex flex-col items-center"
        :class="[
          activeTab === tab
            ? 'text-primary-600 border-b-2 border-primary-600'
            : 'text-gray-500 hover:text-gray-700'
        ]"
        @click="handleTabChange(tab as 'followers' | 'following')"
      >
        <span class="text-lg font-semibold">
          {{ tab === 'followers' ? followers.length : following.length }}
        </span>
        <span>{{ tab === 'followers' ? '팔로워' : '팔로잉' }}</span>
      </button>
    </div>

    <!-- 총 수 -->
    <div class="text-sm text-gray-500 py-2">
      {{ activeTab === 'followers' ? `총 ${followers.length} 명의 팔로워` : `총 ${following.length} 명의 팔로잉` }}
    </div>

    <!-- 로딩 상태 -->
    <div v-if="loading" class="flex justify-center py-8">
      <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
    </div>

    <!-- 에러 상태 -->
    <div v-else-if="error" class="text-center py-8 text-red-500">
      {{ error }}
    </div>

    <!-- 팔로워/팔로잉 목록 -->
    <div v-else class="space-y-4">
      <div v-for="user in activeTab === 'followers' ? followers : following"
           :key="user.userId"
           class="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm hover:bg-gray-50">
        <!-- 유저 정보 -->
        <div class="flex items-center space-x-3 cursor-pointer" @click="userFollowService.goToUserProfile(Number(user.userId))">
          <!-- <img src="@/src/assets/images/default-profile.png"
               alt="Profile"
               class="w-10 h-10 rounded-full object-cover" /> -->
          <div>
            <h3 class="font-medium text-gray-900">{{ user.userNickname }}</h3>
            <p class="text-sm text-gray-500">{{ '소개가 없습니다.' }}</p>
          </div>
        </div>

        <!-- 팔로우/언팔로우 버튼 -->
        <div class="flex space-x-2">
          <BasicButton
            v-if="activeTab === 'followers'"
            :variant="isFollowing(Number(user.userId)) ? 'outlined' : 'filled'"
            :color="isFollowing(Number(user.userId)) ? 'primary' : 'secondary'"
            size="sm"
            @click="toggleFollow(Number(user.userId))"
          >
            {{ isFollowing(Number(user.userId)) ? '언팔로우' : '팔로우' }}
          </BasicButton>
          <BasicButton
            v-else
            variant="outlined"
            color="primary"
            size="sm"
            @click="toggleFollow(Number(user.userId))"
          >
            언팔로우
          </BasicButton>
        </div>
      </div>

      <!-- 데이터가 없을 때 -->
      <div v-if="(activeTab === 'followers' ? followers : following).length === 0"
           class="text-center py-8 text-gray-500">
        {{ activeTab === 'followers' ? '팔로워가 없습니다.' : '팔로잉하는 유저가 없습니다.' }}
      </div>
    </div>
  </div>
</template>
