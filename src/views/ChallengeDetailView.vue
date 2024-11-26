<script setup lang="ts">
import { useRoute } from 'vue-router'
import { getChallengeDetailFetch } from '@/core/challenge/ChallengeApi'
import Header from '@/components/atoms/Header.vue'
import DdayBadge from '@/components/atoms/DdayBadge.vue'
import { FireIcon, UserGroupIcon, CalendarIcon, TrophyIcon } from '@heroicons/vue/24/outline'
import { useGetChallenge } from '@/core/challenge/composables/useGetChallenge'
import { onMounted, computed } from 'vue'
import { useUserStore } from '@/stores/userStore'

const route = useRoute()
const userStore = useUserStore()
const challengeId = Number(route.params.id)

const { loading, error, challenge, fetchChallengeDetail, handleParticipate } = useGetChallenge(
  getChallengeDetailFetch,
  challengeId,
)

const isParticipating = computed(() => {
  if (!challenge.value?.challengeParticipants || !userStore.userId) {
    return false
  }

  return challenge.value.challengeParticipants.some((participant) => {
    const matches = participant.userId === userStore.userId
    return matches
  })
})

const handleParticipateClick = async () => {
  const response = await handleParticipate(challengeId)
  if (response?.data?.message === 'success') {
    await fetchChallengeDetail(challengeId)
  }
}

onMounted(() => fetchChallengeDetail(challengeId))
</script>

