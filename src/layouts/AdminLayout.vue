<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import Header from '@/components/atoms/Header.vue'
import TabNavigation from '@/components/molecules/TabNavigation.vue'

const router = useRouter()
const route = useRoute()

const tabs = [
  { id: 'ongoing', label: '진행중인 챌린지', path: '/admin/challenges/ongoing' },
  { id: 'ended', label: '종료된 챌린지', path: '/admin/challenges/ended' },
  { id: 'recurring', label: '스케쥴 관리', path: '/admin/challenges/schedule' }
]

const activeTab = ref('ongoing')

// route가 변경될 때 activeTab 업데이트
watch(
  () => route.path,
  (path) => {
    const currentTab = tabs.find(tab => path.includes(tab.id))
    if (currentTab) {
      activeTab.value = currentTab.id
    }
  },
  { immediate: true }
)

const navigateToCreateChallenge = () => {
  router.push('/admin/challenge/create')
}

const handleTabChange = (tabId: string) => {
  const tab = tabs.find(t => t.id === tabId)
  if (tab) {
    router.push(tab.path)
  }
}
</script>

<template>
  <div class="min-h-screen bg-gray-100">
    <Header title="챌린지 관리" :showBackButton="false" />

    <div class="p-4">
      <TabNavigation
        v-model:activeTab="activeTab"
        :tabs="tabs"
        :addButtonTitle="activeTab === 'recurring' ? '스케줄 등록하기' : '챌린지 추가하기'"
        @update:activeTab="handleTabChange"
        @onAddClick="navigateToCreateChallenge"
        exact
      />

      <div class="bg-white rounded-lg shadow-sm p-6">
        <RouterView />
      </div>
    </div>
  </div>
</template>
