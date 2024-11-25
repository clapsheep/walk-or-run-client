import { ref } from 'vue'
import { createChallenge, type CreateChallengeRequest } from '../services/challengeService'
import { setError, setLoading } from '../utils/settingUtils'

export const useCreateChallenge = () => {
  const loading = ref(false)
  const error = ref('')
  const success = ref(false)

  const challengeData = ref<CreateChallengeRequest>({
    challengeName: '',
    challengeContent: '',
    challengeStartDate: '',
    challengeEndDate: '',
    challengeTargetTime: 0,
    challengeTargetCount: 0
  })

  const resetForm = () => {
    challengeData.value = {
      challengeName: '',
      challengeContent: '',
      challengeStartDate: '',
      challengeEndDate: '',
      challengeTargetTime: 0,
      challengeTargetCount: 0
    }
    error.value = ''
    success.value = false
  }

  const validateForm = (): boolean => {
    if (!challengeData.value.challengeName.trim()) {
      error.value = '챌린지 이름을 입력해주세요.'
      return false
    }
    if (!challengeData.value.challengeContent.trim()) {
      error.value = '챌린지 내용을 입력해주세요.'
      return false
    }
    if (!challengeData.value.challengeStartDate) {
      error.value = '시작 날짜를 선택해주세요.'
      return false
    }
    if (!challengeData.value.challengeEndDate) {
      error.value = '종료 날짜를 선택해주세요.'
      return false
    }
    if (challengeData.value.challengeTargetTime <= 0) {
      error.value = '목표 시간을 입력해주세요.'
      return false
    }
    if (challengeData.value.challengeTargetCount <= 0) {
      error.value = '목표 횟수를 입력해주세요.'
      return false
    }
    return true
  }

  const handleImageUpload = (event: Event) => {
    const input = event.target as HTMLInputElement
    if (input.files && input.files[0]) {
      challengeData.value.challengeImage = input.files[0]
    }
  }

  const handleSubmit = async () => {
    const state = { loading, error }
    setLoading(state, true)
    setError(state, '')
    success.value = false

    try {
      if (!validateForm()) {
        setLoading(state, false)
        return
      }

      const response = await createChallenge(challengeData.value)
      
      if (response.status === 201 || response.status === 200) {
        success.value = true
        resetForm()
      } else {
        setError(state, '챌린지 생성에 실패했습니다.')
      }
    } catch (err: any) {
      setError(state, err.message || '챌린지 생성 중 오류가 발생했습니다.')
    } finally {
      setLoading(state, false)
    }
  }

  return {
    loading,
    error,
    success,
    challengeData,
    handleSubmit,
    handleImageUpload,
    resetForm
  }
}
