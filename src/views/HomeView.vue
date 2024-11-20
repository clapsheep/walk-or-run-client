<script setup>
import { onMounted, ref } from 'vue'
import Chart from 'chart.js/auto'
import {
  AcademicCapIcon,
  Bars3Icon,
  MagnifyingGlassIcon,
  UserIcon,
} from '@heroicons/vue/24/outline'

const chartCanvas = ref(null) // canvas 요소를 위한 ref
const chartInstance = ref(null) // 차트 인스턴스를 저장할 ref
const chartData = ref([]) // 데이터를 저장할 ref

// API에서 데이터를 가져오는 함수
const fetchData = async () => {
  try {
    const response = await fetch('your-api-endpoint')
    const data = await response.json()
    chartData.value = data
    updateChart()
  } catch (error) {
    console.error('데이터 가져오기 실패:', error)
  }
}

// 차트 업데이트 함수
const updateChart = () => {
  if (chartInstance.value) {
    chartInstance.value.data.datasets[0].data = chartData.value
    chartInstance.value.update()
  }
}

onMounted(() => {
  // ref로 canvas 요소 접근
  const ctx = chartCanvas.value
  // 차트 생성
  chartInstance.value = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
      datasets: [
        {
          label: '# of Votes',
          data: chartData.value,
          borderWidth: 1,
          backgroundColor: [
            'rgba(255, 99, 132, 0.5)',
            'rgba(54, 162, 235, 0.5)',
            'rgba(255, 206, 86, 0.5)',
            'rgba(75, 192, 192, 0.5)',
            'rgba(153, 102, 255, 0.5)',
            'rgba(255, 159, 64, 0.5)',
          ],
        },
      ],
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  })

  // 초기 데이터 가져오기
  fetchData()
})
</script>

<template>
  <main>
    <h1>Home</h1>
    <p>Home 페이지입니다.</p>
    <div class="w-full max-w-3xl">
      <canvas ref="chartCanvas"></canvas>
    </div>
    <div class="flex gap-2">
      <Bars3Icon class="h-8 w-8 text-red-400" />
      <MagnifyingGlassIcon class="h-8 w-8" />
      <UserIcon class="h-8 w-8" />
      <AcademicCapIcon class="h-8 w-8" />
    </div>
  </main>
</template>
