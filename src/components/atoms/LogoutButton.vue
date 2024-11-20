<!-- components/atoms/LogoutButton.vue -->
<script setup>
const { icon, isCollapsed = false } = defineProps({
  icon: {
    type: Function,
    required: true,
  },
  isCollapsed: {
    type: Boolean,
    default: false,
  },
})

// 로그아웃 처리 함수
const handleLogout = () => {
  // 로그아웃 로직
  console.log('로그아웃')
}
</script>

<template>
  <button
    @click="handleLogout"
    :class="{ 'justify-center': isCollapsed }"
    class="hover:bg-brand-dark flex w-full items-center rounded-lg p-2 font-light text-white"
  >
    <component :is="icon" class="h-6 w-6" />
    <span v-if="!isCollapsed" class="text-brand-coral ml-3">로그아웃</span>
  </button>
</template>
