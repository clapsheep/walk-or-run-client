import { ref } from 'vue'
import type { AxiosResponse } from 'axios'
import type ApiResponse from '@/core/common/types/ApiResponse'
import { processChartData as processChartDataService } from '../services/ChartService'

interface ChartConfig {
  fetchFn: (userId: string, startTime: string, endTime: string) => Promise<AxiosResponse<any | ApiResponse>>
  label: string
  dataKey: string
  color: string
}

// API 응답 데이터 추출
const extractResponseData = (response: AxiosResponse<any>): any[] => {
  if (Array.isArray(response.data)) {
    return response.data
  }
  if (response.data.data && Array.isArray(response.data.data)) {
    return response.data.data
  }
  throw new Error('Invalid data format')
}

// 에러 메시지 포맷
const formatErrorMessage = (error: unknown): string =>
  error instanceof Error ? error.message : '데이터를 불러오는데 실패했습니다.'

// 빈 차트 데이터 생성
const createEmptyChartData = (config: ChartConfig) => ({
  labels: [],
  datasets: [{
    label: config.label,
    data: [],
    borderColor: config.color,
    backgroundColor: config.color
  }]
})

export const useChart = (userId: string, startTime: string, endTime: string, config: ChartConfig) => {
  const data = ref<any[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  const fetchData = async () => {
    loading.value = true
    error.value = null

    try {
      const response = await config.fetchFn(userId, startTime, endTime)
      console.log(response)
      data.value = extractResponseData(response)
    } catch (e) {
      error.value = formatErrorMessage(e)
    } finally {
      loading.value = false
    }
  }

  const processChartData = () => {
    if (!data.value || data.value.length === 0) {
      return createEmptyChartData(config)
    }

    return processChartDataService(
      data.value,
      config.dataKey,
      config.label,
      config.color
    )
  }

  return {
    data,
    loading,
    error,
    fetchData,
    processChartData
  }
}
