export interface DateRange {
  start: Date
  end: Date
}

export const createInitialDateRange = (): DateRange => {
  const end = new Date()
  const start = new Date(end)
  start.setMonth(end.getMonth() - 1)
  return { start, end }
}

export const formatToYYYYMMDD = (date: Date): string => {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

export const formatDateRange = (dates: Date[]): string => {
  if (!dates || dates.length !== 2) return ''
  const [start, end] = dates
  return `${formatToYYYYMMDD(start)} ~ ${formatToYYYYMMDD(end)}`
}

export const isValidDateRange = (dates: Date[] | null): dates is [Date, Date] => {
  return Boolean(
    dates &&
    Array.isArray(dates) &&
    dates.length === 2 &&
    dates[0] instanceof Date &&
    dates[1] instanceof Date
  )
}

// 데이트피커 스타일 설정
export const datePickerStyle = {
  '--dp-background-color': '#ffffff',
  '--dp-text-color': '#374151',
  '--dp-hover-color': '#f3f4f6',
  '--dp-hover-text-color': '#374151',
  '--dp-hover-icon-color': '#374151',
  '--dp-primary-color': '#FF5A5F',
  '--dp-primary-text-color': '#ffffff',
  '--dp-secondary-color': '#f3f4f6',
  '--dp-border-color': '#e5e7eb',
  '--dp-menu-border-width': '1px',
  '--dp-border-radius': '8px',
  '--dp-font-family': 'inherit',
  '--dp-font-size': '14px',
} as const
