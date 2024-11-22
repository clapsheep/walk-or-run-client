<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useModalStore } from '@/stores/modalStore'
import type { ModalType } from '@/stores/modalStore'
import BasicButton from '@/components/atoms/BasicButton.vue'

const props = defineProps<{
  modalType: ModalType
}>()

const router = useRouter()
const modalStore = useModalStore()

const isOpen = computed(() => modalStore.modals[props.modalType].isOpen)
const modalData = computed(() => modalStore.modals[props.modalType].data)

const handleConfirm = () => {
  const redirectPath = modalData.value?.redirectPath
  modalStore.closeModal(props.modalType)
  if (redirectPath) {
    console.log('Redirecting to:', redirectPath)
    router.push(redirectPath)
  }
}

const handleClose = () => {
  modalStore.closeModal(props.modalType)
}
</script>
<template>
  <Teleport to="body">
    <div
      v-if="isOpen"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      @click.self="handleClose"
    >
      <div class="w-96 rounded-[20px] bg-white p-8 text-center shadow-lg">
        <h2 class="mb-4 text-xl font-bold" v-if="modalData?.title">
          {{ modalData.title }}
        </h2>
        <p class="mb-8 text-gray-600 whitespace-pre-line">{{ modalData?.content }}</p>
        <div class="flex justify-center">
          <BasicButton @click="handleConfirm"> 확인 </BasicButton>
          <BasicButton v-if="modalData?.cancelButton" @click="handleClose"> {{modalData?.cancelButton}} </BasicButton>
        </div>
      </div>
    </div>
  </Teleport>
</template>
