<script setup lang="ts">
import Header from '@/components/atoms/Header.vue';
import BasicInput from '@/components/atoms/BasicInput.vue';
import BasicRadio from '@/components/atoms/BasicRadio.vue';
import BasicButton from '@/components/atoms/BasicButton.vue';
import BasicSelect from '@/components/molecules/BasicSelect.vue';
import CreateChallengeSkeleton from '@/components/skeletons/CreateChallengeSkeleton.vue';
import { useCreateChallenge } from '@/core/challenge/composables/useCreateChallenge'

const {
  form,
  isLoading,
  isRecurring,
  submitForm,
  isFormValid
} = useCreateChallenge()

// 임시 카테고리 데이터
const categoryOptions = {
  '1': '뛰기',
  '2': '걷기',
}
</script>

<template>
  <div class="min-h-screen bg-gray-100">
    <Header title="챌린지 생성" />

    <div class="max-w-6xl mx-auto p-4">
      <template v-if="isLoading">
        <CreateChallengeSkeleton padding="large" />
      </template>
      <template v-else>
        <div class="bg-white rounded-lg shadow-sm p-6">
          <h2 class="text-2xl font-bold mb-6 text-gray-800">챌린지 생성</h2>

          <form @submit.prevent="submitForm" class="space-y-6">
            <BasicRadio
              id="challengeType"
              name="challengeType"
              label="챌린지 유형"
              v-model="isRecurring"
              :options="[
                { label: '일회성 챌린지', value: false },
                { label: '반복 챌린지', value: true }
              ]"
              direction="row"
            />

            <BasicSelect
              id="category"
              label="카테고리"
              name="category"
              v-model="form.challengeCategoryCode"
              :options="categoryOptions"
              placeholder="카테고리를 선택해주세요"
              direction="col"
            />

            <BasicInput
              id="title"
              label="챌린지 제목"
              name="challengeTitle"
              v-model="form.challengeTitle"
              direction="col"
              required
            />

            <div class="space-y-2">
              <label class="block text-gray-700 font-medium">챌린지 설명</label>
              <textarea
                v-model="form.challengeDescription"
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 min-h-[100px]"
              ></textarea>
            </div>

            <BasicInput
              id="targetCount"
              label="목표 인원 수"
              name="challengeTargetCnt"
              type="number"
              v-model="form.challengeTargetCnt"
              direction="col"
              required
            />

            <template v-if="isRecurring">
              <div class="space-y-2">
                <label class="block text-gray-700 font-medium">반복 주기</label>
                <select
                  v-model="form.challengeSchedulerCycle"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <option value="1">일일</option>
                  <option value="2">일주일</option>
                  <option value="3">한달</option>
                </select>
              </div>

              <BasicInput
                id="startDate"
                label="반복 시작 날짜"
                name="startDate"
                type="datetime-local"
                v-model="form.challengeCreateDate"
                direction="col"
                required
              />

              <BasicInput
                id="endDate"
                label="반복 종료 날짜"
                name="endDate"
                type="datetime-local"
                v-model="form.challengeDeleteDate"
                direction="col"
                required
              />
            </template>

            <template v-else>
              <BasicInput
                id="startDate"
                label="시작 날짜"
                name="startDate"
                type="datetime-local"
                v-model="form.challengeCreateDate"
                direction="col"
                required
              />

              <BasicInput
                id="endDate"
                label="종료 날짜"
                name="endDate"
                type="datetime-local"
                v-model="form.challengeDeleteDate"
                direction="col"
                required
              />
            </template>

            <BasicButton
              type="submit"
              color="primary"
              size="lg"
              class="w-full"
              :disabled="!isFormValid"
              :loading="isLoading"
            >
              챌린지 생성
            </BasicButton>
          </form>
        </div>
      </template>
    </div>
  </div>
</template>

<style scoped>
</style>
