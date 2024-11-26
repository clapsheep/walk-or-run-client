<script setup lang="ts">
import ChartInfo from '@/components/atoms/ChartInfo.vue'
import { CadenceRecord } from '@/core/record/types/RecordType';
import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip
} from 'chart.js'
import { computed } from 'vue'
import { Line } from 'vue-chartjs'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

interface Props {
  cadenceData: CadenceRecord[]
}

const props = defineProps<Props>()

const chartData = computed(() => {
  // 데이터가 없을 때의 기본 데이터
  if (!props.cadenceData || props.cadenceData.length === 0) {
    return {
      labels: [''],
      datasets: [
        {
          label: '평균 케이던스 (steps/min)',
          data: [],
          borderColor: '#3B82F6',
          backgroundColor: 'rgba(59, 130, 246, 0.5)',
          tension: 0.4,
          pointStyle: 'circle',
          pointRadius: 4,
          pointHoverRadius: 6
        }
      ]
    }
  }

  // 날짜 정렬
  const sortedData = [...props.cadenceData].sort((a, b) =>
    a.startTime.localeCompare(b.startTime)
  )

  return {
    labels: sortedData.map(item => item.startTime.split('T')[0]), // startTime에서 날짜만 추출
    datasets: [
      {
        label: '평균 케이던스 (steps/min)',
        data: sortedData.map(item => Math.round(item.stepCount / item.totalMinutes)), // stepCount와 totalMinutes를 사용하여 케이던스 계산
        borderColor: '#3B82F6',
        backgroundColor: 'rgba(59, 130, 246, 0.5)',
        tension: 0.4,
        pointStyle: 'circle',
        pointRadius: 4,
        pointHoverRadius: 6
      }
    ]
  }
})

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    title: {
      display: true,
      text: '평균 케이던스 추이',
      font: {
        size: 16,
        weight: 'bold'
      },
      padding: {
        top: 10,
        bottom: 20
      }
    },
    legend: {
      display: true,
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
    tooltip: {
      mode: 'index' as const,
      intersect: false,
      callbacks: {
        label: (context: any) => {
          const value = context.raw
          const dataPoint = props.cadenceData[context.dataIndex]
          if (dataPoint) {
            return [
              `케이던스: ${value} steps/min`,
              `총 걸음수: ${dataPoint.stepCount}`,
              `총 시간: ${dataPoint.totalMinutes}분`
            ]
          }
          return '데이터 없음'
        }
      }
    }
  },
  scales: {
    y: {
      min: 50,
      title: {
        display: true,
        text: '케이던스 (steps/min)'
      },
      ticks: {
        stepSize: 10
      }
    },
    x: {
      grid: {
        display: false
      }
    }
  }
}
</script>

<template>
  <div class="h-full flex flex-col">
    <div class="flex-1 relative">
      <div class="absolute top-0 right-0 z-10">
        <ChartInfo description="일별 평균 케이던스(분당 발걸음 수) 추이를 보여줍니다. 케이던스는 러닝 효율성을 나타내는 중요한 지표로, 일반적으로 160-180 steps/min이 효율적인 러닝 케이던스로 알려져 있습니다." />
      </div>
      <Line
        :data="chartData"
        :options="chartOptions"
      />
    </div>
  </div>
</template>
