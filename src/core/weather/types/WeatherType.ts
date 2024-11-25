// 날씨 API 응답 타입
export interface WeatherResponse {
  response: {
    header: {
      resultCode: string
      resultMsg: string
    }
    body: {
      dataType: string
      items: {
        item: WeatherItem[]
      }
      pageNo: number
      numOfRows: number
      totalCount: number
    }
  }
}

// 날씨 아이템 타입
export interface WeatherItem {
  baseDate: string
  baseTime: string
  category: string
  fcstDate: string
  fcstTime: string
  fcstValue: string
  nx: number
  ny: number
}

// 날씨 데이터 요청 파라미터 타입
export interface WeatherParams {
  serviceKey: string
  pageNo: number
  numOfRows: number
  dataType: string
  base_date: string
  base_time: string
  nx: number
  ny: number
}

// 위경도를 격자 좌표로 변환하기 위한 타입
export interface GridCoordinate {
  x: number
  y: number
}
