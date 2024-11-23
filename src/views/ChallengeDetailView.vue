<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import type Challenge from '../core/challenge/ChallengeType'
import { handleParticipate, fetchChallengeDetail } from '../core/challenge/ChallengeHook'
const route = useRoute()
const router = useRouter()
const challengeId = parseInt(route.params.id as string)


// 상태 변수들
const loading = ref(false)
const error = ref<string | null>(null)
const challengeDetail = ref<Challenge | null>(null)

// 참여 상태
const isParticipating = ref(false)

// 참여율 계산
const getParticipationRate = (): number => {
  return Math.round(
    ((challengeDetail.value?.currentParticipants ?? 0) /
    (challengeDetail.value?.maxParticipants ?? 1)) * 100
  )
}

onMounted(async () => {
  const result = await fetchChallengeDetail(challengeId);
  console.log(result)
  if(result) challengeDetail.value = result.data;
  console.log(challengeDetail.value)
})
</script>

<template>
  <div class="min-h-screen bg-gray-100 p-6">
    <div class="container mx-auto">
      <!-- 로딩 상태 -->
      <div v-if="loading" class="flex justify-center items-center h-64">
        <p class="text-gray-600">챌린지 정보를 불러오는 중...</p>
      </div>

      <!-- 에러 상태 -->
      <div v-else-if="error" class="flex justify-center items-center h-64">
        <p class="text-red-500">{{ error }}</p>
      </div>

      <!-- 챌린지 상세 정보 -->
      <div v-else-if="challengeDetail" class="bg-white rounded-lg shadow-md p-6">
        <!-- 챌린지 헤더 -->
        <div class="mb-6 flex items-start justify-between">
          <div>
            <h1 class="text-2xl font-bold text-gray-800 mb-2">{{ challengeDetail.challengeTitle }}</h1>
            <p class="text-gray-600">{{ challengeDetail.challengeDescription }}</p>
          </div>
          <div class="flex flex-col items-end">
            <span class="rounded-full bg-primary-500 px-3 py-1 text-sm text-white mb-2">
              {{ challengeDetail.dday }}
            </span>
            <span class="text-sm text-gray-500">
              상태: <span :class="challengeDetail.isEnded ? 'text-red-500' : 'text-green-500'">
                {{ challengeDetail.isEnded ? '종료됨' : '진행중' }}
              </span>
          </span>
          </div>
        </div>

        <!-- 챌린지 기간 및 참여 정보 -->
        <div class="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg">
          <div class="space-y-2">
          <div class="flex items-center text-gray-600">
              <span class="font-semibold mr-2">시작일:</span>
              <span>{{ challengeDetail.startDate }}</span>
          </div>
          <div class="flex items-center text-gray-600">
              <span class="font-semibold mr-2">종료일:</span>
              <span>{{ challengeDetail.endDate }}</span>
            </div>
          </div>
          <div class="space-y-2">
            <div class="flex items-center text-gray-600">
              <span class="font-semibold mr-2">현재 참여인원:</span>
              <span class="text-primary-500">{{ challengeDetail.currentParticipants }}명</span>
          </div>
          <div class="flex items-center text-gray-600">
              <span class="font-semibold mr-2">참여 가능 인원:</span>
              <span>{{ challengeDetail.maxParticipants }}명</span>
            </div>
          </div>
        </div>

        <!-- 진행률 표시 -->
        <div class="mb-6">
          <div class="flex justify-between mb-2">
            <span class="text-sm font-semibold text-gray-600">참여율</span>
            <span class="text-sm text-gray-600">{{ getParticipationRate() }}%</span>
          </div>
          <div class="w-full bg-gray-200 rounded-full h-2.5">
            <div
              class="bg-primary-500 h-2.5 rounded-full"
              :style="{ width: getParticipationRate() + '%' }"
            ></div>
          </div>
        </div>

        <!-- 참여하기 버튼 -->
        <div class="flex justify-center">
          <button
            class="bg-primary-500 text-white px-6 py-2 rounded-lg hover:bg-primary-600 transition-colors"
            :disabled="isParticipating || challengeDetail.isEnded"
            @click="handleParticipate(challengeId)"
          >
            {{ isParticipating ? '참여중' : '참여하기' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
