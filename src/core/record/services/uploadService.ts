import type { AxiosResponse } from 'axios'

export interface UploadResponse {
  status: number
  message?: string
}

export interface UploadErrors {
  file?: string
}

export const validateUploadFile = (file: File | null): UploadErrors => {
  const errors: UploadErrors = {}

  if (!file) {
    errors.file = '파일을 선택해주세요.'
    return errors
  }

  if (!file.name.startsWith('com.samsung.shealth.exercise') || !file.name.endsWith('.csv')) {
    errors.file = 'com.samsung.shealth.exercise로 시작하는 CSV 파일만 업로드 가능합니다.'
    return errors
  }

  if (file.size > 10 * 1024 * 1024) {
    errors.file = '파일 크기는 10MB를 초과할 수 없습니다.'
    return errors
  }

  return errors
}

export const handleUploadSuccess = (response: AxiosResponse<UploadResponse>): boolean => {
  return response.status === 201
}
