<script setup>
import { computed, useAttrs } from 'vue'

const attrs = useAttrs()

const {
  type = 'button',
  color = 'primary',
  size = 'md',
} = defineProps({
  type: {
    type: String,
    default: 'button',
  },
  color: {
    type: String,
    validator: (value) => ['primary', 'secondary', 'success', 'danger', 'disabled'].includes(value),
  },
  size: {
    type: String,
    validator: (value) => ['sm', 'md', 'lg'].includes(value),
  },
})

const SIZE_CLASSES = {
  sm: 'px-4 py-1 text-sm rounded-3xl',
  md: 'px-8 py-2 text-base rounded-3xl',
  lg: 'px-12 py-3 text-lg rounded-full',
}

const COLOR_CLASSES = {
  primary: 'bg-brand-royal text-white hover:brightness-110 hover:shadow-md',
  secondary: 'bg-white border-2 border-gray-300 text-gray-700 hover:bg-gray-50 hover:shadow-md',
  disabled: 'bg-gray-200 text-gray-400 cursor-not-allowed',
  danger: 'bg-brand-red text-white hover:brightness-110 hover:shadow-md',
  success: 'bg-green-600 text-white hover:brightness-110 hover:shadow-md',
}

const BASE_CLASSES =
  'font-medium transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2'

const buttonClass = computed(() => [
  BASE_CLASSES,
  SIZE_CLASSES[size],
  COLOR_CLASSES[color],
  attrs.class,
])
</script>

<template>
  <button :type="type" :class="buttonClass" :disabled="color === 'disabled'">
    <slot></slot>
  </button>
</template>
