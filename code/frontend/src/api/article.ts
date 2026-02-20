import request from '@/utils/request'
import { IArticle, IArticleListParams, IArticleCreateRequest, IArticleUpdateRequest, IPageResponse } from '@/types'

export const articleApi = {
  getList(params: IArticleListParams): Promise<IPageResponse<IArticle>> {
    return request.get('/api/articles', { params })
  },
  getBySlug(slug: string): Promise<IArticle> {
    return request.get(`/api/articles/slug/${slug}`)
  },
  getById(id: number): Promise<IArticle> {
    return request.get(`/api/articles/${id}`)
  },
  getAdminList(params: IArticleListParams): Promise<IPageResponse<IArticle>> {
    return request.get('/api/admin/articles', { params })
  },
  create(data: IArticleCreateRequest): Promise<IArticle> {
    return request.post('/api/admin/articles', data)
  },
  update(id: number, data: IArticleUpdateRequest): Promise<IArticle> {
    return request.put(`/api/admin/articles/${id}`, data)
  },
  updateStatus(id: number, status: number): Promise<void> {
    return request.put(`/api/admin/articles/${id}/status`, { status })
  },
  delete(id: number): Promise<void> {
    return request.delete(`/api/admin/articles/${id}`)
  },
  moveToTrash(id: number): Promise<void> {
    return request.put(`/api/admin/articles/${id}/trash`)
  },
  restore(id: number): Promise<void> {
    return request.put(`/api/admin/articles/${id}/restore`)
  },
  permanentDelete(id: number): Promise<void> {
    return request.delete(`/api/admin/articles/${id}/permanent`)
  },
  getTrashList(params: { page?: number; size?: number }): Promise<IPageResponse<IArticle>> {
    return request.get('/api/admin/articles/trash', { params })
  },
}

export const getArticleList = articleApi.getList
export const getArticleDetail = articleApi.getById
export const getAdminArticleList = articleApi.getAdminList
export const createArticle = articleApi.create
export const updateArticle = articleApi.update
export const deleteArticle = articleApi.delete
export const updateArticleStatus = articleApi.updateStatus
