/**
 * Date를 'YYYY-MM-DD' 형식의 문자열로 변환합니다.
 * @param date Date 객체 또는 날짜 문자열
 * @returns 'YYYY-MM-DD' 형식의 문자열
 */
export const formatToYYYYMMDD = (date: Date | string): string => {
  const d = new Date(date)
  const year = d.getFullYear()
  const month = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

/**
 * 현재 날짜로부터 지정된 일수만큼 이전/이후의 날짜를 'YYYY-MM-DD' 형식으로 반환합니다.
 * @param days 이동할 일수 (음수: 과거, 양수: 미래)
 * @returns 'YYYY-MM-DD' 형식의 문자열
 */
export const getRelativeDate = (days: number): string => {
  const date = new Date()
  date.setDate(date.getDate() + days)
  return formatToYYYYMMDD(date)
}

/**
 * 현재 달의 시작일과 마지막일을 'YYYY-MM-DD' 형식으로 반환합니다.
 * @returns { startDate: string, endDate: string }
 */
export const getCurrentMonthRange = () => {
  const date = new Date()
  const startDate = new Date(date.getFullYear(), date.getMonth(), 1)
  const endDate = new Date(date.getFullYear(), date.getMonth() + 1, 0)

  return {
    startDate: formatToYYYYMMDD(startDate),
    endDate: formatToYYYYMMDD(endDate)
  }
}
