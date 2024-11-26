<template>
  <div class="min-h-screen bg-white relative">
    <!-- Running Track -->
    <div class="absolute inset-0 overflow-hidden">
      <div class="absolute w-full h-32 bottom-0 flex space-x-4">
        <div v-for="i in 8" :key="i" class="h-full w-1/3 bg-accent-100 transform -skew-x-45"></div>
      </div>
      <div class="absolute w-full h-1 bottom-0 bg-accent-300"></div>
      <div class="absolute w-full h-1 bottom-32 bg-accent-300"></div>
    </div>

    <!-- Distance Markers -->
    <div class="absolute bottom-8 left-0 w-full flex justify-between px-8 text-lg font-bold text-gray-400">
      <span>400m</span>
      <span>404m</span>
      <span>408m</span>
    </div>

    <!-- Main Content -->
    <div class="relative z-10 container mx-auto px-4 h-screen flex flex-col items-center justify-center">
      <!-- Running Path Illustration -->
      <div class="relative w-full max-w-lg mb-12">
        <svg viewBox="0 0 100 30" class="w-full">
          <path
            d="M0,15 Q25,5 50,15 T100,15"
            fill="none"
            stroke="currentColor"
            stroke-width="0.5"
            class="text-primary-500"
            stroke-dasharray="2 2"
          />
          <circle cx="50" cy="15" r="1.5" fill="currentColor" class="text-primary-500" />
        </svg>
        <!-- Runner Icon -->
        <div class="absolute left-1/2 -translate-x-1/2 -translate-y-full">
          🏃
        </div>
      </div>

      <!-- Text Content -->
      <div class="text-center space-y-6">
        <h1 class="text-6xl md:text-7xl font-black text-primary-500">
          404<span class="text-3xl align-top">m</span>
        </h1>
        <div class="space-y-2">
          <h2 class="text-2xl md:text-3xl font-bold text-gray-800">
            앗! 목표 지점을 지나쳤네요
          </h2>
          <div class="space-y-1">
            <p class="text-lg text-gray-500">
              요청하신 페이지를 찾을 수 없습니다
            </p>
            <p class="text-lg text-gray-600 max-w-md mx-auto">
              함께라면 더 즐겁게 달릴 수 있을 거예요.<br/>
              <span class="text-primary-500 font-semibold">Walk or Run</span>에서 러닝메이트를 찾아보세요!
            </p>
          </div>
        </div>

        <router-link
          to="/"
          class="inline-flex items-center px-6 py-3 text-lg font-semibold text-white bg-primary-500 rounded-lg shadow-lg transition-all duration-200 hover:bg-primary-600 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 group"
        >
          <span>시작점으로 돌아가기</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5 ml-2 transform transition-transform group-hover:translate-x-1"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
              clip-rule="evenodd"
            />
          </svg>
        </router-link>
      </div>
    </div>
  </div>
</template>

<style scoped>
.-skew-x-45 {
  --tw-skew-x: -45deg;
  transform: skewX(var(--tw-skew-x));
}
</style>

<script setup lang="ts">
// No additional logic needed
</script>
