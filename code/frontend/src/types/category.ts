export interface ICategory {
  id: number
  name: string
  slug: string
  description: string
  sortOrder: number
  createdAt: string
  articleCount?: number
}

export interface ICategoryRequest {
  name: string
  slug: string
  description?: string
  sortOrder?: number
}
