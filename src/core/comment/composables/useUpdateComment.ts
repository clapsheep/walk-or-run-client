import { setError, setLoading } from "@/core/challenge/utils/settingUtils"
import ApiResponse from "@/core/common/types/ApiResponse"
import { AxiosResponse } from "axios"
import { ref } from "vue"
import CommentType from "../CommentType"

export const useUpdateComment = (
  challengeId: string,
  comment: CommentType,
  updateCommentFetch: (challengeId: string, comment: CommentType) => Promise<AxiosResponse<ApiResponse>>
) => {
  const updateLoading = ref(false)
  const updateError = ref('')
  const state = { loading: updateLoading, error: updateError }

  const updateComment = async (challengeId: string, comment: CommentType) => {
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
    updateComment
  }
}
