<script setup lang="ts">
import { computed } from 'vue'
import { Bar } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from 'chart.js'
import type { Record } from '@/core/record/Record'

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
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
      label: '걸음 수',
      data: props.records.map(record => record.step),
      backgroundColor: '#FF5A5F',
      borderColor: '#E6474C',
      borderWidth: 1,
      borderRadius: 8
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
</script>

<template>
  <div class="h-[300px] w-full p-4 bg-white rounded-lg shadow-sm">
    <Bar :data="chartData" :options="chartOptions" />
  </div>
</template>
