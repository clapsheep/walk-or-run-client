<script setup lang="ts">
import type CommentType from '@/core/comment/CommentType';
import { FireIcon } from '@heroicons/vue/24/outline';

defineProps<{
  comment: CommentType;
  comments: CommentType[];
  commentCnt: number;
  loading: boolean;
  error: string;
  userId: string;
  challengeId: number;
  editingCommentId: string;
  startEditing: (commentId: string) => void;
  cancelEditing: () => void;
  commentAdd: (comment: CommentType, challengeId: number) => void;
  commentDelete: (challengeId: number, commentId: string) => void;
  commentUpdate: (challengeId: number, comment: CommentType) => void;
}>();

</script>

<template>
  <div class="bg-white rounded-2xl p-6 shadow-sm">
    <h2 class="text-xl font-semibold mb-4 flex items-center">
      <FireIcon class="w-6 h-6 text-primary-500 mr-2" />
      응원 댓글
      <span class="text-sm text-gray-500 ml-2">({{ commentCnt }})</span>
    </h2>

    <!-- 댓글 작성 폼 -->
    <div class="mb-6">
      <div class="flex gap-4">
        <textarea
          v-model="comment.commentContent"
          rows="2"
          class="flex-grow p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          placeholder="응원의 한마디를 남겨주세요!"
        ></textarea>
        <button
          @click="commentAdd(comment, challengeId)"
          class="px-6 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500"
          :disabled="loading"
        >
          {{ loading ? '작성 중...' : '작성' }}
        </button>
      </div>
      <p v-if="error" class="mt-2 text-red-500 text-sm">{{ error }}</p>
    </div>

    <!-- 댓글 목록 -->
    <div v-if="loading" class="text-center py-4">
      <p class="text-gray-500">댓글을 불러오는 중...</p>
    </div>
    <div v-else-if="error" class="text-center py-4">
      <p class="text-red-500">{{ error }}</p>
    </div>
    <div v-else class="space-y-4">
      <div v-for="comment in comments" :key="comment.commentId" class="p-4 bg-gray-50 rounded-lg">
        <div class="flex justify-between items-start">
          <div class="flex-grow">
            <p class="font-medium">{{ comment.commentAuthorName }}</p>
            <div v-if="editingCommentId === comment.commentId">
              <textarea
                v-model="comment.commentContent"
                rows="2"
                class="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 mt-1"
              ></textarea>
              <div class="flex justify-end gap-2 mt-2">
                <button
                  @click="commentUpdate(challengeId, comment)"
                  class="px-4 py-1 bg-primary-500 text-white rounded-lg hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  수정 완료
                </button>
                <button
                  @click="cancelEditing"
                  class="px-4 py-1 bg-gray-500 text-white rounded-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
                >
                  취소
                </button>
              </div>
            </div>
            <p v-else class="text-gray-600 mt-1">{{ comment.commentContent }}</p>
            <p class="text-sm text-gray-400 mt-2">{{ comment.commentCreateDate }}</p>
          </div>
          <div v-if="comment.commentAuthorId === userId" class="flex gap-2">
            <button
              v-if="editingCommentId !== comment.commentId"
              @click="startEditing(comment.commentId)"
              class="text-gray-400 hover:text-blue-500"
            >
              수정
            </button>
            <button
              v-if="editingCommentId !== comment.commentId"
              @click="commentDelete(challengeId, comment.commentId)"
              class="text-gray-400 hover:text-red-500"
            >
              삭제
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
