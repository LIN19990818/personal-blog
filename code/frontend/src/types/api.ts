export interface IApiResponse<T = unknown> {
  code: number
  message: string
  data: T
}

export interface IPageResponse<T> {
  list: T[]
  total: number
  page: number
  size: number
  totalPages: number
}

export interface ISearchResponse<T> {
  list: T[]
  total: number
  keyword: string
}
