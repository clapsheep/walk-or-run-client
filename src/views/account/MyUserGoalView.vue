<!-- views/MyUserGoalView.vue -->
<script setup lang="ts">
import BasicButton from '@/components/atoms/BasicButton.vue'
import { useGetUserGoals } from '@/core/goal/composables/useGetUserGoals'
import { onMounted, ref } from 'vue'

import StatusTag from '@/components/atoms/StatusTag.vue'
import GoalCard from '@/components/molecules/GoalCard.vue'
import GoalSettingModal from '@/components/molecules/GoalCreateModal.vue'
import GoalCardSkeleton from '@/components/skeletons/GoalCardSkeleton.vue'
import { useDeleteUserGoals } from '@/core/goal/composables/useDeleteUserGoals'
import { deleteUserGoalFetch, getUserGoalFetch } from '@/core/goal/GoalApi'

const { loading, error, selectedStatus, filteredGoals, fetchGoals, setStatus, goals } =
  useGetUserGoals(getUserGoalFetch)

const { confirmAndDeleteGoal, loading: deleteLoading } = useDeleteUserGoals(
  deleteUserGoalFetch,
  fetchGoals,
)

const showModal = ref(false)

const handleOpenModal = () => {
  showModal.value = true
}

const handleCloseModal = () => {
  showModal.value = false
}

onMounted(() => {
  fetchGoals()
})
</script>

<template>
  <div class="container mx-auto max-w-4xl px-4 py-8">
    <div class="mb-8 flex items-center justify-between">
      <h1 class="text-2xl font-bold text-gray-900">나의 목표</h1>
      <BasicButton @click="handleOpenModal" color="primary"> 새로운 목표 설정하기 </BasicButton>

      <GoalSettingModal :show="showModal" @close="handleCloseModal" @submit="fetchGoals" />
    </div>

    <!-- 목표 상태 필터 -->
    <div class="mb-6 flex space-x-4">
      <StatusTag
        v-for="status in ['all', 'active', 'completed'] as const"
        :key="status"
        :status="status"
        :active="selectedStatus === status"
        :disabled="status !== 'all' && goals.length === 0"
        interactive
        size="md"
        @click="selectedStatus = status"
      />
    </div>

    <!-- 로딩 상태 -->
    <div v-if="loading" class="space-y-4">
      <GoalCardSkeleton v-for="n in 3" :key="n" padding="large" />
    </div>

    <!-- 에러 상태 -->
    <div v-else-if="error" class="flex justify-center py-8">
      <p class="text-red-500">{{ error }}</p>
    </div>

    <!-- 목표 목록 -->
    <div v-else class="space-y-4">
      <div v-if="filteredGoals.length === 0" class="rounded-lg bg-gray-50 p-8 text-center">
        <p class="text-gray-600">
          {{
            selectedStatus === 'all'
              ? '설정된 목표가 없습니다.'
              : selectedStatus === 'active'
                ? '진행중인 목표가 없습니다.'
                : '완료된 목표가 없습니다.'
          }}
        </p>
      </div>
      <GoalCard
        v-else
        v-for="goal in filteredGoals"
        :key="goal.userGoalId"
        :goal="goal"
        :loading="deleteLoading"
        padding="large"
        @delete="confirmAndDeleteGoal"
      />
    </div>
  </div>
</template>
