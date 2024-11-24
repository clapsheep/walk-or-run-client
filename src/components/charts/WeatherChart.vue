<script setup lang="ts">
import type { WeatherItem } from '@/core/weather/types/WeatherType';
import { getWeatherFetch } from '@/core/weather/weatherApi';
import { onMounted, ref } from 'vue';

const isLoading = ref(true)
const weatherData = ref<WeatherItem[]>([])
const weatherError = ref<string | null>(null)

// 날씨 데이터 가져오기
const fetchWeatherData = async () => {
  try {
    const response = await getWeatherFetch()
    if (response.response.header.resultCode === '00') {
      weatherData.value = response.response.body.items.item
    } else {
      weatherError.value = '날씨 데이터를 가져오는데 실패했습니다.'
    }
  } catch (error) {
    console.error('날씨 데이터 가져오기 실패:', error)
    weatherError.value = '날씨 데이터를 가져오는데 실패했습니다.'
  } finally {
    isLoading.value = false
  }
}

// 날씨 코드에 따른 아이콘 매핑
const getWeatherIcon = (category: string, value: string) => {
  switch (category) {
    case 'SKY':
      // 하늘상태: 맑음(1), 구름많음(3), 흐림(4)
      return value === '1' ? '☀️' : value === '3' ? '⛅' : '☁️'
    case 'PTY':
      // 강수형태: 없음(0), 비(1), 비/눈(2), 눈(3), 소나기(4)
      switch (value) {
        case '0': return ''
        case '1': return '🌧️'
        case '2': return '🌨️'
        case '3': return '❄️'
        case '4': return '🌦️'
        default: return ''
      }
    default:
      return ''
  }
}

onMounted(() => {
  fetchWeatherData()
})
</script>

<template>
  <div class="relative h-full p-6 bg-white rounded-lg shadow-sm">
    <div v-if="isLoading" class="flex items-center justify-center h-full">
      <div class="text-gray-500">날씨 정보를 불러오는 중...</div>
    </div>

    <div v-else-if="weatherError" class="flex items-center justify-center h-full">
      <div class="text-red-500">{{ weatherError }}</div>
    </div>

    <div v-else-if="weatherData.length > 0" class="h-full flex flex-col justify-between">
      <!-- 헤더 -->
      <div class="flex items-center justify-between mb-6">
        <h3 class="text-lg font-semibold text-gray-900">서울 날씨</h3>
        <span class="text-sm text-gray-500">오늘 05:00 기준</span>
      </div>

      <!-- 날씨 정보 -->
      <div class="flex-grow flex flex-col justify-center items-center space-y-6">
        <!-- 날씨 아이콘 및 기온 -->
        <div class="text-center">
          <div class="text-6xl mb-4">
            {{ getWeatherIcon('SKY', weatherData.find(item => item.category === 'SKY')?.fcstValue || '1') }}
            {{ getWeatherIcon('PTY', weatherData.find(item => item.category === 'PTY')?.fcstValue || '0') }}
          </div>
          <div class="text-4xl font-bold text-gray-900">
            {{ weatherData.find(item => item.category === 'TMP')?.fcstValue || '-' }}°C
          </div>
        </div>

        <!-- 상세 정보 -->
        <div class="w-full grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
          <div class="text-center">
            <div class="text-sm text-gray-500 mb-1">강수확률</div>
            <div class="text-xl font-semibold text-gray-900">
              {{ weatherData.find(item => item.category === 'POP')?.fcstValue || '0' }}%
            </div>
          </div>
          <div class="text-center">
            <div class="text-sm text-gray-500 mb-1">습도</div>
            <div class="text-xl font-semibold text-gray-900">
              {{ weatherData.find(item => item.category === 'REH')?.fcstValue || '-' }}%
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="flex items-center justify-center h-full">
      <div class="text-gray-500">날씨 정보를 불러올 수 없습니다.</div>
    </div>
  </div>
</template>
