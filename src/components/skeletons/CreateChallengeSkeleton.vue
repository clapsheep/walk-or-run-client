<script setup lang="ts">
defineProps<{
  padding?: 'normal' | 'large'
}>()
</script>

<template>
  <div class="animate-pulse">
    <div
      class="rounded-lg bg-white shadow-sm"
      :class="{
        'p-4': padding === 'normal' || !padding,
        'p-6': padding === 'large',
      }"
    >
      <div class="space-y-6">
        <!-- 챌린지 유형 -->
        <div class="space-y-2">
          <div class="h-4 w-24 rounded bg-gray-200"></div>
          <div class="flex gap-4">
            <div class="h-6 w-32 rounded bg-gray-200"></div>
            <div class="h-6 w-32 rounded bg-gray-200"></div>
          </div>
        </div>

        <!-- 카테고리 -->
        <div class="space-y-2">
          <div class="h-4 w-20 rounded bg-gray-200"></div>
          <div class="h-10 w-full rounded bg-gray-200"></div>
        </div>

        <!-- 챌린지 제목 -->
        <div class="space-y-2">
          <div class="h-4 w-24 rounded bg-gray-200"></div>
          <div class="h-10 w-full rounded bg-gray-200"></div>
        </div>

        <!-- 챌린지 설명 -->
        <div class="space-y-2">
          <div class="h-4 w-24 rounded bg-gray-200"></div>
          <div class="h-24 w-full rounded bg-gray-200"></div>
        </div>

        <!-- 목표 인원 수 -->
        <div class="space-y-2">
          <div class="h-4 w-28 rounded bg-gray-200"></div>
          <div class="h-10 w-full rounded bg-gray-200"></div>
        </div>

        <!-- 날짜 필드들 -->
        <div class="space-y-2">
          <div class="h-4 w-24 rounded bg-gray-200"></div>
          <div class="h-10 w-full rounded bg-gray-200"></div>
        </div>

        <div class="space-y-2">
          <div class="h-4 w-24 rounded bg-gray-200"></div>
          <div class="h-10 w-full rounded bg-gray-200"></div>
        </div>

        <!-- 버튼 -->
        <div class="flex justify-end">
          <div class="h-10 w-32 rounded bg-gray-200"></div>
        </div>
      </div>
    </div>
  </div>
</template>
