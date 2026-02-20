import { useEffect, useState } from 'react'
import { Table, Button, Modal, Form, Input, InputNumber, message, Popconfirm, Upload, DatePicker } from 'antd'
import { PlusOutlined, EditOutlined, DeleteOutlined, UploadOutlined } from '@ant-design/icons'
import { timelineApi, Timeline, TimelineCreateRequest, TimelineUpdateOrderRequest } from '@/api/timeline'
import { uploadApi } from '@/api/upload'
import dayjs from 'dayjs'

const TimelineManage = () => {
  const [timelineList, setTimelineList] = useState<Timeline[]>([])
  const [loading, setLoading] = useState(false)
  const [modalVisible, setModalVisible] = useState(false)
  const [editingTimeline, setEditingTimeline] = useState<Timeline | null>(null)
  const [form] = Form.useForm()
  const [uploading, setUploading] = useState(false)

  useEffect(() => {
    loadTimeline()
  }, [])

  const loadTimeline = async () => {
    setLoading(true)
    try {
      const response = await timelineApi.getAll()
      if (response) {
        setTimelineList(response)
      }
    } catch (error) {
      message.error('加载时间轴列表失败')
    } finally {
      setLoading(false)
    }
  }

  const handleAdd = () => {
    setEditingTimeline(null)
    form.resetFields()
    setModalVisible(true)
  }

  const handleEdit = (record: Timeline) => {
    setEditingTimeline(record)
    form.setFieldsValue({
      title: record.title,
      eventDate: dayjs(record.eventDate),
      description: record.description,
      imageUrl: record.imageUrl,
      displayOrder: record.displayOrder,
    })
    setModalVisible(true)
  }

  const handleDelete = async (id: number) => {
    try {
      await timelineApi.delete(id)
      message.success('删除成功')
      loadTimeline()
    } catch (error) {
      message.error('删除失败')
    }
  }

  const handleOrderChange = async (id: number, newOrder: number) => {
    try {
      const data: TimelineUpdateOrderRequest = { displayOrder: newOrder }
      await timelineApi.updateOrder(id, data)
      message.success('序号更新成功')
      loadTimeline()
    } catch (error) {
      message.error('序号更新失败')
    }
  }

  const handleSubmit = async (values: any) => {
    try {
      const data: TimelineCreateRequest = {
        title: values.title,
        eventDate: values.eventDate.format('YYYY-MM-DD'),
        description: values.description,
        imageUrl: values.imageUrl,
        displayOrder: values.displayOrder,
      }

      if (editingTimeline) {
        await timelineApi.update(editingTimeline.id, data)
        message.success('更新成功')
      } else {
        await timelineApi.create(data)
        message.success('添加成功')
      }

      setModalVisible(false)
      loadTimeline()
    } catch (error) {
      message.error('操作失败')
    }
  }

  const handleUpload = async (file: File) => {
    setUploading(true)
    try {
      const response = await uploadApi.uploadImage(file)
      if (response) {
        form.setFieldsValue({
          imageUrl: response.url,
        })
        message.success('图片上传成功')
      }
    } catch (error) {
      message.error('图片上传失败')
    } finally {
      setUploading(false)
    }
  }

  const columns = [
    {
      title: '序号',
      dataIndex: 'displayOrder',
      key: 'displayOrder',
      width: 80,
      render: (order: number, record: Timeline) => (
        <InputNumber
          min={1}
          max={timelineList.length}
          value={order}
          size="small"
          style={{ width: 60 }}
          onBlur={(e) => {
            const newOrder = parseInt(e.target.value)
            if (newOrder && newOrder !== order && newOrder >= 1 && newOrder <= timelineList.length) {
              handleOrderChange(record.id, newOrder)
            }
          }}
          onPressEnter={(e: any) => {
            const newOrder = parseInt(e.target.value)
            if (newOrder && newOrder !== order && newOrder >= 1 && newOrder <= timelineList.length) {
              handleOrderChange(record.id, newOrder)
            }
          }}
        />
      ),
    },
    {
      title: '日期',
      dataIndex: 'eventDate',
      key: 'eventDate',
      width: 120,
      render: (date: string) => dayjs(date).format('YYYY-MM-DD'),
    },
    {
      title: '图片',
      dataIndex: 'imageUrl',
      key: 'imageUrl',
      width: 80,
      render: (url: string) =>
        url ? (
          <img src={url} alt="" className="w-12 h-12 object-cover rounded" />
        ) : (
          <div className="w-12 h-12 rounded bg-gray-200 flex items-center justify-center text-gray-400">
            -
          </div>
        ),
    },
    {
      title: '标题',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: '描述',
      dataIndex: 'description',
      key: 'description',
      ellipsis: true,
    },
    {
      title: '操作',
      key: 'action',
      width: 150,
      render: (_: any, record: Timeline) => (
        <div className="flex gap-2">
          <Button
            type="link"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
          >
            编辑
          </Button>
          <Popconfirm
            title="确定要删除这个时间轴事件吗？"
            onConfirm={() => handleDelete(record.id)}
            okText="确定"
            cancelText="取消"
          >
            <Button type="link" danger icon={<DeleteOutlined />}>
              删除
            </Button>
          </Popconfirm>
        </div>
      ),
    },
  ]

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">时间轴管理</h1>
        <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
          添加事件
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={timelineList}
        rowKey="id"
        loading={loading}
        pagination={{ pageSize: 10 }}
      />

      <Modal
        title={editingTimeline ? '编辑事件' : '添加事件'}
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
          <Form.Item label="上传图片">
            <Upload
              beforeUpload={(file) => {
                handleUpload(file)
                return false
              }}
              showUploadList={false}
              accept="image/*"
            >
              <Button icon={<UploadOutlined />} loading={uploading}>
                选择图片
              </Button>
            </Upload>
          </Form.Item>

          <Form.Item
            name="title"
            label="标题"
            rules={[{ required: true, message: '请输入标题' }]}
          >
            <Input placeholder="请输入标题" maxLength={100} />
          </Form.Item>

          <Form.Item
            name="eventDate"
            label="日期"
            rules={[{ required: true, message: '请选择日期' }]}
          >
            <DatePicker className="w-full" />
          </Form.Item>

          <Form.Item name="description" label="描述">
            <Input.TextArea placeholder="请输入描述" maxLength={500} rows={3} />
          </Form.Item>

          <Form.Item name="imageUrl" label="图片URL">
            <Input placeholder="请输入图片URL" />
          </Form.Item>

          <Form.Item>
            <div className="flex justify-end gap-2">
              <Button onClick={() => setModalVisible(false)}>取消</Button>
              <Button type="primary" htmlType="submit">
                {editingTimeline ? '更新' : '添加'}
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default TimelineManage
