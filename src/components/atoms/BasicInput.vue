<script setup>
import { computed, useAttrs } from 'vue'

const attrs = useAttrs()

const {
  id,
  label = '',
  type = 'text',
  modelValue,
  placeholder = '',
  size = 'md',
  direction = 'row',
  error = '',
} = defineProps({
  id: {
    type: String,
    required: true,
  },
  label: String,
  type: String,
  modelValue: {
    type: String,
    required: true,
  },
  placeholder: String,
  size: {
    type: String,
    validator: (value) => ['sm', 'md', 'lg'].includes(value),
  },
  direction: {
    type: String,
    validator: (value) => ['row', 'col'].includes(value),
    default: 'row',
  },
  error: {
    type: String,
    default: '',
  },
})

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
  // 기본 상태
  'border-gray-300',
  'hover:border-primary-300',
  // 포커스 상태
  'focus:outline-none',
  'focus:border-primary-500',
  'focus:ring-4',
  'focus:ring-primary-100',
  // 에러 상태
  'disabled:bg-gray-100',
  'disabled:text-gray-500',
  'disabled:border-gray-200',
  'disabled:cursor-not-allowed',
].join(' ')

const containerClasses = computed(() => [
  'flex',
  direction === 'row' ? 'items-center gap-4' : 'flex-col items-start gap-2',
  attrs.class,
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
defineEmits(['update:modelValue'])
</script>

<template>
  <div :class="containerClasses">
    <label v-if="label" :for="id" :class="labelClasses">
      {{ label }}
    </label>
    <div class="relative w-full">
      <input
        :type="type"
        :id="id"
        :value="modelValue"
        :placeholder="placeholder"
        :class="inputClasses"
        @input="$emit('update:modelValue', $event.target.value)"
      />
      <p v-if="error" :class="errorClasses" class="mt-1">
        {{ error }}
      </p>
    </div>
  </div>
</template>
