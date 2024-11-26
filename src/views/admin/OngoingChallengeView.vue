<script setup lang="ts">
import BasicButton from '@/components/atoms/BasicButton.vue'
import PageSizeSelect from '@/components/atoms/PageSizeSelect.vue'
import Pagination from '@/components/atoms/Pagination.vue'
import { getActiveChallengesFetch } from '@/core/challenge/ChallengeApi'
import { useGetActiveChallenges } from '@/core/challenge/composables/useGetActiveChallenges'
import { navigateToEdit } from '@/core/challenge/services/challengesService'
import { onMounted } from 'vue'

const { loading, error, challenges, fetchActiveChallenges, changePage } =
  useGetActiveChallenges(getActiveChallengesFetch)

onMounted(async () => {
  await fetchActiveChallenges()
})
</script>

<template>
  <div class="space-y-6">
    <!-- 페이지 크기 선택 -->
    <div class="flex items-center justify-end space-x-2">
      <PageSizeSelect
        :current-size="challenges.pageInfo.pageSize"
        @select="(size) => changePage(getActiveChallengesFetch, 1, size)"
      />
    </div>

    <!-- 로딩 상태 -->
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
      <div v-if="challenges.content.length === 0" class="py-8 text-center text-gray-500">
        진행중인 챌린지가 없습니다.
      </div>
      <div
        v-else
        v-for="challenge in challenges.content"
        :key="challenge.challengeId"
        class="cursor-pointer rounded-lg bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
      >
        <div class="flex items-center justify-between">
          <div class="space-y-2">
            <h3 class="text-lg font-semibold text-gray-800">{{ challenge.challengeTitle }}</h3>
            <p class="text-sm text-gray-600">
              참여자 {{ challenge.challengeParticipantCnt }}명 ·
              {{ challenge.challengeCreateDate }} ~ {{ challenge.challengeDeleteDate }}
            </p>
          </div>
          <BasicButton color="accent" @click="navigateToEdit(challenge.challengeId)">
            수정하기
          </BasicButton>
        </div>
      </div>

      <!-- 페이지네이션 -->
      <div
        v-if="!loading && !error && challenges.content.length > 0"
        class="mt-8 flex justify-center"
      >
        <Pagination
          :page-info="{
            currentPage: challenges.pageInfo.currentPage,
            totalPages: challenges.pageInfo.totalPages,
            pageSize: challenges.pageInfo.pageSize,
          }"
          @page-change="(page, pageSize) => changePage(getActiveChallengesFetch, page, pageSize)"
        />
      </div>
    </div>
  </div>
</template>
