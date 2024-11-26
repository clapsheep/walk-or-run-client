<script setup lang="ts">
defineProps<{
  dday: string
  isEnded?: number
}>()
</script>

<template>
  <span
    class="inline-flex items-center justify-center rounded-full px-3 py-1 text-sm font-semibold whitespace-nowrap min-w-[4.5rem]"
    :class="isEnded ? 'bg-gray-700/20' : 'bg-white/20 backdrop-blur-sm'"
  >
    {{ dday }}
  </span>
</template>
