<script setup lang="ts">
defineProps<{
  padding?: 'normal' | 'large'
}>()
</script>

<template>
  <div class="animate-pulse">
    <div
      class="rounded-lg bg-white shadow-sm"
      :class="{
        'p-4': padding === 'normal' || !padding,
        'p-6': padding === 'large',
      }"
    >
      <div class="space-y-4">
        <div class="flex items-center justify-between">
          <div class="h-4 w-1/4 rounded bg-gray-200"></div>
          <div class="h-6 w-20 rounded-full bg-gray-200"></div>
        </div>
        <div class="h-3 w-3/4 rounded bg-gray-200"></div>
        <div class="h-2 w-full rounded-full bg-gray-200"></div>
        <div class="flex justify-between">
          <div class="h-3 w-20 rounded bg-gray-200"></div>
          <div class="h-3 w-16 rounded bg-gray-200"></div>
        </div>
      </div>
    </div>
  </div>
</template>
