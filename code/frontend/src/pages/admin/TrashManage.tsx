import { useEffect, useState } from 'react'
import { Table, Button, message, Popconfirm, Empty, Card, Tag } from 'antd'
import { UndoOutlined, DeleteFilled, ArrowLeftOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import { articleApi } from '@/api/article'
import type { IArticle } from '@/types'
import dayjs from 'dayjs'

const TrashManage = () => {
  const navigate = useNavigate()
  const [articles, setArticles] = useState<IArticle[]>([])
  const [loading, setLoading] = useState(false)
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [pageSize] = useState(10)

  useEffect(() => {
    loadTrash()
  }, [page, pageSize])

  const loadTrash = async () => {
    setLoading(true)
    try {
      const res = await articleApi.getTrashList({ page, size: pageSize })
      setArticles(res.list || [])
      setTotal(res.total || 0)
    } catch (error) {
      message.error('加载回收站失败')
    } finally {
      setLoading(false)
    }
  }

  const handleRestore = async (id: number) => {
    try {
      await articleApi.restore(id)
      message.success('文章已恢复')
      loadTrash()
    } catch (error) {
      message.error('恢复失败')
    }
  }

  const handlePermanentDelete = async (id: number) => {
    try {
      await articleApi.permanentDelete(id)
      message.success('文章已永久删除')
      loadTrash()
    } catch (error) {
      message.error('删除失败')
    }
  }

  const columns = [
    {
      title: '标题',
      dataIndex: 'title',
      key: 'title',
      render: (title: string) => <span className="text-gray-500">{title}</span>,
    },
    {
      title: '分类',
      dataIndex: 'category',
      key: 'category',
      render: (category: any) => category ? <Tag>{category.name}</Tag> : '-',
    },
    {
      title: '浏览量',
      dataIndex: 'viewCount',
      key: 'viewCount',
      width: 80,
    },
    {
      title: '删除时间',
      dataIndex: 'deletedAt',
      key: 'deletedAt',
      width: 120,
      render: (date: string) => date ? dayjs(date).format('YYYY-MM-DD HH:mm') : '-',
    },
    {
      title: '操作',
      key: 'action',
      width: 180,
      render: (_: any, record: IArticle) => (
        <div className="flex gap-2">
          <Button
            type="link"
            icon={<UndoOutlined />}
            onClick={() => handleRestore(record.id)}
          >
            恢复
          </Button>
          <Popconfirm
            title="确定要永久删除这篇文章吗？此操作不可撤销！"
            onConfirm={() => handlePermanentDelete(record.id)}
            okText="确定"
            cancelText="取消"
            okButtonProps={{ danger: true }}
          >
            <Button type="link" danger icon={<DeleteFilled />}>
              永久删除
            </Button>
          </Popconfirm>
        </div>
      ),
    },
  ]

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-4">
          <Button icon={<ArrowLeftOutlined />} onClick={() => navigate('/admin/articles')}>
            返回文章列表
          </Button>
          <h1 className="text-2xl font-bold m-0">回收站</h1>
        </div>
        <span className="text-gray-500">共 {total} 篇已删除文章</span>
      </div>

      <Card>
        {articles.length === 0 && !loading ? (
          <Empty description="回收站是空的" />
        ) : (
          <Table
            columns={columns}
            dataSource={articles}
            rowKey="id"
            loading={loading}
            pagination={{
              current: page,
              pageSize,
              total,
              onChange: (p) => setPage(p),
              showTotal: (total) => `共 ${total} 篇`,
            }}
          />
        )}
      </Card>
    </div>
  )
}

export default TrashManage
