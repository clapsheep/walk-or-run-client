import { ref, onMounted } from "vue"
import { Challenge } from "../ChallengeType"
import { setError, setLoading } from "../utils/settingUtils"
import router from "@/router"
import { PageResponse } from "@/core/common/types/PageType"

export const useGetUserChallenges = (
  getUserChallengeFetch: (userId: number, page: number) => Promise<PageResponse<Challenge>>,
  userId: number
) => {
  const loading = ref(false)
  const error = ref('')
  const challenges = ref<Challenge[]>([])
  const pageInfo = ref({
    totalPages: 0,
    totalElements: 0,
    pageSize: 10,
    pageNumber: 0
  })

  const fetchUserChallenges = async () => {
    const state = { loading, error }
    setLoading(state, true)
    setError(state, '')

    try {
      const data = await getUserChallengeFetch(userId, pageInfo.value.pageNumber)
      console.log("data", data)
      challenges.value = data.content
      pageInfo.value = {
        ...pageInfo.value,
        ...data.pageInfo
      }

      if(challenges.value.length === 0) {
        error.value = '참여한 챌린지가 없습니다.'
      }
    } catch (err) {
      setError(state, '챌린지 목록을 불러오는데 실패했습니다.')
      console.error('Error fetching user challenges:', err)
    } finally {
      setLoading(state, false)
    }
  }

  const goToDetail = (challenge: Challenge) => {
    router.push(`/challenge/${challenge.challengeId}`)
  }

  const changePage = async (page: number) => {
    pageInfo.value.pageNumber = page - 1  // 서버는 0-based index 사용
    await fetchUserChallenges()
  }

  // 컴포저블이 생성될 때 자동으로 데이터를 불러옵니다
  onMounted(fetchUserChallenges)

  return {
    loading,
    error,
    challenges,
    pageInfo,
    fetchUserChallenges,
    goToDetail,
    changePage
  }
}
