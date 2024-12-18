<script setup lang="ts">
import { computed } from 'vue'

interface BasicButtonProps {
  type?: 'button' | 'submit' | 'reset'
  color?: 'primary' | 'secondary' | 'accent' | 'success' | 'info' | 'warning'
  size?: 'sm' | 'md' | 'lg'
  variant?: 'filled' | 'outlined' | 'ghost'
  disabled?: boolean
  className?: string
}
const {
  type = 'button',
  color = 'primary',
  size = 'md',
  variant = 'filled',
  disabled = false,
  className = '',
} = defineProps<BasicButtonProps>()

const SIZE_CLASSES = {
  sm: 'px-3 py-1.5 text-sm gap-1.5',
  md: 'px-4 py-2 text-base gap-2',
  lg: 'px-6 py-3 text-lg gap-2.5',
}

const FILLED_VARIANT = {
  primary: 'bg-primary-500 text-white hover:bg-primary-600 active:bg-primary-700',
  secondary: 'bg-secondary-500 text-white hover:bg-secondary-600 active:bg-secondary-700',
  accent: 'bg-accent-500 text-gray-900 hover:bg-accent-600 active:bg-accent-700',
  success: 'bg-success-500 text-white hover:bg-success-600 active:bg-success-700',
  info: 'bg-info-500 text-white hover:bg-info-600 active:bg-info-700',
  warning: 'bg-warning-500 text-white hover:bg-warning-600 active:bg-warning-700',
}

const OUTLINED_VARIANT = {
  primary: 'border-2 border-primary-500 text-primary-500 hover:bg-primary-50 active:bg-primary-100',
  secondary:
    'border-2 border-secondary-500 text-secondary-500 hover:bg-secondary-50 active:bg-secondary-100',
  accent: 'border-2 border-accent-500 text-accent-500 hover:bg-accent-50 active:bg-accent-100',
  success: 'border-2 border-success-500 text-success-500 hover:bg-success-50 active:bg-success-100',
  info: 'border-2 border-info-500 text-info-500 hover:bg-info-50 active:bg-info-100',
  warning: 'border-2 border-warning-500 text-warning-500 hover:bg-warning-50 active:bg-warning-100',
}

const GHOST_VARIANT = {
  primary: 'text-primary-500 hover:bg-primary-50 active:bg-primary-100',
  secondary: 'text-secondary-500 hover:bg-secondary-50 active:bg-secondary-100',
  accent: 'text-accent-500 hover:bg-accent-50 active:bg-accent-100',
  success: 'text-success-500 hover:bg-success-50 active:bg-success-100',
  info: 'text-info-500 hover:bg-info-50 active:bg-info-100',
  warning: 'text-warning-500 hover:bg-warning-50 active:bg-warning-100',
}

const VARIANT_CLASSES = {
  filled: FILLED_VARIANT,
  outlined: OUTLINED_VARIANT,
  ghost: GHOST_VARIANT,
}

const FOCUS_RING_COLORS = {
  primary: 'focus:ring-primary-500 focus:ring-offset-2',
  secondary: 'focus:ring-secondary-500 focus:ring-offset-2',
  accent: 'focus:ring-accent-500 focus:ring-offset-2',
  success: 'focus:ring-success-500 focus:ring-offset-2',
  info: 'focus:ring-info-500 focus:ring-offset-2',
  warning: 'focus:ring-warning-500 focus:ring-offset-2',
}

const BASE_CLASSES = [
  'inline-flex items-center justify-center',
  'font-medium',
  'rounded-lg',
  'transition-all duration-200',
  'focus:outline-none focus:ring-2',
  'disabled:opacity-50 disabled:cursor-not-allowed',
].join(' ')

const buttonClass = computed(() => [
  BASE_CLASSES,
  SIZE_CLASSES[size],
  VARIANT_CLASSES[variant][color],
  FOCUS_RING_COLORS[color],
  className,
])
</script>

<template>
  <button :type="type" :class="buttonClass" :disabled="disabled">
    <slot name="prefix"></slot>
    <slot></slot>
    <slot name="suffix"></slot>
  </button>
</template>
