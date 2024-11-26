<script setup lang="ts">
import Header from '@/components/atoms/Header.vue';
import BasicInput from '@/components/atoms/BasicInput.vue';
import BasicButton from '@/components/atoms/BasicButton.vue';
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { getChallengeScheduleFetch, updateChallengeScheduleFetch, deleteChallengeScheduleFetch } from '@/core/challenge/AdminChallengeApi';
import { useEditChallenge } from '@/core/challenge/composables/useEditChallenge';

const route = useRoute();
const challengeId = Number(route.params.id);

const {
  form,
  isLoading,
  fetchScheduleDetail,
  submitForm,
  deleteSchedule,
  goToList
} = useEditChallenge(getChallengeScheduleFetch, updateChallengeScheduleFetch, deleteChallengeScheduleFetch);

onMounted(async () => {
  console.log('Challenge ID:', challengeId);
  await fetchScheduleDetail(challengeId);
});
</script>

<template>
  <div class="min-h-screen bg-gray-100">
    <Header title="스케줄 수정" />

    <div class="max-w-6xl mx-auto p-4">
      <template v-if="isLoading">
        <div class="flex justify-center items-center h-64">
          <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div>
        </div>
      </template>
      <template v-else>
        <div class="bg-white rounded-lg shadow-sm p-6">
          <h2 class="text-2xl font-bold mb-6 text-gray-800">스케줄 수정</h2>

          <form @submit.prevent="submitForm" class="space-y-6">
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

            <div class="flex space-x-4">
              <BasicButton
                type="submit"
                color="primary"
                size="lg"
                class="flex-1"
                :loading="isLoading"
              >
                수정하기
              </BasicButton>
              <BasicButton
                type="button"
                color="warning"
                size="lg"
                class="flex-1"
                :loading="isLoading"
                @click="deleteSchedule(challengeId)"
              >
                삭제하기
              </BasicButton>
              <BasicButton
                type="button"
                color="secondary"
                size="lg"
                class="flex-1"
                @click="goToList"
              >
                취소
              </BasicButton>
            </div>
          </form>
        </div>
      </template>
    </div>
  </div>
</template>
