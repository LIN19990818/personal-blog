import request from '@/utils/request'
import { IArticle, IPageResponse } from '@/types'

export const searchApi = {
  search(params: { keyword: string; page?: number; size?: number }): Promise<IPageResponse<IArticle>> {
    return request.get('/api/search', { params })
  },
}

export const searchArticles = searchApi.search
