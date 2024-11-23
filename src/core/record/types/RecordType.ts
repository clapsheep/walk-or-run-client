// 기본 레코드 타입 (공통 필드)
interface BaseRecord {
  recordId: number
  userId: number
  startTime: string
}

// 전체 레코드 타입
export interface Record extends BaseRecord {
  totalCalorie: number
  distance: number
  maxHeartRate: number
  minHeartRate: number
  meanHeartRate: number
  stepCount: number
  meanSpeed: number
  maxSpeed: number
  endTime: string
}

// 걸음 수 레코드 타입
export interface StepRecord extends BaseRecord {
  stepCount: number
}

// 속도 레코드 타입
export interface SpeedRecord extends BaseRecord {
  meanSpeed: number
  maxSpeed: number
}

// 심박수 레코드 타입
export interface HeartRateRecord extends BaseRecord {
  maxHeartRate: number
  minHeartRate: number
  meanHeartRate: number
}

// 운동 시간 레코드 타입
export interface ExerciseTimeRecord extends BaseRecord {
  endTime: string
  timeInterval: number
}

// 거리 레코드 타입
export interface DistanceRecord extends BaseRecord {
  distance: number
}

// 칼로리 레코드 타입
export interface CalorieRecord extends BaseRecord {
  totalCalorie: number
}

// 케이던스 레코드 타입
export interface CadenceRecord extends BaseRecord {
  stepCount: number
  totalMinutes: number
  cadence: number
}

