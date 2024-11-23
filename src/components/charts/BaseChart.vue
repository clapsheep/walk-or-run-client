<template>
  <div class="relative h-[300px]">
    <div v-if="loading" class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">Loading...</div>
    <div v-else-if="error" class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">{{ error }}</div>
    <component
      v-else
      :is="chartType"
      :data="chartData"
      :options="mergedOptions"
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
  Title,
  Tooltip,
  Legend
} from 'chart.js'
import { Line, Bar } from 'vue-chartjs'
import { computed } from 'vue'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
)

interface Props {
  type?: 'line' | 'bar'
  chartData: {
    labels: string[]
    datasets: Array<{
      label: string
      data: number[]
      backgroundColor?: string
      borderColor?: string
      [key: string]: any
    }>
  }
  options?: Record<string, any>
  loading?: boolean
  error?: string | null
}

const props = withDefaults(defineProps<Props>(), {
  type: 'line',
  loading: false,
  error: null,
  options: () => ({})
})

const defaultOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top' as const,
    }
  }
}

const chartType = computed(() => {
  return props.type === 'line' ? Line : Bar
})

const mergedOptions = computed(() => {
  return {
    ...defaultOptions,
    ...props.options
  }
})
</script>

<style scoped>
</style>
