<script setup lang="ts">
import BasicButton from '@/components/atoms/BasicButton.vue'
import BasicInput from '@/components/atoms/BasicInput.vue'
import Header from '@/components/atoms/Header.vue'
import {
  deleteChallengeScheduleFetch,
  getChallengeScheduleFetch,
  updateChallengeScheduleFetch,
} from '@/core/challenge/AdminChallengeApi'
import { useEditSchedules } from '@/core/challenge/composables/useEditSchedules'
import { navigateToAdminSchedule } from '@/core/challenge/services/challengesService'
import { useRoute } from 'vue-router'

const route = useRoute()
const challengeId = Number(route.params.id)

const { schedule, isLoading,error, handleSubmit,handleStopRepeatSchedule } = useEditSchedules(challengeId,updateChallengeScheduleFetch)

</script>

<template>
  <div class="min-h-screen bg-gray-100">
    <Header title="스케줄 수정" />

    <div class="mx-auto max-w-6xl p-4">
      <template v-if="isLoading">
        <div class="flex h-64 items-center justify-center">
          <div class="h-8 w-8 animate-spin rounded-full border-b-2 border-primary-500"></div>
        </div>
      </template>
      <template v-else>
        <div class="rounded-lg bg-white p-6 shadow-sm">
          <h2 class="mb-6 text-2xl font-bold text-gray-800">스케줄 수정</h2>

          <form @submit.prevent="handleSubmit()" class="space-y-6">
            <BasicInput
              id="title"
              label="챌린지 제목"
              name="challengeTitle"
              v-model="schedule.challengeTitle"
              direction="col"
              required
            />

            <div class="space-y-2">
              <label class="block font-medium text-gray-700">챌린지 설명</label>
              <textarea
                v-model="schedule.challengeDescription"
                required
                class="min-h-[100px] w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
              ></textarea>
            </div>

            <BasicInput
              id="targetCount"
              label="목표 인원 수"
              name="challengeTargetCnt"
              type="number"
              v-model="schedule.challengeTargetCnt"
              direction="col"
              required
            />

            <div class="space-y-2">
              <label class="block font-medium text-gray-700">반복 주기</label>
              <select
                v-model="schedule.challengeSchedulerCycle"
                class="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
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
              type="date"
              v-model="schedule.challengeCreateDate"
              direction="col"
              required
            />

            <BasicInput
              id="endDate"
              label="반복 종료 날짜"
              name="endDate"
              type="date"
              v-model="schedule.challengeDeleteDate"
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
                @click="handleStopRepeatSchedule()"
              >
                삭제하기
              </BasicButton>
              <BasicButton
                type="button"
                color="secondary"
                size="lg"
                class="flex-1"
                @click="navigateToAdminSchedule()"
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
