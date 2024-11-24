import { formatToYYYYMMDD } from '@/utils/formatDate'

interface RecordWithDate {
  recordId: number
  userId: number
  startTime: string
  [key: string]: any
}

interface AggregatedData {
  date: string
  value: number
}

interface ChartData {
  labels: string[]
  datasets: Array<{
    label: string
    data: number[]
    borderColor: string
    backgroundColor: string
  }>
}

/**
 * 레코드를 날짜별로 그룹화합니다.
 */
const groupByDate = (records: RecordWithDate[]): { [key: string]: RecordWithDate[] } =>
  records.reduce((acc, record) => {
    const date = formatToYYYYMMDD(record.startTime)
    return {
      ...acc,
      [date]: [...(acc[date] || []), record]
    }
  }, {} as { [key: string]: RecordWithDate[] })

/**
 * 그룹화된 레코드의 특정 필드 값을 합산합니다.
 */
const sumGroupedRecords = (
  groupedRecords: { [key: string]: RecordWithDate[] },
  valueKey: string
): AggregatedData[] =>
  Object.entries(groupedRecords).map(([date, records]) => ({
    date,
    value: records.reduce((sum, record) => sum + (record[valueKey] || 0), 0)
  }))

/**
 * 날짜순으로 데이터를 정렬합니다.
 */
const sortByDate = (data: AggregatedData[]): AggregatedData[] =>
  [...data].sort((a, b) => a.date.localeCompare(b.date))

/**
 * 집계된 데이터를 차트 데이터 형식으로 변환합니다.
 */
const formatToChartData = (
  aggregatedData: AggregatedData[],
  label: string,
  color: string
): ChartData => ({
  labels: aggregatedData.map(item => item.date),
  datasets: [
    {
      label,
      data: aggregatedData.map(item => item.value),
      borderColor: color,
      backgroundColor: color
    }
  ]
})

/**
 * 레코드 데이터를 날짜별로 집계하고 차트 데이터로 변환합니다.
 */
export const processChartData = (
  records: RecordWithDate[],
  valueKey: string,
  label: string,
  color: string
): ChartData => {
  const aggregatedData = sumGroupedRecords(groupByDate(records), valueKey)
  const sortedData = sortByDate(aggregatedData)
  return formatToChartData(sortedData, label, color)
}
