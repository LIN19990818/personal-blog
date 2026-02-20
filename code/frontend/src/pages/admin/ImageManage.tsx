import { useEffect, useState } from 'react'
import { Table, Button, Modal, Form, Input, DatePicker, InputNumber, message, Popconfirm, Upload } from 'antd'
import { PlusOutlined, EditOutlined, DeleteOutlined, UploadOutlined } from '@ant-design/icons'
import { imageApi, Image, ImageCreateRequest, ImageUpdateOrderRequest } from '@/api'
import { uploadApi } from '@/api/upload'
import dayjs from 'dayjs'

const ImageManage = () => {
  const [images, setImages] = useState<Image[]>([])
  const [loading, setLoading] = useState(false)
  const [modalVisible, setModalVisible] = useState(false)
  const [editingImage, setEditingImage] = useState<Image | null>(null)
  const [form] = Form.useForm()
  const [uploading, setUploading] = useState(false)

  useEffect(() => {
    loadImages()
  }, [])

  const loadImages = async () => {
    setLoading(true)
    try {
      const response = await imageApi.getAll()
      if (response) {
        setImages(response)
      }
    } catch (error) {
      message.error('加载图片列表失败')
    } finally {
      setLoading(false)
    }
  }

  const handleAdd = () => {
    setEditingImage(null)
    form.resetFields()
    setModalVisible(true)
  }

  const handleEdit = (record: Image) => {
    setEditingImage(record)
    form.setFieldsValue({
      filename: record.filename,
      url: record.url,
      location: record.location,
      takenAt: record.takenAt ? dayjs(record.takenAt) : null,
      description: record.description,
    })
    setModalVisible(true)
  }

  const handleDelete = async (id: number) => {
    try {
      await imageApi.delete(id)
      message.success('删除成功')
      loadImages()
    } catch (error) {
      message.error('删除失败')
    }
  }

  const handleSubmit = async (values: any) => {
    try {
      const data: ImageCreateRequest = {
        filename: values.filename,
        url: values.url,
        location: values.location,
        takenAt: values.takenAt?.format('YYYY-MM-DD'),
        description: values.description,
      }

      if (editingImage) {
        await imageApi.update(editingImage.id, data)
        message.success('更新成功')
      } else {
        await imageApi.create(data)
        message.success('添加成功')
      }

      setModalVisible(false)
      loadImages()
    } catch (error) {
      message.error('操作失败')
    }
  }

  const handleOrderChange = async (id: number, newOrder: number) => {
    if (newOrder < 1) {
      message.error('序号最小为1')
      return
    }
    try {
      const data: ImageUpdateOrderRequest = { displayOrder: newOrder }
      await imageApi.updateOrder(id, data)
      message.success('序号更新成功')
      loadImages()
    } catch (error) {
      message.error('序号更新失败')
    }
  }

  const handleUpload = async (file: File) => {
    setUploading(true)
    try {
      const response = await uploadApi.uploadImage(file)
      if (response) {
        form.setFieldsValue({
          filename: file.name,
          url: response.url,
        })
        message.success('上传成功')
      }
    } catch (error) {
      message.error('上传失败')
    } finally {
      setUploading(false)
    }
  }

  const columns = [
    {
      title: '序号',
      dataIndex: 'displayOrder',
      key: 'displayOrder',
      width: 100,
      render: (order: number, record: Image) => (
        <InputNumber
          min={1}
          max={images.length}
          value={order}
          size="small"
          className="w-16"
          onBlur={(e) => {
            const newOrder = parseInt(e.target.value)
            if (newOrder !== order && !isNaN(newOrder)) {
              handleOrderChange(record.id, newOrder)
            }
          }}
          onPressEnter={(e: any) => {
            const newOrder = parseInt(e.target.value)
            if (newOrder !== order && !isNaN(newOrder)) {
              handleOrderChange(record.id, newOrder)
            }
          }}
        />
      ),
    },
    {
      title: '预览',
      dataIndex: 'url',
      key: 'url',
      width: 100,
      render: (url: string) => (
        <img src={url} alt="" className="w-16 h-16 object-cover rounded" />
      ),
    },
    {
      title: '文件名',
      dataIndex: 'filename',
      key: 'filename',
    },
    {
      title: '拍摄地点',
      dataIndex: 'location',
      key: 'location',
    },
    {
      title: '拍摄日期',
      dataIndex: 'takenAt',
      key: 'takenAt',
    },
    {
      title: '上传日期',
      dataIndex: 'uploadedAt',
      key: 'uploadedAt',
      width: 120,
      render: (date: string | null) => date ? dayjs(date).format('YYYY-MM-DD') : '-',
    },
    {
      title: '操作',
      key: 'action',
      width: 150,
      render: (_: any, record: Image) => (
        <div className="flex gap-2">
          <Button
            type="link"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
          >
            编辑
          </Button>
          <Popconfirm
            title="确定要删除这张图片吗？"
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
        <h1 className="text-2xl font-bold">图片管理</h1>
        <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
          添加图片
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={images}
        rowKey="id"
        loading={loading}
        pagination={{ pageSize: 10 }}
      />

      <Modal
        title={editingImage ? '编辑图片' : '添加图片'}
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
            >
              <Button icon={<UploadOutlined />} loading={uploading}>
                选择图片
              </Button>
            </Upload>
          </Form.Item>

          <Form.Item
            name="filename"
            label="文件名"
            rules={[{ required: true, message: '请输入文件名' }]}
          >
            <Input placeholder="请输入文件名" />
          </Form.Item>

          <Form.Item
            name="url"
            label="图片URL"
            rules={[{ required: true, message: '请输入图片URL' }]}
          >
            <Input placeholder="请输入图片URL" />
          </Form.Item>

          <Form.Item name="location" label="拍摄地点">
            <Input placeholder="请输入拍摄地点" />
          </Form.Item>

          <Form.Item name="takenAt" label="拍摄日期">
            <DatePicker className="w-full" />
          </Form.Item>

          <Form.Item name="description" label="描述">
            <Input.TextArea rows={3} placeholder="请输入图片描述" />
          </Form.Item>

          <Form.Item>
            <div className="flex justify-end gap-2">
              <Button onClick={() => setModalVisible(false)}>取消</Button>
              <Button type="primary" htmlType="submit">
                {editingImage ? '更新' : '添加'}
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default ImageManage
