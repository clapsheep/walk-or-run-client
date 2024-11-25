<script setup lang="ts">
import { computed } from 'vue'
import type { Record } from '@/core/record/types/RecordType'
import {
  ChartBarIcon,
  FireIcon,
  HeartIcon,
  MapIcon
} from '@heroicons/vue/24/solid'
import ChartInfo from '@/components/atoms/ChartInfo.vue'

interface Props {
  records: Record[]
}

const props = defineProps<Props>()

const stats = computed(() => {
  if (!Array.isArray(props.records)) return null

  return {
    totalExercises: props.records.length,
    totalDistance: props.records.reduce((sum, record) => sum + record.distance, 0) / 1000, // m to km
    totalCalories: props.records.reduce((sum, record) => sum + record.totalCalorie, 0),
    avgHeartRate: Math.round(
      props.records.reduce((sum, record) => sum + record.meanHeartRate, 0) / props.records.length
    )
  }
})
</script>

<template>
  <div class="h-full flex flex-col">
    <!-- 헤더 -->
    <div class="mb-4 relative">
      <div class="absolute top-0 right-0">
        <ChartInfo description="선택한 기간의 주요 운동 지표를 한눈에 보여줍니다. 총 운동 횟수, 이동 거리, 소모한 칼로리, 평균 심박수 등의 핵심 정보를 확인할 수 있습니다." />
      </div>
      <h2 class="text-lg font-semibold text-gray-800">운동 통계</h2>
      <p class="text-sm text-gray-500">선택한 기간의 운동 요약</p>
    </div>

    <!-- 통계 그리드 -->
    <div class="grid grid-cols-2 gap-4 flex-1">
      <!-- 운동 횟수 -->
      <div class="bg-blue-50 rounded-2xl p-4 flex flex-col justify-between hover:shadow-md transition-shadow">
        <div class="flex items-center gap-2 text-blue-600 mb-2">
          <ChartBarIcon class="w-5 h-5" />
          <span class="text-sm font-medium">운동 횟수</span>
        </div>
        <div>
          <span class="text-2xl font-bold text-blue-700">{{ stats?.totalExercises || 0 }}</span>
          <span class="text-sm text-blue-600 ml-1">회</span>
        </div>
      </div>

      <!-- 총 거리 -->
      <div class="bg-emerald-50 rounded-2xl p-4 flex flex-col justify-between hover:shadow-md transition-shadow">
        <div class="flex items-center gap-2 text-emerald-600 mb-2">
          <MapIcon class="w-5 h-5" />
          <span class="text-sm font-medium">총 거리</span>
        </div>
        <div>
          <span class="text-2xl font-bold text-emerald-700">{{ stats?.totalDistance.toFixed(1) || 0 }}</span>
          <span class="text-sm text-emerald-600 ml-1">km</span>
        </div>
      </div>

      <!-- 소모 칼로리 -->
      <div class="bg-orange-50 rounded-2xl p-4 flex flex-col justify-between hover:shadow-md transition-shadow">
        <div class="flex items-center gap-2 text-orange-600 mb-2">
          <FireIcon class="w-5 h-5" />
          <span class="text-sm font-medium">소모 칼로리</span>
        </div>
        <div>
          <span class="text-2xl font-bold text-orange-700">{{ stats?.totalCalories || 0 }}</span>
          <span class="text-sm text-orange-600 ml-1">kcal</span>
        </div>
      </div>

      <!-- 평균 심박수 -->
      <div class="bg-rose-50 rounded-2xl p-4 flex flex-col justify-between hover:shadow-md transition-shadow">
        <div class="flex items-center gap-2 text-rose-600 mb-2">
          <HeartIcon class="w-5 h-5" />
          <span class="text-sm font-medium">평균 심박수</span>
        </div>
        <div>
          <span class="text-2xl font-bold text-rose-700">{{ stats?.avgHeartRate || 0 }}</span>
          <span class="text-sm text-rose-600 ml-1">bpm</span>
        </div>
      </div>
    </div>
  </div>
</template>
