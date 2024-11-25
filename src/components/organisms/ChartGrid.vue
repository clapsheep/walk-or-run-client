<script setup lang="ts">
import CadenceChart from '@/components/charts/CadenceChart.vue'
import DistanceChart from '@/components/charts/DistanceChart.vue'
import ExerciseStats from '@/components/charts/ExerciseStats.vue'
import HeartRateSpeedChart from '@/components/charts/HeartRateSpeedChart.vue'
import HeartRateZoneChart from '@/components/charts/HeartRateZoneChart.vue'
import PaceZoneChart from '@/components/charts/PaceZoneChart.vue'
import TimeDistributionChart from '@/components/charts/TimeDistributionChart.vue'
import WeatherChart from '@/components/charts/WeatherChart.vue'
import { formatToYYYYMMDD } from '@/core/date/services/dateService'
import { getCadenceFetch, getRecordsFetch } from '@/core/record/recordApi'
import type { CadenceRecord, Record } from '@/core/record/types/RecordType'
import { useUserStore } from '@/stores/userStore'
import { ref, watch } from 'vue'
import draggable from 'vuedraggable/src/vuedraggable'

interface Props {
  dateRange: [Date, Date]
}

const props = defineProps<Props>()
const userStore = useUserStore()

const STORAGE_KEY = 'dashboard-chart-positions'
const records = ref<Record[]>([])
const cadenceData = ref<CadenceRecord[]>([])

// 초기 차트 데이터
const defaultCharts = [
  {
    id: 1,
    title: '운동 거리 추이',
    description:
      '선택한 기간 동안의 일별 운동 거리를 보여줍니다. 꺾은선 그래프를 통해 운동량의 변화 추이를 쉽게 파악할 수 있습니다.',
  },
  {
    id: 2,
    title: '시간대별 운동 분포',
    description:
      '하루 중 어느 시간대에 운동을 많이 하는지 보여줍니다. 24시간을 기준으로 운동 빈도를 시각화하여 선호하는 운동 시간대를 파악할 수 있습니다.',
  },
  {
    id: 3,
    title: '페이스 구간별 분석',
    description:
      '운동 중 각 페이스 구간에서 보낸 시간을 보여줍니다. 산책부터 빠른 러닝까지 각 구간별 운동 시간 분포를 확인할 수 있습니다.',
  },
  {
    id: 4,
    title: '운동 통계',
    description:
      '선택한 기간의 주요 운동 지표를 한눈에 보여줍니다. 총 운동 횟수, 이동 거리, 소모한 칼로리, 평균 심박수 등의 핵심 정보를 확인할 수 있습니다.',
  },
  {
    id: 5,
    title: '평균 케이던스 추이',
    description:
      '일별 평균 케이던스(분당 발걸음 수) 추이를 보여줍니다. 케이던스는 러닝 효율성을 나타내는 중요한 지표로, 일반적으로 160-180 steps/min이 효율적인 러닝 케이던스로 알려져 있습니다.',
  },
  {
    id: 6,
    title: '현재 날씨',
    description: '현재 위치의 날씨 정보를 보여줍니다. 위치 정보 동의가 필요합니다.',
  },
  {
    id: 7,
    title: '심박수와 속도 관계',
    description:
      '운동 중 심박수와 속도의 관계를 산점도로 보여줍니다. 이를 통해 운동 강도와 심박수의 상관관계를 분석할 수 있습니다.',
  },
  {
    id: 8,
    title: '심박수 구간별 운동량',
    description:
      '운동 중 각 심박수 구간에서 보낸 시간을 보여줍니다. 휴식, 준비운동, 지방연소, 유산소, 무산소 등 각 심박존별 운동 시간 분포를 확인할 수 있습니다.',
  },
]

// LocalStorage에서 저장된 차트 위치를 불러오거나 기본값 사용
const loadChartPositions = () => {
  const savedPositions = localStorage.getItem(STORAGE_KEY)
  return savedPositions ? JSON.parse(savedPositions) : defaultCharts
}

const charts = ref(loadChartPositions())

// 차트 위치가 변경될 때마다 LocalStorage에 저장
watch(
  charts,
  (newPositions) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newPositions))
  },
  { deep: true },
)

const fetchData = async () => {
  const [start, end] = props.dateRange
  const startDate = formatToYYYYMMDD(start)
  const endDate = formatToYYYYMMDD(end)

  try {
    const userId = userStore.userId as string

    // Promise.all을 사용하여 두 API 호출을 병렬로 실행
    const [recordsResponse, cadenceResponse] = await Promise.all([
      getRecordsFetch(userId, startDate, endDate),
      getCadenceFetch(userId, startDate, endDate),
    ])

    // 운동 기록 데이터 설정
    if (Array.isArray(recordsResponse.data)) {
      records.value = recordsResponse.data
    } else {
      records.value = []
    }

    // 케이던스 데이터 설정
    if (Array.isArray(cadenceResponse.data)) {
      cadenceData.value = cadenceResponse.data
    } else {
      cadenceData.value = []
    }
  } catch (error) {
    console.error('데이터 fetch 중 오류 발생:', error)
    records.value = []
    cadenceData.value = []
  }
}

// dateRange가 변경될 때마다 데이터 fetch
watch(
  () => props.dateRange,
  async () => {
    await fetchData()
  },
)

// 초기 데이터 로드
fetchData()

function getClass(id: number) {
  const classes = []

  // 너비 설정 (col-span-2)
  // - 운동 거리 추이 (1)
  // - 평균 케이던스 (5)
  // - 심박수와 속도 관계 (7)
  if ([1, 5, 7].includes(id)) {
    classes.push('col-span-2')
  }

  // 높이 설정 (row-span-2)
  // - 평균 케이던스 (5)
  if ([5].includes(id)) {
    classes.push('row-span-2')
  }

  return classes
}

defineExpose({
  fetchData,
})
</script>

<template>
  <div class="grid auto-rows-[minmax(20vh,auto)] grid-cols-3 gap-4">
    <draggable
      v-model="charts"
      class="contents"
      item-key="id"
      :animation="200"
      ghost-class="bg-gray-100"
    >
      <template #item="{ element }">
        <div
          :class="[
            'relative z-0 cursor-move rounded-2xl bg-white p-4 shadow-sm transition-shadow hover:shadow-md',
            getClass(element.id),
          ]"
        >
          <div class="h-full">
            <!-- 차트 정보 아이콘 -->
            <!-- <div v-if="element.description" class="absolute right-3 top-3">
              <ChartInfo :description="element.description" />
            </div> -->

            <template v-if="element.id === 1">
              <DistanceChart :records="records" />
            </template>
            <template v-else-if="element.id === 2">
              <TimeDistributionChart :records="records" />
            </template>
            <template v-else-if="element.id === 3">
              <PaceZoneChart :records="records" />
            </template>
            <template v-else-if="element.id === 4">
              <ExerciseStats :records="records" />
            </template>
            <template v-else-if="element.id === 5">
              <CadenceChart :cadence-data="cadenceData" />
            </template>
            <template v-else-if="element.id === 6">
              <WeatherChart />
            </template>
            <template v-else-if="element.id === 7">
              <HeartRateSpeedChart :records="records" />
            </template>
            <template v-else-if="element.id === 8">
              <HeartRateZoneChart :records="records" />
            </template>
            <template v-else>
              {{ element.title }}
            </template>
          </div>
        </div>
      </template>
    </draggable>
  </div>
</template>

<style scoped>
.contents {
  display: contents;
}
</style>
