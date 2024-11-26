<script setup lang="ts">
import { computed } from 'vue'
import { Scatter } from 'vue-chartjs'
import { Chart as ChartJS, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js'
import type { Record } from '@/core/record/types/RecordType'
import ChartInfo from '@/components/atoms/ChartInfo.vue'

ChartJS.register(LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

interface Props {
  records: Record[]
}

const props = defineProps<Props>()

// 차트 데이터 계산
const chartData = computed(() => {
  if (!Array.isArray(props.records)) {
    return {
      datasets: [{
        label: '심박수-속도 관계',
        data: [],
        backgroundColor: '#FACC15',
        borderColor: '#EAB308',
      }]
    }
  }

  return {
    datasets: [
      {
        label: '심박수-속도 관계',
        data: props.records.map(record => ({
          x: Number((record.meanSpeed * 3.6).toFixed(2)), // m/s를 km/h로 변환
          y: record.meanHeartRate
        })),
        backgroundColor: '#FACC15',
        borderColor: '#EAB308',
        borderWidth: 1,
        radius: 6,
        hoverRadius: 8,
        pointStyle: 'circle'
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
      text: '심박수와 속도 관계',
      font: {
        size: 16,
        weight: 'bold'
      },
      padding: {
        top: 10,
        bottom: 20
      }
    },
    tooltip: {
      callbacks: {
        label: (context: any) => {
          return `속도: ${context.parsed.x} km/h, 심박수: ${context.parsed.y} bpm`
        }
      }
    }
  },
  scales: {
    y: {
      min: 60,
      max: 200,
      beginAtZero: true,
      title: {
        display: true,
        text: '심박수 (bpm)',
        font: {
          size: 12
        }
      },
      ticks: {
        stepSize: 20,
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
        text: '속도 (km/h)',
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
        <ChartInfo description="운동 중 심박수와 속도의 관계를 산점도로 보여줍니다. 이를 통해 운동 강도와 심박수의 상관관계를 분석할 수 있습니다." />
      </div>
      <Scatter
        :data="chartData"
        :options="chartOptions"
      />
    </div>
  </div>
</template>
