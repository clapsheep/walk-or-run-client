import { ref, computed } from 'vue'
import type { WeatherResponse } from '../types/WeatherType'
import { getCurrentPosition, processWeatherData } from '../services/weatherService'

type GetWeatherFn = (lon: number, lat: number) => Promise<WeatherResponse>

export const useGetWeather = (getWeather: GetWeatherFn) => {
  const isLoading = ref(false)
  const error = ref<Error | null>(null)
  const weatherData = ref<ReturnType<typeof processWeatherData> | null>(null)

  const fetchWeather = async () => {
    isLoading.value = true
    error.value = null

    try {
      const position = await getCurrentPosition()
      const { latitude: lat, longitude: lon } = position.coords

      const data = await getWeather(lon, lat)
      weatherData.value = processWeatherData(data)
    } catch (err) {
      error.value = err instanceof Error ? err : new Error('Failed to fetch weather data')
    } finally {
      isLoading.value = false
    }
  }

  return {
    isLoading: computed(() => isLoading.value),
    error: computed(() => error.value),
    weatherData: computed(() => weatherData.value),
    fetchWeather
  }
}
