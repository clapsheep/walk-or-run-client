<script setup lang="ts">
import { useRoute } from 'vue-router'
import { getChallengeDetailFetch } from '@/core/challenge/ChallengeApi'
import Header from '@/components/atoms/Header.vue'
import DdayBadge from '@/components/atoms/DdayBadge.vue'
import { FireIcon, UserGroupIcon, CalendarIcon, TrophyIcon } from '@heroicons/vue/24/outline'
import { useGetChallenge } from '@/core/challenge/composables/useGetChallenge'
import { useGetComment } from '@/core/comment/composables/useGetComment'
import Comments from '@/components/molecules/Comments.vue'
import { onMounted } from 'vue'

const route = useRoute()
const challengeId = Number(route.params.id)

const {
  loading,
  error,
  challenge,
  fetchChallengeDetail,
  handleParticipate
} = useGetChallenge(getChallengeDetailFetch, challengeId)


onMounted(() => {
  fetchChallengeDetail(challengeId)
  fetchComments()
})

</script>

<template>
  <div class="min-h-screen bg-gray-100">
    <Header title="챌린지 상세" :show-back-button="true" />

    <!-- 메인 콘텐츠 -->
    <div class="bg-gradient-to-br from-primary-100 via-primary-50 to-white min-h-screen relative">
      <!-- 배경 장식 -->
      <div class="absolute inset-0 overflow-hidden pointer-events-none">
        <div class="absolute right-0 top-0 w-96 h-96 bg-primary-200 opacity-30 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
        <div class="absolute left-0 bottom-0 w-96 h-96 bg-primary-200 opacity-30 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2"></div>
      </div>

      <div class="max-w-3xl mx-auto px-4 py-8 relative z-10">
        <!-- 로딩 상태 -->
        <div v-if="loading" class="flex justify-center py-12">
          <div class="h-8 w-8 animate-spin rounded-full border-b-2 border-primary-500"></div>
        </div>

        <!-- 에러 상태 -->
        <div v-else-if="error" class="flex justify-center py-12">
          <p class="text-red-500">{{ error }}</p>
        </div>

        <!-- 챌린지 상세 정보 -->
        <div v-else-if="challenge" class="space-y-8">
          <!-- 헤더 섹션 -->
          <div class="bg-gradient-to-br from-primary-500 via-primary-600 to-primary-700 rounded-2xl text-white p-8 relative overflow-hidden">
            <!-- 배경 장식 -->
            <div class="absolute inset-0 overflow-hidden">
              <div class="absolute -right-10 -top-10 w-40 h-40 bg-white opacity-10 rounded-full"></div>
              <div class="absolute -left-20 -bottom-20 w-60 h-60 bg-white opacity-10 rounded-full"></div>
            </div>

            <div class="relative z-10">
              <div class="flex items-center justify-between mb-4">
                <DdayBadge :dday="challenge.dday" class="text-lg" />
                <span class="px-3 py-1 bg-white bg-opacity-20 rounded-full text-sm">
                  {{ challenge.challengeCategoryName }}
                </span>
              </div>
              <h1 class="text-3xl font-bold mb-4">{{ challenge.challengeTitle }}</h1>
              <p class="text-lg text-primary-100 mb-6">{{ challenge.challengeDescription }}</p>
              <!-- 참여하기 버튼 -->
              <div class="mb-8">
                <button
                  @click="handleParticipate(challenge.challengeId)"
                  class="w-full inline-flex items-center justify-center px-8 py-4 bg-yellow-400 text-primary-900 font-bold rounded-xl hover:bg-yellow-300 transform hover:scale-[1.02] transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  <FireIcon class="w-6 h-6 mr-2" />
                  챌린지 참여하기
                </button>
              </div>
              <!-- 챌린지 통계 -->
              <div class="grid grid-cols-3 gap-4">
                <div class="bg-white bg-opacity-20 backdrop-blur-sm rounded-lg p-4">
                  <div class="flex items-center mb-2">
                    <UserGroupIcon class="w-5 h-5 text-yellow-300 mr-2" />
                    <span class="text-sm">참여자</span>
                  </div>
                  <p class="text-2xl font-semibold">
                    {{ challenge.challengeParticipantCnt }}/{{ challenge.challengeTargetCnt }}
                  </p>
                </div>
                <div class="bg-white bg-opacity-20 backdrop-blur-sm rounded-lg p-4">
                  <div class="flex items-center mb-2">
                    <CalendarIcon class="w-5 h-5 text-yellow-300 mr-2" />
                    <span class="text-sm">챌린지 기간</span>
                  </div>
                  <div class="flex flex-col">
                    <p class="text-sm mb-1">
                      {{ new Date(challenge.challengeCreateDate).toLocaleDateString() }}
                      ~
                      {{ new Date(challenge.challengeDeleteDate).toLocaleDateString() }}
                    </p>
                    <p class="text-xs text-primary-100">
                      {{ challenge.dday }}
                    </p>
                  </div>
                </div>
                <div class="bg-white bg-opacity-20 backdrop-blur-sm rounded-lg p-4">
                  <div class="flex items-center mb-2">
                    <TrophyIcon class="w-5 h-5 text-yellow-300 mr-2" />
                    <span class="text-sm">상태</span>
                  </div>
                  <p class="text-sm">
                    {{ challenge.challengeIsEnded ? '종료됨' : '진행중' }}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- 참여자 아이콘 -->
          <div class="bg-white rounded-2xl p-6 shadow-sm">
            <h2 class="text-xl font-semibold mb-4 flex items-center">
              <UserGroupIcon class="w-6 h-6 text-primary-500 mr-2" />
              참여중인 챌린저
            </h2>
            <div class="flex -space-x-2 overflow-hidden">
              <template v-for="(participant, index) in challenge.challengeParticipants.slice(0, 5)" :key="participant.userId">
                <div
                  class="inline-block h-10 w-10 rounded-full ring-2 ring-white"
                  :class="`bg-primary-${(index % 3 + 4) * 100}`"
                >
                  <span class="flex h-full w-full items-center justify-center text-white font-medium">
                    {{ participant.userNickname.charAt(0) }}
                  </span>
                </div>
              </template>
              <div
                v-if="challenge.challengeParticipants.length > 5"
                class="inline-flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 ring-2 ring-white"
              >
                <span class="text-sm text-gray-500 font-medium">
                  +{{ challenge.challengeParticipants.length - 5 }}
                </span>
              </div>
            </div>
          </div>

          <!-- 응원 댓글 섹션 -->
          <Comments
            :comments="comments"
            :loading="commentLoading"
            :error="commentError"
            :onSubmit="createComment"
            :onDelete="deleteComment"
          />
          <!-- 관리자용 삭제 버튼 -->
        </div>
      </div>
    </div>
  </div>
</template>
