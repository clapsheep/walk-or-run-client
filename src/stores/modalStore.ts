import { defineStore } from 'pinia'
import { reactive } from 'vue'

// 모달 타입 정의
export type ModalType = 'oneButtonModal' | 'twoButtonModal' | 'confirmModal'

interface ModalData {
  title?: string
  content: string
  redirectPath?: string
}

type ModalState = Record<
  ModalType,
  {
    isOpen: boolean
    data: ModalData | null
  }
>

export const useModalStore = defineStore('modal', () => {
  // 모달 상태 초기화
  const modals = reactive<ModalState>({
    oneButtonModal: {
      isOpen: false,
      data: null,
    },
    twoButtonModal: {
      isOpen: false,
      data: null,
    },
    confirmModal: {
      isOpen: false,
      data: null,
    },
  })

  // 모달 열기
  const openModal = (modalType: ModalType, data: ModalData) => {
    modals[modalType].isOpen = true
    modals[modalType].data = data
  }

  // 모달 닫기
  const closeModal = (modalType: ModalType) => {
    modals[modalType].isOpen = false
    modals[modalType].data = null
  }

  // 모든 모달 닫기
  const closeAllModals = () => {
    Object.keys(modals).forEach((modalType) => {
      modals[modalType as ModalType].isOpen = false
      modals[modalType as ModalType].data = null
    })
  }

  return {
    modals,
    openModal,
    closeModal,
    closeAllModals,
  }
})