<template>
  <div class="min-h-screen bg-gray-100">
    <Header title="챌린지 상세" :show-back-button="true" />

    <!-- 메인 콘텐츠 -->
    <div class="via-primary-50 relative min-h-screen bg-gradient-to-br from-primary-100 to-white">
      <!-- 배경 장식 -->
      <div class="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          class="absolute right-0 top-0 h-96 w-96 -translate-y-1/2 translate-x-1/2 transform rounded-full bg-primary-200 opacity-30 blur-3xl"
        ></div>
        <div
          class="absolute bottom-0 left-0 h-96 w-96 -translate-x-1/2 translate-y-1/2 transform rounded-full bg-primary-200 opacity-30 blur-3xl"
        ></div>
      </div>

      <div class="relative z-10 mx-auto max-w-3xl px-4 py-8">
        <!-- 로딩 상태 -->
        <div v-if="loading" class="flex justify-center py-12">
          <div class="h-8 w-8 animate-spin rounded-full border-b-2 border-primary-500"></div>
        </div>

        <!-- 에러 상태 -->
        <div v-else-if="error" class="flex justify-center py-12">
          <p class="text-red-500">{{ error }}</p>
        </div>

        <!-- 챌린지 상세 정보 -->
        <div v-else-if="challenge" class="space-y-8">
          <!-- 헤더 섹션 -->
          <div
            class="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary-500 via-primary-600 to-primary-700 p-8 text-white"
          >
            <!-- 배경 장식 -->
            <div class="absolute inset-0 overflow-hidden">
              <div
                class="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white opacity-10"
              ></div>
              <div
                class="absolute -bottom-20 -left-20 h-60 w-60 rounded-full bg-white opacity-10"
              ></div>
            </div>

            <div class="relative z-10">
              <div class="mb-4 flex items-center justify-between">
                <DdayBadge :dday="challenge.dday" class="text-lg" />
                <span class="rounded-full bg-white bg-opacity-20 px-3 py-1 text-sm">
                  {{ challenge.challengeCategoryName }}
                </span>
              </div>
              <h1 class="mb-4 text-3xl font-bold">{{ challenge.challengeTitle }}</h1>
              <p class="mb-6 text-lg text-primary-100">{{ challenge.challengeDescription }}</p>
              <!-- 참여하기 버튼 -->
              <div class="mb-8">
                <button
                  @click="handleParticipateClick"
                  :disabled="isParticipating"
                  class="inline-flex w-full transform items-center justify-center rounded-xl px-8 py-4 font-bold shadow-lg transition-all duration-200"
                  :class="
                    isParticipating
                      ? 'cursor-not-allowed bg-gray-300 text-gray-600'
                      : 'bg-yellow-400 text-primary-900 hover:scale-[1.02] hover:bg-yellow-300 hover:shadow-xl'
                  "
                >
                  <FireIcon class="mr-2 h-6 w-6" />
                  {{ isParticipating ? '이미 참여중인 챌린지입니다' : '챌린지 참여하기' }}
                </button>
              </div>
              <!-- 챌린지 통계 -->
              <div class="grid grid-cols-3 gap-4">
                <div class="rounded-lg bg-white bg-opacity-20 p-4 backdrop-blur-sm">
                  <div class="mb-2 flex items-center">
                    <UserGroupIcon class="mr-2 h-5 w-5 text-yellow-300" />
                    <span class="text-sm">참여자</span>
                  </div>
                  <p class="text-2xl font-semibold">
                    {{ challenge.challengeParticipantCnt }}/{{ challenge.challengeTargetCnt }}
                  </p>
                </div>
                <div class="rounded-lg bg-white bg-opacity-20 p-4 backdrop-blur-sm">
                  <div class="mb-2 flex items-center">
                    <CalendarIcon class="mr-2 h-5 w-5 text-yellow-300" />
                    <span class="text-sm">챌린지 기간</span>
                  </div>
                  <div class="flex flex-col">
                    <p class="mb-1 text-sm">
                      {{ new Date(challenge.challengeCreateDate).toLocaleDateString() }}
                      ~
                      {{ new Date(challenge.challengeDeleteDate).toLocaleDateString() }}
                    </p>
                    <p class="text-xs text-primary-100">
                      {{ challenge.dday }}
                    </p>
                  </div>
                </div>
                <div class="rounded-lg bg-white bg-opacity-20 p-4 backdrop-blur-sm">
                  <div class="mb-2 flex items-center">
                    <TrophyIcon class="mr-2 h-5 w-5 text-yellow-300" />
                    <span class="text-sm">상태</span>
                  </div>
                  <p class="text-sm">
                    {{ challenge.challengeIsEnded ? '종료됨' : '진행중' }}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- 참여자 아이콘 -->
          <div class="rounded-2xl bg-white p-6 shadow-sm">
            <h2 class="mb-4 flex items-center text-xl font-semibold">
              <UserGroupIcon class="mr-2 h-6 w-6 text-primary-500" />
              참여중인 챌린저
            </h2>
            <div class="flex -space-x-2 overflow-hidden">
              <template
                v-for="(participant, index) in challenge.challengeParticipants.slice(0, 5)"
                :key="participant.userId"
              >
                <div
                  class="inline-block h-10 w-10 rounded-full ring-2 ring-white"
                  :class="`bg-primary-${((index % 3) + 4) * 100}`"
                >
                  <span
                    class="flex h-full w-full items-center justify-center font-medium text-white"
                  >
                    {{ participant.userNickname.charAt(0) }}
                  </span>
                </div>
              </template>
              <div
                v-if="challenge.challengeParticipants.length > 5"
                class="inline-flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 ring-2 ring-white"
              >
                <span class="text-sm font-medium text-gray-500">
                  +{{ challenge.challengeParticipants.length - 5 }}
                </span>
              </div>
            </div>
          </div>

          <!-- 응원 댓글 섹션 -->
          <div class="rounded-2xl bg-white p-6 shadow-sm">
            <h2 class="mb-4 flex items-center text-xl font-semibold">
              <FireIcon class="mr-2 h-6 w-6 text-primary-500" />
              응원 댓글
            </h2>
            <!-- 댓글 입력창 -->
            <div class="mb-4">
              <div class="flex space-x-4">
                <div class="flex-grow">
                  <div class="relative rounded-lg border border-gray-300 shadow-sm">
                    <div class="rounded-lg bg-white p-3">
                      <p class="text-gray-400">댓글 기능 준비중입니다...</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- 댓글 목록 -->
            <div class="space-y-4">
              <div class="flex items-center justify-center py-8 text-gray-400">
                <p>첫 응원 댓글을 남겨보세요!</p>
              </div>
            </div>
          </div>
          <!-- 관리자용 삭제 버튼 -->
        </div>
      </div>
    </div>
  </div>
</template>
