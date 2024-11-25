<!-- MyPageView.vue -->
<script setup lang="ts">
import { watch } from 'vue'
import { useRoute } from 'vue-router'
import Header from '@/components/atoms/Header.vue'
import TabNavigation from '@/components/molecules/TabNavigation.vue'
import { useMyPage } from '@/core/user/composables/useMyPage'

const route = useRoute()
const {
  tabs,
  activeTab,
  handleTabChange
} = useMyPage()

// 현재 경로에 따라 activeTab 업데이트
watch(
  () => route.path,
  (path) => {
    const tab = tabs.find(t => path.includes(t.id))
    if (tab) {
      activeTab.value = tab.id
    }
  },
  { immediate: true }
)
</script>

<template>
  <div class="min-h-screen bg-gray-100">
    <Header title="마이페이지" :showBackButton="false" />

    <div class="p-4">
      <TabNavigation
        :tabs="tabs"
        :active-tab="activeTab"
        @tab-click="handleTabChange"
      />

      <div class="bg-white rounded-lg shadow-sm p-6">
        <RouterView />
      </div>
    </div>
  </div>
</template>
