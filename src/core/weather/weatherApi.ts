import axios from 'axios'
import type { WeatherResponse } from './types/WeatherType'


const{ VITE_WEATHER_API_URL,VITE_WEATHER_API_KEY }= import.meta.env

// 날씨 데이터 가져오기
export const getWeatherFetch = async (lon:number,lat:number): Promise<WeatherResponse> => {
    const url = `${VITE_WEATHER_API_URL}/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${VITE_WEATHER_API_KEY}&units=metric&lang=kr`
    const {data} = await axios.get(url)
    return data
}
