<script setup lang="ts">
import { computed } from 'vue'
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js'
import type { Record } from '@/core/record/types/RecordType'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

interface Props {
  records: Record[]
}

const props = defineProps<Props>()

// 시간대별 운동 횟수 계산
const getHourlyDistribution = (records: Record[]) => {
  const hourCounts = new Array(24).fill(0)
  
  records.forEach(record => {
    const hour = new Date(record.startTime).getHours()
    hourCounts[hour]++
  })
  
  return hourCounts
}

// 차트 데이터 계산
const chartData = computed(() => {
  if (!Array.isArray(props.records)) {
    return {
      labels: [],
      datasets: [{
        label: '운동 횟수',
        data: [],
        backgroundColor: '#FF5A5F',
      }]
    }
  }

  const hours = Array.from({ length: 24 }, (_, i) => `${i}시`)
  const hourlyData = getHourlyDistribution(props.records)

  return {
    labels: hours,
    datasets: [
      {
        label: '운동 횟수',
        data: hourlyData,
        backgroundColor: '#FF5A5F',
      }
    ]
  }
})

// 차트 옵션
const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top' as const
    },
    title: {
      display: true,
      text: '시간대별 운동 분포'
    }
  },
  scales: {
    y: {
      beginAtZero: true,
      title: {
        display: true,
        text: '운동 횟수'
      },
      ticks: {
        stepSize: 1
      }
    },
    x: {
      title: {
        display: true,
        text: '시간'
      }
    }
  }
}
</script>

<template>
  <Bar
    :data="chartData"
    :options="chartOptions"
    class="h-full"
  />
</template>
