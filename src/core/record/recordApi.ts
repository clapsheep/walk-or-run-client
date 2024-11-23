import { getAuthHeader } from '@/core/common/services/commonService'
import axios, { AxiosResponse } from 'axios'
import ApiResponse from '../common/types/ApiResponse'
import type * as type from './types/RecordType'

const { VITE_API_URL } = import.meta.env


// 레코드 업로드
export const uploadRecord = async (userId: string, recordData: type.Record): Promise<AxiosResponse<ApiResponse>> => {
  const response = await axios.post(
    `${VITE_API_URL}/user/${userId}/record`,
    recordData,
    { headers: getAuthHeader() }
  )
  return response
}

// 전체 레코드 조회
export const getRecords = async (userId: string): Promise<AxiosResponse<type.Record[]|ApiResponse>> => {
  const response = await axios.get(
    `${VITE_API_URL}/user/${userId}/record`,
    { headers: getAuthHeader() }
  )
  return response
}

// 걸음 수 조회
export const getSteps = async (userId: string): Promise<AxiosResponse<type.StepRecord[]|ApiResponse>> => {
  const response = await axios.get(
    `${VITE_API_URL}/user/${userId}/record/step`,
    { headers: getAuthHeader() }
  )
  return response
}

// 속도 조회
export const getSpeed = async (userId: string): Promise<AxiosResponse<type.SpeedRecord[]|ApiResponse>> => {
  const response = await axios.get(
    `${VITE_API_URL}/user/${userId}/record/speed`,
    { headers: getAuthHeader() }
  )
  return response
}

// 심박수 조회
export const getHeartRate = async (userId: string): Promise<AxiosResponse<type.HeartRateRecord[]|ApiResponse>> => {
  const response = await axios.get(
    `${VITE_API_URL}/user/${userId}/record/heartRate`,
    { headers: getAuthHeader() }
  )
  return response
}

// 운동 시간 조회
export const getExerciseTime = async (userId: string): Promise<AxiosResponse<type.ExerciseTimeRecord[]|ApiResponse>> => {
  const response = await axios.get(
    `${VITE_API_URL}/user/${userId}/record/exerciseTime`,
    { headers: getAuthHeader() }
  )
  return response
}

// 거리 조회
export const getDistance = async (userId: string): Promise<AxiosResponse<type.DistanceRecord[]|ApiResponse>> => {
  const response = await axios.get(
    `${VITE_API_URL}/user/${userId}/record/distance`,
    { headers: getAuthHeader() }
  )
  return response
}

// 칼로리 조회
export const getCalories = async (userId: string): Promise<AxiosResponse<type.CalorieRecord[]|ApiResponse>> => {
  const response = await axios.get(
    `${VITE_API_URL}/user/${userId}/record/calories`,
    { headers: getAuthHeader() }
  )
  return response
}

// 케이던스 조회
export const getCadence = async (userId: string): Promise<AxiosResponse<type.CadenceRecord[]|ApiResponse>> => {
  const response = await axios.get(
    `${VITE_API_URL}/user/${userId}/record/cadence`,
    { headers: getAuthHeader() }
  )
  return response
}
