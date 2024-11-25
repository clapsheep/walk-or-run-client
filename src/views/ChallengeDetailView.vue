<script setup lang="ts">
import { useRoute } from 'vue-router'
import { useGetChallenge } from '@/core/challenge/composables/useGetChallenge'
import { getChallengeDetailFetch } from '@/core/challenge/ChallengeApi'
import { useDeleteChallenge } from '@/core/challenge/composables/useDeleteChallenge'
import { useUserStore } from '@/stores/userStore'
import BasicButton from '@/components/atoms/BasicButton.vue'
import { deleteChallengeFetch } from '@/core/challenge/AdminChallengeApi'

const route = useRoute()
const challengeId = Number(route.params.id)
const userStore = useUserStore()

const {
  loading: deleteLoading,
  error: deleteError,
  deleteChallenge,
  handleDelete
} = useDeleteChallenge(deleteChallengeFetch)

const {
  loading,
  error,
  challenge,
  isParticipating,
  getParticipationRate,
  participate
} = useGetChallenge(getChallengeDetailFetch, challengeId)


</script>

<template>
  <div class="min-h-screen bg-gray-100 p-6">
    <div class="container mx-auto">
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
          <div class="mt-6">
            <div class="h-10 bg-gray-200 rounded w-32"></div>
          </div>
        </div>
      </div>

      <!-- 에러 상태 -->
      <div v-else-if="error" class="bg-white rounded-lg shadow-sm p-6">
        <p class="text-red-500 text-center">{{ error }}</p>
      </div>

      <!-- 챌린지 상세 정보 -->
      <div v-else-if="challenge" class="bg-white rounded-lg shadow-sm p-6">
        <h1 class="text-2xl font-bold text-gray-800 mb-4">
          {{ challenge.challengeTitle }}
        </h1>
        <div class="space-y-4">
          <p class="text-gray-600">{{ challenge.challengeDescription }}</p>

          <div class="border-t border-gray-200 pt-4">
            <div class="grid grid-cols-2 gap-4">
              <div>
                <p class="text-sm text-gray-500 text-center">카테고리</p>
                <p class="font-medium text-center">{{ challenge.challengeCategoryName }}</p>
              </div>
              <div>
                <p class="text-sm text-gray-500 text-center">작성자</p>
                <p class="font-medium text-center">관리자</p>
              </div>
              <div>
                <p class="text-sm text-gray-500 text-center">참여율</p>
                <p class="font-medium text-center">{{ getParticipationRate() }}%</p>
              </div>
              <div>
                <p class="text-sm text-gray-500 text-center">남은 기간</p>
                <p class="font-medium text-center">{{ challenge.dday }}</p>
              </div>
            </div>
          </div>

          <div class="mt-6 flex justify-center">
            <template v-if="challenge.challengeIsEnded">
              <p class="text-red-600 font-medium">종료된 챌린지입니다</p>
            </template>
            <template v-else>
              <BasicButton
                v-if="!isParticipating"
                @click="participate(challengeId)"
                color="primary"
              >
                참여하기
              </BasicButton>
              <p v-else class="text-green-600 font-medium">
                이미 참여 중인 챌린지입니다
              </p>
            </template>
            <div v-if="userStore.userRole === 'ADMIN'" class="mt-6">
              <BasicButton
                color="warning"
                :loading="deleteLoading"
                @click="handleDelete(challengeId)"
              >
                삭제하기
              </BasicButton>
              <p v-if="deleteError" class="mt-2 text-red-500 text-sm">
                {{ deleteError }}
              </p>
            </div>
          </div>
          <!-- 관리자용 삭제 버튼 -->

        </div>
      </div>
    </div>
  </div>
</template>
