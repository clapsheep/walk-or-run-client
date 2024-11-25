<!-- views/admin/ChallengeScheduleView.vue -->
<script setup lang="ts">
import { ref } from 'vue'
import BasicButton from '@/components/atoms/BasicButton.vue'
import { useRouter } from 'vue-router'

interface Schedule {
  id: number
  title: string
  frequency: string
  nextRunDate: string
  status: 'active' | 'paused'
}

const router = useRouter()
const loading = ref(false)
const error = ref('')
const schedules = ref<Schedule[]>([])

const mockSchedules: Schedule[] = [
  {
    id: 1,
    title: '주간 걷기 챌린지',
    frequency: '매주 월요일',
    nextRunDate: '2024-01-22',
    status: 'active'
  },
  {
    id: 2,
    title: '월간 달리기 챌린지',
    frequency: '매월 1일',
    nextRunDate: '2024-02-01',
    status: 'active'
  }
]

// 실제 API 연동 시 사용할 함수
const fetchSchedules = async () => {
  loading.value = true
  error.value = ''

  try {
    // TODO: API 연동
    schedules.value = mockSchedules
  } catch (e) {
    error.value = '스케줄 목록을 불러오는데 실패했습니다.'
  } finally {
    loading.value = false
  }
}

const toggleScheduleStatus = async (schedule: Schedule) => {
  try {
    // TODO: API 연동
    schedule.status = schedule.status === 'active' ? 'paused' : 'active'
  } catch (e) {
    error.value = '스케줄 상태 변경에 실패했습니다.'
  }
}

const goToScheduleDetail = (id: number) => {
  router.push(`/admin/schedule/${id}`)
}

// Initial fetch
fetchSchedules()
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
        :key="schedule.id"
        class="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
      >
        <div class="flex justify-between items-center">
          <div class="space-y-2">
            <h3 class="text-lg font-semibold text-gray-800">{{ schedule.title }}</h3>
            <p class="text-sm text-gray-600">
              {{ schedule.frequency }} · 다음 실행일: {{ schedule.nextRunDate }}
            </p>
          </div>
          <div class="space-x-2">
            <BasicButton
              :color="schedule.status === 'active' ? 'warning' : 'primary'"
              @click="toggleScheduleStatus(schedule)"
            >
              {{ schedule.status === 'active' ? '일시중지' : '재시작' }}
            </BasicButton>
            <BasicButton
              color="secondary"
              @click="goToScheduleDetail(schedule.id)"
            >
              수정하기
            </BasicButton>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
