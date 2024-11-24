<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import draggable from 'vuedraggable'

const STORAGE_KEY = 'dashboard-chart-positions'

// 초기 차트 데이터
const defaultCharts = [
  { id: 1, title: '차트 1', class: 'col-span-2' },
  { id: 2, title: '차트 2', class: 'col-span-2' },
  { id: 3, title: '차트 3', class: '' },
  { id: 4, title: '차트 4', class: '' },
  { id: 5, title: '차트 5', class: '' },
  { id: 6, title: '차트 6', class: '' },
  { id: 7, title: '차트 7', class: 'col-span-2' },
  { id: 8, title: '차트 8', class: 'col-span-2' },
]

// LocalStorage에서 저장된 차트 위치를 불러오거나 기본값 사용
const loadChartPositions = () => {
  const savedPositions = localStorage.getItem(STORAGE_KEY)
  return savedPositions ? JSON.parse(savedPositions) : defaultCharts
}

const charts = ref(loadChartPositions())

// 차트 위치가 변경될 때마다 LocalStorage에 저장
watch(charts, (newPositions) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(newPositions))
}, { deep: true })

// 컴포넌트가 마운트될 때 저장된 위치 불러오기
onMounted(() => {
  charts.value = loadChartPositions()
})
</script>

<template>
  <draggable
    v-model="charts"
    class="grid grid-cols-2 gap-4 flex-1"
    item-key="id"
    :animation="200"
    ghost-class="bg-gray-100"
  >
    <template #item="{ element }">
      <div
        :class="['bg-primary-200 p-4 rounded-2xl shadow-sm cursor-move hover:shadow-md transition-shadow',
                element.id <= 2 ? 'h-[calc(35vh-2rem)]' : 'h-[calc(30vh-2rem)]',
                element.class]"
      >
        {{ element.title }}
      </div>
    </template>
  </draggable>
</template>
