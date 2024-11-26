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
  challengeId: string;
  commentAdd: (comment: CommentType, challengeId: string) => void;
  commentDelete: (challengeId: string, commentId: string) => void;
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
          <div>
            <p class="font-medium">{{ comment.commentAuthorName }}</p>
            <p class="text-gray-600 mt-1">{{ comment.commentContent }}</p>
            <p class="text-sm text-gray-400 mt-2">{{ comment.commentCreateDate }}</p>
          </div>
          <button
            v-if="comment.commentAuthorId === userId"
            @click="commentDelete(challengeId, comment.commentId)"
            class="text-gray-400 hover:text-red-500"
          >
            삭제
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
