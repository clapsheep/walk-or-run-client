import { useModalStore } from '@/stores/modalStore'
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import type { ChallengeErrors, ChallengeFormType } from '../utils/challengeValidation'
import { validateChallengeForm } from '../utils/challengeValidation'
import { setError, setLoading } from '../utils/settingUtils'
import ApiResponse from '@/core/common/types/ApiResponse'
import { useUserStore } from '@/stores/userStore'
import { AxiosResponse } from 'axios'



export const useCreateChallenge = (addChallengeFetch: (challenge: ChallengeFormType) => Promise<AxiosResponse<ApiResponse>>, addChallengeScheduleFetch: (challenge: ChallengeFormType) => Promise<AxiosResponse<ApiResponse>>) => {
  const router = useRouter()
  const modalStore = useModalStore()
  const userStore = useUserStore()
  const isLoading = ref(false)
  const isRecurring = ref(false)
  const error = ref('')
  const errors = ref<ChallengeErrors>({})

  const categoryOptions = {
    '1': '뛰기',
    '2': '걷기',
  }

  const challengeForm = ref<ChallengeFormType>({
    challengeCategoryCode: 0,
    challengeTitle: '',
    challengeDescription: '',
    challengeAuthorId: 0,
    challengeTargetCnt: 0,
    challengeCreateDate: '',
    challengeDeleteDate: '',
    challengeSchedulerCycle: 0,
  })

  const validateForm = () => {
    errors.value = validateChallengeForm(challengeForm.value,isRecurring.value)
    return Object.keys(errors.value).length === 0
  }

  const isFormValid = computed(() => {
    return (
      challengeForm.value.challengeTitle &&
      challengeForm.value.challengeDescription &&
      (challengeForm.value.challengeTargetCnt ?? 0) > 0 &&
      challengeForm.value.challengeCategoryCode &&
      challengeForm.value.challengeCreateDate &&
      challengeForm.value.challengeDeleteDate &&
      (!isRecurring.value || (isRecurring.value && challengeForm.value.challengeSchedulerCycle)) &&
      Object.keys(errors.value).length === 0
    )
  })

  const handleSubmit = async () => {
    if (isLoading.value || !isFormValid.value) return

    if (!validateForm()) return

    const state = { loading: isLoading, error }
    setLoading(state, true)
    setError(state, '')

    try {
      // API 요청을 위한 데이터 변환
      const challengeData: ChallengeFormType = {
        challengeAuthorId: Number(userStore.userId),
        challengeTitle: challengeForm.value.challengeTitle,
        challengeDescription: challengeForm.value.challengeDescription,
        challengeCategoryCode: Number(challengeForm.value.challengeCategoryCode),
        challengeTargetCnt: challengeForm.value.challengeTargetCnt,
        challengeSchedulerCycle: isRecurring ? challengeForm.value.challengeSchedulerCycle : 0,
        challengeCreateDate: new Date(challengeForm.value.challengeCreateDate).toISOString().split('T')[0],
        challengeDeleteDate: new Date(challengeForm.value.challengeDeleteDate).toISOString().split('T')[0],
      }
      console.log(challengeData);

      let response;
      if(isRecurring.value) {
        response = await addChallengeScheduleFetch(challengeData)
      }else{
        response = await addChallengeFetch(challengeData)
        console.log(response);

      }


      if (response.status === 201) {
        modalStore.openModal({
          title: '챌린지 생성 성공',
          content: '챌린지가 성공적으로 생성되었습니다!',
          onConfirm: () => router.push('/admin/challenges/ongoing')
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
    challengeForm,
    errors,
    isLoading,
    isRecurring,
    error,
    isFormValid,
    handleSubmit,
    categoryOptions
  }
}
