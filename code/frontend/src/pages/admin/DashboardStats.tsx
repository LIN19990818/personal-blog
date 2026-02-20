import { useEffect, useState } from 'react'
import { Card, Row, Col, Statistic, DatePicker, Table, message } from 'antd'
import { EyeOutlined, UserOutlined, FileTextOutlined, TagsOutlined } from '@ant-design/icons'
import { statsApi, VisitStat } from '@/api'
import { articleApi } from '@/api/article'
import { tagApi } from '@/api/tag'
import dayjs from 'dayjs'

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalPageViews: 0,
    totalUniqueVisitors: 0,
    articleCount: 0,
    tagCount: 0,
  })
  const [visitStats, setVisitStats] = useState<VisitStat[]>([])
  const [dateRange, setDateRange] = useState<[dayjs.Dayjs, dayjs.Dayjs]>([
    dayjs().subtract(7, 'days'),
    dayjs(),
  ])

  useEffect(() => {
    loadStats()
  }, [dateRange])

  const loadStats = async () => {
    try {
      const [statsResponse, articlesResponse, tagsResponse] = await Promise.all([
        statsApi.getSummary(dateRange[0].format('YYYY-MM-DD'), dateRange[1].format('YYYY-MM-DD')),
        articleApi.getList({ page: 0, size: 1 }),
        tagApi.getAll(),
      ])

      setStats({
        totalPageViews: statsResponse.data?.totalPageViews || 0,
        totalUniqueVisitors: statsResponse.data?.totalUniqueVisitors || 0,
        articleCount: articlesResponse.data?.totalElements || 0,
        tagCount: tagsResponse.data?.length || 0,
      })

      const visitResponse = await statsApi.getByDateRange(
        dateRange[0].format('YYYY-MM-DD'),
        dateRange[1].format('YYYY-MM-DD')
      )
      if (visitResponse.data) {
        setVisitStats(visitResponse.data)
      }
    } catch (error) {
      message.error('加载统计数据失败')
    }
  }

  const handleDateRangeChange = (dates: any) => {
    if (dates) {
      setDateRange([dates[0], dates[1]])
    }
  }

  const columns = [
    {
      title: '日期',
      dataIndex: 'visitDate',
      key: 'visitDate',
    },
    {
      title: '页面浏览量',
      dataIndex: 'pageViews',
      key: 'pageViews',
    },
    {
      title: '独立访客数',
      dataIndex: 'uniqueVisitors',
      key: 'uniqueVisitors',
    },
  ]

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">数据概览</h1>
        <DatePicker.RangePicker
          value={dateRange}
          onChange={handleDateRangeChange}
          allowClear={false}
        />
      </div>

      <Row gutter={16} className="mb-6">
        <Col span={6}>
          <Card>
            <Statistic
              title="页面浏览量"
              value={stats.totalPageViews}
              prefix={<EyeOutlined />}
              valueStyle={{ color: '#3f8600' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="独立访客数"
              value={stats.totalUniqueVisitors}
              prefix={<UserOutlined />}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="文章总数"
              value={stats.articleCount}
              prefix={<FileTextOutlined />}
              valueStyle={{ color: '#722ed1' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="标签总数"
              value={stats.tagCount}
              prefix={<TagsOutlined />}
              valueStyle={{ color: '#eb2f96' }}
            />
          </Card>
        </Col>
      </Row>

      <Card title="访问统计">
        <Table
          columns={columns}
          dataSource={visitStats}
          rowKey="visitDate"
          pagination={{ pageSize: 10 }}
        />
      </Card>
    </div>
  )
}

export default Dashboard
