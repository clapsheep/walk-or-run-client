<script setup lang="ts">
import BaseChart from './BaseChart.vue'
import { useChart } from '@/core/record/composables/useChart'
import { getExerciseTimeFetch } from '@/core/record/recordApi';
import { useUserStore } from '@/stores/userStore'

import { onMounted } from 'vue'

const userStore = useUserStore()
const userId = userStore.userId ? userStore.userId : ''

const { loading, error, processChartData, fetchData } = useChart('16',"2024-07-01", "2024-07-31", {
  fetchFn: getExerciseTimeFetch,
  label: '운동 시간',
  dataKey: 'exerciseTime',
  color: '#FFC107'
})

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: true,
      position: 'top' as const,
      labels: {
        font: {
          family: "'Pretendard', sans-serif",
          size: 14,
        },
        color: '#475569',
      },
    },
    title: {
      display: true,
      text: '일별 운동 시간',
      font: {
        family: "'Pretendard', sans-serif",
        size: 16,
        weight: 'bold',
      },
      color: '#1E293B',
      padding: 20,
    },
  },
  scales: {
    y: {
      beginAtZero: true,
      title: {
        display: true,
        text: '분',
        font: {
          family: "'Pretendard', sans-serif",
          size: 14,
        },
        color: '#475569',
      },
      grid: {
        color: '#E2E8F0',
      },
      ticks: {
        font: {
          family: "'Pretendard', sans-serif",
        },
        color: '#64748B',
      },
    },
    x: {
      grid: {
        display: false,
      },
      ticks: {
        font: {
          family: "'Pretendard', sans-serif",
        },
        color: '#64748B',
      },
    },
  },
}

onMounted(() => {
  fetchData()
})
</script>
<template>
  <div class="relative h-[300px] w-full p-4 bg-white rounded-lg shadow-sm">
    <BaseChart
      :type="'line'"
      :chart-data="processChartData()"
      :loading="loading"
      :error="error"
      :options="chartOptions"
    />
  </div>
</template>
