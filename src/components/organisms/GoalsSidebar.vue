<script setup lang="ts">
import GoalCard from '@/components/molecules/GoalCard.vue'
import GoalSettingModal from '@/components/molecules/GoalCreateModal.vue'
import GoalCardSkeleton from '@/components/skeletons/GoalCardSkeleton.vue'
import { useDeleteUserGoals } from '@/core/goal/composables/useDeleteUserGoals'
import { useGetUserGoals } from '@/core/goal/composables/useGetUserGoals'
import { deleteUserGoalFetch, getUserGoalFetch } from '@/core/goal/GoalApi'
import { Cog6ToothIcon } from '@heroicons/vue/24/outline'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

defineProps<{
  showUploadModal: boolean
}>()

const router = useRouter()
const showModal = ref(false)

const {
  loading: fetchLoading,
  error: fetchError,
  getActiveGoals,
  fetchGoals,
} = useGetUserGoals(getUserGoalFetch)

const {
  confirmAndDeleteGoal,
  loading: deleteLoading,
  error: deleteError,
} = useDeleteUserGoals(deleteUserGoalFetch, fetchGoals)

const navigateToGoalsPage = () => router.push('/account/mypage/goals')

onMounted(() => {
  fetchGoals()
})
</script>

<template>
  <div class="h-[calc(100vh-88px)] flex-1 overflow-y-auto rounded-2xl bg-white p-4 shadow-sm">
    <!-- 헤더 -->
    <div
      class="sticky top-0 mb-4 flex items-center justify-between bg-white"
      :class="{ 'z-10': !showUploadModal, 'z-0': showUploadModal }"
    >
      <h2 class="text-xl font-semibold text-gray-800">목표 현황</h2>
      <div class="flex items-center space-x-2">
        <button
          class="rounded-full p-2 text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900"
          @click="navigateToGoalsPage"
        >
          <Cog6ToothIcon class="h-5 w-5" />
        </button>
      </div>
    </div>

    <!-- 목표 설정 모달 -->
    <GoalSettingModal :show="showModal" @close="showModal = false" @submit="fetchGoals" />

    <!-- 목표 목록 -->
    <div class="goals-container space-y-4">
      <!-- 로딩 상태 -->
      <div class="mt-4 space-y-3">
        <template v-if="fetchLoading">
          <GoalCardSkeleton v-for="n in 3" :key="n" padding="normal" />
        </template>

        <template v-else-if="fetchError || deleteError">
          <div class="py-4 text-center">
            <p class="text-red-500">{{ fetchError || deleteError }}</p>
          </div>
        </template>

        <template v-else-if="getActiveGoals.length === 0">
          <div class="py-4 text-center">
            <p class="text-gray-500">진행중인 목표가 없습니다.</p>
            <p class="mt-1 text-sm text-gray-400">새로운 목표를 설정해보세요!</p>
          </div>
        </template>

        <template v-else>
          <template v-if="deleteLoading">
            <GoalCardSkeleton v-for="n in getActiveGoals.length" :key="n" padding="normal" />
          </template>
          <template v-else>
            <GoalCard
              v-for="goal in getActiveGoals"
              :key="goal.userGoalId"
              :goal="goal"
              @delete="confirmAndDeleteGoal"
            />
          </template>
        </template>
      </div>
    </div>
  </div>
</template>
