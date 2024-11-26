import { setError, setLoading } from "@/core/challenge/utils/settingUtils";
import ApiResponse from "@/core/common/types/ApiResponse";
import { AxiosResponse } from "axios";
import { ref } from "vue";

export const useDeleteComment = (
  challengeId: string,
  commentId: string,
  deleteCommentFetch: (challengeId: string, commentId: string) => Promise<AxiosResponse<ApiResponse>>
) => {
  const deleteLoading = ref(false)
  const deleteError = ref('')
  const state = { loading: deleteLoading, error: deleteError }

  const deleteComment = async (challengeId: string, commentId: string) => {
    try {
      setLoading(state, true)
      setError(state, '')

      await deleteCommentFetch(challengeId, commentId)
    } catch (err) {
      console.error('Error deleting comment:', err)
      setError(state, '댓글 삭제에 실패했습니다.')
    } finally {
      setLoading(state, false)
    }
  }

  return {
    deleteLoading,
    deleteError,
    deleteComment
  }
}
