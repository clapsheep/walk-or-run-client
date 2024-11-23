<script setup lang="ts">
import { onMounted } from 'vue'
import BaseChart from './BaseChart.vue'
import ChartWrapper from './ChartWrapper.vue'
import { useChart } from '@/core/record/composables/useChart'

import { getCurrentMonthRange } from '@/utils/formatDate'
import { getStepsFetch } from '@/core/record/recordApi'

const { startDate, endDate } = getCurrentMonthRange()
const { data, loading, error, fetchData, processChartData } = useChart(
  '16',
  startDate,
  endDate,
  {
    fetchFn: getStepsFetch,
    label: '걸음 수',
    dataKey: 'steps',
    color: '#41B883'
  }
)

const chartData = processChartData()
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
          size: 14
        },
        color: '#475569'
      }
    },
    title: {
      display: true,
      text: '일별 걸음 수',
      font: {
        family: "'Pretendard', sans-serif",
        size: 16,
        weight: 'bold'
      },
      color: '#1E293B',
      padding: 20
    }
  },
  scales: {
    y: {
      beginAtZero: true,
      title: {
        display: true,
        text: '걸음',
        font: {
          family: "'Pretendard', sans-serif",
          size: 14
        },
        color: '#475569'
      },
      grid: {
        color: '#E2E8F0'
      },
      ticks: {
        font: {
          family: "'Pretendard', sans-serif"
        },
        color: '#64748B'
      }
    },
    x: {
      grid: {
        display: false
      },
      ticks: {
        font: {
          family: "'Pretendard', sans-serif"
        },
        color: '#64748B'
      }
    }
  }
}

onMounted(() => {
  fetchData()
})
</script>
<template>
  <ChartWrapper :loading="loading" :error="error">
    <BaseChart
      :chart-data="chartData"
      :options="chartOptions"
    />
  </ChartWrapper>
</template>
