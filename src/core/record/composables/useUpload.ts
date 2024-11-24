import { ref, computed } from 'vue'
import type { AxiosResponse } from 'axios'
import { validateUploadFile, handleUploadSuccess, type UploadResponse, type UploadErrors } from '../services/uploadService'
import ApiResponse from '@/core/common/types/ApiResponse'

export type UploadStatus = 'idle' | 'uploading' | 'success' | 'error'

export const useUpload = (
  uploadFetch: (userId: string, file: File) => Promise<AxiosResponse<UploadResponse|ApiResponse>>
) => {
  const selectedFile = ref<File | null>(null)
  const uploadStatus = ref<UploadStatus>('idle')
  const errors = ref<UploadErrors>({})
  const isDragging = ref(false)

  const validateFile = (file: File | null) => {
    errors.value = validateUploadFile(file)
    return Object.keys(errors.value).length === 0
  }

  const isValidFile = computed(() => {
    return selectedFile.value && Object.keys(errors.value).length === 0
  })

  const handleFileSelection = (file: File) => {
    selectedFile.value = file
    validateFile(file)
  }

  const upload = async (userId: string) => {
    if (!selectedFile.value || !userId || uploadStatus.value === 'success') return false

    uploadStatus.value = 'uploading'

    try {
      const response = await uploadFetch(userId, selectedFile.value)
      const success = handleUploadSuccess(response as AxiosResponse<UploadResponse>)

      if (success) {
        uploadStatus.value = 'success'
        return true
      } else {
        throw new Error('업로드 실패')
      }
    } catch (error) {
      uploadStatus.value = 'error'
      errors.value.file = error instanceof Error ? error.message : '업로드 중 오류가 발생했습니다.'
      return false
    }
  }

  const reset = () => {
    selectedFile.value = null
    uploadStatus.value = 'idle'
    errors.value = {}
    isDragging.value = false
  }

  return {
    selectedFile,
    uploadStatus,
    errors,
    isDragging,
    isValidFile,
    handleFileSelection,
    validateFile,
    upload,
    reset
  }
}
