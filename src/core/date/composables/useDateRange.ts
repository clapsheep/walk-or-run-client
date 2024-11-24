import { ref, onMounted } from 'vue'
import { createInitialDateRange, formatDateRange } from '../services/dateService'

export const useDateRange = (onDateRangeChange: (dates: Date[]) => void) => {
  const date = ref<Date[]>([
    createInitialDateRange().start,
    createInitialDateRange().end
  ])
  const showPicker = ref(false)

  onMounted(() => {
    onDateRangeChange(date.value)
  })

  const handleDateSelect = (newDate: Date[]) => {
    date.value = newDate
    showPicker.value = false
    onDateRangeChange(newDate)
  }

  const togglePicker = () => {
    showPicker.value = !showPicker.value
  }

  const getFormattedDate = () => {
    return formatDateRange(date.value)
  }

  return {
    date,
    showPicker,
    handleDateSelect,
    togglePicker,
    getFormattedDate
  }
}
