<script setup>
import { ref, watch } from "vue";
import http from "axios";
const { VITE_API_URL } = import.meta.env;

const pageSize = ref(5);
const keyword = ref("first_name");
const pageNum = ref(1);
const input = ref("");
const empList = ref([]);

// 페이징 관련 상태 추가
const total = ref(0);
const pages = ref(0);
const isFirstPage = ref(true);
const isLastPage = ref(true);

const empWithPage = async () => {
  if (!input.value) {
    empList.value = [];
    total.value = 0;
    pages.value = 0;
    return;
  }

  try {
    const res = await http.post(`${VITE_API_URL}/employees/page/emp`, {
      pageNum: pageNum.value,
      pageSize: pageSize.value,
      keyword: keyword.value,
      search: input.value,
    });
    empList.value = res.data.list;

    total.value = res.data.total;
    pages.value = res.data.pages;
    isFirstPage.value = res.data.isFirstPage;
    isLastPage.value = res.data.isLastPage;
  } catch (error) {
    console.error("직원 검색 중 오류 발생:", error);
    empList.value = [];
    total.value = 0;
    pages.value = 0;
  }
};

const increasePageNum = () => {
  if (!isLastPage.value) pageNum.value++;
};

const decreasePageNum = () => {
  if (!isFirstPage.value) pageNum.value--;
};

watch(
  input,
  async () => {
    pageNum.value = 1; // 검색어 변경시 첫 페이지로 리셋
    await empWithPage();
  },
  { immediate: false } // 즉시 실행은 하지 않음
);

watch(
  [pageNum, keyword],
  async () => {
    if (input.value) {
      await empWithPage();
    }
  },
  { immediate: false }
);
</script>

<template>
  <div class="flex flex-col w-[600px] my-4">
    <div class="flex gap-2 relative">
      <select
        class="w-[30%] border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#543FEB] focus:border-transparent transition-all duration-200 hover:border-[#543FEB] bg-white"
        name="keyword"
        id="keyword"
        v-model="keyword"
      >
        <option value="first_name">이름</option>
        <option value="email">이메일</option>
      </select>
      <div class="relative w-[70%]">
        <input
          class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#543FEB] focus:border-transparent transition-all duration-200 hover:border-[#543FEB]"
          type="search"
          v-model="input"
        />
        <!-- 검색 결과 드롭다운 -->
        <div
          v-if="empList.length > 0"
          class="absolute w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-[300px] overflow-y-auto z-50"
        >
          <div
            v-for="e in empList"
            :key="e.employeeId"
            class="px-4 py-2 hover:bg-gray-100 cursor-pointer transition-colors duration-200"
          >
            <div class="flex justify-between items-center">
              <div>
                <span class="font-medium"
                  >{{ e.firstName }} {{ e.lastName }}</span
                >
                <span class="text-sm text-gray-500 ml-2"
                  >#{{ e.employeeId }}</span
                >
              </div>
              <span class="text-sm text-gray-500">{{ e.email }}</span>
            </div>
          </div>
          <!-- 페이지네이션 -->
          <div
            class="flex items-center justify-between px-4 py-2 bg-gray-50 border-t border-gray-200"
          >
            <div class="text-sm text-gray-500">총 {{ total }}건</div>
            <div class="flex items-center gap-2">
              <button
                @click="decreasePageNum"
                :disabled="isFirstPage"
                :class="[
                  'p-1 rounded transition-colors duration-200',
                  isFirstPage
                    ? 'text-gray-400 cursor-not-allowed'
                    : 'text-[#543FEB] hover:bg-[#543FEB] hover:text-white',
                ]"
              >
                &lt;
              </button>
              <span class="text-sm">{{ pageNum }} / {{ pages }}</span>
              <button
                @click="increasePageNum"
                :disabled="isLastPage"
                :class="[
                  'p-1 rounded transition-colors duration-200',
                  isLastPage
                    ? 'text-gray-400 cursor-not-allowed'
                    : 'text-[#543FEB] hover:bg-[#543FEB] hover:text-white',
                ]"
              >
                &gt;
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
select {
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23666666'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 0.75rem center;
  background-size: 1rem;
  padding-right: 2.5rem;
}

select:focus {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23543FEB'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E");
}

/* 드롭다운 스크롤바 스타일링 */
.overflow-y-auto::-webkit-scrollbar {
  width: 6px;
}

.overflow-y-auto::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 3px;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 3px;
}

.overflow-y-auto::-webkit-scrollbar-thumb:hover {
  background: #555;
}
</style>
