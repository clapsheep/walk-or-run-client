<script setup lang="ts">
defineProps<{
  showUploadModal: boolean
}>()
</script>

<template>
  <div class="flex-1 bg-white p-4 rounded-2xl shadow-sm h-[calc(100vh-88px)] overflow-y-auto">
    <h2 class="text-xl font-semibold text-gray-800 mb-4 sticky top-0 bg-white" :class="{'z-10': !showUploadModal, 'z-0': showUploadModal}">목표 현황</h2>
    <div class="goals-container">
      <!-- 목표 달성률 컴포넌트들이 들어갈 자리 -->
    </div>
  </div>
</template>
