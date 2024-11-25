import { ref } from 'vue'
import type User from '../UserType'
import type { PageResponse } from '@/core/common/types/PageType'
import { setError, setLoading } from '@/core/challenge/utils/settingUtils'

// 검색 옵션 타입 정의
type SearchOptionKey = 'nickname' | 'email'
type SearchOptions = Record<SearchOptionKey, string>

export const useUserSearch = (
  searchUsersFetch: (key: string, value: string, page?: number, size?: number) => Promise<PageResponse<User>>
) => {
  const loading = ref(false)
  const error = ref('')
  const users = ref<User[]>([])
  const searchKey = ref<SearchOptionKey>('nickname') // 기본값은 닉네임으로 검색
  const searchValue = ref('')
  const pageInfo = ref({
    totalPages: 0,
    totalElements: 0,
    pageSize: 10,
    pageNumber: 1
  })

  const searchOptions: SearchOptions = {
    nickname: '닉네임',
    email: '이메일'
  }

  const handleSearch = async (page: number = 1) => {
    await searchUsers(searchKey.value, searchValue.value, page)
  }

  const handleSearchSubmit = ({ keyword, input }: { keyword: SearchOptionKey; input: string }) => {
    searchKey.value = keyword;
    searchValue.value = input;
    handleSearch(1);
  };

  const searchUsers = async (key: string, value: string, page: number = 1) => {
    const state = { loading, error }
    setLoading(state, true)
    setError(state, '')

    try {
      const data = await searchUsersFetch(key, value, page)
      users.value = data.content
      pageInfo.value = {
        ...pageInfo.value,
        totalPages: data.pageInfo.totalPages,
        totalElements: data.pageInfo.totalElements,
        pageSize: data.pageInfo.pageSize,
        pageNumber: page
      }

      if (users.value.length === 0) {
        setError(state, '검색 결과가 없습니다.')
      }
    } catch (err) {
      console.error('Error searching users:', err)
      setError(state, '유저 검색 중 오류가 발생했습니다.')
    } finally {
      setLoading(state, false)
    }
  }

  return {
    loading,
    error,
    users,
    pageInfo,
    searchKey,
    searchValue,
    searchOptions,
    handleSearch,
    handleSearchSubmit,
    searchUsers
  }
}
