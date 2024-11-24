import axios, { AxiosResponse } from "axios";
import { getToken } from "../auth/services/loginService";
import { useUserStore } from "@/stores/userStore";
import Goal from "./GoalType";

const { VITE_API_URL } = import.meta.env;
const userStore = useUserStore();

export const getUserGoalFetch = async (): Promise<Goal[]> => {
  const { data } = await axios.get(`${VITE_API_URL}/user/${userStore.userId}/goal`, {
    headers: {
      Authorization: getToken()
    }
  })
  return data;
}

export const getUserGoalDetailFetch = async (goalId: number): Promise<AxiosResponse> => {
  const { data } = await axios.get(`${VITE_API_URL}/user/${userStore.userId}/goal/${goalId}`, {
    headers: {
      Authorization: getToken()
    }
  })
  return data;
}

export const createUserGoalFetch = async (goal: Goal): Promise<AxiosResponse> => {
  const { data } = await axios.post(`${VITE_API_URL}/user/${userStore.userId}/goal`, goal, {
    headers: {
      Authorization: getToken()
    }
  })
  return data;
}

export const updateUserGoalFetch = async (goalId: number, goal: Goal): Promise<AxiosResponse> => {
  const { data } = await axios.put(`${VITE_API_URL}/user/${userStore.userId}/goal/${goalId}`, goal, {
    headers: {
      Authorization: getToken()
    }
  })
  return data;
}

export const deleteUserGoalFetch = async (goalId: number): Promise<AxiosResponse> => {
  const { data } = await axios.delete(`${VITE_API_URL}/user/${userStore.userId}/goal/${goalId}`, {
    headers: {
      Authorization: getToken()
    }
  })
  return data;
}
