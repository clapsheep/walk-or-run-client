<script setup lang="ts">
import { computed } from 'vue'
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js'
import type { Record } from '@/core/record/types/RecordType'
import ChartInfo from '@/components/atoms/ChartInfo.vue'

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
        borderRadius: 6,
      }]
    }
  }

  const hours = Array.from({ length: 24 }, (_, i) => `${i}시`)
  const hourlyData = getHourlyDistribution(props.records)

  const gradientColors = [
    '#FFC7C8', // primary-300
    '#FF9497', // primary-400
    '#FF5A5F', // primary-500
    '#E6474C', // primary-600
    '#CC3539', // primary-700
  ]

  return {
    labels: hours,
    datasets: [
      {
        label: '운동 횟수',
        data: hourlyData,
        backgroundColor: hourlyData.map((count, index) => {
          const colorIndex = Math.min(Math.floor(count / 2), gradientColors.length - 1)
          return gradientColors[colorIndex]
        }),
        borderRadius: 6,
        borderColor: '#E6474C',
        borderWidth: 1
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
      position: 'top' as const,
      labels: {
        usePointStyle: true,
        pointStyle: 'rect',
        padding: 20,
        font: {
          size: 12
        }
      }
    },
    title: {
      display: true,
      text: '시간대별 운동 분포',
      font: {
        size: 16,
        weight: 'bold'
      },
      padding: {
        top: 10,
        bottom: 20
      }
    }
  },
  scales: {
    y: {
      beginAtZero: true,
      title: {
        display: true,
        text: '운동 횟수',
        font: {
          size: 12
        }
      },
      ticks: {
        stepSize: 1,
        font: {
          size: 11
        }
      },
      grid: {
        color: '#E2E8F0'
      }
    },
    x: {
      title: {
        display: true,
        text: '시간',
        font: {
          size: 12
        }
      },
      ticks: {
        font: {
          size: 11
        }
      },
      grid: {
        color: '#E2E8F0'
      }
    }
  }
}
</script>

<template>
  <div class="h-full flex flex-col">
    <div class="flex-1 relative">
      <div class="absolute top-0 right-0 z-10">
        <ChartInfo description="하루 중 어느 시간대에 운동을 많이 하는지 보여줍니다. 24시간을 기준으로 운동 빈도를 시각화하여 선호하는 운동 시간대를 파악할 수 있습니다." />
      </div>
      <Bar
        v-if="chartData"
        :data="chartData"
        :options="chartOptions"
      />
      <div v-else class="absolute inset-0 flex items-center justify-center text-gray-500">
        데이터가 없습니다
      </div>
    </div>
  </div>
</template>
