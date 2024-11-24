<script setup lang="ts">
import { computed } from 'vue'
import { Doughnut } from 'vue-chartjs'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import type { Record } from '@/core/record/types/RecordType'
import ChartInfo from '@/components/atoms/ChartInfo.vue'

ChartJS.register(ArcElement, Tooltip, Legend)

interface Props {
  records: Record[]
}

const props = defineProps<Props>()

// 심박존 정의 (최대 심박수를 220-나이로 가정, 임시로 30세 기준)
const ZONES = [
  { name: '휴식', min: 0, max: 116, color: '#94A3B8' },    // 0-50%
  { name: '준비운동', min: 116, max: 139, color: '#22C55E' }, // 50-60%
  { name: '지방연소', min: 139, max: 162, color: '#2DD4BF' }, // 60-70%
  { name: '유산소', min: 162, max: 185, color: '#FB923C' },   // 70-80%
  { name: '무산소', min: 185, max: Infinity, color: '#EF4444' }  // 80%+
]

const calculateDuration = (startTime: string, endTime: string): number => {
  const start = new Date(startTime)
  const end = new Date(endTime)
  return (end.getTime() - start.getTime()) / 1000 / 60 // 분 단위로 반환
}

const zoneData = computed(() => {
  if (!Array.isArray(props.records)) return null

  // 각 기록에서 심박수를 확인하여 해당하는 존에 시간 추가
  const zoneTimes = Array(ZONES.length).fill(0)
  
  props.records.forEach(record => {
    const heartRate = record.meanHeartRate
    const duration = calculateDuration(record.startTime, record.endTime)
    
    const zoneIndex = ZONES.findIndex(zone => 
      heartRate >= zone.min && heartRate < zone.max
    )
    
    if (zoneIndex !== -1) {
      zoneTimes[zoneIndex] += duration
    }
  })

  // 데이터가 모두 0인 경우 null 반환
  if (zoneTimes.every(time => time === 0)) return null

  return {
    labels: ZONES.map(zone => zone.name),
    datasets: [{
      data: zoneTimes,
      backgroundColor: ZONES.map(zone => zone.color),
      borderColor: ZONES.map(zone => zone.color),
      borderWidth: 1,
      hoverOffset: 4
    }]
  }
})

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'right' as const,
      labels: {
        usePointStyle: true,
        pointStyle: 'circle',
        padding: 20,
        font: {
          size: 12
        },
        generateLabels: (chart: any) => {
          const data = chart.data
          return data.labels.map((label: string, index: number) => {
            const value = data.datasets[0].data[index]
            const hours = Math.floor(value / 60)
            const minutes = Math.round(value % 60)
            const timeString = hours > 0 
              ? `${hours}시간 ${minutes}분`
              : `${minutes}분`
            
            return {
              text: `${label} (${timeString})`,
              fillStyle: data.datasets[0].backgroundColor[index],
              strokeStyle: data.datasets[0].backgroundColor[index],
              lineWidth: 1,
              hidden: false,
              index: index
            }
          })
        }
      }
    },
    title: {
      display: true,
      text: '심박존 분석',
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
          const value = context.raw
          const hours = Math.floor(value / 60)
          const minutes = Math.round(value % 60)
          return hours > 0 
            ? `${hours}시간 ${minutes}분`
            : `${minutes}분`
        }
      }
    }
  },
  cutout: '60%'
}
</script>

<template>
  <div class="h-full flex flex-col">
    <div class="flex-1 relative">
      <div class="absolute top-0 right-0 z-10">
        <ChartInfo description="운동 중 각 심박수 구간에서 보낸 시간을 보여줍니다. 휴식, 준비운동, 지방연소, 유산소, 무산소 등 각 심박존별 운동 시간 분포를 확인할 수 있습니다." />
      </div>
      <Doughnut
        v-if="zoneData"
        :data="zoneData"
        :options="chartOptions"
      />
      <div v-else class="absolute inset-0 flex items-center justify-center text-gray-500">
        데이터가 없습니다
      </div>
    </div>
  </div>
</template>
