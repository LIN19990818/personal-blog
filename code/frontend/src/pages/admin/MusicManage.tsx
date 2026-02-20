import { useEffect, useState } from 'react'
import { Table, Button, Modal, Form, Input, InputNumber, message, Popconfirm, Upload, Space } from 'antd'
import { PlusOutlined, EditOutlined, DeleteOutlined, UploadOutlined } from '@ant-design/icons'
import { musicApi, Music, MusicCreateRequest, MusicUpdateOrderRequest } from '@/api'
import { uploadApi } from '@/api/upload'
import dayjs from 'dayjs'

const MusicManage = () => {
  const [musicList, setMusicList] = useState<Music[]>([])
  const [loading, setLoading] = useState(false)
  const [modalVisible, setModalVisible] = useState(false)
  const [editingMusic, setEditingMusic] = useState<Music | null>(null)
  const [form] = Form.useForm()
  const [uploadingCover, setUploadingCover] = useState(false)
  const [uploadingAudio, setUploadingAudio] = useState(false)

  useEffect(() => {
    loadMusic()
  }, [])

  const loadMusic = async () => {
    setLoading(true)
    try {
      const response = await musicApi.getAll()
      if (response) {
        setMusicList(response)
      }
    } catch (error) {
      message.error('加载音乐列表失败')
    } finally {
      setLoading(false)
    }
  }

  const handleAdd = () => {
    setEditingMusic(null)
    form.resetFields()
    setModalVisible(true)
  }

  const handleEdit = (record: Music) => {
    setEditingMusic(record)
    form.setFieldsValue({
      title: record.title,
      artist: record.artist,
      album: record.album,
      duration: record.duration,
      url: record.url,
      coverUrl: record.coverUrl,
      displayOrder: record.displayOrder,
    })
    setModalVisible(true)
  }

  const handleDelete = async (id: number) => {
    try {
      await musicApi.delete(id)
      message.success('删除成功')
      loadMusic()
    } catch (error) {
      message.error('删除失败')
    }
  }

  const handleOrderChange = async (id: number, newOrder: number) => {
    try {
      const data: MusicUpdateOrderRequest = { displayOrder: newOrder }
      await musicApi.updateOrder(id, data)
      message.success('序号更新成功')
      loadMusic()
    } catch (error) {
      message.error('序号更新失败')
    }
  }

  const handleSubmit = async (values: any) => {
    try {
      const data: MusicCreateRequest = {
        title: values.title,
        artist: values.artist,
        album: values.album,
        duration: values.duration,
        url: values.url,
        coverUrl: values.coverUrl,
        displayOrder: values.displayOrder,
      }

      if (editingMusic) {
        await musicApi.update(editingMusic.id, data)
        message.success('更新成功')
      } else {
        await musicApi.create(data)
        message.success('添加成功')
      }

      setModalVisible(false)
      loadMusic()
    } catch (error) {
      message.error('操作失败')
    }
  }

  const handleUploadCover = async (file: File) => {
    setUploadingCover(true)
    try {
      const response = await uploadApi.uploadImage(file)
      if (response) {
        form.setFieldsValue({
          coverUrl: response.url,
        })
        message.success('封面上传成功')
      }
    } catch (error) {
      message.error('封面上传失败')
    } finally {
      setUploadingCover(false)
    }
  }

  const handleUploadAudio = async (file: File) => {
    setUploadingAudio(true)
    try {
      const response = await uploadApi.uploadAudio(file)
      if (response) {
        form.setFieldsValue({
          url: response.url,
        })
        message.success('音频上传成功')
      }
    } catch (error) {
      message.error('音频上传失败')
    } finally {
      setUploadingAudio(false)
    }
  }

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const columns = [
    {
      title: '序号',
      dataIndex: 'displayOrder',
      key: 'displayOrder',
      width: 80,
      render: (order: number, record: Music) => (
        <InputNumber
          min={1}
          max={musicList.length}
          value={order}
          size="small"
          style={{ width: 60 }}
          onBlur={(e) => {
            const newOrder = parseInt(e.target.value)
            if (newOrder && newOrder !== order && newOrder >= 1 && newOrder <= musicList.length) {
              handleOrderChange(record.id, newOrder)
            }
          }}
          onPressEnter={(e: any) => {
            const newOrder = parseInt(e.target.value)
            if (newOrder && newOrder !== order && newOrder >= 1 && newOrder <= musicList.length) {
              handleOrderChange(record.id, newOrder)
            }
          }}
        />
      ),
    },
    {
      title: '封面',
      dataIndex: 'coverUrl',
      key: 'coverUrl',
      width: 80,
      render: (url: string) =>
        url ? (
          <img src={url} alt="" className="w-12 h-12 object-cover rounded" />
        ) : (
          <div className="w-12 h-12 rounded bg-gray-800 flex items-center justify-center">
            <svg className="text-white w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
            </svg>
          </div>
        ),
    },
    {
      title: '标题',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: '歌手',
      dataIndex: 'artist',
      key: 'artist',
    },
    {
      title: '专辑',
      dataIndex: 'album',
      key: 'album',
    },
    {
      title: '时长',
      dataIndex: 'duration',
      key: 'duration',
      render: (duration: number) => formatDuration(duration),
    },
    {
      title: '上传时间',
      dataIndex: 'uploadedAt',
      key: 'uploadedAt',
      width: 120,
      render: (date: string) => date ? dayjs(date).format('YYYY-MM-DD') : '-',
    },
    {
      title: '操作',
      key: 'action',
      width: 150,
      render: (_: any, record: Music) => (
        <div className="flex gap-2">
          <Button
            type="link"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
          >
            编辑
          </Button>
          <Popconfirm
            title="确定要删除这首音乐吗？"
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
        <h1 className="text-2xl font-bold">音乐管理</h1>
        <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
          添加音乐
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={musicList}
        rowKey="id"
        loading={loading}
        pagination={{ pageSize: 10 }}
      />

      <Modal
        title={editingMusic ? '编辑音乐' : '添加音乐'}
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
          <Form.Item label="上传封面">
            <Upload
              beforeUpload={(file) => {
                handleUploadCover(file)
                return false
              }}
              showUploadList={false}
              accept="image/*"
            >
              <Button icon={<UploadOutlined />} loading={uploadingCover}>
                选择封面图片
              </Button>
            </Upload>
          </Form.Item>

          <Form.Item
            name="title"
            label="歌曲标题"
            rules={[{ required: true, message: '请输入歌曲标题' }]}
          >
            <Input placeholder="请输入歌曲标题" />
          </Form.Item>

          <Form.Item
            name="artist"
            label="歌手"
            rules={[{ required: true, message: '请输入歌手' }]}
          >
            <Input placeholder="请输入歌手" />
          </Form.Item>

          <Form.Item name="album" label="专辑">
            <Input placeholder="请输入专辑名称" />
          </Form.Item>

          <Form.Item
            name="duration"
            label="时长（秒）"
            rules={[{ required: true, message: '请输入时长' }]}
          >
            <InputNumber min={1} className="w-full" placeholder="例如：240" />
          </Form.Item>

          <Form.Item
            name="url"
            label="音频URL"
            rules={[{ required: true, message: '请输入音频URL' }]}
          >
            <Space.Compact style={{ width: '100%' }}>
              <Input placeholder="请输入音频文件URL" style={{ flex: 1 }} />
              <Upload
                beforeUpload={(file) => {
                  handleUploadAudio(file)
                  return false
                }}
                showUploadList={false}
                accept="audio/*"
              >
                <Button icon={<UploadOutlined />} loading={uploadingAudio}>
                  上传音频
                </Button>
              </Upload>
            </Space.Compact>
          </Form.Item>

          <Form.Item name="coverUrl" label="封面URL">
            <Input placeholder="请输入封面图片URL" />
          </Form.Item>

          <Form.Item>
            <div className="flex justify-end gap-2">
              <Button onClick={() => setModalVisible(false)}>取消</Button>
              <Button type="primary" htmlType="submit">
                {editingMusic ? '更新' : '添加'}
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default MusicManage
