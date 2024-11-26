import { setError, setLoading } from "@/core/challenge/utils/settingUtils"
import ApiResponse from "@/core/common/types/ApiResponse"
import { AxiosResponse } from "axios"
import { ref } from "vue"
import CommentType from "../CommentType"

export const useUpdateComment = (
  challengeId: number,
  comment: CommentType,
  updateCommentFetch: (challengeId: number, comment: CommentType) => Promise<AxiosResponse<ApiResponse>>
) => {
  const updateLoading = ref(false)
  const updateError = ref('')
  const editingCommentId = ref<string>('');
  const state = { loading: updateLoading, error: updateError }

  const startEditing = (commentId: string) => {
    editingCommentId.value = commentId;
  };

  const cancelEditing = () => {
    editingCommentId.value = '';
  };

  const updateComment = async (challengeId: number, comment: CommentType) => {
    try {
      setLoading(state, true)
      setError(state, '')

      await updateCommentFetch(challengeId, comment)
    } catch (err) {
      console.error('Error updating comment:', err)
      setError(state, '댓글 수정에 실패했습니다.')
    } finally {
      setLoading(state, false)
    }
  }

  return {
    updateLoading,
    updateError,
    updateComment,
    editingCommentId,
    startEditing,
    cancelEditing
  }
}
