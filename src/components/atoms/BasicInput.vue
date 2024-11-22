<script setup lang="ts">
import { computed } from 'vue'

interface BasicInputProps {
  id: string
  label?: string
  name:string
  type?: string
  placeholder?: string
  size?: 'sm' | 'md' | 'lg'
  direction?: 'row' | 'col'
  error?: string
  className?: string
  autocomplete?: string
}

const {
  id,
  label = '',
  name,
  type = 'text',
  placeholder = '',
  size = 'md',
  direction = 'row',
  error = '',
  className = '',
} = defineProps<BasicInputProps>()
const value = defineModel()

const SIZE_CLASSES = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-base',
  lg: 'px-5 py-3 text-lg',
}

const LABEL_SIZE_CLASSES = {
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-lg',
}

const BASE_INPUT_CLASSES = [
  'rounded-lg',
  'border',
  'bg-white',
  'transition-all duration-200',
  'placeholder:text-gray-400',
  'w-full',
  'border-gray-300',
  'hover:border-primary-300',
  'focus:outline-none',
  'focus:border-primary-500',
  'focus:ring-4',
  'focus:ring-primary-100',
  'disabled:bg-gray-100',
  'disabled:text-gray-500',
  'disabled:border-gray-200',
  'disabled:cursor-not-allowed',
].join(' ')

const containerClasses = computed(() => [
  'flex',
  direction === 'row' ? 'items-center gap-4' : 'flex-col items-start gap-2',
  className,
])

const inputClasses = computed(() => [
  BASE_INPUT_CLASSES,
  SIZE_CLASSES[size],
  error
    ? [
        'border-warning-500',
        'hover:border-warning-600',
        'focus:border-warning-500',
        'focus:ring-warning-100',
      ].join(' ')
    : '',
])

const labelClasses = computed(() => ['font-medium', 'text-gray-700', LABEL_SIZE_CLASSES[size]])

const errorClasses = computed(() => [
  'text-warning-600',
  LABEL_SIZE_CLASSES[size] === 'text-lg' ? 'text-base' : 'text-sm',
])
</script>

<template>
  <div :class="containerClasses">
    <label v-if="label" :for="id" :class="labelClasses">
      {{ label }}
    </label>
    <div class="relative w-full">
      <input
        :autocomplete = 'autocomplete'
        :type="type"
        :id="id"
        :placeholder="placeholder"
        :name = 'name'
        :class="inputClasses"
        v-model="value"
      />
      <p v-if="error" :class="errorClasses" class="mt-1">
        {{ error }}
      </p>
    </div>
  </div>
</template>
