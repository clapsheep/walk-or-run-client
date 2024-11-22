<script setup lang="ts">
import { useUserStore } from '@/stores/userStore'

const userStore = useUserStore()
</script>

<template lang="">
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-2xl font-bold mb-4">대시보드</h1>
    <div class="bg-white rounded-lg shadow p-6">
      <p class="text-gray-600">환영합니다, {{ userStore.userEmail }} 님!</p>
    </div>
  </div>
</template>
