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
  <header class="relative flex justify-center items-center py-4 bg-white shadow-sm">
    <div v-if="showBackButton" class="absolute left-4">
      <button
        @click="goBack"
        class="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
      >
        <ArrowLongLeftIcon class="w-6 h-6 text-gray-600" />
      </button>
    </div>
    <h1 class="text-xl font-bold text-gray-800">{{ title }}</h1>
  </header>
</template>
