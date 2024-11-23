export type Step = {

}

export type Speed = {

}

export type Record = {
  recordId: string
  userId: string
  startTime: string
  endTime: string
  step: number
  speed: number
  heartRate: number
  exerciseTime: number // minutes
  distance: number // meters
  calories: number
  cadence: number
  createdAt: string
}

// 테스트용 더미 데이터 생성 함수
export const generateDummyRecords = (): Record[] => {
  const today = new Date()

  return Array.from({ length: 7 }, (_, index) => {
    const date = new Date(today)
    date.setDate(date.getDate() - (6 - index)) // 6일 전부터 오늘까지

    const startHour = 18 // 저녁 6시
    const exerciseMinutes = Math.floor(Math.random() * 30) + 30 // 30~60분

    const startTime = new Date(date.setHours(startHour, 0, 0))
    const endTime = new Date(date.setMinutes(date.getMinutes() + exerciseMinutes))

    return {
      recordId: `record_${index + 1}`,
      userId: 'test_user',
      startTime: startTime.toISOString(),
      endTime: endTime.toISOString(),
      step: Math.floor(Math.random() * 3000) + 4000, // 4000~7000 steps
      speed: Math.random() * 4 + 4, // 4~8 km/h
      heartRate: Math.floor(Math.random() * 40) + 80, // 80~120 bpm
      exerciseTime: exerciseMinutes,
      distance: Math.floor((Math.random() * 2 + 3) * 1000), // 3~5 km in meters
      calories: Math.floor(Math.random() * 200) + 300, // 300~500 kcal
      cadence: Math.floor(Math.random() * 20) + 140, // 140~160 steps/minute
      createdAt: date.toISOString()
    }
  })
}

export type HeartRate = {

}

export type ExerciseTime = {}

export type Distance = {
}

export type Calories = {
}

export type Cadence = {
}

export default Record
