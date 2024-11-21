<script setup>
defineProps({
  id: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
  modelValue: {
    type: [String, Number],
    default: '',
  },
  options: {
    type: Array,
    required: true,
  },
  valueKey: {
    type: String,
    required: true,
  },
  labelKey: {
    type: String,
    required: true,
  },
  placeholder: {
    type: String,
    default: '선택해주세요',
  },
  error: {
    type: String,
    default: '',
  },
  direction: {
    type: String,
    validator: (value) => ['row', 'col'].includes(value),
    default: 'col',
  },
  size: {
    type: String,
    validator: (value) => ['sm', 'md', 'lg'].includes(value),
    default: 'md',
  },
})

defineEmits(['update:modelValue'])

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
        :name="id"
        :id="id"
        :value="modelValue"
        @change="$emit('update:modelValue', $event.target.value)"
        :class="[
          'w-full rounded-lg border bg-white transition-all duration-200',
          SIZE_CLASSES[size],
          error
            ? 'border-warning-500 hover:border-warning-600 focus:border-warning-500 focus:ring-warning-100'
            : 'border-gray-300 hover:border-primary-300 focus:border-primary-500 focus:ring-primary-100',
          'focus:outline-none focus:ring-4',
          'disabled:border-gray-200 disabled:bg-gray-100 disabled:text-gray-500',
        ]"
      >
        <option value="" disabled selected>{{ placeholder }}</option>
        <option
          v-for="item in options"
          :key="item[valueKey]"
          :value="item[valueKey]"
          class="text-gray-700"
        >
          {{ item[labelKey] }}
        </option>
      </select>
      <p v-if="error" class="mt-1 text-sm text-warning-600">
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
