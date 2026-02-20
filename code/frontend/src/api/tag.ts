import request from '@/utils/request'
import { ITag, ITagRequest } from '@/types'

export const tagApi = {
  getList(): Promise<ITag[]> {
    return request.get('/api/tags')
  },
  getAdminList(): Promise<ITag[]> {
    return request.get('/api/admin/tags')
  },
  getArticles(slug: string, params: { page?: number; size?: number }): Promise<unknown> {
    return request.get(`/api/tags/${slug}/articles`, { params })
  },
  create(data: ITagRequest): Promise<ITag> {
    return request.post('/api/admin/tags', data)
  },
  update(id: number, data: ITagRequest): Promise<ITag> {
    return request.put(`/api/admin/tags/${id}`, data)
  },
  delete(id: number): Promise<void> {
    return request.delete(`/api/admin/tags/${id}`)
  },
}

export const getTagList = tagApi.getList
export const createTag = tagApi.create
export const updateTag = tagApi.update
export const deleteTag = tagApi.delete
