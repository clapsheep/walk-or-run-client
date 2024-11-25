<script setup lang="ts">
interface Option {
  label: string
  value: any
}

interface Props {
  id: string
  name: string
  label?: string
  options: Option[]
  direction?: 'row' | 'col'
  error?: string
}

const props = withDefaults(defineProps<Props>(), {
  direction: 'row',
  label: '',
  error: ''
})

const value = defineModel()
</script>

<template>
  <div :class="['space-y-2', { 'flex flex-col': direction === 'col' }]">
    <label v-if="label" class="block text-gray-700 font-medium">{{ label }}</label>
    <div :class="['flex gap-4', direction === 'col' ? 'flex-col' : 'flex-row']">
      <label
        v-for="option in options"
        :key="option.value"
        class="relative group"
      >
        <input
          type="radio"
          :name="name"
          :value="option.value"
          v-model="value"
          class="absolute opacity-0 w-0 h-0"
        >
        <div
          class="flex items-center px-4 py-2 rounded-lg cursor-pointer transition-all duration-200 group-focus-within:ring-2 group-focus-within:ring-primary-500 group-focus-within:ring-offset-2"
          :class="[
            value === option.value
              ? 'bg-primary-500 text-white'
              : 'bg-white text-gray-700 border border-gray-300 hover:border-primary-500 hover:text-primary-500'
          ]"
        >
          <span class="font-medium">{{ option.label }}</span>
        </div>
      </label>
    </div>
    <p v-if="error" class="text-sm text-red-600">{{ error }}</p>
  </div>
</template>
