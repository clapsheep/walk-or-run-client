<script setup>
import { computed, useAttrs } from 'vue'

const attrs = useAttrs()

const {
  id,
  label = '',
  type = 'text',
  value,
  placeholder = '',
  size = 'md',
  direction = 'row',
} = defineProps({
  id: {
    type: String,
    required: true,
  },
  label: String,
  type: String,
  value: {
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
})

const SIZE_CLASSES = {
  sm: 'px-3 py-1 text-sm',
  md: 'px-4 py-2 text-base',
  lg: 'px-5 py-3 text-lg',
}

const LABEL_SIZE_CLASSES = {
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-lg',
}

const BASE_INPUT_CLASSES = [
  'rounded-3xl',
  'border border-gray-300',
  'transition-all duration-200',
  'focus:outline-none focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20',
  'placeholder:text-gray-400',
  'hover:border-gray-400',
].join(' ')

const containerClasses = computed(() => [
  'flex',
  direction === 'row' ? 'items-center gap-4' : 'flex-col items-start gap-2',
  attrs.class,
])

const inputClasses = computed(() => [
  BASE_INPUT_CLASSES,
  SIZE_CLASSES[size],
  direction === 'col' ? 'w-full' : '', // column일 때는 input을 전체 너비로
])

const labelClasses = computed(() => ['font-medium text-gray-700', LABEL_SIZE_CLASSES[size]])
</script>

<template>
  <div :class="containerClasses">
    <label v-if="label" :for="id" :class="labelClasses">
      {{ label }}
    </label>
    <input
      :type="type"
      :id="id"
      :value="value"
      :placeholder="placeholder"
      :class="inputClasses"
      @input="$emit('update:value', $event.target.value)"
    />
  </div>
</template>
