<script setup lang="ts">
import Header from '@/components/atoms/Header.vue';
import BasicInput from '@/components/atoms/BasicInput.vue';
import BasicRadio from '@/components/atoms/BasicRadio.vue';
import BasicButton from '@/components/atoms/BasicButton.vue';
import BasicSelect from '@/components/molecules/BasicSelect.vue';
import { ref } from 'vue';

interface ChallengeForm {
  challengeCategoryCode: string
  challengeTitle: string
  challengeDescription: string
  challengeAuthorId: string
  challengeTargetCnt: number
  startDate: string
  endDate: string
  isRecurring: boolean
  period?: number
}

// 임시 카테고리 데이터
const categoryOptions = {
  'WALK': '걷기',
  'RUN': '달리기',
  'HEALTH': '헬스',
  'YOGA': '요가',
  'SWIMMING': '수영'
}

const form = ref<ChallengeForm>({
  challengeCategoryCode: '',
  challengeTitle: '',
  challengeDescription: '',
  challengeAuthorId: '', // 실제로는 로그인된 관리자 ID를 사용
  challengeTargetCnt: 0,
  startDate: '',
  endDate: '',
  isRecurring: false,
  period: undefined
})

const submitForm = async () => {
  try {
    // API 호출 로직 구현
    console.log('Form submitted:', form.value)
  } catch (error) {
    console.error('Error submitting form:', error)
  }
}
</script>

<template>
  <div class="min-h-screen bg-gray-100">
    <Header title="챌린지 생성" />

    <div class="max-w-6xl mx-auto p-4">
      <div class="bg-white rounded-lg shadow-sm p-6">
        <h2 class="text-2xl font-bold mb-6 text-gray-800">챌린지 생성</h2>

        <form @submit.prevent="submitForm" class="space-y-6">
          <BasicRadio
            id="challengeType"
            name="challengeType"
            label="챌린지 유형"
            v-model="form.isRecurring"
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

          <template v-if="form.isRecurring">
            <div class="space-y-2">
              <label class="block text-gray-700 font-medium">반복 주기</label>
              <select
                v-model="form.period"
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
              v-model="form.startDate"
              direction="col"
              required
            />

            <BasicInput
              id="endDate"
              label="반복 종료 날짜"
              name="endDate"
              type="datetime-local"
              v-model="form.endDate"
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
              v-model="form.startDate"
              direction="col"
              required
            />

            <BasicInput
              id="endDate"
              label="종료 날짜"
              name="endDate"
              type="datetime-local"
              v-model="form.endDate"
              direction="col"
              required
            />
          </template>

          <BasicButton
            type="submit"
            color="primary"
            size="lg"
            className="w-full"
          >
            챌린지 생성
          </BasicButton>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>
