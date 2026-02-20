import request from '@/utils/request'
import { IApiResponse } from '@/types'

export interface VisitStat {
  visitDate: string
  pageViews: number
  uniqueVisitors: number
}

export interface VisitStatSummary {
  totalPageViews: number
  totalUniqueVisitors: number
}

export const statsApi = {
  getByDateRange: (startDate: string, endDate: string) => 
    request.get<VisitStat[]>(`/api/stats?startDate=${startDate}&endDate=${endDate}`),
  
  getSummary: (startDate: string, endDate: string) => 
    request.get<VisitStatSummary>(`/api/stats/summary?startDate=${startDate}&endDate=${endDate}`),
  
  recordVisit: (visitorId?: string) => 
    request.post<void>(`/api/stats/record${visitorId ? `?visitorId=${visitorId}` : ''}`),
}
