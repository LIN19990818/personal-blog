import React, { useEffect, useState } from 'react'
import { Card, Empty, Spin } from 'antd'
import { ClockCircleOutlined } from '@ant-design/icons'
import { timelineApi, Timeline } from '@/api/timeline'

const TimelineSection: React.FC = () => {
  const [timelineList, setTimelineList] = useState<Timeline[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadTimeline = async () => {
      try {
        const response = await timelineApi.getAll()
        if (response) {
          setTimelineList(response)
        }
      } catch (error) {
        console.error('Failed to load timeline:', error)
      } finally {
        setLoading(false)
      }
    }
    loadTimeline()
  }, [])

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <Spin size="large" />
      </div>
    )
  }

  if (timelineList.length === 0) {
    return null
  }

  return (
    <div className="py-12 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-2xl font-bold text-center mb-8 flex items-center justify-center gap-2">
          <ClockCircleOutlined />
          我的足迹
        </h2>
        <div className="relative">
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-blue-200" />
          {timelineList.map((item, index) => (
            <div
              key={item.id}
              className={`relative flex items-center mb-8 ${
                index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
              }`}
            >
              <div className={`w-5/12 ${index % 2 === 0 ? 'text-right pr-8' : 'text-left pl-8'}`}>
                <Card
                  hoverable
                  className={`inline-block ${
                    item.imageUrl ? 'max-w-sm' : 'max-w-xs'
                  }`}
                  cover={
                    item.imageUrl ? (
                      <img
                        src={item.imageUrl}
                        alt={item.title}
                        className="h-40 object-cover"
                      />
                    ) : null
                  }
                >
                  <div className="text-sm text-gray-500 mb-1">
                    {new Date(item.eventDate).toLocaleDateString('zh-CN', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                  {item.description && (
                    <p className="text-gray-600 text-sm">{item.description}</p>
                  )}
                </Card>
              </div>
              <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-blue-500 rounded-full border-4 border-white shadow" />
              <div className="w-5/12" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default TimelineSection
