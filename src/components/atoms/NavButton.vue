<script setup>
import { RouterLink } from 'vue-router'
const {
  to,
  icon,
  name,
  isCollapsed = false,
} = defineProps({
  to: {
    type: String,
    required: true,
  },
  icon: {
    type: Function,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  isCollapsed: {
    type: Boolean,
    default: false,
  },
})
</script>

<template>
  <RouterLink
    :to="to"
    :class="{ 'justify-center': isCollapsed }"
    activeClass="bg-primary-500 hover:bg-primary-400 text-white font-semibold"
    class="hover:bg-primary-200 flex items-center rounded-lg p-2 text-gray-900 transition-all duration-200"
  >
    <component :is="icon" class="h-6 w-6" />
    <span v-if="!isCollapsed" class="ml-3">{{ name }}</span>
  </RouterLink>
</template>
