<script setup lang="ts">
import DdayBadge from '@/components/atoms/DdayBadge.vue'
import { Challenge } from '@/core/challenge/ChallengeType';



defineProps<{
  challenge: Challenge
}>()

const emit = defineEmits<{
  (e: 'click', challenge: Challenge): void
}>()

const getBackgroundClass = (categoryCode: number, isEnded: number) => {
  if (isEnded) return 'from-gray-400 to-gray-600'

  switch (categoryCode) {
    case 1: // 뛰거나
      return 'from-primary-500 to-orange-600'
    case 2: // 걷거나
      return 'from-emerald-400 to-green-600'
    default:
      return 'from-primary-500 to-orange-600'
  }
}

const getBackgroundSvg = (categoryCode: number) => {
  switch (categoryCode) {
    case 1: // 뛰거나
      return `
        <g transform="translate(60, 60) scale(0.7)">
          <path d="M30,20 C30,20 35,20 40,25 C45,30 45,35 45,35" stroke="currentColor" stroke-width="3" fill="none"/> <!-- 팔 -->
          <path d="M30,20 L30,50" stroke="currentColor" stroke-width="3" fill="none"/> <!-- 몸통 -->
          <path d="M15,70 L30,50 L45,70" stroke="currentColor" stroke-width="3" fill="none"/> <!-- 다리 -->
          <circle cx="30" cy="15" r="8" fill="currentColor"/> <!-- 머리 -->
        </g>
      `
    case 2: // 걷거나
      return `
        <g transform="translate(60, 60) scale(0.7)">
          <path d="M30,20 L40,30" stroke="currentColor" stroke-width="3" fill="none"/> <!-- 팔 -->
          <path d="M30,20 L30,50" stroke="currentColor" stroke-width="3" fill="none"/> <!-- 몸통 -->
          <path d="M20,70 L30,50 L40,70" stroke="currentColor" stroke-width="3" fill="none"/> <!-- 다리 -->
          <circle cx="30" cy="15" r="8" fill="currentColor"/> <!-- 머리 -->
        </g>
      `
    default:
      return ''
  }
}

const getCategoryDotColor = (categoryCode: number, isEnded: number) => {
  if (isEnded) return 'bg-gray-400'

  switch (categoryCode) {
    case 1: // 뛰거나
      return 'bg-red-400'
    case 2: // 걷거나
      return 'bg-emerald-400'
    default:
      return 'bg-blue-400'
  }
}

const getCategoryEmoji = (categoryCode: number) => {
  switch (categoryCode) {
    case 1: // 뛰거나
      return '🏃'
    case 2: // 걷거나
      return '🚶'
    default:
      return '👟'
  }
}
</script>

<template>
  <div
    class="relative cursor-pointer overflow-hidden rounded-lg p-6 shadow-lg transition-all hover:scale-105 hover:shadow-xl bg-gradient-to-br"
    :class="[
      getBackgroundClass(challenge.challengeCategoryCode, challenge.challengeIsEnded),
      { 'opacity-75': challenge.challengeIsEnded }
    ]"
    @click="emit('click', challenge)"
  >
    <!-- Background Icon -->
    <div class="absolute bottom-0 right-0 opacity-10">
      <svg
        class="h-32 w-32"
        viewBox="0 0 120 120"
        v-html="getBackgroundSvg(challenge.challengeCategoryCode)"
      ></svg>
    </div>

    <!-- Content -->
    <div class="relative z-10 text-white">
      <div class="mb-4 flex items-start justify-between">
        <h2 class="text-lg font-bold pr-16">{{ challenge.challengeTitle }}</h2>
        <DdayBadge
          :dday="challenge.dday"
          :is-ended="challenge.challengeIsEnded"
        />
      </div>

      <p class="mb-4 text-sm text-white/90">{{ challenge.challengeDescription }}</p>

      <!-- Progress Bar -->
      <div class="mb-4">
        <div class="flex justify-between text-sm mb-1">
          <span>참여율</span>
          <span>{{ Math.round((challenge.challengeParticipantCnt / challenge.challengeTargetCnt) * 100) }}%</span>
        </div>
        <div class="h-2 w-full rounded-full bg-white/20">
          <div
            class="h-full rounded-full transition-all"
            :class="challenge.challengeIsEnded ? 'bg-gray-300' : 'bg-white'"
            :style="{
              width: Math.min((challenge.challengeParticipantCnt / challenge.challengeTargetCnt) * 100, 100) + '%'
            }"
          ></div>
        </div>
      </div>

      <div class="flex justify-between text-sm text-white/80">
        <div class="flex items-center gap-1.5">
          <span class="text-lg">{{ getCategoryEmoji(challenge.challengeCategoryCode) }}</span>
          <span>{{ challenge.challengeCategoryName }}</span>
        </div>
        <div class="flex items-center gap-2">
          <span>목표: {{ challenge.challengeTargetCnt.toLocaleString() }}</span>
          <span>|</span>
          <span>참여: {{ challenge.challengeParticipantCnt.toLocaleString() }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
