export type PageInfo = {
  currentPage: number
  pageSize: number
  totalElements: number
  totalPages: number
}

export type PageResponse<T> = {
  content: T[]
  pageInfo: PageInfo
}
