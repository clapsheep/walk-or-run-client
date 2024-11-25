<!-- views/admin/OngoingChallengesView.vue -->
<script setup lang="ts">
import { useGetActiveChallenges } from '@/core/challenge/composables/useGetActiveChallenges'
import BasicButton from '@/components/atoms/BasicButton.vue'
import { useRouter } from 'vue-router'
import { onMounted } from 'vue';
import { getActiveChallengesFetch } from '@/core/challenge/ChallengeApi';

const {
  loading,
  error,
  challenges,
  fetchActiveChallenges,
  changePage,
  goToDetail
} = useGetActiveChallenges(getActiveChallengesFetch)

// Initial fetch
onMounted(async () => {
  await fetchActiveChallenges()
})

</script>

<template>
  <div class="space-y-6">
    <!-- 페이지 크기 선택 -->
    <div class="flex justify-end">
      <div class="flex items-center space-x-2">
        <span class="text-sm text-gray-600">페이지당 항목:</span>
        <div class="flex space-x-1">
          <button
            v-for="size in [10, 20, 30]"
            :key="size"
            class="px-3 py-1 text-sm border rounded-md"
            :class="[
              challenges.pageInfo.pageSize === size
                ? 'bg-primary-500 text-white border-primary-500'
                : 'border-gray-300 hover:bg-gray-50'
            ]"
            @click="changePage(getActiveChallengesFetch, 1, size)"
          >
            {{ size }}
          </button>
        </div>
      </div>
    </div>

    <!-- 로딩 상태 -->
    <div v-if="loading" class="space-y-4">
      <div v-for="n in 3" :key="n" class="animate-pulse">
        <div class="bg-white p-6 rounded-lg shadow-sm">
          <div class="flex justify-between items-center">
            <div class="space-y-3 flex-1">
              <div class="h-4 bg-gray-200 rounded w-1/4"></div>
              <div class="h-3 bg-gray-200 rounded w-3/4"></div>
            </div>
            <div class="w-20 h-6 bg-gray-200 rounded-full"></div>
          </div>
        </div>
      </div>
    </div>

    <!-- 에러 상태 -->
    <div v-else-if="error" class="flex justify-center py-8">
      <p class="text-red-500">{{ error }}</p>
    </div>

    <!-- 챌린지 목록 -->
    <div v-else class="space-y-4">
      <div v-if="challenges.content.length === 0" class="text-center py-8 text-gray-500">
        진행중인 챌린지가 없습니다.
      </div>
      <div
        v-else
        v-for="challenge in challenges.content"
        :key="challenge.challengeId"
        class="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer"
        @click="goToDetail(challenge.challengeId ?? 0)"
      >
        <div class="flex justify-between items-center">
          <div class="space-y-2">
            <h3 class="text-lg font-semibold text-gray-800">{{ challenge.challengeTitle }}</h3>
            <p class="text-sm text-gray-600">
              참여자 {{ challenge.challengeParticipantCnt }}명 ·
              {{ challenge.challengeCreateDate }} ~ {{ challenge.challengeDeleteDate }}
            </p>
          </div>
          <BasicButton
            color="secondary"
            @click="goToDetail(challenge.challengeId ?? 0)"
          >
            관리하기
          </BasicButton>
        </div>
      </div>

      <!-- 페이지네이션 -->
      <div v-if="!loading && !error && challenges.content.length > 0" class="mt-8 flex justify-center">
        <nav class="flex items-center space-x-2">
          <button
            class="rounded-md border border-gray-300 px-3 py-1 text-sm hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
            :disabled="challenges.pageInfo.currentPage === 1"
            @click="changePage(getActiveChallengesFetch, challenges.pageInfo.currentPage - 1, challenges.pageInfo.pageSize)"
          >
            이전
          </button>
          <span class="text-sm text-gray-700">
            {{ challenges.pageInfo.currentPage }} / {{ challenges.pageInfo.totalPages }}
          </span>
          <button
            class="rounded-md border border-gray-300 px-3 py-1 text-sm hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
            :disabled="challenges.pageInfo.currentPage >= challenges.pageInfo.totalPages"
            @click="changePage(getActiveChallengesFetch, challenges.pageInfo.currentPage + 1, challenges.pageInfo.pageSize)"
          >
            다음
          </button>
        </nav>
      </div>
    </div>
  </div>
</template>
