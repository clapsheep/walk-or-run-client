<script setup lang="ts">
import BasicButton from '@/components/atoms/BasicButton.vue'
import Datepicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
import { CalendarDaysIcon } from '@heroicons/vue/24/outline'
import { useDateRange } from '@/core/date/composables/useDateRange'
import { datePickerStyle } from '@/core/date/services/dateService'

const emit = defineEmits(['openUploadModal', 'updateDateRange'])

const {
  date,
  showPicker,
  handleDateSelect,
  togglePicker,
  getFormattedDate
} = useDateRange((dates) => emit('updateDateRange', dates))

const handleOpenModal = () => {
  emit('openUploadModal')
}
</script>

<template>
  <div class="flex justify-between items-center bg-white p-3 rounded-2xl shadow-sm sticky top-0">
    <div class="flex-1">
      <div class="w-full flex justify-center relative">
        <!-- 날짜 표시 영역 -->
        <div
          @click="togglePicker"
          class="inline-flex items-center gap-2 px-4 py-2 rounded-lg cursor-pointer transition-all duration-200
                  text-black
                 border border-gray-300 hover:border-primary-400"
        >
          <CalendarDaysIcon class="w-5 h-5" />
          <span class="text-lg font-medium">
            {{ getFormattedDate() }}
          </span>
        </div>

        <!-- 숨겨진 데이트피커 -->
        <div v-if="showPicker" class="absolute top-full left-1/2 -translate-x-1/2 mt-2 z-50">
          <Datepicker
            v-model="date"
            range
            :enable-time-picker="false"
            auto-apply
            :style="datePickerStyle"
            locale="ko-KR"
            :close-on-auto-apply="true"
            class="[&_.dp-custom-menu]:shadow-lg [&_.dp-custom-menu]:border [&_.dp-custom-menu]:border-gray-200
                   [&_.dp__main]:bg-white [&_.dp__main]:rounded-lg [&_.dp__main]:shadow-lg [&_.dp__main]:border [&_.dp__main]:border-gray-200
                   [&_.dp__range_end]:!bg-primary-500 [&_.dp__range_start]:!bg-primary-500 [&_.dp__active_date]:!bg-primary-500"
            @update:model-value="handleDateSelect"
            inline
          />
        </div>
      </div>
    </div>
    <BasicButton @click="handleOpenModal">데이터 추가</BasicButton>
  </div>
</template>

<style>
.dp-custom-menu .dp__action_buttons {
  display: none;
}
</style>
