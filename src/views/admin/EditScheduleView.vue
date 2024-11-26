<script setup lang="ts">
import Header from '@/components/atoms/Header.vue';
import BasicInput from '@/components/atoms/BasicInput.vue';
import BasicButton from '@/components/atoms/BasicButton.vue';
import BasicSelect from '@/components/molecules/BasicSelect.vue';
import CreateChallengeSkeleton from '@/components/skeletons/CreateChallengeSkeleton.vue';
import { useCreateChallenge } from '@/core/challenge/composables/useCreateChallenge'
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const {
  form,
  isLoading,
  isRecurring,
  submitForm,
  isFormValid,
  categoryOptions
} = useCreateChallenge()

onMounted(() => {
  // 항상 반복 챌린지로 설정
  isRecurring.value = true

  // history.state에서 schedule 데이터를 가져옴
  const schedule = window.history.state?.schedule
  if (schedule) {
    form.value = {
      ...form.value,
      challengeTitle: schedule.challengeTitle,
      challengeDescription: schedule.challengeDescription,
      challengeCategoryCode: schedule.challengeCategoryCode,
      challengeTargetCnt: schedule.challengeTargetCnt,
      challengeCreateDate: schedule.challengeCreateDate,
      challengeDeleteDate: schedule.challengeDeleteDate,
      challengeSchedulerCycle: schedule.challengeSchedulerCycle,
      challengeAuthorId: schedule.challengeAuthorId
    }
  }
})
</script>

<template>
  <div class="min-h-screen bg-gray-100">
    <Header title="챌린지 수정" />

    <div class="max-w-6xl mx-auto p-4">
      <template v-if="isLoading">
        <CreateChallengeSkeleton padding="large" />
      </template>
      <template v-else>
        <div class="bg-white rounded-lg shadow-sm p-6">
          <h2 class="text-2xl font-bold mb-6 text-gray-800">챌린지 수정</h2>

          <form @submit.prevent="submitForm" class="space-y-6">
            <BasicSelect
              id="category"
              label="카테고리"
              name="category"
              v-model="form.challengeCategoryCode"
              :options="categoryOptions"
              required
            />

            <BasicInput
              id="title"
              label="챌린지 제목"
              name="title"
              v-model="form.challengeTitle"
              placeholder="챌린지 제목을 입력해주세요"
              required
            />

            <BasicInput
              id="description"
              label="챌린지 설명"
              name="description"
              v-model="form.challengeDescription"
              placeholder="챌린지 설명을 입력해주세요"
              required
            />

            <BasicInput
              id="targetCount"
              label="목표 횟수"
              name="targetCount"
              type="number"
              v-model="form.challengeTargetCnt"
              placeholder="목표 횟수를 입력해주세요"
              required
            />

            <BasicInput
              id="startDate"
              label="시작일"
              name="startDate"
              type="date"
              v-model="form.challengeCreateDate"
              required
            />

            <BasicInput
              id="endDate"
              label="종료일"
              name="endDate"
              type="date"
              v-model="form.challengeDeleteDate"
              required
            />

            <BasicInput
              id="cycle"
              label="반복 주기 (일)"
              name="cycle"
              type="number"
              v-model="form.challengeSchedulerCycle"
              placeholder="반복 주기를 입력해주세요"
              required
            />

            <div class="flex justify-end space-x-4">
              <BasicButton
                type="submit"
                :disabled="!isFormValid"
              >
                수정하기
              </BasicButton>
            </div>
          </form>
        </div>
      </template>
    </div>
  </div>
</template>
