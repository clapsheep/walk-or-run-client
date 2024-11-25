<script setup lang="ts">
interface PageInfo {
  currentPage: number
  totalPages: number
  pageSize: number
}

const props = defineProps<{
  pageInfo: PageInfo
}>()

const emit = defineEmits<{
  (e: 'pageChange', page: number, pageSize: number): void
}>()

const changePage = (page: number) => {
  emit('pageChange', page, props.pageInfo.pageSize)
}

const getPageNumbers = () => {
  const current = props.pageInfo.currentPage
  const total = props.pageInfo.totalPages
  const delta = 2 // 현재 페이지 양쪽에 표시할 페이지 수
  const range: (number | string)[] = []

  for (let i = 1; i <= total; i++) {
    if (
      i === 1 || // 첫 페이지
      i === total || // 마지막 페이지
      (i >= current - delta && i <= current + delta) // 현재 페이지 주변
    ) {
      range.push(i)
    } else if (range[range.length - 1] !== '...') {
      range.push('...')
    }
  }

  return range
}
</script>

<template>
  <nav class="flex items-center justify-center space-x-1" aria-label="Pagination">
    <!-- 이전 페이지 버튼 -->
    <button
      @click="changePage(pageInfo.currentPage - 1)"
      :disabled="pageInfo.currentPage === 1"
      class="relative inline-flex items-center rounded-lg px-2 py-2 text-sm font-medium transition-colors duration-200"
      :class="[
        pageInfo.currentPage === 1
          ? 'text-gray-400 cursor-not-allowed'
          : 'text-gray-700 hover:bg-primary-50 hover:text-primary-600'
      ]"
    >
      <span class="sr-only">이전 페이지</span>
      <svg
        class="h-5 w-5"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        aria-hidden="true"
      >
        <path
          fill-rule="evenodd"
          d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
          clip-rule="evenodd"
        />
      </svg>
    </button>

    <!-- 페이지 번호 -->
    <div class="flex items-center space-x-1">
      <button
        v-for="page in getPageNumbers()"
        :key="page"
        @click="typeof page === 'number' ? changePage(page) : null"
        :disabled="typeof page === 'string'"
        :class="[
          'relative inline-flex items-center px-3 py-2 text-sm font-medium transition-colors duration-200 rounded-lg',
          typeof page === 'string'
            ? 'text-gray-700 cursor-default'
            : page === pageInfo.currentPage
            ? 'z-10 bg-primary-50 text-primary-600 border-primary-500 ring-1 ring-primary-500'
            : 'text-gray-700 hover:bg-primary-50 hover:text-primary-600'
        ]"
      >
        {{ page }}
      </button>
    </div>

    <!-- 다음 페이지 버튼 -->
    <button
      @click="changePage(pageInfo.currentPage + 1)"
      :disabled="pageInfo.currentPage >= pageInfo.totalPages"
      class="relative inline-flex items-center rounded-lg px-2 py-2 text-sm font-medium transition-colors duration-200"
      :class="[
        pageInfo.currentPage >= pageInfo.totalPages
          ? 'text-gray-400 cursor-not-allowed'
          : 'text-gray-700 hover:bg-primary-50 hover:text-primary-600'
      ]"
    >
      <span class="sr-only">다음 페이지</span>
      <svg
        class="h-5 w-5"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        aria-hidden="true"
      >
        <path
          fill-rule="evenodd"
          d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
          clip-rule="evenodd"
        />
      </svg>
    </button>
  </nav>
</template>
