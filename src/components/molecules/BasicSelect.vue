<script setup lang="ts">
interface BasicSelectProps {
  id: string
  label: string
  name: string
  options: Record<string | number, string>
  placeholder?: string
  error?: string
  direction?: 'row' | 'col'
  size?: 'sm' | 'md' | 'lg'
}

const {
  id,
  label,
  name,
  options,
  placeholder,
  error = '',
  direction = 'row',
  size = 'md',
} = defineProps<BasicSelectProps>()
const queryId = defineModel()

const SIZE_CLASSES = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-base',
  lg: 'px-5 py-3 text-lg',
}
</script>

<template>
  <div :class="['flex', direction === 'row' ? 'items-center gap-4' : 'flex-col gap-2']">
    <label :for="id" :class="['font-medium text-gray-700', direction === 'row' && 'min-w-[80px]']">
      {{ label }}
    </label>
    <div class="relative flex-1">
      <select
        :name="name"
        :id="id"
        v-model="queryId"
        :class="[
          'w-full rounded-lg border bg-white transition-all duration-200',
          SIZE_CLASSES[size],
          error
            ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
            : 'border-gray-300 focus:border-primary-500 focus:ring-primary-500',
        ]"
      >
        <option v-if="placeholder" value="" disabled selected>{{ placeholder }}</option>
        <option v-for="[key, value] in Object.entries(options)" :key="key" :value="key">
          {{ value }}
        </option>
      </select>
      <p v-if="error" class="mt-1 text-sm text-red-600">
        {{ error }}
      </p>
    </div>
  </div>
</template>

<style scoped>
select {
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23666666'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 0.75rem center;
  background-size: 1rem;
  padding-right: 2.5rem;
}

select:focus {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23FF5A5F'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E");
}

select.error {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23FB923C'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E");
}
</style>
