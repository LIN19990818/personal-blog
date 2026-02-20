import { useEffect, useState } from 'react'
import { Card, Button, Modal, Form, Input, Select, message, Popconfirm, List, Tag, Empty, Space } from 'antd'
import { PlusOutlined, EditOutlined, DeleteOutlined, BulbOutlined } from '@ant-design/icons'
import { inspirationApi, Inspiration, InspirationCreateRequest } from '@/api/inspiration'
import dayjs from 'dayjs'

const InspirationManage = () => {
  const [inspirations, setInspirations] = useState<Inspiration[]>([])
  const [loading, setLoading] = useState(false)
  const [modalVisible, setModalVisible] = useState(false)
  const [editingInspiration, setEditingInspiration] = useState<Inspiration | null>(null)
  const [form] = Form.useForm()
  const [filterCategory, setFilterCategory] = useState<string | null>(null)

  useEffect(() => {
    loadInspirations()
  }, [filterCategory])

  const loadInspirations = async () => {
    setLoading(true)
    try {
      const response = filterCategory
        ? await inspirationApi.getByCategory(filterCategory)
        : await inspirationApi.getAll()
      if (response) {
        setInspirations(response)
      }
    } catch (error) {
      message.error('加载灵感列表失败')
    } finally {
      setLoading(false)
    }
  }

  const handleAdd = () => {
    setEditingInspiration(null)
    form.resetFields()
    setModalVisible(true)
  }

  const handleEdit = (record: Inspiration) => {
    setEditingInspiration(record)
    form.setFieldsValue({
      content: record.content,
      category: record.category,
    })
    setModalVisible(true)
  }

  const handleDelete = async (id: number) => {
    try {
      await inspirationApi.delete(id)
      message.success('删除成功')
      loadInspirations()
    } catch (error) {
      message.error('删除失败')
    }
  }

  const handleSubmit = async (values: any) => {
    try {
      const data: InspirationCreateRequest = {
        content: values.content,
        category: values.category,
      }

      if (editingInspiration) {
        await inspirationApi.update(editingInspiration.id, data)
        message.success('更新成功')
      } else {
        await inspirationApi.create(data)
        message.success('添加成功')
      }

      setModalVisible(false)
      loadInspirations()
    } catch (error) {
      message.error('操作失败')
    }
  }

  const categories = [...new Set(inspirations.map(i => i.category).filter(Boolean))]

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <BulbOutlined />
          灵感收集
        </h1>
        <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
          记录灵感
        </Button>
      </div>

      {categories.length > 0 && (
        <div className="mb-4 flex gap-2 flex-wrap">
          <Tag
            color={!filterCategory ? 'blue' : 'default'}
            className="cursor-pointer"
            onClick={() => setFilterCategory(null)}
          >
            全部
          </Tag>
          {categories.map((cat) => (
            <Tag
              key={cat}
              color={filterCategory === cat ? 'blue' : 'default'}
              className="cursor-pointer"
              onClick={() => setFilterCategory(cat as string)}
            >
              {cat}
            </Tag>
          ))}
        </div>
      )}

      <Card loading={loading}>
        {inspirations.length === 0 ? (
          <Empty description="暂无灵感记录" />
        ) : (
          <List
            dataSource={inspirations}
            renderItem={(item) => (
              <List.Item
                actions={[
                  <Button
                    key="edit"
                    type="link"
                    icon={<EditOutlined />}
                    onClick={() => handleEdit(item)}
                  >
                    编辑
                  </Button>,
                  <Popconfirm
                    key="delete"
                    title="确定要删除这条灵感吗？"
                    onConfirm={() => handleDelete(item.id)}
                    okText="确定"
                    cancelText="取消"
                  >
                    <Button type="link" danger icon={<DeleteOutlined />}>
                      删除
                    </Button>
                  </Popconfirm>,
                ]}
              >
                <List.Item.Meta
                  title={
                    <div className="flex items-center gap-2">
                      {item.category && <Tag color="blue">{item.category}</Tag>}
                      <span className="text-gray-400 text-sm">
                        {dayjs(item.createdAt).format('YYYY-MM-DD HH:mm')}
                      </span>
                    </div>
                  }
                  description={<div className="whitespace-pre-wrap">{item.content}</div>}
                />
              </List.Item>
            )}
          />
        )}
      </Card>

      <Modal
        title={editingInspiration ? '编辑灵感' : '记录灵感'}
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={null}
        width={600}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          className="mt-4"
        >
          <Form.Item
            name="content"
            label="灵感内容"
            rules={[{ required: true, message: '请输入灵感内容' }]}
          >
            <Input.TextArea
              placeholder="记录你的灵感..."
              maxLength={1000}
              rows={4}
              showCount
            />
          </Form.Item>

          <Form.Item name="category" label="分类">
            <Select
              placeholder="选择或输入分类"
              allowClear
              mode="tags"
              maxCount={1}
              options={categories.map((c) => ({ value: c, label: c }))}
            />
          </Form.Item>

          <Form.Item>
            <div className="flex justify-end gap-2">
              <Button onClick={() => setModalVisible(false)}>取消</Button>
              <Button type="primary" htmlType="submit">
                {editingInspiration ? '更新' : '保存'}
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default InspirationManage
