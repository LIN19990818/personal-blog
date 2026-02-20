import request from '@/utils/request'
import { ICategory, ICategoryRequest } from '@/types'

export const categoryApi = {
  getList(): Promise<ICategory[]> {
    return request.get('/api/categories')
  },
  getAdminList(): Promise<ICategory[]> {
    return request.get('/api/admin/categories')
  },
  getBySlug(slug: string): Promise<ICategory> {
    return request.get(`/api/categories/${slug}`)
  },
  getArticles(slug: string, params: { page?: number; size?: number }): Promise<unknown> {
    return request.get(`/api/categories/${slug}/articles`, { params })
  },
  create(data: ICategoryRequest): Promise<ICategory> {
    return request.post('/api/admin/categories', data)
  },
  update(id: number, data: ICategoryRequest): Promise<ICategory> {
    return request.put(`/api/admin/categories/${id}`, data)
  },
  delete(id: number): Promise<void> {
    return request.delete(`/api/admin/categories/${id}`)
  },
}

export const getCategoryList = categoryApi.getList
export const createCategory = categoryApi.create
export const updateCategory = categoryApi.update
export const deleteCategory = categoryApi.delete
