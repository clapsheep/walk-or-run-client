<!-- views/MyChallengesView.vue -->
<script setup lang="ts">
import BasicButton from '@/components/atoms/BasicButton.vue'
import { useGetUserChallenges } from '@/core/challenge/composables/useGetUserChallenges'
import { getUserChallengeFetch } from '@/core/challenge/ChallengeApi'
import { useUserStore } from '@/stores/userStore'

const userStore = useUserStore()

const { loading, error, challenges, pageInfo, goToDetail, changePage } = useGetUserChallenges(
  getUserChallengeFetch,
  Number(userStore.userId),
)
</script>

<template>
  <div class="mx-auto max-w-4xl px-4 py-8">
    <div class="space-y-6">
      <div class="flex items-center justify-between">
        <h2 class="text-2xl font-bold text-gray-800">참여 중인 챌린지</h2>
        <BasicButton @click="$router.push('/challenge')" color="primary">
          새로운 챌린지 참여하기
        </BasicButton>
      </div>

      <!-- 로딩 상태 (스켈레톤 UI) -->
      <div v-if="loading" class="space-y-4">
        <div v-for="n in 3" :key="n" class="animate-pulse">
          <div class="rounded-lg bg-white p-6 shadow-sm">
            <div class="flex items-center justify-between">
              <div class="flex-1 space-y-3">
                <div class="h-4 w-1/4 rounded bg-gray-200"></div>
                <div class="h-3 w-3/4 rounded bg-gray-200"></div>
              </div>
              <div class="h-6 w-20 rounded-full bg-gray-200"></div>
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
        <div v-if="challenges.length === 0" class="rounded-lg bg-gray-50 p-8 text-center">
          <p class="text-gray-600">참여 중인 챌린지가 없습니다.</p>
        </div>
        <div
          v-else
          v-for="challenge in challenges"
          :key="challenge.challengeId"
          class="cursor-pointer rounded-lg bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
          @click="goToDetail(challenge)"
        >
          <div class="flex items-center justify-between">
            <div class="flex-1 space-y-2">
              <h3 class="text-lg font-semibold text-gray-800">
                {{ challenge.challengeTitle }}
              </h3>
              <p class="text-sm text-gray-600">
                {{ challenge.challengeDescription }}
              </p>
              <div class="flex items-center space-x-4 text-sm text-gray-500">
                <span>참여자: {{ challenge.challengeParticipantCnt }}명</span>
                <span>{{ challenge.dday }}</span>
              </div>
            </div>
            <BasicButton color="primary" variant="outlined" @click.stop="goToDetail(challenge)">
              상세보기
            </BasicButton>
          </div>
        </div>

        <!-- 페이지네이션 -->
        <div v-if="pageInfo.totalPages > 1" class="mt-6 flex justify-center space-x-2">
          <button
            v-for="page in pageInfo.totalPages"
            :key="page"
            @click="changePage(page - 1)"
            :class="[
              'rounded-lg px-4 py-2 font-medium transition-colors duration-200',
              pageInfo.pageNumber + 1 === page
                ? 'bg-blue-500 text-white hover:bg-blue-600'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200',
            ]"
          >
            {{ page }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
