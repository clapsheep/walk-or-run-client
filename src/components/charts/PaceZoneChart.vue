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

// 페이스 구간 정의 (km/h를 min/km로 변환)
const ZONES = [
  { name: '산책', min: 15, max: Infinity, color: '#94A3B8' },    // ~4km/h
  { name: '가벼운 조깅', min: 8, max: 15, color: '#22C55E' },   // 4-7.5km/h
  { name: '조깅', min: 6, max: 8, color: '#2DD4BF' },           // 7.5-10km/h
  { name: '러닝', min: 5, max: 6, color: '#FB923C' },           // 10-12km/h
  { name: '빠른 러닝', min: 0, max: 5, color: '#EF4444' }       // 12km/h~
]

const calculateDuration = (startTime: string, endTime: string): number => {
  const start = new Date(startTime)
  const end = new Date(endTime)
  return (end.getTime() - start.getTime()) / 1000 / 60 // 분 단위로 반환
}

// 속도(km/h)를 페이스(min/km)로 변환
const speedToPace = (speed: number): number => {
  if (speed === 0) return Infinity
  return 60 / speed // 시속 -> 분/km
}

const zoneData = computed(() => {
  if (!Array.isArray(props.records)) return null

  // 각 기록에서 페이스를 확인하여 해당하는 존에 시간 추가
  const zoneTimes = Array(ZONES.length).fill(0)
  
  props.records.forEach(record => {
    const pace = speedToPace(record.meanSpeed)
    const duration = calculateDuration(record.startTime, record.endTime)
    
    const zoneIndex = ZONES.findIndex(zone => 
      pace >= zone.min && pace < zone.max
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
            
            // 페이스 범위 문자열 생성
            const zone = ZONES[index]
            let paceRange = ''
            if (zone.max === Infinity) {
              paceRange = `${zone.min}분/km 이상`
            } else if (zone.min === 0) {
              paceRange = `${zone.max}분/km 미만`
            } else {
              paceRange = `${zone.min}-${zone.max}분/km`
            }
            
            return {
              text: `${label} (${paceRange}): ${timeString}`,
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
      text: '페이스 구간별 분석',
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
          const timeString = hours > 0 
            ? `${hours}시간 ${minutes}분`
            : `${minutes}분`
          
          const zone = ZONES[context.dataIndex]
          let paceRange = ''
          if (zone.max === Infinity) {
            paceRange = `${zone.min}분/km 이상`
          } else if (zone.min === 0) {
            paceRange = `${zone.max}분/km 미만`
          } else {
            paceRange = `${zone.min}-${zone.max}분/km`
          }
          
          return `${context.label} (${paceRange}): ${timeString}`
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
        <ChartInfo description="운동 중 각 페이스 구간에서 보낸 시간을 보여줍니다. 산책(15분/km 이상), 가벼운 조깅(8-15분/km), 조깅(6-8분/km), 러닝(5-6분/km), 빠른 러닝(5분/km 미만) 등 각 구간별 운동 시간 분포를 확인할 수 있습니다." />
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
