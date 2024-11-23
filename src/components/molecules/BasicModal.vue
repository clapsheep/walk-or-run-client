<script setup lang="ts">
import { computed } from 'vue'
import { useModalStore } from '@/stores/modalStore'
import BasicButton from '@/components/atoms/BasicButton.vue'

const modalStore = useModalStore()

const isOpen = computed(() => modalStore.modal.isOpen)
const modalData = computed(() => modalStore.modal.data)

defineEmits(['confirm', 'cancel'])
</script>

<template>
  <Teleport to="body">
    <div
      v-if="isOpen"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      @click.self="modalStore.handleCancel"
    >
      <div class="w-96 rounded-[20px] bg-white p-8 text-center shadow-lg">
        <h2 class="mb-4 text-xl font-bold" v-if="modalData?.title">
          {{ modalData?.title }}
        </h2>
        <p class="mb-8 whitespace-pre-line text-gray-600">{{ modalData?.content }}</p>
        <div class="flex justify-center gap-2">
          <BasicButton @click="modalStore.handleConfirm">
            {{ modalData?.confirmText || '확인' }}
          </BasicButton>
          <BasicButton
            v-if="modalData?.cancelText"
            @click="modalStore.handleCancel"
            color="secondary"
          >
            {{ modalData?.cancelText }}
          </BasicButton>
        </div>
      </div>
    </div>
  </Teleport>
</template>
