<script setup lang="ts">
import { useRouter } from 'vue-router'
import { ArrowLongLeftIcon } from '@heroicons/vue/24/outline'

interface Props {
  title: string
  showBackButton?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  showBackButton: true
})

const router = useRouter()

const goBack = () => {
  router.back()
}
</script>

<template>
  <header class="sticky top-0 z-50 flex items-center justify-center bg-white py-4 shadow-sm">
    <div v-if="showBackButton" class="absolute left-4">
      <button
        @click="goBack"
        class="rounded-full p-2 transition-colors duration-200 hover:bg-gray-100"
      >
        <ArrowLongLeftIcon class="h-6 w-6 text-gray-600" />
      </button>
    </div>
    <h1 class="text-xl font-bold text-gray-800">{{ title }}</h1>
  </header>
</template>
