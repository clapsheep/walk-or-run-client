<template>
  <div class="relative h-full">
    <div class="absolute top-2 right-2 z-10">
      <select v-model="selectedType" class="p-1 border rounded bg-white shadow-sm">
        <option value="line">선 그래프</option>
        <option value="bar">막대 그래프</option>
        <option value="doughnut">도넛 그래프</option>
      </select>
    </div>
    <component
      :is="chartComponent"
      :data="processedChartData"
      :options="mergedOptions"
      class="h-full w-full"
    />
  </div>
</template>

<script setup lang="ts">
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'
import { Line, Bar, Doughnut } from 'vue-chartjs'
import { computed, ref } from 'vue'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
)

interface Props {
  type?: 'line' | 'bar' | 'doughnut'
  chartData: {
    labels: string[]
    datasets: Array<{
      label: string
      data: number[]
      backgroundColor?: string | string[]
      borderColor?: string
      [key: string]: any
    }>
  }
  options?: Record<string, any>
}

const props = withDefaults(defineProps<Props>(), {
  type: 'line',
  options: () => ({})
})

const selectedType = ref(props.type)

const chartComponent = computed(() => {
  switch (selectedType.value) {
    case 'bar':
      return Bar
    case 'doughnut':
      return Doughnut
    default:
      return Line
  }
})

const processedChartData = computed(() => {
  if (selectedType.value === 'doughnut') {
    return {
      labels: props.chartData.labels,
      datasets: props.chartData.datasets.map(dataset => ({
        ...dataset,
        backgroundColor: Array.isArray(dataset.backgroundColor)
          ? dataset.backgroundColor
          : [
              '#41B883',
              '#2196F3',
              '#FFC107',
              '#E91E63',
              '#9C27B0',
              '#00BCD4',
              '#4CAF50',
              '#FF9800'
            ]
      }))
    }
  }
  return props.chartData
})

const defaultOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: false
    }
  }
}

const mergedOptions = computed(() => {
  const baseOptions = { ...defaultOptions, ...props.options }

  if (selectedType.value === 'doughnut') {
    return {
      ...baseOptions,
      cutout: '70%',
      plugins: {
        ...baseOptions.plugins,
        legend: {
          ...baseOptions.plugins.legend,
          position: 'right' as const
        }
      }
    }
  }

  return baseOptions
})
</script>

<style scoped>
</style>
