<script setup lang="ts">
import { InformationCircleIcon } from '@heroicons/vue/24/outline'

interface Props {
  description: string
}

defineProps<Props>()
</script>

<template>
  <div class="relative group">
    <InformationCircleIcon 
      class="w-5 h-5 text-gray-400 hover:text-gray-600 transition-colors cursor-help"
    />
    <div 
      class="absolute right-0 top-6 w-64 p-3 bg-white rounded-lg shadow-lg border border-gray-200
             invisible opacity-0 group-hover:visible group-hover:opacity-100
             transition-all duration-200 z-20"
    >
      <p class="text-sm text-gray-600">{{ description }}</p>
    </div>
  </div>
</template>
