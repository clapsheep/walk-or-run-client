import type { WeatherResponse } from '../types/WeatherType'

// 날씨 아이콘 매핑
export const getWeatherIcon = (main: string): string => {
  switch (main.toLowerCase()) {
    case 'clear':
      return '☀️'
    case 'clouds':
      return '☁️'
    case 'rain':
      return '🌧️'
    case 'snow':
      return '❄️'
    case 'thunderstorm':
      return '⛈️'
    case 'drizzle':
      return '🌦️'
    case 'mist':
    case 'fog':
    case 'haze':
      return '🌫️'
    default:
      return '🌡️'
  }
}

// 날씨 코드에 대한 한글 설명
export const getWeatherDescription = (id: number): string => {
  const weatherMap: Record<number, string> = {
    200: '가벼운 비를 동반한 천둥구름',
    201: '비를 동반한 천둥구름',
    202: '폭우를 동반한 천둥구름',
    210: '약한 천둥구름',
    211: '천둥구름',
    212: '강한 천둥구름',
    221: '불규칙적 천둥구름',
    230: '약한 연무를 동반한 천둥구름',
    231: '연무를 동반한 천둥구름',
    232: '강한 안개비를 동반한 천둥구름',
    300: '가벼운 안개비',
    301: '안개비',
    302: '강한 안개비',
    310: '가벼운 적은비',
    311: '적은비',
    312: '강한 적은비',
    313: '소나기와 안개비',
    314: '강한 소나기와 안개비',
    321: '소나기',
    500: '약한 비',
    501: '중간 비',
    502: '강한 비',
    503: '매우 강한 비',
    504: '극심한 비',
    511: '우박',
    520: '약한 소나기 비',
    521: '소나기 비',
    522: '강한 소나기 비',
    531: '불규칙적 소나기 비',
    600: '가벼운 눈',
    601: '눈',
    602: '강한 눈',
    611: '진눈깨비',
    612: '소나기 진눈깨비',
    615: '약한 비와 눈',
    616: '비와 눈',
    620: '약한 소나기 눈',
    621: '소나기 눈',
    622: '강한 소나기 눈',
    701: '박무',
    711: '연기',
    721: '연무',
    731: '모래 먼지',
    741: '안개',
    751: '모래',
    761: '먼지',
    762: '화산재',
    771: '돌풍',
    781: '토네이도',
    800: '구름 한 점 없는 맑은 하늘',
    801: '약간의 구름이 낀 하늘',
    802: '드문드문 구름이 낀 하늘',
    803: '구름이 거의 없는 하늘',
    804: '구름으로 뒤덮인 흐린 하늘',
  }

  return weatherMap[id] || '알 수 없는 날씨'
}



// 위치 정보 가져오기
export const getCurrentPosition = (): Promise<GeolocationPosition> => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation is not supported by this browser.'))
    }
    navigator.geolocation.getCurrentPosition(resolve, reject)
  })
}

// 날씨 데이터 처리
export const processWeatherData = (data: WeatherResponse) => {
  return {
    name: data.name,
    icon: getWeatherIcon(data.weather[0].main),
    temp: data.main.temp,
    description: getWeatherDescription(data.weather[0].id),
    feelsLike: data.main.feels_like,
    minTemp: data.main.temp_min,
    maxTemp: data.main.temp_max,
    pressure: data.main.pressure,
    humidity: data.main.humidity,
    windSpeed: data.wind.speed,
    clouds: data.clouds.all
  }
}
