import type ApiResponse from '@/core/common/types/ApiResponse'
import { AxiosResponse } from 'axios'
import { computed, ref } from 'vue'
import type Goal from '../GoalType'
import { filterGoalsByStatus, isGoalCompleted } from '../services/GoalService'

export type GoalStatus = 'all' | 'active' | 'completed'

export const useGetUserGoals = (
  getUserGoalFetch: () => Promise<AxiosResponse<Goal[] | ApiResponse>>,
) => {
  const loading = ref(false)
  const error = ref<string | null>(null)
  const goals = ref<Goal[]>([])
  const selectedStatus = ref<GoalStatus>('all')

  const fetchGoals = async () => {
    loading.value = true
    error.value = null
    try {
      const response = await getUserGoalFetch()
      if (response?.status === 204) {
        goals.value = []
      } else if (response?.data) {
        goals.value = response.data as Goal[]
      }
    } catch (e) {
      error.value = e instanceof Error ? e.message : '목표를 불러오는데 실패했습니다.'
    } finally {
      loading.value = false
    }
  }

  const setStatus = (status: GoalStatus) => {
    selectedStatus.value = status
  }

  const getActiveGoals = computed(() => {
    return goals.value.filter((goal) => !isGoalCompleted(goal))
  })

  const filteredGoals = computed(() => {
    return filterGoalsByStatus(goals.value, selectedStatus.value)
  })

  return {
    loading,
    error,
    goals,
    selectedStatus,
    filteredGoals,
    getActiveGoals,
    fetchGoals,
    setStatus,
  }
}
