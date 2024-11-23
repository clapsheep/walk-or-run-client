<script setup lang="ts">
import { computed } from 'vue'
import { Line } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  CategoryScale,
} from 'chart.js'
import type { Record } from '@/core/record/Record'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

const props = defineProps<{
  records: Record[]
}>()

const chartData = computed(() => ({
  labels: props.records.map(record =>
    new Date(record.createdAt).toLocaleDateString('ko-KR', {
      month: 'short',
      day: 'numeric'
    })
  ),
  datasets: [
    {
      label: '평균 속도',
      data: props.records.map(record => record.speed),
      backgroundColor: '#FACC15',
      borderColor: '#EAB308',
      borderWidth: 2,
      tension: 0.4,
      pointBackgroundColor: '#CA8A04',
      pointBorderColor: '#fff',
      pointBorderWidth: 2,
      pointRadius: 4,
      fill: false
    }
  ]
}))

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
      text: '일별 평균 속도',
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
        text: 'km/h',
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
</script>

<template>
  <div class="h-[300px] w-full p-4 bg-white rounded-lg shadow-sm">
    <Line :data="chartData" :options="chartOptions" />
  </div>
</template>
