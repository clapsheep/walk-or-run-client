<script setup lang="ts">
import { useUserStore } from '@/stores/userStore'
import { onMounted, ref } from 'vue'
import StepChart from '@/components/charts/StepChart.vue'
import ExerciseTimeChart from '@/components/charts/ExerciseTimeChart.vue'
import SpeedChart from '@/components/charts/SpeedChart.vue'
import { generateDummyRecords } from '@/core/record/Record'
import type { Record } from '@/core/record/Record'

const userStore = useUserStore()
const records = ref<Record[]>([])
onMounted(() => {
  // 실제 API 호출 대신 더미 데이터 사용
  records.value = generateDummyRecords()
})
</script>

<template>
  <div class="p-4 bg-gray-100 min-h-screen">
    <h1 class="text-2xl font-bold mb-6 text-gray-800">운동 기록 대시보드</h1>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <StepChart :records="records" />
      <ExerciseTimeChart :records="records" />
      <SpeedChart :records="records" />
    </div>
    </div>
  </template>
