export interface ITag {
  id: number
  name: string
  slug: string
  createdAt: string
  articleCount?: number
}

export interface ITagRequest {
  name: string
  slug: string
}
