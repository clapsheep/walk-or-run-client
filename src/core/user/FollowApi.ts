import { getToken } from "@/core/auth/services/loginService";
import ApiResponse from "@/core/common/types/ApiResponse";
import { useUserStore } from "@/stores/userStore";
import axios, { AxiosResponse } from "axios"
import User from "./UserType";

const { VITE_API_URL } = import.meta.env

export const followUserFetch = async (targetUserId: number): Promise<AxiosResponse<ApiResponse>> => {
  const userStore = useUserStore();
  const response = await axios.post(`${VITE_API_URL}/user/${userStore.userId}/follow/${targetUserId}`,
    null,
    {
      headers: {
        Authorization: getToken()
      }
    }
  )
  return response;
}

export const unfollowUserFetch = async (targetUserId: number): Promise<AxiosResponse<ApiResponse>> => {
  const userStore = useUserStore();
  const response = await axios.delete(`${VITE_API_URL}/user/${userStore.userId}/follow/${targetUserId}`,
    {
      headers: {
        Authorization: getToken()
      }
    }
  )
  return response;
}

// 이건 일단 쓰지 말기
export const checkFollowFetch = async (targetUserId: number): Promise<AxiosResponse<ApiResponse>> => {
  const userStore = useUserStore();
  const response = await axios.get(`${VITE_API_URL}/user/${userStore.userId}/follow/${targetUserId}/status`,
    {
      headers: {
        Authorization: getToken()
      }
    }
  )
  return response;
}

export const getFollowersFetch = async (): Promise<AxiosResponse<User[] | ApiResponse>> => {
  const userStore = useUserStore();
  const response = await axios.get(`${VITE_API_URL}/user/${userStore.userId}/follow/followers`,
    {
      headers: {
        Authorization: getToken()
      }
    }
  )
  return response;
}

export const getFollowingsFetch = async (): Promise<AxiosResponse<User[] | ApiResponse>> => {
  const userStore = useUserStore();
  const response = await axios.get(`${VITE_API_URL}/user/${userStore.userId}/follow/followings`,
    {
      headers: {
        Authorization: getToken()
      }
    }
  )
  return response;
}
