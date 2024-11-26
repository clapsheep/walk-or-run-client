<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import BasicButton from '@/components/atoms/BasicButton.vue'
import { deleteChallengeScheduleFetch, getChallengeSchedulesFetch, updateChallengeScheduleFetch } from '@/core/challenge/AdminChallengeApi'
import { Challenge } from '@/core/challenge/ChallengeType'
import { useScheduleManage } from '@/core/challenge/composables/useScheduleManage'

const {
  loading,
  error,
  schedules,
  fetchSchedules,
  initializeSelectedCycles,
  goToEdit
} = useScheduleManage(
  getChallengeSchedulesFetch,
  updateChallengeScheduleFetch,
  deleteChallengeScheduleFetch
)

const openSchedules = ref<Challenge[]>([])
const closedSchedules = ref<Challenge[]>([])

watch(schedules, (newSchedules) => {
  if (newSchedules) {
    openSchedules.value = newSchedules.filter(schedule => schedule.challengeIsEnded === 0)
    closedSchedules.value = newSchedules.filter(schedule => schedule.challengeIsEnded === 1)
    console.log('Open Schedules:', openSchedules.value)
    console.log('Closed Schedules:', closedSchedules.value)
  }
}, { immediate: true })

console.log(getChallengeSchedulesFetch);

onMounted(async () => {
  fetchSchedules()
  initializeSelectedCycles()
})

</script>

<template>
  <div class="space-y-6">
    <!-- 로딩 상태 -->
    <div v-if="loading" class="space-y-4">
      <div v-for="n in 2" :key="n" class="animate-pulse">
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

    <!-- 스케줄 목록 -->
    <div v-else class="space-y-4">
      <div v-if="schedules.length === 0" class="text-center py-8 text-gray-500">
        등록된 스케줄이 없습니다.
      </div>
      <div
        v-else
        v-for="schedule in openSchedules"
        :key="schedule.challengeId"
        class="bg-white p-6 rounded-lg shadow-sm"
      >
        <div class="flex justify-between items-center">
          <div class="space-y-2">
            <h3 class="text-lg font-semibold text-gray-900">{{ schedule.challengeTitle }}</h3>
            <p class="text-sm text-gray-500">{{ schedule.challengeDescription }}</p>
            <p class="text-sm text-gray-500">
              반복 주기: {{ schedule.challengeSchedulerCycle === 1 ? '일일' :
                          schedule.challengeSchedulerCycle === 2 ? '일주일' : '한달' }}
            </p>
          </div>
          <div class="flex space-x-2">
            <BasicButton
              color="primary"
              size="sm"
              @click="goToEdit(schedule.challengeId)"
            >
              상세보기
            </BasicButton>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
