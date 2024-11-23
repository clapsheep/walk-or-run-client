import { defineStore } from 'pinia'
import { reactive } from 'vue'

interface ModalData {
  title?: string
  content: string
  confirmText?: string
  cancelText?: string
  onConfirm?: () => void
  onCancel?: () => void
}

interface ModalState {
  isOpen: boolean
  data: ModalData | null
}

export const useModalStore = defineStore('modal', () => {
  const modal = reactive<ModalState>({
    isOpen: false,
    data: null,
  })

  const openModal = (data: ModalData) => {
    modal.data = {
      confirmText: '확인',
      ...data
    }
    modal.isOpen = true
  }

  const closeModal = () => {
    modal.isOpen = false
    modal.data = null
  }

  const handleConfirm = () => {
    modal.data?.onConfirm?.()
    closeModal()
  }

  const handleCancel = () => {
    modal.data?.onCancel?.()
    closeModal()
  }

  return {
    modal,
    openModal,
    closeModal,
    handleConfirm,
    handleCancel
  }
})
