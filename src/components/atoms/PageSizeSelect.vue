<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const props = defineProps<{
  currentSize: number
}>()

const emit = defineEmits<{
  (e: 'select', size: number): void
}>()

const isOpen = ref(false)
const dropdownRef = ref<HTMLDivElement | null>(null)

const toggleDropdown = () => {
  isOpen.value = !isOpen.value
}

const selectSize = (size: number) => {
  emit('select', size)
  isOpen.value = false
}

const handleClickOutside = (event: MouseEvent) => {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target as Node)) {
    isOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<template>
  <div ref="dropdownRef" class="relative inline-block text-left z-50">
    <!-- 드롭다운 버튼 -->
    <button
      @click="toggleDropdown"
      class="inline-flex items-center justify-between w-36 px-4 py-2 text-sm bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 shadow-sm"
      :class="{ 'ring-2 ring-primary-500': isOpen }"
    >
      <span>{{ currentSize }}개씩 보기</span>
      <svg
        class="w-4 h-4 ml-2 transition-transform duration-200"
        :class="{ 'rotate-180': isOpen }"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
      </svg>
    </button>

    <!-- 드롭다운 메뉴 -->
    <div
      v-if="isOpen"
      class="absolute right-0 mt-2 w-36 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50 backdrop-blur-none"
    >
      <div class="py-1">
        <button
          v-for="size in [10, 20, 30]"
          :key="size"
          @click="selectSize(size)"
          class="w-full px-4 py-2 text-sm text-left hover:bg-gray-100 transition-colors duration-150"
          :class="{
            'text-primary-500 font-medium': currentSize === size,
            'text-gray-700': currentSize !== size
          }"
        >
          {{ size }}개씩 보기
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.rotate-180 {
  transform: rotate(180deg);
}
</style>
