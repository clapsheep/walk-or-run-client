<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink, useRoute } from 'vue-router'

interface NavButtonProps {
  to: string
  icon?: Function
  name: string
  isCollapsed?: boolean
  exact?: boolean
  activeRoutes?: string[]
}

const props = withDefaults(defineProps<NavButtonProps>(), {
  isCollapsed: false,
  exact: false,
  activeRoutes: () => []
})

const route = useRoute()
const activeClass = 'bg-primary-500 hover:bg-primary-400 text-white font-semibold'

const isActive = computed(() => {
  if (props.activeRoutes.length === 0) return false
  return props.activeRoutes.some(path => route.path === path || route.path.startsWith(path + '/'))
})
</script>

<template>
  <RouterLink
    :to="to"
    :class="[
      { 'justify-center': isCollapsed },
      'flex items-center rounded-lg p-2 text-gray-900 transition-all duration-200 hover:bg-primary-200',
      { [activeClass]: isActive }
    ]"
    :activeClass="exact || activeRoutes.length > 0 ? undefined : activeClass"
    :exactActiveClass="exact ? activeClass : undefined"
  >
    <component v-if="icon" :is="icon" class="h-6 w-6" />
    <span v-if="!isCollapsed" :class="{ 'ml-3': icon }">{{ name }}</span>
  </RouterLink>
</template>
