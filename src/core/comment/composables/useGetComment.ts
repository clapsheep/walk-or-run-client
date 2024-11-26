import { ref } from 'vue'
import type Comment from '../CommentType'
import { AxiosResponse } from 'axios'
import ApiResponse from '@/core/common/types/ApiResponse'
import { setError, setLoading } from '@/core/challenge/utils/settingUtils'

export const useGetComment = (
  challengeId: number,
  getCommentsFetch: (challengeId: string) => Promise<AxiosResponse<Comment[] | ApiResponse>>,
) => {
  const comments = ref<Comment[]>([])
  const commentCnt = ref<number>(0)
  const getLoading = ref(false)
  const getError = ref('')
  const state = { loading: getLoading, error: getError }

  const fetchComments = async (challengeId: string) => {
    try {
      setLoading(state, true)
      setError(state, '')
      const response = await getCommentsFetch(challengeId)
      if (response.status === 200) {
        const data = response.data as Comment[]
        comments.value = data
      }
    } catch (err) {
      console.error('Error fetching comments:', err)
      setError(state, '댓글을 불러오는데 실패했습니다.')
    } finally {
      setLoading(state, false)
    }
  }

  return {
    comments,
    commentCnt,
    getLoading,
    getError,
    fetchComments,
  }
}
