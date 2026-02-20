export interface IArticle {
  id: number
  title: string
  slug: string
  content?: string
  summary?: string
  coverImage?: string
  categoryId?: number
  status?: number
  viewCount?: number
  createdAt?: string
  updatedAt?: string
  publishedAt?: string
  category?: ICategory
  tags?: ITag[]
}

export interface IArticleListParams {
  page?: number
  size?: number
  categoryId?: number
  tagId?: number
  status?: number
  keyword?: string
}

export interface IArticleCreateRequest {
  title: string
  content: string
  summary?: string
  coverImage?: string
  categoryId: number
  tagIds?: number[]
  status: number
}

export interface IArticleUpdateRequest extends IArticleCreateRequest {
  id: number
}
