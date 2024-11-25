<script setup lang="ts">
import type { Component } from 'vue'

interface Props {
  icon: Component
  rotate?: boolean
  onClick?: () => void
}

defineProps<Props>()
</script>

<template>
  <button
    @click="onClick"
    class="fixed bottom-8 right-8 z-50 bg-primary-500 hover:bg-primary-600 text-white rounded-full p-4 shadow-lg transition-all duration-300 hover:scale-110"
    :class="{ '-rotate-180': rotate }"
  >
    <component :is="icon" class="w-6 h-6" />
  </button>
</template>
