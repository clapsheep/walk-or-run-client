import { ref } from 'vue'
import { useRouter } from 'vue-router'
import User from '../UserType'
import { useUserFollow } from './useUserFollow'
import { useUserUnfollow } from './useUserUnfollow'
import { useUserFollowerList } from './useUserFollowerList'
import { useUserFollowingList } from './useUserFollowingList'
import { followUserFetch, getFollowersFetch, getFollowingsFetch, unfollowUserFetch } from '../FollowApi'

export const useMyFollows = () => {
  const router = useRouter()
  const activeTab = ref<'followers' | 'following'>('followers')
  const followers = ref<User[]>([])
  const following = ref<User[]>([])
  const loading = ref(false)
  const error = ref('')

  const { handleFollow } = useUserFollow(followUserFetch)
  const { handleUnfollow } = useUserUnfollow(unfollowUserFetch)
  const { fetchFollowers } = useUserFollowerList(getFollowersFetch)
  const { fetchFollowings } = useUserFollowingList(getFollowingsFetch)

  const isFollowing = (userId: number) => {
    return following.value.some(f => Number(f.userId) === userId)
  }

  const handleTabChange = async (tab: 'followers' | 'following') => {
    activeTab.value = tab
    if (tab === 'followers') {
      const response = await fetchFollowers()
      if (response &&Array.isArray(response.data)) {
        followers.value = response.data
      }
    } else {
      const response = await fetchFollowings()
      if (response &&Array.isArray(response.data)) {
        following.value = response.data;
      }
    }
  }

  const toggleFollow = async (userId: number) => {
    if (isFollowing(userId)) {
      const response = await handleUnfollow(userId)
      if (response && response.data.message === 'success') {
        // 팔로잉 목록에서 제거
        following.value = following.value.filter(f => Number(f.userId) !== userId)
      }
    } else {
      const response = await handleFollow(userId)
      if (response && response.data.message === 'success') {
        // 팔로잉 목록에 추가
        const newFollowing = followers.value.find(f => Number(f.userId) === userId)
        if (newFollowing) {
          following.value = [...following.value, newFollowing]
        }
      }
    }
  }

  return {
    activeTab,
    followers,
    following,
    loading,
    error,
    handleTabChange,
    handleFollow,
    handleUnfollow,
    isFollowing,
    toggleFollow
    }
}
