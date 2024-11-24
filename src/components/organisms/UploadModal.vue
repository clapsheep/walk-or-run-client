<script setup lang="ts">
import { ref } from 'vue'
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
import { XMarkIcon } from '@heroicons/vue/24/outline'
import { useUserStore } from '@/stores/userStore'
import { uploadRecordFetch } from '@/core/record/recordApi'
import { useUpload } from '@/core/record/composables/useUpload'
import csvIcon from '@/assets/images/csv.svg'

const props = defineProps<{
  show: boolean
}>()

const emit = defineEmits(['close', 'upload-success'])
const userStore = useUserStore()

const {
  selectedFile,
  uploadStatus,
  errors,
  isDragging,
  isValidFile,
  handleFileSelection,
  upload,
  reset
} = useUpload(uploadRecordFetch)

const fileInputRef = ref<HTMLInputElement | null>(null)

const handleDragEnter = (e: DragEvent) => {
  e.preventDefault()
  e.stopPropagation()
  isDragging.value = true
}

const handleDragLeave = (e: DragEvent) => {
  e.preventDefault()
  e.stopPropagation()
  isDragging.value = false
}

const handleDrop = (e: DragEvent) => {
  e.preventDefault()
  e.stopPropagation()
  isDragging.value = false

  const files = e.dataTransfer?.files
  if (files && files.length > 0) {
    handleFileSelection(files[0])
  }
}

const triggerFileInput = () => {
  fileInputRef.value?.click()
}

const handleFileInputChange = (e: Event) => {
  const input = e.target as HTMLInputElement
  if (input.files && input.files.length > 0) {
    handleFileSelection(input.files[0])
  }
}

const uploadFile = async () => {
  if (!userStore.userId) return

  const success = await upload(userStore.userId)
  if (success) {
    emit('upload-success')
    setTimeout(() => {
      emit('close')
      reset()
    }, 1500)
  }
}

const closeModal = () => {
  emit('close')
  reset()
}

</script>

<template>
  <TransitionRoot appear :show="show" as="template">
    <Dialog as="div" class="relative z-50" @close="closeModal">
      <TransitionChild
        as="template"
        enter="duration-300 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-black bg-opacity-25" />
      </TransitionChild>

      <div class="fixed inset-0 overflow-y-auto">
        <div class="flex min-h-full items-center justify-center p-4">
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <DialogPanel class="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 shadow-xl transition-all">
              <div class="flex items-center justify-between mb-4">
                <DialogTitle as="h3" class="text-lg font-medium leading-6 text-gray-900">
                  데이터 업로드
                </DialogTitle>
                <button
                  type="button"
                  class="rounded-md text-gray-400 hover:text-gray-500 focus:outline-none"
                  @click="closeModal"
                >
                  <XMarkIcon class="h-6 w-6" />
                </button>
              </div>

              <div
                class="mt-4 p-6 border-2 border-dashed rounded-lg cursor-pointer transition-all duration-200"
                :class="{
                  'border-primary-300 bg-primary-50': isDragging,
                  'border-gray-300 hover:border-primary-300': !isDragging
                }"
                @dragenter="handleDragEnter"
                @dragover.prevent
                @dragleave="handleDragLeave"
                @drop="handleDrop"
                @click="triggerFileInput"
              >
                <input
                  ref="fileInputRef"
                  type="file"
                  accept=".csv"
                  class="hidden"
                  @change="handleFileInputChange"
                />
                <div class="text-center flex flex-col items-center gap-3">
                  <img :src="csvIcon" alt="csvIcon" class="w-20 h-20" />
                  <div v-if="!selectedFile" class="space-y-2">
                    <div class="text-gray-500">
                      삼성 헬스 운동 데이터 파일을 업로드하세요
                    </div>
                    <div class="text-sm text-gray-400">
                      com.samsung.shealth.exercise.*.csv 파일만 가능
                    </div>
                    <div class="text-sm text-gray-400">
                      최대 파일 크기: 10MB
                    </div>
                  </div>

                  <div v-else class="space-y-3">
                    <div class="text-primary-600 font-medium truncate max-w-[280px] mx-auto">
                      {{ selectedFile.name }}
                    </div>
                    <div class="text-sm text-gray-500">
                      {{ (selectedFile.size / 1024 / 1024).toFixed(2) }} MB
                    </div>
                  </div>
                </div>
              </div>

              <div v-if="errors.file" class="mt-2 text-sm text-red-600">
                {{ errors.file }}
              </div>

              <div class="mt-6 flex justify-end gap-3">
                <button
                  type="button"
                  class="inline-flex justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none"
                  @click="closeModal"
                >
                  취소
                </button>
                <button
                  type="button"
                  class="inline-flex justify-center rounded-md border border-transparent px-4 py-2 text-sm font-medium text-white focus:outline-none"
                  :class="{
                    'bg-primary-600 hover:bg-primary-700': uploadStatus === 'idle' && isValidFile,
                    'bg-gray-400 cursor-not-allowed': !isValidFile || uploadStatus === 'uploading',
                    'bg-green-600': uploadStatus === 'success',
                    'bg-red-600': uploadStatus === 'error'
                  }"
                  :disabled="!isValidFile || uploadStatus === 'uploading' || uploadStatus === 'success'"
                  @click="uploadFile"
                >
                  <span v-if="uploadStatus === 'idle'">업로드</span>
                  <span v-else-if="uploadStatus === 'uploading'">업로드 중...</span>
                  <span v-else-if="uploadStatus === 'success'">완료!</span>
                  <span v-else>실패</span>
                </button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<style>
.dp-custom-menu .dp__action_buttons {
  display: none;
}

/* 파일명 말줄임 스타일 */
.truncate {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
