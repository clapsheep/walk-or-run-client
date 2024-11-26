<script setup lang="ts">
import { useUserSearch } from '@/core/user/composables/useUserSearch'
import { searchUsersFetch } from '@/core/user/UserApi'
import { useMyFollows } from '@/core/user/composables/useMyFollows'
import SearchBar from '@/components/molecules/SearchBar.vue'
import FollowButton from '@/components/molecules/FollowButton.vue'
import Header from '@/components/atoms/Header.vue'
import Pagination from '@/components/atoms/Pagination.vue'
import { onMounted } from 'vue'

// 검색 관련 기능
const {
  loading,
  error,
  users,
  pageInfo,
  searchKey,
  searchValue,
  searchOptions,
  handleSearch,
  handleSearchSubmit,
} = useUserSearch(searchUsersFetch)

// 팔로우 관련 기능
const { following, handleFollowings, toggleFollow, isFollowing } = useMyFollows()

// 컴포넌트 마운트 시 팔로우 목록 초기화
onMounted(async () => {
  await handleFollowings()
})

// 팔로우 토글 핸들러
const handleFollowToggle = async (userId: number) => {
  await toggleFollow(userId)
  await handleFollowings() // 팔로우 상태 갱신
}
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <Header title="유저 찾기" :show-back-button="false" />
    <div class="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <div class="rounded-xl bg-white p-6 shadow-lg ring-1 ring-gray-100">
        <!-- 검색 섹션 -->
        <SearchBar
          :options="searchOptions"
          :placeholder="'유저 ' + searchOptions[searchKey] + '으로 검색'"
          :initial-keyword="searchKey"
          button-text="검색"
          v-model:keyword="searchKey"
          v-model:input="searchValue"
          @search="handleSearchSubmit({ keyword: searchKey, input: searchValue })"
          class="mb-8"
        />

        <!-- 로딩 상태 -->
        <div v-if="loading" class="space-y-4">
          <div v-for="n in 3" :key="n" class="animate-pulse">
            <div class="rounded-lg bg-gray-50 p-4">
              <div class="mb-2 h-4 w-1/4 rounded bg-gray-200"></div>
              <div class="h-3 w-1/2 rounded bg-gray-200"></div>
            </div>
          </div>
        </div>

        <!-- 에러 메시지 -->
        <div v-else-if="error" class="flex flex-col items-center justify-center py-12">
          <p class="text-lg text-gray-500">검색 결과가 없습니다.</p>
        </div>

        <!-- 검색 결과 -->
        <div v-else-if="users.length > 0" class="space-y-4">
          <div
            v-for="user in users"
            :key="user.userId"
            class="group relative flex items-center justify-between rounded-xl bg-white p-5 shadow-sm ring-1 ring-gray-100 transition-all duration-200 hover:shadow-md hover:ring-primary-100"
          >
            <div class="flex items-center space-x-4">
              <div class="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
                <span class="text-xl font-medium text-gray-600">{{ user.userNickname[0] }}</span>
              </div>
              <div>
                <h3 class="font-medium text-gray-800 group-hover:text-primary-600">
                  {{ user.userNickname }}
                </h3>
                <p class="text-sm text-gray-500">{{ user.userEmail }}</p>
              </div>
            </div>
            <!-- 팔로우/언팔로우 버튼 -->
            <div class="flex space-x-2">
              <FollowButton
                :is-following="isFollowing(Number(user.userId))"
                @toggle-follow="handleFollowToggle(Number(user.userId))"
              />
            </div>
          </div>

          <!-- 페이지네이션 -->
          <div v-if="pageInfo.totalPages > 1" class="mt-8">
            <Pagination
              :page-info="{
                currentPage: pageInfo.pageNumber,
                totalPages: pageInfo.totalPages,
                pageSize: pageInfo.pageSize,
              }"
              @page-change="handleSearch"
            />
          </div>
        </div>

        <!-- 검색 결과 없음 -->
        <div v-else class="flex flex-col items-center justify-center py-16">
          <div class="mb-4 rounded-full bg-gray-50 p-6">
            <svg
              class="h-12 w-12 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <p class="text-lg text-gray-500">닉네임이나 이메일로 사용자를 검색해보세요.</p>
        </div>
      </div>
    </div>
  </div>
</template>
