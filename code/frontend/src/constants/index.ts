export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || ''
export const APP_TITLE = import.meta.env.VITE_APP_TITLE || '星落林间'

export const DEFAULT_PAGE_SIZE = 10
export const MAX_PAGE_SIZE = 50

export const ARTICLE_STATUS = {
  DRAFT: 0,
  PUBLISHED: 1,
  OFFLINE: 2,
} as const

export const ARTICLE_STATUS_TEXT = {
  [ARTICLE_STATUS.DRAFT]: '草稿',
  [ARTICLE_STATUS.PUBLISHED]: '已发布',
  [ARTICLE_STATUS.OFFLINE]: '已下架',
} as const

export const UPLOAD_MAX_SIZE = 5 * 1024 * 1024
export const UPLOAD_ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'image/webp']
