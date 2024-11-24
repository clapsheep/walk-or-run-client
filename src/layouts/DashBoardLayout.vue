<script setup lang="ts">
import { ref } from 'vue'
import ChartHeader from '@/components/organisms/ChartHeader.vue'
import ChartGrid from '@/components/organisms/ChartGrid.vue'
import GoalsSidebar from '@/components/organisms/GoalsSidebar.vue'
import UploadModal from '@/components/organisms/UploadModal.vue'

const showUploadModal = ref(false)
const dateRange = ref<[Date, Date]>([new Date(), new Date()])

const handleOpenUploadModal = () => {
  showUploadModal.value = true
}

const handleCloseUploadModal = () => {
  showUploadModal.value = false
}

const handleUpdateDateRange = (newDateRange: [Date, Date]) => {
  dateRange.value = newDateRange
  console.log('Date range updated:', newDateRange)
  // 여기서 필요한 데이터 fetch 등의 작업 수행
}
</script>

<template>
  <div class="flex gap-6 p-6 min-h-[calc(100vh-64px)] bg-gray-50">
    <!-- 메인 콘텐츠 영역 -->
    <div class="flex-[3] flex flex-col gap-4 h-[calc(100vh-88px)] overflow-y-auto">
      <ChartHeader 
        @open-upload-modal="handleOpenUploadModal"
        @update-date-range="handleUpdateDateRange"
      />
      <ChartGrid />
    </div>

    <GoalsSidebar :showUploadModal="showUploadModal" />

    <UploadModal
      :show="showUploadModal"
      @close="handleCloseUploadModal"
    />
  </div>
</template>
