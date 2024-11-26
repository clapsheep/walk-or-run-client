<script setup lang="ts">
import { onMounted, computed } from 'vue'
import { getChallengesFetch } from '@/core/challenge/ChallengeApi'
import { useGetAllChallenges } from '@/core/challenge/composables/useGetAllChallenges'
import ChallengeCard from '@/components/molecules/ChallengeCard.vue'
import PageSizeSelect from '@/components/atoms/PageSizeSelect.vue'
import Header from '@/components/atoms/Header.vue'
import Pagination from '@/components/atoms/Pagination.vue'
import { Challenge } from '@/core/challenge/ChallengeType'
import { FireIcon, TrophyIcon, UserGroupIcon } from '@heroicons/vue/24/outline'

const {
  loading,
  error,
  challenges,
  fetchChallenges,
  changePage,
  goToDetail
} = useGetAllChallenges(getChallengesFetch)

const challengesList = computed(() => challenges.value?.content || [])
const pageInfo = computed(() => challenges.value?.pageInfo || { currentPage: 1, totalPages: 1, pageSize: 10, totalElements: 0 })

const handleSizeSelect = (size: number) => {
  changePage(fetchChallenges, 1, size)
}

const handlePageChange = (page: number, pageSize: number) => {
  changePage(fetchChallenges, page, pageSize)
}

onMounted(async () => {
  await fetchChallenges()
})
</script>

<template>
  <div class="min-h-screen bg-gray-100">
    <Header title="챌린지" :show-back-button="false" />

    <!-- 프로모션 섹션 -->
    <div class="bg-gradient-to-br from-primary-500 via-primary-600 to-primary-700 text-white py-12 px-6 relative overflow-hidden">
      <!-- 배경 장식 -->
      <div class="absolute inset-0 overflow-hidden">
        <div class="absolute -right-10 -top-10 w-40 h-40 bg-white opacity-10 rounded-full"></div>
        <div class="absolute -left-20 -bottom-20 w-60 h-60 bg-white opacity-10 rounded-full"></div>
      </div>

      <div class="max-w-3xl mx-auto text-center relative z-10">
        <div class="flex justify-center mb-4">
          <FireIcon class="w-12 h-12 text-yellow-300" />
        </div>
        <h2 class="text-3xl font-bold mb-4">함께 달리고 걸으며 건강해지세요! 🏃‍♂️</h2>
        <p class="text-lg mb-8 text-primary-100">
          매일 조금씩 운동하는 습관을 만들어보세요.<br/> 다른 참가자들과 함께하면 더 즐겁고 지속적인 운동이 가능합니다. ✨
        </p>
        <div class="flex justify-center space-x-6 text-sm">
          <div class="bg-white bg-opacity-20 backdrop-blur-sm rounded-lg px-6 py-4 flex items-center">
            <TrophyIcon class="w-5 h-5 mr-2 text-yellow-300" />
            <div>
              <span class="block font-semibold text-2xl">{{ challengesList.length }}</span>
              <span>진행중인 챌린지</span>
            </div>
          </div>
          <div class="bg-white bg-opacity-20 backdrop-blur-sm rounded-lg px-6 py-4 flex items-center">
            <UserGroupIcon class="w-5 h-5 mr-2 text-yellow-300" />
            <div>
              <span class="block font-semibold text-2xl">{{ pageInfo.totalElements }}</span>
              <span>전체 챌린지</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 메인 콘텐츠 -->
    <div class="bg-gradient-to-br from-primary-100 via-primary-50 to-white min-h-screen relative">
      <!-- 배경 장식 -->
      <div class="absolute inset-0 overflow-hidden pointer-events-none">
        <div class="absolute right-0 top-0 w-96 h-96 bg-primary-200 opacity-30 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
        <div class="absolute left-0 bottom-0 w-96 h-96 bg-primary-200 opacity-30 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2"></div>
      </div>

      <div class="max-w-3xl mx-auto px-4 py-8 relative z-10">
        <!-- 정렬 옵션 -->
        <div class="flex justify-between items-center mb-6">
          <h3 class="text-lg font-semibold text-gray-700">현재 참여 가능한 챌린지 🎯</h3>
          <PageSizeSelect
            :current-size="pageInfo.pageSize"
            @select="handleSizeSelect"
          />
        </div>

        <!-- 로딩 상태 -->
        <div v-if="loading" class="flex justify-center py-12">
          <div class="h-8 w-8 animate-spin rounded-full border-b-2 border-primary-500"></div>
        </div>

        <!-- 에러 상태 -->
        <div v-else-if="error" class="flex justify-center py-12">
          <p class="text-red-500">{{ error }}</p>
        </div>

        <!-- 챌린지 카드 그리드 -->
        <div v-else class="grid grid-cols-1 gap-4">
          <ChallengeCard
            v-for="challenge in challengesList"
            :key="challenge.challengeId"
            :challenge="challenge"
            @click="goToDetail"
          />
        </div>

        <!-- 페이지네이션 -->
        <div v-if="!loading && !error && challengesList.length > 0" class="mt-8">
          <Pagination
            :page-info="pageInfo"
            @page-change="handlePageChange"
          />
        </div>
      </div>
    </div>
  </div>
</template>
