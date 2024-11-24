<template>
  <div class="relative h-full w-full bg-gray-50 rounded-lg p-4 overflow-hidden">
    <!-- 반짝이는 효과를 위한 배경 -->
    <div class="shimmer-wrapper">
      <div class="shimmer"></div>
    </div>

    <!-- 차트 타입 선택기 스켈레톤 -->
    <div class="absolute top-2 right-2 w-24 h-8 bg-gray-200 rounded"></div>

    <!-- 차트 범례 스켈레톤 -->
    <div class="flex justify-center gap-4 mb-6">
      <div class="h-4 w-24 bg-gray-200 rounded"></div>
      <div class="h-4 w-24 bg-gray-200 rounded"></div>
    </div>

    <!-- Y축 레이블 스켈레톤 -->
    <div class="absolute left-2 top-1/2 -translate-y-1/2 flex flex-col gap-8">
      <div class="h-4 w-12 bg-gray-200 rounded"></div>
      <div class="h-4 w-12 bg-gray-200 rounded"></div>
      <div class="h-4 w-12 bg-gray-200 rounded"></div>
    </div>

    <!-- 차트 영역 스켈레톤 -->
    <div class="flex items-end justify-between h-[200px] mt-8 px-16">
      <div v-for="n in 7" :key="n" class="relative w-12">
        <div 
          class="w-full bg-gray-200 rounded-t"
          :style="{ height: `${30 + Math.random() * 70}%` }"
        ></div>
      </div>
    </div>

    <!-- X축 레이블 스켈레톤 -->
    <div class="flex justify-between px-16 mt-6">
      <div v-for="n in 7" :key="n" class="h-4 w-16 bg-gray-200 rounded"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
// No props or logic needed for skeleton
</script>

<style scoped>
.shimmer-wrapper {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.shimmer {
  width: 50%;
  height: 100%;
  background: linear-gradient(
    100deg,
    rgba(255, 255, 255, 0) 20%,
    rgba(255, 255, 255, 0.15) 50%,
    rgba(255, 255, 255, 0) 80%
  );
  animation: shimmer 2s infinite linear;
  transform: skewX(-20deg);
}

@keyframes shimmer {
  from {
    transform: translateX(-100%) skewX(-20deg);
  }
  to {
    transform: translateX(200%) skewX(-20deg);
  }
}

/* 스켈레톤 요소들의 기본 스타일 */
[class*="bg-gray-200"] {
  position: relative;
  overflow: hidden;
  background: #e5e7eb;
}
</style>
