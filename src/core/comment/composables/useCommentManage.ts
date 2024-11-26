import ApiResponse from "@/core/common/types/ApiResponse";
import { AxiosResponse } from "axios";
import { useGetComment } from "./useGetComment";
import { useAddComment } from "./useAddComment";
import { useDeleteComment } from "./useDeleteComment";
import { useUpdateComment } from "./useUpdateComment";
import type Comment from "../CommentType";
import { computed } from "vue";
import CommentType from "../CommentType";

export const useCommentManage = (
  challengeId: string,
  commentId: string,
  comment: CommentType,
  getCommentsFetch: (challengeId: string) => Promise<AxiosResponse<CommentType[] | ApiResponse>>,
  addCommentFetch: (challengeId: string, comment: CommentType) => Promise<AxiosResponse<ApiResponse>>,
  deleteCommentFetch: (challengeId: string, commentId: string) => Promise<AxiosResponse<ApiResponse>>,
  updateCommentFetch: (challengeId: string, comment: CommentType) => Promise<AxiosResponse<ApiResponse>>,
  getCommentCountFetch: (challengeId: string) => Promise<AxiosResponse<ApiResponse>>,
) => {
  const {
    getLoading,
    getError,
    comments,
    commentCnt,
    fetchComments,
    fetchCommentCount
  } = useGetComment(challengeId, getCommentsFetch, getCommentCountFetch)

  const {
    createComment,
    addLoading,
    addError
  } = useAddComment(challengeId, comment, addCommentFetch)

  const {
    deleteLoading,
    deleteError,
    deleteComment
  } = useDeleteComment(challengeId, commentId, deleteCommentFetch)

  const {
    updateLoading,
    updateError,
    updateComment
  } = useUpdateComment(challengeId, comment, updateCommentFetch)

  const loading = computed(() => getLoading.value || addLoading.value || deleteLoading.value || updateLoading.value)
  const error = computed(() => getError.value || addError.value || deleteError.value || updateError.value)

  const commentAdd = (comment: Comment, challengeId: string) => {
    createComment(comment);
    fetchComments(challengeId);
  }

  const commentDelete = (challengeId: string, commentId: string) => {
    deleteComment(challengeId,commentId);
    fetchComments(challengeId);
  }

  const commentUpdate = (challengeId: string, comment: CommentType) => {
    updateComment(challengeId, comment);
    fetchComments(challengeId);
  }

  return {
    loading,
    error,
    comments,
    commentCnt,
    fetchComments,
    fetchCommentCount,
    commentAdd,
    commentDelete,
    commentUpdate
  }
}
