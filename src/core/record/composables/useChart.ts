import { ref } from 'vue'
import type { AxiosResponse } from 'axios'
import type ApiResponse from '@/core/common/types/ApiResponse'

interface ChartConfig {
  fetchFn: (userId: string) => Promise<AxiosResponse<any | ApiResponse>>
  label: string
  dataKey: string
  color: string
}

export const useChart = (userId: string, config: ChartConfig) => {
  const data = ref<any[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  const fetchData = async () => {
    loading.value = true
    error.value = null
    try {
      const response = await config.fetchFn(userId)
      data.value = response.data
    } catch (e) {
      error.value = e instanceof Error ? e.message : '데이터를 불러오는데 실패했습니다.'
    } finally {
      loading.value = false
    }
  }

  const processChartData = () => {
    return {
      labels: data.value.map(record => record.date),
      datasets: [{
        label: config.label,
        data: data.value.map(record => record[config.dataKey]),
        borderColor: config.color,
        backgroundColor: config.color,
        tension: 0.1
      }]
    }
  }

  return {
    data,
    loading,
    error,
    fetchData,
    processChartData
  }
}
