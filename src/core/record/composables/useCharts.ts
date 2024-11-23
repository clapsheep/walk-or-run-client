import { ref } from 'vue'
import type { AxiosResponse } from 'axios'
import type ApiResponse from '@/core/common/types/ApiResponse'

export interface ChartConfig {
  fetchFn: (userId: string) => Promise<AxiosResponse<any | ApiResponse>>
  label: string
  dataKey: string
  color: string
}

interface ChartData {
  loading: boolean
  error: string | null
  data: any[]
  processChartData: () => {
    labels: string[]
    datasets: {
      label: string
      data: number[]
      borderColor: string
      backgroundColor: string
      tension: number
    }[]
  }
}

export const useCharts = (userId: string, configs: Record<string, ChartConfig>) => {
  const chartsData = ref<Record<string, ChartData>>({})
  const loading = ref(true)
  const error = ref<string | null>(null)

  const createChartData = (data: any[], config: ChartConfig): ChartData => ({
    loading: false,
    error: null,
    data,
    processChartData: () => ({
      labels: data.map(record => record.date),
      datasets: [{
        label: config.label,
        data: data.map(record => record[config.dataKey]),
        borderColor: config.color,
        backgroundColor: config.color,
        tension: 0.1
      }]
    })
  })

  const fetchAllData = async () => {
    loading.value = true
    error.value = null

    try {
      const fetchPromises = Object.entries(configs).map(async ([key, config]) => {
        try {
          const response = await config.fetchFn(userId)
          return [key, createChartData(response.data, config)]
        } catch (e) {
          return [key, {
            loading: false,
            error: e instanceof Error ? e.message : '데이터를 불러오는데 실패했습니다.',
            data: [],
            processChartData: () => ({
              labels: [],
              datasets: [{
                label: config.label,
                data: [],
                borderColor: config.color,
                backgroundColor: config.color,
                tension: 0.1
              }]
            })
          }]
        }
      })

      const results = await Promise.all(fetchPromises)
      chartsData.value = Object.fromEntries(results)
    } catch (e) {
      error.value = e instanceof Error ? e.message : '데이터를 불러오는데 실패했습니다.'
    } finally {
      loading.value = false
    }
  }

  const getChartData = (key: string): ChartData => {
    return chartsData.value[key] || {
      loading: true,
      error: null,
      data: [],
      processChartData: () => ({
        labels: [],
        datasets: [{
          label: configs[key]?.label || '',
          data: [],
          borderColor: configs[key]?.color || '',
          backgroundColor: configs[key]?.color || '',
          tension: 0.1
        }]
      })
    }
  }

  return {
    loading,
    error,
    fetchAllData,
    getChartData
  }
}
