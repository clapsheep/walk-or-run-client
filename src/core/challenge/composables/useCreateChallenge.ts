import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useModalStore } from '@/stores/modalStore'
import { addChallengeScheduleFetch } from '../AdminChallengeApi'
import { validateChallengeForm } from '../utils/challengeValidation'
import type { ChallengeErrors } from '../utils/challengeValidation'
import { setError, setLoading } from '../utils/settingUtils'
import { Challenge } from '../ChallengeType'
import { addChallengeFetch } from '../AdminChallengeApi'
import { useUserStore } from '@/stores/userStore'

export const useCreateChallenge = () => {
  const router = useRouter()
  const modalStore = useModalStore()
  const isLoading = ref(false)
  const isRecurring = ref(false)
  const error = ref('')
  const errors = ref<ChallengeErrors>({})
  const userStore = useUserStore()

  const categoryOptions = {
    '1': '뛰기',
    '2': '걷기',
  }

  const form = ref<Challenge>({
    challengeCategoryCode: 0,
    challengeTitle: '',
    challengeDescription: '',
    challengeAuthorId: '',
    challengeTargetCnt: 0,
    challengeCreateDate: '',
    challengeDeleteDate: '',
    challengeSchedulerCycle: undefined
  })

  const validateForm = () => {
    errors.value = validateChallengeForm(form.value)
    return Object.keys(errors.value).length === 0
  }

  const isFormValid = computed(() => {
    return (
      form.value.challengeTitle &&
      form.value.challengeDescription &&
      (form.value.challengeTargetCnt ?? 0) > 0 &&
      form.value.challengeCategoryCode &&
      form.value.challengeCreateDate &&
      form.value.challengeDeleteDate &&
      (!isRecurring.value || (isRecurring.value && form.value.challengeSchedulerCycle)) &&
      Object.keys(errors.value).length === 0
    )
  })

  const submitForm = async () => {
    if (isLoading.value || !isFormValid.value) return

    if (!validateForm()) return

    const state = { loading: isLoading, error }
    setLoading(state, true)
    setError(state, '')

    try {
      // API 요청을 위한 데이터 변환
      const challengeData = {
        challengeAuthorId: userStore.userId ?? '',
        challengeTitle: form.value.challengeTitle,
        challengeDescription: form.value.challengeDescription,
        challengeCategoryCode: Number(form.value.challengeCategoryCode),
        challengeTargetCnt: form.value.challengeTargetCnt,
        challengeSchedulerCycle: isRecurring ? Number(form.value.challengeSchedulerCycle) : 0,
        challengeCreateDate: form.value.challengeCreateDate,
        challengeDeleteDate: form.value.challengeDeleteDate
      }
      console.log(challengeData)

      const response = await addChallengeFetch(challengeData)
      console.log(response)

      if (response.data.code === 200) {
        modalStore.openModal({
          title: '챌린지 생성 성공',
          content: '챌린지가 성공적으로 생성되었습니다!',
          onConfirm: () => router.push('/admin/challenges')
        })
      } else {
        error.value = response.data.message || '챌린지 생성에 실패했습니다.'
      }
    } catch (err: any) {
      error.value = '챌린지 생성 중 오류가 발생했습니다.'
      modalStore.openModal({
        title: '챌린지 생성 실패',
        content: '챌린지 생성 중 오류가 발생했습니다. 다시 시도해주세요.'
      })
    } finally {
      isLoading.value = false
    }
  }

  return {
    form,
    errors,
    isLoading,
    isRecurring,
    error,
    isFormValid,
    submitForm,
    categoryOptions
  }
}
