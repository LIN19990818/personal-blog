import React, { useEffect, useState } from 'react'
import { Card, List, Tag, Skeleton, Empty } from 'antd'
import { ClockCircleOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import request from '@/utils/request'

interface ArchiveArticle {
  id: number
  title: string
  slug: string
  publishedAt: string
  viewCount: number
}

interface ArchiveGroup {
  yearMonth: string
  count: number
  articles: ArchiveArticle[]
}

const Archive: React.FC = () => {
  const [archive, setArchive] = useState<ArchiveGroup[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadArchive = async () => {
      try {
        const response = await request.get<ArchiveGroup[]>('/api/articles/archive')
        if (response) {
          setArchive(response)
        }
      } catch (error) {
        console.error('Failed to load archive:', error)
      } finally {
        setLoading(false)
      }
    }
    loadArchive()
  }, [])

  const formatYearMonth = (yearMonth: string) => {
    const [year, month] = yearMonth.split('-')
    return `${year}年${parseInt(month)}月`
  }

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    return `${date.getMonth() + 1}月${date.getDate()}日`
  }

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Skeleton active />
        <Skeleton active />
        <Skeleton active />
      </div>
    )
  }

  if (archive.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Empty description="暂无文章" />
      </div>
    )
  }

  const totalArticles = archive.reduce((sum, group) => sum + group.count, 0)

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">文章归档</h1>
        <p className="text-gray-500">共 {totalArticles} 篇文章</p>
      </div>

      <div className="space-y-6">
        {archive.map((group) => (
          <Card
            key={group.yearMonth}
            title={
              <div className="flex items-center gap-2">
                <ClockCircleOutlined />
                <span>{formatYearMonth(group.yearMonth)}</span>
                <Tag color="blue">{group.count} 篇</Tag>
              </div>
            }
          >
            <List
              dataSource={group.articles}
              renderItem={(article) => (
                <List.Item>
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center gap-4">
                      <span className="text-gray-400 text-sm w-20">
                        {formatDate(article.publishedAt)}
                      </span>
                      <Link
                        to={`/article/${article.id}`}
                        className="text-lg hover:text-blue-600 transition-colors"
                      >
                        {article.title}
                      </Link>
                    </div>
                    <Tag>{article.viewCount || 0} 次浏览</Tag>
                  </div>
                </List.Item>
              )}
            />
          </Card>
        ))}
      </div>
    </div>
  )
}

export default Archive
