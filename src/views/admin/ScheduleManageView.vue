<script setup lang="ts">
import { onMounted, ref, computed } from 'vue'
import BasicButton from '@/components/atoms/BasicButton.vue'
import { useGetSchedules } from '@/core/challenge/composables/useGetSchedules'
import { deleteChallengeScheduleFetch, getChallengeSchedulesFetch, updateChallengeScheduleFetch } from '@/core/challenge/AdminChallengeApi'
import { useUpdateChallengeSchedule } from '@/core/challenge/composables/useUpdateChallengeSchedule'
import { useDeleteChallengeSchedule } from '@/core/challenge/composables/useDeleteChallengeSchedule'
import { Challenge } from '@/core/challenge/ChallengeType'

const {
  loading: fetchLoading,
  error: fetchError,
  schedules,
  fetchSchedules,
} = useGetSchedules(getChallengeSchedulesFetch)

const {
  loading: updateLoading,
  error: updateError,
  updateSchedule
} = useUpdateChallengeSchedule(updateChallengeScheduleFetch)

const {
  loading: deleteLoading,
  error: deleteError,
  deleteSchedule
} = useDeleteChallengeSchedule(deleteChallengeScheduleFetch)

const selectedCycles = ref<{ [key: string]: number }>({})

const initializeSelectedCycles = () => {
  schedules.value.forEach(schedule => {
    selectedCycles.value[schedule.challengeId] = schedule.challengeSchedulerCycle ?? 0
  })
}

onMounted(async () => {
  await fetchSchedules()
  initializeSelectedCycles()
})

const handleSubmit = async (schedule: Challenge) => {
  const cycle = selectedCycles.value[schedule.challengeId]

  if (cycle === 0) {
    if (await deleteSchedule(schedule)) {
      await fetchSchedules()
    }
  } else {
    if (await updateSchedule(schedule, cycle)) {
      await fetchSchedules()
    }
  }
}

const loading = computed(() => fetchLoading.value || updateLoading.value || deleteLoading.value)
const error = computed(() => fetchError.value || updateError.value || deleteError.value)
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
        v-for="schedule in schedules"
        :key="schedule.challengeId"
        class="bg-white p-6 rounded-lg shadow-sm"
      >
        <div class="flex justify-between items-center">
          <div class="space-y-2">
            <h3 class="text-lg font-semibold text-gray-800">{{ schedule.challengeTitle }}</h3>
            <p class="text-sm text-gray-600">
              {{ schedule.challengeSchedulerCycle }} · 다음 실행일: {{
                new Date(Date.now() + 1000 * 60 * 60 * 24 * (schedule.challengeSchedulerCycle ?? 0)).toISOString().slice(0, 10)
              }}
            </p>
          </div>
          <div class="flex items-center space-x-4">
            <select
              v-model="selectedCycles[schedule.challengeId]"
              class="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option :value="0">삭제</option>
              <option :value="1">일일</option>
              <option :value="2">일주일</option>
              <option :value="3">한달</option>
            </select>
            <BasicButton
              :color="selectedCycles[schedule.challengeId] === 0 ? 'danger' : 'primary'"
              @click="handleSubmit(schedule)"
            >
              {{ selectedCycles[schedule.challengeId] === 0 ? '삭제' : '수정' }}
            </BasicButton>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
