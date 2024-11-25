<script setup lang="ts">
import { useUserSearch } from '@/core/user/composables/useUserSearch'
import { searchUsersFetch } from '@/core/user/UserApi'
import { useMyFollows } from '@/core/user/composables/useMyFollows'
import SearchBar from '@/components/molecules/SearchBar.vue'
import BasicButton from '@/components/atoms/BasicButton.vue'
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
  handleSearchSubmit
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
  <div class="min-h-screen bg-gray-100 p-6">
    <div class="container mx-auto">
      <div class="bg-white rounded-lg shadow-sm p-6">
        <h1 class="text-2xl font-bold text-gray-800 mb-6">유저 찾기</h1>

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
            <div class="bg-gray-100 p-4 rounded-lg">
              <div class="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
              <div class="h-3 bg-gray-200 rounded w-1/2"></div>
            </div>
          </div>
        </div>

        <!-- 에러 메시지 -->
        <div v-else-if="error" class="text-center py-8">
          <p class="text-red-500">{{ error }}</p>
        </div>

        <!-- 검색 결과 -->
        <div v-else-if="users.length > 0" class="space-y-4">
          <div
            v-for="user in users"
            :key="user.userId"
            class="bg-gray-50 p-4 rounded-lg flex items-center justify-between hover:bg-gray-100 transition-colors"
          >
            <div>
              <h3 class="font-medium text-gray-800">{{ user.userNickname }}</h3>
              <p class="text-sm text-gray-600">{{ user.userEmail }}</p>
            </div>
            <!-- 팔로우/언팔로우 버튼 -->
            <div class="flex space-x-2">
              <BasicButton
                :variant="isFollowing(Number(user.userId)) ? 'outlined' : 'filled'"
                :color="isFollowing(Number(user.userId)) ? 'primary' : 'secondary'"
                size="sm"
                @click="handleFollowToggle(Number(user.userId))"
              >
                {{ isFollowing(Number(user.userId)) ? '언팔로우' : '팔로우' }}
              </BasicButton>
            </div>
          </div>

          <!-- 페이지네이션 -->
          <div v-if="pageInfo.totalPages > 1" class="flex justify-center space-x-2 mt-6">
            <button
              v-for="page in pageInfo.totalPages"
              :key="page"
              @click="handleSearch(page)"
              :class="[
                'px-3 py-1 rounded-md',
                page === pageInfo.pageNumber
                  ? 'bg-primary-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              ]"
            >
              {{ page }}
            </button>
          </div>
        </div>

        <!-- 검색 결과 없음 -->
        <div v-else class="text-center py-8">
          <p class="text-gray-500">검색 결과가 없습니다.</p>
        </div>
      </div>
    </div>
  </div>
</template>
