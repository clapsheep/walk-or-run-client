<script setup lang="ts">
import { PlusCircleIcon } from '@heroicons/vue/24/outline'
import NavButton from '@/components/atoms/NavButton.vue'

interface Tab {
  id: string
  label: string
  path: string
}

interface Props {
  tabs: Tab[]
  activeTab: string
  showAddButton?: boolean
  addButtonTitle?: string
  exact?: boolean
}

interface Emits {
  (e: 'update:activeTab', value: string): void
  (e: 'onAddClick'): void
}

const props = withDefaults(defineProps<Props>(), {
  showAddButton: true,
  addButtonTitle: '추가하기',
  exact: false
})

const emit = defineEmits<Emits>()

const handleTabClick = (tabId: string) => {
  emit('update:activeTab', tabId)
}

const handleAddClick = () => {
  emit('onAddClick')
}
</script>

<template>
  <div class="flex items-center justify-between mb-6 bg-white p-1 rounded-lg shadow-sm">
    <nav class="flex space-x-1">
      <NavButton
        v-for="tab in tabs"
        :key="tab.id"
        :to="tab.path"
        :name="tab.label"
        :exact="exact"
        class="px-4 py-2"
        @click="handleTabClick(tab.id)"
      />
    </nav>
    <button
      v-if="showAddButton"
      class="flex items-center gap-2 px-4 py-2 text-primary-500 hover:text-primary-600 transition-colors duration-200"
      @click="handleAddClick"
    >
      <PlusCircleIcon class="w-5 h-5" />
      <span>{{ addButtonTitle }}</span>
    </button>
  </div>
</template>
