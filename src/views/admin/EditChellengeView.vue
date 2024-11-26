<script setup lang="ts">
import BasicButton from '@/components/atoms/BasicButton.vue'
import BasicInput from '@/components/atoms/BasicInput.vue'
import Header from '@/components/atoms/Header.vue'
import { closeChallengeFetch, editChallengeFetch } from '@/core/challenge/ChallengeApi'
import { useEditChallenge } from '@/core/challenge/composables/useEditChallenge'
import {
  navigateToAdminChallenge,
  navigateToDetail,
} from '@/core/challenge/services/challengesService'
import { useRoute } from 'vue-router'

const route = useRoute()
const challengeId = Number(route.params.id)

const { form, isLoading, handleSubmitForm, handleCloseChallenge } = useEditChallenge(
  challengeId,
  editChallengeFetch,
  closeChallengeFetch,
)
</script>

<template>
  <div class="min-h-screen bg-gray-100">
    <Header title="챌린지 수정" />

    <div class="mx-auto max-w-6xl p-4">
      <template v-if="isLoading">
        <div class="flex h-64 items-center justify-center">
          <div class="h-8 w-8 animate-spin rounded-full border-b-2 border-primary-500"></div>
        </div>
      </template>
      <template v-else>
        <div class="rounded-lg bg-white p-6 shadow-sm">
          <h2 class="mb-6 text-2xl font-bold text-gray-800">챌린지 수정</h2>

          <form @submit.prevent="() => handleSubmitForm(challengeId)" class="space-y-6">
            <BasicInput
              id="title"
              label="챌린지 제목"
              name="challengeTitle"
              v-model="form.challengeTitle"
              direction="col"
              required
            />

            <div class="space-y-2">
              <label class="block font-medium text-gray-700">챌린지 설명</label>
              <textarea
                v-model="form.challengeDescription"
                required
                class="min-h-[100px] w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
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

            <BasicInput
              id="startDate"
              label="챌린지 시작 날짜"
              name="startDate"
              type="datetime-local"
              v-model="form.challengeCreateDate"
              direction="col"
              required
            />

            <BasicInput
              id="endDate"
              label="챌린지 종료 날짜"
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
                @click="handleCloseChallenge(challengeId)"
              >
                종료하기
              </BasicButton>
              <BasicButton
                type="button"
                color="secondary"
                size="lg"
                class="flex-1"
                @click="navigateToAdminChallenge()"
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
