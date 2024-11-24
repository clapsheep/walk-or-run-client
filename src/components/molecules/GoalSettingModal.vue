<!-- components/molecules/GoalSettingModal.vue -->
<script setup lang="ts">
import { watch } from 'vue'
import BasicButton from '@/components/atoms/BasicButton.vue'
import BasicInput from '@/components/atoms/BasicInput.vue'
import { useGoalSetting } from '@/core/goal/composables/useGoalSetting'
import { createUserGoalFetch } from '@/core/goal/GoalApi'

const props = defineProps<{
  show: boolean
}>()

const emit = defineEmits(['close', 'submit'])

const handleClose = () => {
  emit('close')
}

const {
  loading,
  error,
  form,
  categoryOptions,
  unitOptions,
  handleSubmit,
  resetForm
} = useGoalSetting(createUserGoalFetch)

watch(() => props.show, (newValue) => {
  if (!newValue) {
    resetForm()
  }
})

const onSubmit = async () => {
  const success = await handleSubmit()
  if (success) {
    emit('submit')
    emit('close')
  }
}
</script>

<template>
  <div v-if="show" class="fixed inset-0 z-50 overflow-y-auto">
    <div class="fixed inset-0 bg-black bg-opacity-50 transition-opacity"></div>

    <div class="flex min-h-screen items-center justify-center p-4">
      <div class="relative w-full max-w-md rounded-lg bg-white p-6 shadow-xl">
        <!-- 헤더 -->
        <div class="mb-6 flex items-center justify-between">
          <h3 class="text-xl font-semibold text-gray-900">목표 설정</h3>
          <button
            @click="handleClose"
            class="text-gray-400 hover:text-gray-500"
          >
            <span class="sr-only">Close</span>
            <span class="text-2xl">&times;</span>
          </button>
        </div>

        <!-- 폼 -->
        <form @submit.prevent="onSubmit" class="space-y-4">
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700">운동 종류</label>
              <select
                v-model="form.challengeCategoryCode"
                class="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2"
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
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700">단위</label>
              <select
                v-model="form.challengeCategoryUnitCode"
                class="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2"
              >
                <option value="">선택해주세요</option>
                <option
                  v-for="unit in unitOptions"
                  :key="unit.code"
                  :value="unit.code"
                >
                  {{ unit.name }}
                </option>
              </select>
            </div>

            <BasicInput
              id="targetAmount"
              name="targetAmount"
              label="목표량"
              type="number"
              v-model="form.targetAmount"
              placeholder="목표량을 입력해주세요"
              direction="col"
            />

            <BasicInput
              id="startDate"
              name="startDate"
              label="시작일"
              type="date"
              v-model="form.startDate"
              direction="col"
            />

            <BasicInput
              id="endDate"
              name="endDate"
              label="종료일"
              type="date"
              v-model="form.endDate"
              direction="col"
            />
          </div>

          <div class="mt-6 flex justify-end space-x-3">
            <BasicButton
              type="button"
              variant="outlined"
              color="secondary"
              @click="handleClose"
            >
              취소
            </BasicButton>
            <BasicButton
              type="submit"
              color="primary"
            >
              설정하기
            </BasicButton>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
