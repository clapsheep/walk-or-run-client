<script setup lang="ts">
import StatusTag from '@/components/atoms/StatusTag.vue'
import type Goal from '@/core/goal/GoalType'
import { XMarkIcon } from '@heroicons/vue/24/outline'
import { computed } from 'vue'

interface Props {
  goal: Goal
  padding?: 'normal' | 'large'
}

const emit = defineEmits<{
  (e: 'delete', goalId: number): void
}>()

const props = withDefaults(defineProps<Props>(), {
  padding: 'normal',
})

const isCompleted = computed(() => {
  const endDate = new Date(props.goal.endDate ?? '')
  return (props.goal.currentAmount ?? 0) >= (props.goal.targetAmount ?? 0) || endDate < new Date()
})

const progressPercentage = computed(() => {
  const current = props.goal.currentAmount ?? 0
  const target = props.goal.targetAmount ?? 1
  return Math.min(Math.round((current / target) * 100), 100)
})

const handleDeleteClick = () => {
  emit('delete', props.goal.userGoalId!)
}
</script>

<template>
  <div
    class="rounded-lg bg-white shadow-sm transition-shadow hover:shadow-md"
    :class="{
      'p-4': props.padding === 'normal',
      'p-6': props.padding === 'large',
    }"
  >
    <!-- 목표 제목 및 상태 -->
    <div class="mb-2 flex items-center justify-between">
      <h3 class="font-medium text-gray-800">{{ props.goal.challengeCategoryName }}</h3>
      <div class="flex items-center gap-2">
        <StatusTag :status="isCompleted ? 'completed' : 'inProgress'" />
        <button
          @click="handleDeleteClick"
          class="rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
        >
          <XMarkIcon class="h-5 w-5" />
        </button>
      </div>
    </div>

    <!-- 기간 표시 -->
    <p class="mb-3 text-sm text-gray-600">
      {{ new Date(props.goal.startDate ?? '').toLocaleDateString() }} ~
      {{ new Date(props.goal.endDate ?? '').toLocaleDateString() }}
    </p>

    <!-- 진행률 바 -->
    <div class="space-y-2">
      <div class="h-2 w-full rounded-full bg-gray-200">
        <div
          class="h-2 rounded-full transition-all duration-300"
          :class="{
            'bg-secondary-500': !isCompleted,
            'bg-primary-500': isCompleted,
          }"
          :style="{ width: `${progressPercentage}%` }"
        ></div>
      </div>
      <div class="flex justify-between text-sm text-gray-500">
        <span>현재: {{ props.goal.currentAmount }}{{ props.goal.challengeCategoryUnitName }}</span>
        <span>목표: {{ props.goal.targetAmount }}{{ props.goal.challengeCategoryUnitName }}</span>
      </div>
    </div>
  </div>
</template>
