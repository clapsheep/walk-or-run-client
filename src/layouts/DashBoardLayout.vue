<script setup lang="ts">
import { ref } from 'vue'
import ChartGrid from '@/components/organisms/ChartGrid.vue'
import ChartHeader from '@/components/molecules/ChartHeader.vue'
import GoalsSidebar from '@/components/organisms/GoalsSidebar.vue'
import UploadModal from '@/components/molecules/UploadModal.vue'
import FloatingButton from '@/components/atoms/FloatingButton.vue'
import { FireIcon } from '@heroicons/vue/24/solid'

const showUploadModal = ref(false)
const showGoalsSidebar = ref(false)
const dateRange = ref<[Date, Date]>([new Date(), new Date()])
const chartGridRef = ref<InstanceType<typeof ChartGrid> | null>(null)

const handleOpenUploadModal = () => {
  showUploadModal.value = true
}

const handleUpdateDateRange = (dates: [Date, Date]) => {
  dateRange.value = dates
}

const toggleGoalsSidebar = () => {
  showGoalsSidebar.value = !showGoalsSidebar.value
}

const handleUploadSuccess = () => {
  // 업로드 성공 시 차트 데이터 새로고침
  chartGridRef.value?.fetchData()
}
</script>

<template>
  <div class="flex h-full relative">
    <div class="flex-[3] flex flex-col gap-4 h-[calc(100vh-88px)] overflow-y-auto">
      <ChartHeader
        @open-upload-modal="handleOpenUploadModal"
        @update-date-range="handleUpdateDateRange"
      />
      <ChartGrid ref="chartGridRef" :dateRange="dateRange" />
    </div>

    <!-- 플로팅 버튼 -->
    <FloatingButton
      :icon="FireIcon"
      :rotate="showGoalsSidebar"
      :onClick="toggleGoalsSidebar"
    />

    <!-- GoalsSidebar with transition -->
    <Transition
      enter-active-class="transition-transform duration-300 ease-out"
      enter-from-class="translate-x-full"
      enter-to-class="translate-x-0"
      leave-active-class="transition-transform duration-300 ease-in"
      leave-from-class="translate-x-0"
      leave-to-class="translate-x-full"
    >
      <GoalsSidebar
        v-if="showGoalsSidebar"
        :showUploadModal="showUploadModal"
        class="fixed top-[88px] right-0 bottom-0 h-[calc(100vh-88px)] shadow-lg overflow-y-auto w-1/4"
      />
    </Transition>

    <UploadModal
      v-if="showUploadModal"
      :show="showUploadModal"
      @close="showUploadModal = false"
      @upload-success="handleUploadSuccess"
    />
  </div>
</template>

<style scoped>
.rotate-180 {
  transform: rotate(180deg);
}
</style>
