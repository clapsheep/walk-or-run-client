<script setup lang="ts">
interface LogoutButtonProps {
  icon: Function
  isCollapsed?: boolean
  onLogout: () => void
}
const { icon,onLogout, isCollapsed = false } = defineProps<LogoutButtonProps>()

</script>

<template>
  <button
    @click="onLogout"
    :class="{ 'justify-center': isCollapsed }"
    class="flex w-full items-center rounded-lg p-2 text-gray-900 hover:bg-primary-200 active:bg-primary-500 active:font-semibold active:text-white"
  >
    <component :is="icon" class="h-6 w-6" />
    <span v-if="!isCollapsed" class="text-brand-coral ml-3">로그아웃</span>
  </button>
</template>
