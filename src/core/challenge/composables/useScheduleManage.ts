import { AxiosResponse } from "axios";
import { Challenge } from "../ChallengeType";
import ApiResponse from "@/core/common/types/ApiResponse";
import { useGetSchedules } from "./useGetSchedules";
import { useUpdateChallengeSchedule } from "./useUpdateChallengeSchedule";
import { useDeleteChallengeSchedule } from "./useDeleteChallengeSchedule";
import { computed, onMounted, ref } from "vue";
import { useRouter } from "vue-router";

export const useScheduleManage = (
  getChallengeSchedulesFetch: () => Promise<AxiosResponse<Challenge[] | ApiResponse>>,
  updateChallengeScheduleFetch: (challenge: Challenge) => Promise<AxiosResponse<ApiResponse>>,
  deleteChallengeScheduleFetch: (challengeId: number) => Promise<AxiosResponse<ApiResponse>>
) => {

  const selectedCycles = ref<{ [key: string]: number }>({})
  const loading = computed(() => fetchLoading.value || updateLoading.value || deleteLoading.value)
  const error = computed(() => fetchError.value || updateError.value || deleteError.value)
  const router = useRouter();

  const {
    fetchLoading,
    fetchError,
    schedules,
    fetchSchedules,
  } = useGetSchedules(getChallengeSchedulesFetch)

  const {
    updateLoading,
    updateError,
    updateSchedule
  } = useUpdateChallengeSchedule(updateChallengeScheduleFetch)

  const {
    deleteLoading,
    deleteError,
    deleteSchedule
  } = useDeleteChallengeSchedule(deleteChallengeScheduleFetch)

  const initializeSelectedCycles = () => {
    schedules.value.forEach(schedule => {
      selectedCycles.value[schedule.challengeId] = schedule.challengeSchedulerCycle ?? 0
    })
  }

  const handleSubmit = async (schedule: Challenge) => {
    const cycle = selectedCycles.value[schedule.challengeId]

    if (cycle === 0) {
      if (await deleteSchedule(schedule)) {
        await fetchSchedules()
      }
    } else {
      if (await updateSchedule(schedule, cycle)) {
        await fetchSchedules()
      }
    }
  }

  const goToEdit = (challengeId: number) => {
    router.push(`/admin/schedule/edit/${challengeId}`)
  }

  return {
    loading,
    error,
    schedules,
    fetchSchedules,
    selectedCycles,
    initializeSelectedCycles,
    handleSubmit,
    goToEdit
  }
}
