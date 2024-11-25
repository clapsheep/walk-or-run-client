<!-- components/molecules/GoalSettingModal.vue -->
<script setup lang="ts">
import BasicButton from '@/components/atoms/BasicButton.vue'
import BasicInput from '@/components/atoms/BasicInput.vue'
import { createUserGoalFetch } from '@/core/goal/GoalApi'
import { useModalStore } from '@/stores/modalStore'
import Datepicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
import { ref, watch } from 'vue'

import { useDateRange } from '@/core/date/composables/useDateRange'
import { datePickerStyle } from '@/core/date/services/dateService'
import { useCreateUserGoals } from '@/core/goal/composables/useCreateUserGoals'

interface Props {
  show: boolean
}

interface Emits {
  (e: 'close'): void
  (e: 'submit'): void
}

const props = defineProps<Props>()
const emit = defineEmits<{
  (e: 'close'): void
  (e: 'submit'): void
}>()

const modalStore = useModalStore()
const { loading, error, errors, form, categoryOptions, unitOptions, createGoal, resetForm } =
  useCreateUserGoals(createUserGoalFetch, async () => {
    emit('submit')
  })

const initialDates = ref<Date[]>([new Date(), new Date()])
if (form.value.startDate) {
  initialDates.value[0] = new Date(form.value.startDate)
}
if (form.value.endDate) {
  initialDates.value[1] = new Date(form.value.endDate)
}

const { date, handleDateSelect } = useDateRange((dates) => {
  if (dates?.[0] && dates?.[1]) {
    form.value.startDate = dates[0].toISOString().split('T')[0]
    form.value.endDate = dates[1].toISOString().split('T')[0]
  }
})

// Initialize date with current values if form has dates
watch(
  () => [form.value.startDate, form.value.endDate],
  ([newStartDate, newEndDate]) => {
    if (newStartDate && newEndDate) {
      date.value = [new Date(newStartDate), new Date(newEndDate)]
    }
  },
  { immediate: true },
)

const onSubmit = async (e: Event) => {
  e.preventDefault()
  const success = await createGoal()
  if (success) {
    handleClose()
  }
}

const handleClose = () => {
  resetForm()
  emit('close')
}

watch(
  () => props.show,
  (newValue) => {
    if (!newValue) {
      resetForm()
    }
  },
)
</script>

<template>
  <div v-if="show" class="fixed inset-0 z-50 overflow-y-auto">
    <div class="flex min-h-screen items-center justify-center p-4">
      <div
        class="fixed inset-0 bg-black bg-opacity-25 transition-opacity"
        @click="handleClose"
      ></div>
      <div
        class="relative w-full max-w-md transform rounded-lg bg-white p-6 text-left shadow-xl transition-all"
      >
        <!-- 헤더 -->
        <div class="mb-6 flex items-center justify-between">
          <h3 class="text-xl font-semibold text-gray-900">목표 설정</h3>
          <button @click="handleClose" class="text-gray-400 hover:text-gray-500">
            <span class="sr-only">Close</span>
            <span class="text-2xl">&times;</span>
          </button>
        </div>

        <!-- 폼 -->
        <form @submit.prevent="onSubmit">
          <div class="space-y-4">
            <!-- 목표 종류 선택 -->
            <div>
              <label class="block text-sm font-medium text-gray-700">운동 종류</label>
              <select
                v-model="form.challengeCategoryCode"
                class="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2"
                :class="{ 'border-red-500': errors.challengeCategoryCode }"
              >
                <option value="">선택해주세요</option>
                <option
                  v-for="category in categoryOptions"
                  :key="category.code"
                  :value="category.code"
                >
                  {{ category.name }}
                </option>
              </select>
              <p v-if="errors.challengeCategoryCode" class="mt-1 text-sm text-red-600">
                {{ errors.challengeCategoryCode }}
              </p>
            </div>

            <!-- 단위 선택 -->
            <div>
              <label class="block text-sm font-medium text-gray-700">단위</label>
              <select
                v-model="form.challengeCategoryUnitCode"
                class="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2"
                :class="{ 'border-red-500': errors.challengeCategoryUnitCode }"
              >
                <option value="">선택해주세요</option>
                <option v-for="unit in unitOptions" :key="unit.code" :value="unit.code">
                  {{ unit.name }}
                </option>
              </select>
              <p v-if="errors.challengeCategoryUnitCode" class="mt-1 text-sm text-red-600">
                {{ errors.challengeCategoryUnitCode }}
              </p>
            </div>

            <!-- 목표량 입력 -->
            <div>
              <label class="block text-sm font-medium text-gray-700">목표량</label>
              <BasicInput
                v-model="form.targetAmount"
                type="number"
                label="목표량"
                id="targetAmount"
                name="targetAmount"
                placeholder="목표량을 입력하세요"
                class="mt-1"
                direction="col"
                :error="errors.targetAmount"
                :class="{ 'border-red-500': errors.targetAmount }"
              />
            </div>

            <!-- 기간 설정 -->
            <div class="grid grid-cols-1 gap-4">
              <div>
                <label class="mb-1 block text-sm font-medium text-gray-700">기간 설정</label>
                <Datepicker
                  v-model="date"
                  range
                  :enable-time-picker="false"
                  auto-apply
                  :style="datePickerStyle"
                  locale="ko-KR"
                  :close-on-auto-apply="true"
                  format="yyyy-MM-dd"
                  class="[&_.dp__active_date]:!bg-primary-500 [&_.dp__main]:rounded-lg [&_.dp__main]:border [&_.dp__main]:border-gray-200 [&_.dp__main]:bg-white [&_.dp__main]:shadow-sm [&_.dp__menu]:!z-[100] [&_.dp__range_end]:!bg-primary-500 [&_.dp__range_start]:!bg-primary-500"
                  @update:model-value="handleDateSelect"
                  :min-date="new Date()"
                  :class="{ 'border-red-500': errors.startDate || errors.endDate }"
                />
                <div v-if="errors.startDate || errors.endDate" class="mt-1 text-sm text-red-500">
                  {{ errors.startDate || errors.endDate }}
                </div>
              </div>
            </div>
          </div>

          <div class="mt-6 flex justify-end space-x-3">
            <BasicButton type="button" variant="outlined" color="secondary" @click="handleClose">
              취소
            </BasicButton>
            <BasicButton type="submit" variant="filled" color="primary" :loading="loading">
              저장
            </BasicButton>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
