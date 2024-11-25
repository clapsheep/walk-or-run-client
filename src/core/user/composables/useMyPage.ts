// composables/useMyPage.ts
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const tabs = [
  { id: 'profile', label: '프로필', path: '/account/mypage/profile' },
  { id: 'challenges', label: '참여 중인 챌린지', path: '/account/mypage/challenges' },
  { id: 'goals', label: '나의 목표', path: '/account/mypage/goals' },
  { id: 'follows', label: '팔로워/팔로잉', path: '/account/mypage/follows' },
]

export const useMyPage = () => {
  const router = useRouter()
  const activeTab = ref('profile')

  const handleTabChange = (tabId: string) => {
    const tab = tabs.find(t => t.id === tabId)
    if (tab) {
      router.push(tab.path)
    }
  }

  return {
    tabs,
    activeTab,
    handleTabChange
  }
}
