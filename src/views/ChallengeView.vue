<script setup lang="ts">
import { onMounted } from 'vue'
import { getChallengesFetch } from '@/core/challenge/ChallengeApi'
import { useGetAllChallenges } from '@/core/challenge/composables/useGetAllChallenges';

const {
  loading,
  error,
  challenges,
  fetchChallenges,
  changePage,
  goToDetail
} = useGetAllChallenges(getChallengesFetch);

onMounted(async () => {
  await fetchChallenges()
})
</script>

<template>
  <div class="min-h-screen bg-gray-100 p-6">
    <div class="container mx-auto">
      <!-- 챌린지 목록 타이틀 -->
      <h1 class="mb-8 text-3xl font-bold text-gray-800">진행중인 챌린지</h1>

      <!-- 로딩 상태 -->
      <div v-if="loading" class="flex justify-center">
        <p class="text-gray-600">챌린지 목록을 불러오는 중...</p>
      </div>

      <!-- 에러 상태 -->
      <div v-else-if="error" class="flex justify-center">
        <p class="text-red-500">{{ error }}</p>
      </div>

      <!-- 챌린지 카드 그리드 -->
      <div v-else class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <!-- 챌린지 카드 -->
        <div v-for="challenge in challenges.content"
            :key="challenge.challengeTitle"
            class="cursor-pointer rounded-lg bg-white p-6 shadow-md transition-transform hover:scale-105"
            @click="goToDetail(challenge)">
          <div class="mb-4 flex items-start justify-between">
            <h2 class="text-md font-semibold text-gray-800 pr-16">{{ challenge.challengeTitle }}</h2>
            <!-- D-day 배지 크기 조정 및 위치 변경 -->
            <span class="rounded-full bg-primary-500 px-2 py-0.5 text-xs text-white whitespace-nowrap">
              {{ challenge.dday }}
            </span>
          </div>
          <p class="mb-4 text-sm text-gray-600">{{ challenge.challengeDescription }}</p>
          <div class="flex justify-between text-sm text-gray-500">
            <span>카테고리: {{ challenge.challengeCategoryName }}</span>
            <span>작성자: 관리자</span>
          </div>
        </div>
      </div>

      <!-- 페이지네이션 -->
      <div v-if="!loading && !error && challenges.content.length > 0" class="mt-8 flex justify-center">
        <nav class="flex items-center space-x-2">
          <button
            class="rounded-md border border-gray-300 px-3 py-1 text-sm hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
            :disabled="challenges.pageInfo.currentPage === 1"
            @click="changePage(challenges.pageInfo.currentPage - 1)">
            이전
          </button>
          <span class="text-sm text-gray-700">
            {{ challenges.pageInfo.currentPage }} / {{ challenges.pageInfo.totalPages }}
          </span>
          <button
            class="rounded-md border border-gray-300 px-3 py-1 text-sm hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
            :disabled="challenges.pageInfo.currentPage >= challenges.pageInfo.totalPages"
            @click="changePage(challenges.pageInfo.currentPage + 1)">
            다음
          </button>
        </nav>
      </div>
    </div>
  </div>
</template>
