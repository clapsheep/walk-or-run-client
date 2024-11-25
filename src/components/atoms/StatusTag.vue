<script setup lang="ts">
import type { GoalStatus } from '@/core/goal/composables/useGetUserGoals'

interface Props {
  status: GoalStatus | 'inProgress' | 'completed'
  size?: 'sm' | 'md'
  interactive?: boolean
  active?: boolean
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  size: 'sm',
  interactive: false,
  active: false,
  disabled: false,
})

const getStatusColor = (status: Props['status']) => {
  if (props.disabled) {
    return {
      bg: 'bg-gray-100',
      text: 'text-gray-400',
      hover: '',
    }
  }

  switch (status) {
    case 'active':
    case 'inProgress':
      return {
        bg: props.active ? 'bg-secondary-500' : 'bg-secondary-100',
        text: props.active ? 'text-white' : 'text-secondary-700',
        hover: 'hover:bg-secondary-200 hover:text-secondary-800',
      }
    case 'completed':
      return {
        bg: props.active ? 'bg-primary-500' : 'bg-primary-100',
        text: props.active ? 'text-white' : 'text-primary-700',
        hover: 'hover:bg-primary-200 hover:text-primary-800',
      }
    default:
      return {
        bg: props.active ? 'bg-gray-500' : 'bg-gray-100',
        text: props.active ? 'text-white' : 'text-gray-700',
        hover: 'hover:bg-gray-200 hover:text-gray-800',
      }
  }
}

const getStatusText = (status: Props['status']) => {
  switch (status) {
    case 'active':
    case 'inProgress':
      return '진행중'
    case 'completed':
      return '완료'
    default:
      return '전체'
  }
}
</script>

<template>
  <span
    :class="[
      'inline-flex items-center justify-center rounded-full font-medium transition-colors',
      getStatusColor(status).bg,
      getStatusColor(status).text,
      {
        'cursor-pointer': interactive && !disabled,
        'cursor-not-allowed': disabled,
        [getStatusColor(status).hover]: interactive && !disabled,
        'px-2 py-1 text-xs': size === 'sm',
        'px-4 py-2 text-sm': size === 'md',
      },
    ]"
    @click="!disabled && interactive && $emit('click')"
  >
    <slot>{{ getStatusText(status) }}</slot>
  </span>
</template>
