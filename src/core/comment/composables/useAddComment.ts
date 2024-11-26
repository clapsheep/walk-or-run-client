import ApiResponse from '@/core/common/types/ApiResponse'
import { AxiosResponse } from 'axios'
import { ref } from 'vue'
import Comment from '../CommentType'
import { setError, setLoading } from '@/core/challenge/utils/settingUtils'

export const useAddComment = (
  challengeId: number,
  comment: Comment,
  addCommentFetch: (challengeId: number, comment: Comment) => Promise<AxiosResponse<ApiResponse>>,
) => {
  const addLoading = ref(false)
  const addError = ref('')
  const state = { loading: addLoading, error: addError }

  const createComment = async (comment: Comment) => {
    try {
      setLoading(state, true)
      setError(state, '')
      await addCommentFetch(challengeId, comment)
    } catch (err) {
      console.error('Error creating comment:', err)
      setError(state, '댓글 작성에 실패했습니다.')
    } finally {
      setLoading(state, false)
    }
  }

  return {
    addLoading,
    addError,
    createComment,
  }
}
