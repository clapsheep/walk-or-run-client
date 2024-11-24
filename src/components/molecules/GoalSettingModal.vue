<script setup lang="ts">
import { ref, defineEmits } from 'vue'
import BasicInput from '@/components/atoms/BasicInput.vue'
import BasicSelect from '@/components/molecules/BasicSelect.vue'
import BasicButton from '@/components/atoms/BasicButton.vue'

const emit = defineEmits(['close', 'submit'])

const form = ref({
  startDate: '',
  endDate: '',
  targetAmount: '',
  goalType: '',  // 1: 걷기, 2: 뛰기
  unitType: ''   // 1: 시간(hour), 2: 거리(km)
})

const errors = ref({
  startDate: '',
  endDate: '',
  targetAmount: '',
  goalType: '',
  unitType: ''
})

const goalTypes = [
  { id: 1, name: '뛰기' },
  { id: 2, name: '걷기' }
]

const unitTypes = [
  { id: 1, name: '시간 (hour)' },
  { id: 2, name: '거리 (km)' }
]

const validateForm = () => {
  let isValid = true
  errors.value = {
    startDate: '',
    endDate: '',
    targetAmount: '',
    goalType: '',
    unitType: ''
  }

  if (!form.value.startDate) {
    errors.value.startDate = '시작일을 선택해주세요'
    isValid = false
  }

  if (!form.value.endDate) {
    errors.value.endDate = '종료일을 선택해주세요'
    isValid = false
  } else if (new Date(form.value.endDate) <= new Date(form.value.startDate)) {
    errors.value.endDate = '종료일은 시작일 이후여야 합니다'
    isValid = false
  }

  if (!form.value.targetAmount) {
    errors.value.targetAmount = '목표량을 입력해주세요'
    isValid = false
  } else if (isNaN(Number(form.value.targetAmount)) || Number(form.value.targetAmount) <= 0) {
    errors.value.targetAmount = '올바른 목표량을 입력해주세요'
    isValid = false
  }

  if (!form.value.goalType) {
    errors.value.goalType = '목표 종류를 선택해주세요'
    isValid = false
  }

  if (!form.value.unitType) {
    errors.value.unitType = '목표 단위를 선택해주세요'
    isValid = false
  }

  return isValid
}

const handleSubmit = () => {
  if (!validateForm()) return

  emit('submit', {
    startDate: form.value.startDate,
    endDate: form.value.endDate,
    targetAmount: Number(form.value.targetAmount),
    goalType: Number(form.value.goalType),
    unitType: Number(form.value.unitType)
  })
}

const handleClose = () => {
  emit('close')
}
</script>

<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white rounded-lg p-8 w-full max-w-md">
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-xl font-bold text-gray-800">목표 설정</h2>
        <button
          @click="handleClose"
          class="text-gray-500 hover:text-gray-700"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <form @submit.prevent="handleSubmit" class="space-y-4">
        <div class="grid grid-cols-2 gap-4">
          <BasicInput
            type="date"
            label="시작일"
            v-model="form.startDate"
            :error="errors.startDate"
            direction="col"
          />
          <BasicInput
            type="date"
            label="종료일"
            v-model="form.endDate"
            :error="errors.endDate"
            direction="col"
          />
        </div>

        <BasicSelect
          label="목표 종류"
          v-model="form.goalType"
          :options="goalTypes"
          value-key="id"
          label-key="name"
          placeholder="목표 종류를 선택해주세요"
          :error="errors.goalType"
          direction="col"
        />

        <BasicSelect
          label="목표 단위"
          v-model="form.unitType"
          :options="unitTypes"
          value-key="id"
          label-key="name"
          placeholder="목표 단위를 선택해주세요"
          :error="errors.unitType"
          direction="col"
        />

        <BasicInput
          type="number"
          label="목표량"
          v-model="form.targetAmount"
          :error="errors.targetAmount"
          :placeholder="form.unitType === 1 ? '시간을 입력하세요' : '거리를 입력하세요'"
          direction="col"
        />

        <div class="flex justify-end space-x-4 mt-6">
          <BasicButton
            type="button"
            @click="handleClose"
            color="secondary"
          >
            취소
          </BasicButton>
          <BasicButton
            type="submit"
          >
            설정하기
          </BasicButton>
        </div>
      </form>
    </div>
  </div>
</template>
