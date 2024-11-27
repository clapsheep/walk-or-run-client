import { ref } from 'vue'
import { AxiosResponse } from 'axios'
import ApiResponse from '@/core/common/types/ApiResponse'
import { setError, setLoading } from '@/core/challenge/utils/settingUtils'
import CommentType from '../CommentType'
import { PageResponse } from '@/core/common/types/PageType'

export const useGetComment = (
  challengeId: number,
  getCommentsFetch: (challengeId: number, page: number, size: number) => Promise<AxiosResponse<PageResponse<CommentType> | ApiResponse>>,
) => {
  const comments = ref<CommentType[]>([])
  const commentCnt = ref<number>(0)
  const getLoading = ref(false)
  const getError = ref('')
  const state = { loading: getLoading, error: getError }
  const page = ref(1)
  const size = ref(10)

  const fetchComments = async (challengeId: number, page: number, size: number) => {
    try {
      setLoading(state, true)
      setError(state, '')
      const response = await getCommentsFetch(challengeId, page, size)
      if (response.status === 200) {
        const data = response.data as PageResponse<CommentType>
        comments.value = data.content
        commentCnt.value = data.pageInfo.totalElements
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
    page,
    size
  }
}
