import axios, { AxiosResponse } from "axios"
import ApiResponse from "../common/types/ApiResponse"
import { PageResponse } from "../common/types/PageType"
import { getToken } from "../auth/services/loginService"
import CommentType from "./CommentType"

const { VITE_API_URL } = import.meta.env

export const getCommentsFetch = async (challengeId: number, page: number, size: number): Promise<AxiosResponse<PageResponse<CommentType> |ApiResponse>> => {
  const response = await axios.get(`${VITE_API_URL}/challenge/${challengeId}/comment`, {
    headers: {
      Authorization: getToken()
    },
    params: {
      page,
      size
    }
  })
  return response
}

export const addCommentFetch = async (challengeId: number, comment: CommentType): Promise<AxiosResponse<ApiResponse>> => {
  const response = await axios.post(`${VITE_API_URL}/challenge/${challengeId}/comment`, comment, {
    headers: {
      Authorization: getToken()
    }
  })
  return response
}

export const deleteCommentFetch = async (challengeId: number, commentId: string): Promise<AxiosResponse<ApiResponse>> => {
  const response = await axios.delete(`${VITE_API_URL}/challenge/${challengeId}/comment/${commentId}`, {
    headers: {
      Authorization: getToken()
    }
  })
  return response
}

export const updateCommentFetch = async (challengeId: number, comment: CommentType): Promise<AxiosResponse<ApiResponse>> => {
  const response = await axios.put(`${VITE_API_URL}/challenge/${challengeId}/comment/${comment.commentId}`, comment, {
    headers: {
      Authorization: getToken()
    }
  })
  return response
}

export const getCommentCountFetch = async (challengeId: number): Promise<AxiosResponse<ApiResponse>> => {
  const response = await axios.get(`${VITE_API_URL}/challenge/${challengeId}/comment/count`, {
    headers: {
      Authorization: getToken()
    }
  })
  return response
}
