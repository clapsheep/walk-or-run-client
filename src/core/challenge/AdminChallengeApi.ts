import axios, { AxiosResponse } from "axios"
import { Challenge } from "./ChallengeType"
import ApiResponse from "../common/types/ApiResponse"
import { getToken } from "../auth/services/loginService"
import { ScheduleType } from "./ScheduleType"
import { ChallengeFormType } from "./utils/challengeValidation"

const { VITE_API_URL } = import.meta.env

export const addChallengeFetch = async (challenge: ChallengeFormType): Promise<AxiosResponse<ApiResponse>> => {
  const response = await axios.post(`${VITE_API_URL}/admin/challenge`, challenge, {
    headers: {
      Authorization: getToken()
    }
  })
  return response
}

export const addChallengeScheduleFetch = async (challenge: ChallengeFormType): Promise<AxiosResponse<ApiResponse>> => {
  const response = await axios.post(`${VITE_API_URL}/admin/challenge/schedule`, challenge, {
    headers: {
      Authorization: getToken()
    }
  })
  return response
}

export const getChallengeSchedulesFetch = async (): Promise<AxiosResponse<Challenge[] | ApiResponse>> => {
  const response = await axios.get(`${VITE_API_URL}/admin/challenge/schedule`, {
    headers: {
      Authorization: getToken()
    }
  })
  return response
}

export const updateChallengeFetch = async (challenge: Challenge): Promise<AxiosResponse<ApiResponse>> => {
  const response = await axios.put(`${VITE_API_URL}/admin/challenge/${challenge.challengeId}`, challenge, {
    headers: {
      Authorization: getToken()
    }
  })
  return response
}

export const deleteChallengeFetch = async (challengeId: number): Promise<AxiosResponse<ApiResponse>> => {
  const response = await axios.delete(`${VITE_API_URL}/admin/challenge/${challengeId}`, {
    headers: {
      Authorization: getToken()
    }
  })
  return response
}


export const updateChallengeScheduleFetch = async (challengeId : number, schedule: ScheduleType): Promise<AxiosResponse<ApiResponse>> => {
  const response = await axios.put(`${VITE_API_URL}/admin/challenge/schedule/${challengeId}`, schedule, {
    headers: {
      Authorization: getToken()
    }
  })
  return response
}

export const deleteChallengeScheduleFetch = async (challengeId: number): Promise<AxiosResponse<ApiResponse>> => {
  const response = await axios.delete(`${VITE_API_URL}/admin/challenge/schedule/${challengeId}`, {
    headers: {
      Authorization: getToken()
    }
  })
  return response
}

export const getEndedChallengeSchedulesFetch = async (): Promise<AxiosResponse<Challenge[] |ApiResponse>> => {
  const response = await axios.get(`${VITE_API_URL}/admin/challenge/schedule/end`, {
    headers: {
      Authorization: getToken()
    }
  })
  return response
}

export const getActiveChallengeSchedulesFetch = async (): Promise<AxiosResponse<Challenge[] |ApiResponse>> => {
  const response = await axios.get(`${VITE_API_URL}/admin/challenge/schedule/active`, {
    headers: {
      Authorization: getToken()
    }
  })
  return response
}

export const getChallengeScheduleFetch = async (challengeId: number): Promise<AxiosResponse<Challenge | ApiResponse>> => {
  const response = await axios.get(`${VITE_API_URL}/admin/challenge/schedule/${challengeId}`, {
    headers: {
      Authorization: getToken()
    }
  })
  return response
}
