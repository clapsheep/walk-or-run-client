import ApiResponse from '@/core/common/types/ApiResponse'
import { AxiosResponse } from 'axios'
import { useGetComment } from './useGetComment'
import { useAddComment } from './useAddComment'
import { useDeleteComment } from './useDeleteComment'
import { useUpdateComment } from './useUpdateComment'
import { computed, ref } from 'vue'
import CommentType from '../CommentType'
import { PageResponse } from '@/core/common/types/PageType'
import { useUserStore } from '@/stores/userStore'

export const useCommentManage = (
  challengeId: number,
  getCommentsFetch: (
    challengeId: number,
    page: number,
    size: number
  ) => Promise<AxiosResponse<PageResponse<CommentType> | ApiResponse>>,
  addCommentFetch: (
    challengeId: number,
    comment: CommentType,
  ) => Promise<AxiosResponse<ApiResponse>>,
  deleteCommentFetch: (
    challengeId: number,
    commentId: string,
  ) => Promise<AxiosResponse<ApiResponse>>,
  updateCommentFetch: (
    challengeId: number,
    comment: CommentType,
  ) => Promise<AxiosResponse<ApiResponse>>,
) => {
  const userStore = useUserStore()

  const comment = ref<CommentType>({
    commentId: '',
    challengeId: '',
    commentContent: '',
    commentAuthorId: userStore.userId as string,
    commentCreateDate: '',
    commentAuthorName: '',
  })
  const commentId = ref('')

  const { getLoading, getError, comments, commentCnt, fetchComments, page, size } =
    useGetComment(challengeId, getCommentsFetch)

  const { createComment, addLoading, addError } = useAddComment(
    challengeId,
    comment.value,
    addCommentFetch,
  )

  const { deleteLoading, deleteError, deleteComment } = useDeleteComment(
    challengeId,
    commentId.value,
    deleteCommentFetch,
  )

  const {
    updateLoading,
    updateError,
    updateComment,
    editingCommentId,
    startEditing,
    cancelEditing
  } = useUpdateComment(
    challengeId,
    comment.value,
    updateCommentFetch,
  )

  const commentLoading = computed(
    () => getLoading.value || addLoading.value || deleteLoading.value || updateLoading.value,
  )
  const commentError = computed(
    () => getError.value || addError.value || deleteError.value || updateError.value,
  )

  const commentAdd = async (comment: CommentType, challengeId: number, page: number = 1, size: number = 10) => {
    await createComment(comment)
    comment.commentContent = ''
    await fetchComments(challengeId, page, size)
  }

  const commentDelete = async (challengeId: number, commentId: string, page: number = 1, size: number = 10) => {
    await deleteComment(challengeId, commentId)
    await fetchComments(challengeId, page, size)
  }

  const commentUpdate = async (challengeId: number, comment: CommentType, page: number = 1, size: number = 10) => {
    await updateComment(challengeId, comment)
    editingCommentId.value = '';
    await fetchComments(challengeId, page, size)
  }

  return {
    commentLoading,
    commentError,
    comment,
    comments,
    commentCnt,
    fetchComments,
    commentAdd,
    commentDelete,
    commentUpdate,
    editingCommentId,
    startEditing,
    cancelEditing,
    page,
    size
  }
}
