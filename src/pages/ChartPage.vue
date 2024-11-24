<template>
  <div class="p-4 space-y-4">
    <div v-if="loading" class="text-center">Loading charts...</div>
    <div v-else-if="error" class="text-center text-red-500">{{ error }}</div>
    <template v-else>
      <StepChart
        :chart-data="getChartData('steps').processChartData()"
        :loading="getChartData('steps').loading"
        :error="getChartData('steps').error"
      />
      <SpeedChart
        :chart-data="getChartData('speed').processChartData()"
        :loading="getChartData('speed').loading"
        :error="getChartData('speed').error"
      />
      <ExerciseTimeChart
        :chart-data="getChartData('exerciseTime').processChartData()"
        :loading="getChartData('exerciseTime').loading"
        :error="getChartData('exerciseTime').error"
      />
    </template>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useUserStore } from '@/stores/userStore'
import { useCharts } from '@/core/record/composables/useCharts'
import { getSteps, getSpeed, getExerciseTime } from '@/core/record/recordApi'
import StepChart from '@/components/charts/StepChart.vue'
import SpeedChart from '@/components/charts/SpeedChart.vue'
import ExerciseTimeChart from '@/components/charts/ExerciseTimeChart.vue'

const userStore = useUserStore()
const userId = userStore.userId ? userStore.userId : ''

const { loading, error, fetchAllData, getChartData } = useCharts(userId, {
  steps: {
    fetchFn: getSteps,
    label: '걸음 수',
    dataKey: 'steps',
    color: '#41B883'
  },
  speed: {
    fetchFn: getSpeed,
    label: '속도',
    dataKey: 'speed',
    color: '#2196F3'
  },
  exerciseTime: {
    fetchFn: getExerciseTime,
    label: '운동 시간',
    dataKey: 'exerciseTime',
    color: '#FFC107'
  }
})

onMounted(() => {
  fetchAllData()
})
</script>
