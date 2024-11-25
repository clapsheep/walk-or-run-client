import type Goal from '../GoalType'
import type { GoalStatus } from '../composables/useGetUserGoals'

export const isGoalCompleted = (goal: Goal): boolean => {
  const now = new Date()
  const endDate = new Date(goal.endDate ?? '')
  const isOverdue = endDate < now
  const isAmountCompleted = (goal.currentAmount ?? 0) >= (goal.targetAmount ?? 0)
  return isOverdue || isAmountCompleted
}

export const filterGoalsByStatus = (goals: Goal[], status: GoalStatus): Goal[] => {
  switch (status) {
    case 'active':
      return goals.filter((goal) => !isGoalCompleted(goal))
    case 'completed':
      return goals.filter((goal) => isGoalCompleted(goal))
    default:
      return goals
  }
}

export const calculateAchievementRate = (goal: Goal): number => {
  if (!goal.targetAmount) return 0
  const currentAmount = goal.currentAmount ?? 0
  return Math.min((currentAmount / goal.targetAmount) * 100, 100)
}
