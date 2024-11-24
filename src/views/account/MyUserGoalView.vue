<!-- views/MyUserGoalView.vue -->
<script setup lang="ts">
import { onMounted } from 'vue'
import BasicButton from '@/components/atoms/BasicButton.vue'
import { useGetUserGoals } from '@/core/goal/composables/useGetUserGoals'
import { getUserGoalFetch } from '@/core/goal/GoalApi'
import GoalSettingModal from '@/components/molecules/GoalSettingModal.vue'

const {
  loading,
  error,
  goals,
  showModal,
  handleOpenModal,
  handleCloseModal,
  handleSubmitGoal,
  fetchGoals,
  calculateAchievementRate
} = useGetUserGoals(getUserGoalFetch)

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'submit'): void
}>()

onMounted(() => {
  fetchGoals()
})
</script>

<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <h2 class="text-2xl font-bold text-gray-800">나의 목표</h2>
      <BasicButton
        @click="handleOpenModal"
        color="primary"
      >
        새로운 목표 설정하기
      </BasicButton>

      <GoalSettingModal
        :show="showModal"
        @close="handleCloseModal"
        @submit="handleSubmitGoal"
      />
    </div>

    <!-- 로딩 상태 (스켈레톤 UI) -->
    <div v-if="loading" class="space-y-4">
      <div v-for="n in 3" :key="n" class="animate-pulse">
        <div class="bg-white p-6 rounded-lg shadow-sm">
          <div class="space-y-4">
            <div class="flex justify-between items-center">
              <div class="h-4 bg-gray-200 rounded w-1/4"></div>
              <div class="w-20 h-6 bg-gray-200 rounded-full"></div>
            </div>
            <div class="h-3 bg-gray-200 rounded w-3/4"></div>
            <div class="h-2 bg-gray-200 rounded-full w-full"></div>
            <div class="flex justify-between">
              <div class="h-3 bg-gray-200 rounded w-20"></div>
              <div class="h-3 bg-gray-200 rounded w-16"></div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 에러 상태 -->
    <div v-else-if="error" class="flex justify-center py-8">
      <p class="text-red-500">{{ error }}</p>
    </div>

    <!-- 목표 목록 -->
    <div v-else class="space-y-4">
      <div v-if="goals.length === 0" class="bg-gray-50 p-8 text-center rounded-lg">
        <p class="text-gray-600">설정된 목표가 없습니다.</p>
      </div>
      <div
        v-else
        v-for="goal in goals"
        :key="goal.startDate"
        class="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
      >
        <div class="space-y-4">
          <div class="flex justify-between items-center">
            <h3 class="text-lg font-semibold text-gray-800">{{ goal.challengeCategoryName }}</h3>
            <span
              class="px-3 py-1 rounded-full text-sm"
              :class="{
                'bg-green-100 text-green-800': new Date(goal.endDate?? new Date()) > new Date(),
                'bg-blue-100 text-blue-800': (goal.currentAmount ?? 0) >= (goal.targetAmount ?? 0),
              }"
            >
              {{ new Date(goal.endDate?? new Date()) > new Date() ? '진행중' : '완료' }}
            </span>
          </div>

          <!-- 진행률 바 -->
          <div class="space-y-2">
            <div class="w-full bg-gray-200 rounded-full h-2">
              <div
                class="bg-primary-500 h-2 rounded-full transition-all duration-300"
                :style="{ width: `${calculateAchievementRate(goal)}%` }"
              ></div>
            </div>
            <div class="flex justify-between text-sm text-gray-500">
              <span>현재: {{ goal.currentAmount }}{{ goal.challengeCategoryUnitName }}</span>
              <span>목표: {{ goal.targetAmount }}{{ goal.challengeCategoryUnitName }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
