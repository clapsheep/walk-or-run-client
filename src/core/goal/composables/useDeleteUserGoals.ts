// core/goal/composables/useDeleteUserGoals.ts
import type ApiResponse from '@/core/common/types/ApiResponse'
import { useModalStore } from '@/stores/modalStore'
import type { AxiosResponse } from 'axios'
import { ref } from 'vue'

export const useDeleteUserGoals = (
  deleteUserGoalFetch: (goalId: number) => Promise<AxiosResponse<ApiResponse>>,
  onDeleteSuccess?: () => Promise<void>,
) => {
  const loading = ref(false)
  const error = ref<string | null>(null)
  const modalStore = useModalStore()

  const deleteGoal = async (goalId: number): Promise<boolean> => {
    loading.value = true
    error.value = null

    try {
      const response = await deleteUserGoalFetch(goalId)
      if (response.data.code !== 200) {
        throw new Error(response.data.message || '목표 삭제에 실패했습니다.')
      }

      if (onDeleteSuccess) {
        await onDeleteSuccess()
      }

      modalStore.openModal({
        title: '삭제 완료',
        content: '목표가 삭제되었습니다.',
        confirmText: '확인',
      })

      return true
    } catch (e) {
      error.value = e instanceof Error ? e.message : '목표 삭제 중 오류가 발생했습니다.'
      modalStore.openModal({
        title: '오류',
        content: error.value,
        confirmText: '확인',
      })
      return false
    } finally {
      loading.value = false
    }
  }

  const confirmAndDeleteGoal = async (goalId: number): Promise<void> => {
    modalStore.openModal({
      title: '목표 삭제',
      content: '정말로 이 목표를 삭제하시겠습니까?',
      confirmText: '삭제',
      cancelText: '취소',
      onConfirm: async () => {
        await deleteGoal(goalId)
      },
    })
  }

  return {
    loading,
    error,
    deleteGoal,
    confirmAndDeleteGoal,
  }
}
