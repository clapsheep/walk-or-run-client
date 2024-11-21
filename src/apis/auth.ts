import axios from 'axios'

const { VITE_API_URL } = import.meta.env

const authApi = axios.create({
  baseURL: VITE_API_URL,
  withCredentials: true,
})

export const checkEmailDuplicated = async (email: string) => {
  try {
    const { data } = await authApi.get('/user/validEmail', {
      params: { email },
    })
    console.log(data)

    return {
      status: 'success',
      data: {
        isAvailable: data.isAvailable,
        message: data.message,
      },
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return {
        status: 'error',
        error: error.response?.data?.message || '이메일 중복 확인에 실패했습니다',
      }
    }
    return {
      status: 'error',
      error: '알 수 없는 에러가 발생했습니다',
    }
  }
}
