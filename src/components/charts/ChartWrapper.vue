<template>
  <div class="w-full h-[400px] bg-white rounded-lg shadow p-4">
    <ChartSkeleton v-if="loading" />
    <div v-else-if="error" class="h-full flex items-center justify-center text-red-500">
      {{ error }}
    </div>
    <slot v-else></slot>
  </div>
</template>

<script setup lang="ts">
import ChartSkeleton from '../skeletons/ChartSkeleton.vue'

defineProps<{
  loading?: boolean
  error?: string | null
}>()
</script>
