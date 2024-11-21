<script setup lang="ts">
import { RouterLink } from 'vue-router'

interface NavButtonProps {
  to: string
  icon: Function
  name: string
  isCollapsed?: boolean
}

const { to, icon, name, isCollapsed = false } = defineProps<NavButtonProps>()
</script>

<template>
  <RouterLink
    :to="to"
    :class="{ 'justify-center': isCollapsed }"
    activeClass="bg-primary-500 hover:bg-primary-400 text-white font-semibold"
    class="flex items-center rounded-lg p-2 text-gray-900 transition-all duration-200 hover:bg-primary-200"
  >
    <component :is="icon" class="h-6 w-6" />
    <span v-if="!isCollapsed" class="ml-3">{{ name }}</span>
  </RouterLink>
</template>
