import { ref, onMounted } from 'vue'
import Goal from '../GoalType'
import { setError, setLoading } from '@/core/challenge/utils/settingUtils'

export const useGetUserGoals = (getUserGoalFetch: () => Promise<Goal[]>) => {
  const loading = ref(false)
  const error = ref('')
  const showModal = ref(false)
  const goals = ref<Goal[]>([])

  const handleOpenModal = () => {
    showModal.value = true
  }

  const handleCloseModal = () => {
    showModal.value = false
  }

  const handleSubmitGoal = async (formData: Goal) => {
    console.log('Form submitted:', formData)
    await fetchGoals()
  }

  const fetchGoals = async () => {
    const state = { loading, error }
    setLoading(state, true)
    setError(state, '')

    try {
      const data = await getUserGoalFetch()
      goals.value = data
      if(goals.value.length === 0) {
        error.value = '목표가 없습니다.'
      }
    } catch (err: any) {
      setError(state, err.response?.data?.message || '목표 조회에 실패했습니다.')
      console.error('목표 조회에 실패했습니다:', err)
    } finally {
      setLoading(state, false)
    }
  }

  const calculateAchievementRate = (goal: Goal) => {
    if (!goal.targetAmount || !goal.currentAmount) return 0
    return Math.round((goal.currentAmount / goal.targetAmount) * 100)
  }

  onMounted(() => {
    fetchGoals()
  })

  return {
    loading,
    error,
    goals,
    showModal,
    handleOpenModal,
    handleCloseModal,
    handleSubmitGoal,
    fetchGoals,
    calculateAchievementRate
  }
}
