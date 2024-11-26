<!-- views/admin/EndedChallengesView.vue -->
<script setup lang="ts">
import { useGetEndedChallenges } from '@/core/challenge/composables/useGetEndedChallenges'
import BasicButton from '@/components/atoms/BasicButton.vue'
import PageSizeSelect from '@/components/atoms/PageSizeSelect.vue'
import Pagination from '@/components/atoms/Pagination.vue'
import { useRouter } from 'vue-router'
import { onMounted } from 'vue';
import { getEndedChallengesFetch } from '@/core/challenge/ChallengeApi';

const router = useRouter()
const {
  loading,
  error,
  challenges,
  fetchEndedChallenges,
  changePage,
  goToDetail
} = useGetEndedChallenges(getEndedChallengesFetch)

// Initial fetch
onMounted(async () => await fetchEndedChallenges())

</script>

<template>
  <div class="space-y-6">
    <!-- 페이지 크기 선택 -->
    <div class="flex items-center justify-end space-x-2">
      <PageSizeSelect
        :current-size="challenges.pageInfo.pageSize"
        @select="(size) => changePage(getEndedChallengesFetch, 1, size)"
      />
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
        종료된 챌린지가 없습니다.
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
              최종 참여자 {{ challenge.challengeParticipantCnt }}명 ·
              {{ challenge.challengeCreateDate }} ~ {{ challenge.challengeDeleteDate }}
            </p>
          </div>
          <BasicButton
            color="secondary"
            @click="goToDetail(challenge.challengeId ?? 0)"
          >
            결과보기
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
          @page-change="(page, pageSize) => changePage(getEndedChallengesFetch, page, pageSize)"
        />
      </div>
    </div>
  </div>
</template>
