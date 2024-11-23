import { getAuthHeader } from '@/core/common/services/commonService'
import axios, { AxiosResponse } from 'axios'
import ApiResponse from '../common/types/ApiResponse'
import type * as type from './types/RecordType'

const { VITE_API_URL } = import.meta.env



// 레코드 업로드
export const uploadRecordFetch = async (userId: string, recordData: type.Record): Promise<AxiosResponse<ApiResponse>> => {

  const response = await axios.post(
    `${VITE_API_URL}/user/${userId}`,
    recordData,
    { headers: getAuthHeader() }
  )
  return response
}

// 전체 레코드 조회
export const getRecordsFetch = async ( userId: string, startTime: string, endTime: string): Promise<AxiosResponse<type.Record[]|ApiResponse>> => {
  const response = await axios.get(
    `${VITE_API_URL}/user/${userId}/record?startTime=${startTime}&endTime=${endTime}`,
    { headers: getAuthHeader() }
  )
  return response
}

// 걸음 수 조회
export const getStepsFetch = async (userId: string, startTime: string, endTime: string): Promise<AxiosResponse<type.StepRecord[]|ApiResponse>> => {
  const response = await axios.get(
    `${VITE_API_URL}/user/${userId}/record/step?startTime=${startTime}&endTime=${endTime}`,
    { headers: getAuthHeader() }
  )
  return response
}

// 속도 조회
export const getSpeedFetch = async (userId: string, startTime: string, endTime: string): Promise<AxiosResponse<type.SpeedRecord[]|ApiResponse>> => {
  const response = await axios.get(
    `${VITE_API_URL}/user/${userId}/record/speed?startTime=${startTime}&endTime=${endTime}`,
    { headers: getAuthHeader() }
  )
  return response
}

// 심박수 조회
export const getHeartRateFetch = async (userId: string, startTime: string, endTime: string): Promise<AxiosResponse<type.HeartRateRecord[]|ApiResponse>> => {
  const response = await axios.get(
    `${VITE_API_URL}/user/${userId}/record/heartRate?startTime=${startTime}&endTime=${endTime}`,
    { headers: getAuthHeader() }
  )
  return response
}

// 운동 시간 조회
export const getExerciseTimeFetch = async (userId: string, startTime: string, endTime: string): Promise<AxiosResponse<type.ExerciseTimeRecord[]|ApiResponse>> => {
  const response = await axios.get(
    `${VITE_API_URL}/user/${userId}/record/exerciseTime?startTime=${startTime}&endTime=${endTime}`,
    { headers: getAuthHeader() }
  )
  return response
}

// 거리 조회
export const getDistanceFetch = async (userId: string,startTime: string, endTime: string): Promise<AxiosResponse<type.DistanceRecord[]|ApiResponse>> => {
  const response = await axios.get(
    `${VITE_API_URL}/user/${userId}/record/distance?startTime=${startTime}&endTime=${endTime}`,
    { headers: getAuthHeader() }
  )
  return response
}

// 칼로리 조회
export const getCaloriesFetch = async (userId: string, startTime: string, endTime: string): Promise<AxiosResponse<type.CalorieRecord[]|ApiResponse>> => {
  const response = await axios.get(
    `${VITE_API_URL}/user/${userId}/record/calories?startTime=${startTime}&endTime=${endTime}`,
    { headers: getAuthHeader() }
  )
  return response
}

// 케이던스 조회
export const getCadenceFetch = async (userId: string, startTime: string, endTime: string): Promise<AxiosResponse<type.CadenceRecord[]|ApiResponse>> => {
  const response = await axios.get(
    `${VITE_API_URL}/user/${userId}/record/cadence?startTime=${startTime}&endTime=${endTime}`,
    { headers: getAuthHeader() }
  )
  return response
}
