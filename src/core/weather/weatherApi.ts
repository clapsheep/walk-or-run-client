import type { WeatherParams, WeatherResponse } from './types/WeatherType'
import axios from 'axios'
import { format, subDays } from 'date-fns'

const WEATHER_BASE_URL = import.meta.env.VITE_WEATHER_API_URL
const WEATHER_API_KEY = import.meta.env.VITE_WEATHER_API_KEY


// 날씨 데이터 가져오기(서울 지역)
export const getWeatherFetch = async (): Promise<WeatherResponse> => {
  const gridX = 61
  const gridY = 126

  // 현재 날짜와 시간 설정
  const now = new Date()
  const currentHour = now.getHours()

  // 오전 5시 이전이면 전날 데이터 사용
  const baseDate = format(currentHour < 5 ? subDays(now, 1) : now, 'yyyyMMdd')
  const baseTime = '0500' // 매일 05시 발표 기준

  // URL과 파라미터 설정
  const url = `${WEATHER_BASE_URL}/getVilageFcst`
  const params: WeatherParams = {
    serviceKey: WEATHER_API_KEY,
    pageNo: 1,
    numOfRows: 1000,
    dataType: 'JSON',
    base_date: baseDate,
    base_time: baseTime,
    nx: gridX,
    ny: gridY
  }

  try {
    const response = await axios.get<WeatherResponse>(url, { params })

    return response.data
  } catch (error) {
    console.error('날씨 데이터 가져오기 실패:', error)
    throw error
  }
}
