<script setup lang="ts">
import { useGetWeather } from '@/core/weather/composable/useGetWeather';
import { getWeatherFetch } from '@/core/weather/weatherApi';
import { onMounted } from 'vue';

const { isLoading, weatherData, error: weatherError, fetchWeather } = useGetWeather(getWeatherFetch)

onMounted(() => {
  fetchWeather()
})
</script>

<template>
  <div class="relative h-full p-6 bg-white rounded-lg shadow-sm">
    <div v-if="isLoading" class="space-y-4">
      <div class="flex justify-between items-center">
        <div class="h-7 w-32 bg-gray-200 rounded animate-pulse"></div>
        <div class="h-12 w-12 bg-gray-200 rounded-full animate-pulse"></div>
      </div>

      <div class="space-y-2">
        <div class="h-10 w-24 bg-gray-200 rounded animate-pulse"></div>
        <div class="h-6 w-48 bg-gray-200 rounded animate-pulse"></div>
      </div>

      <div class="grid grid-cols-2 gap-4">
        <div v-for="i in 4" :key="i" class="space-y-2">
          <div class="h-5 w-20 bg-gray-200 rounded animate-pulse"></div>
          <div class="h-6 w-16 bg-gray-200 rounded animate-pulse"></div>
        </div>
      </div>
    </div>

    <div v-else-if="weatherError" class="flex items-center justify-center h-full">
      <p class="text-red-500">{{ weatherError.message }}</p>
    </div>

    <div v-else-if="weatherData" class="space-y-4">
      <div class="flex justify-between items-center">
        <h3 class="text-lg font-semibold">{{ weatherData.name }}</h3>
        <span class="text-4xl">{{ weatherData.icon }}</span>
      </div>

      <div class="space-y-2">
        <p class="text-3xl font-bold">{{ weatherData.temp }}°C</p>
        <p class="text-gray-600">{{ weatherData.description }}</p>
      </div>

      <div class="grid grid-cols-2 gap-4 text-sm">
        <div>
          <p class="text-gray-500">체감 온도</p>
          <p class="font-medium">{{ weatherData.feelsLike }}°C</p>
        </div>
        <div>
          <p class="text-gray-500">습도</p>
          <p class="font-medium">{{ weatherData.humidity }}%</p>
        </div>
        <div>
          <p class="text-gray-500">풍속</p>
          <p class="font-medium">{{ weatherData.windSpeed }}m/s</p>
        </div>
        <div>
          <p class="text-gray-500">구름</p>
          <p class="font-medium">{{ weatherData.clouds }}%</p>
        </div>
      </div>
    </div>
  </div>
</template>
