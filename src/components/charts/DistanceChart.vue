<script setup lang="ts">
import { computed } from 'vue'
import { Line } from 'vue-chartjs'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js'
import type { Record } from '@/core/record/types/RecordType'
import ChartInfo from '@/components/atoms/ChartInfo.vue'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

interface Props {
  records: Record[]
}

const props = defineProps<Props>()

// 차트 데이터 계산
const chartData = computed(() => {
  if (!Array.isArray(props.records)) {
    return {
      labels: [],
      datasets: [{
        label: '운동 거리 (Km)',
        data: [],
        borderColor: '#2DD4BF',
        backgroundColor: '#CCFBEF',
        tension: 0.3,
        fill: true
      }]
    }
  }

  return {
    labels: props.records.map(record => {
      const date = new Date(record.startTime)
      return date.toLocaleDateString('ko-KR', { month: 'long', day: 'numeric' })
    }),
    datasets: [
      {
        label: '운동 거리 (Km)',
        data: props.records.map(record => Number((record.distance / 1000).toFixed(2))),
        borderColor: '#2DD4BF',
        backgroundColor: '#CCFBEF',
        tension: 0.3,
        fill: true
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
        pointStyle: 'circle',
        padding: 20,
        font: {
          size: 12
        }
      }
    },
    title: {
      display: true,
      text: '운동 거리 추이',
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
        text: '거리 (Km)',
        font: {
          size: 12
        }
      },
      ticks: {
        callback: (value: number) => value.toFixed(2),
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
        text: '운동 날짜',
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
        <ChartInfo description="선택한 기간 동안의 일별 운동 거리를 보여줍니다. 꺾은선 그래프를 통해 운동량의 변화 추이를 쉽게 파악할 수 있습니다." />
      </div>
      <Line
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
