import { useEffect, useState } from 'react'
import { Table, Button, Modal, Form, Input, InputNumber, DatePicker, message, Popconfirm } from 'antd'
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons'
import { cityApi, City, CityCreateRequest } from '@/api'
import dayjs from 'dayjs'

const CityManage = () => {
  const [cities, setCities] = useState<City[]>([])
  const [loading, setLoading] = useState(false)
  const [modalVisible, setModalVisible] = useState(false)
  const [editingCity, setEditingCity] = useState<City | null>(null)
  const [form] = Form.useForm()

  useEffect(() => {
    loadCities()
  }, [])

  const loadCities = async () => {
    setLoading(true)
    try {
      const response = await cityApi.getAll()
      if (response) {
        setCities(response)
      }
    } catch (error) {
      message.error('加载城市列表失败')
    } finally {
      setLoading(false)
    }
  }

  const handleAdd = () => {
    setEditingCity(null)
    form.resetFields()
    setModalVisible(true)
  }

  const handleEdit = (record: City) => {
    setEditingCity(record)
    form.setFieldsValue({
      name: record.name,
      latitude: record.latitude,
      longitude: record.longitude,
      visitCount: record.visitCount,
      firstVisit: dayjs(record.firstVisit),
      notes: record.notes,
    })
    setModalVisible(true)
  }

  const handleDelete = async (id: number) => {
    try {
      await cityApi.delete(id)
      message.success('删除成功')
      loadCities()
    } catch (error) {
      message.error('删除失败')
    }
  }

  const handleSubmit = async (values: any) => {
    try {
      const data: CityCreateRequest = {
        name: values.name,
        latitude: values.latitude,
        longitude: values.longitude,
        visitCount: values.visitCount || 1,
        firstVisit: values.firstVisit.format('YYYY-MM-DD'),
        notes: values.notes,
      }

      if (editingCity) {
        await cityApi.update(editingCity.id, data)
        message.success('更新成功')
      } else {
        await cityApi.create(data)
        message.success('添加成功')
      }

      setModalVisible(false)
      loadCities()
    } catch (error) {
      message.error('操作失败')
    }
  }

  const columns = [
    {
      title: '城市名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '纬度',
      dataIndex: 'latitude',
      key: 'latitude',
    },
    {
      title: '经度',
      dataIndex: 'longitude',
      key: 'longitude',
    },
    {
      title: '访问次数',
      dataIndex: 'visitCount',
      key: 'visitCount',
    },
    {
      title: '首次访问',
      dataIndex: 'firstVisit',
      key: 'firstVisit',
    },
    {
      title: '备注',
      dataIndex: 'notes',
      key: 'notes',
      ellipsis: true,
    },
    {
      title: '操作',
      key: 'action',
      width: 150,
      render: (_: any, record: City) => (
        <div className="flex gap-2">
          <Button
            type="link"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
          >
            编辑
          </Button>
          <Popconfirm
            title="确定要删除这个城市吗？"
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
        <h1 className="text-2xl font-bold">城市管理</h1>
        <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
          添加城市
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={cities}
        rowKey="id"
        loading={loading}
        pagination={{ pageSize: 10 }}
      />

      <Modal
        title={editingCity ? '编辑城市' : '添加城市'}
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={null}
        width={500}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          className="mt-4"
        >
          <Form.Item
            name="name"
            label="城市名称"
            rules={[{ required: true, message: '请输入城市名称' }]}
          >
            <Input placeholder="请输入城市名称" />
          </Form.Item>

          <div className="grid grid-cols-2 gap-4">
            <Form.Item
              name="latitude"
              label="纬度"
              rules={[{ required: true, message: '请输入纬度' }]}
            >
              <InputNumber
                placeholder="例如：39.9042"
                className="w-full"
                step={0.0001}
              />
            </Form.Item>

            <Form.Item
              name="longitude"
              label="经度"
              rules={[{ required: true, message: '请输入经度' }]}
            >
              <InputNumber
                placeholder="例如：116.4074"
                className="w-full"
                step={0.0001}
              />
            </Form.Item>
          </div>

          <Form.Item
            name="visitCount"
            label="访问次数"
            initialValue={1}
          >
            <InputNumber min={1} className="w-full" />
          </Form.Item>

          <Form.Item
            name="firstVisit"
            label="首次访问日期"
            rules={[{ required: true, message: '请选择日期' }]}
          >
            <DatePicker className="w-full" />
          </Form.Item>

          <Form.Item name="notes" label="备注">
            <Input.TextArea rows={3} placeholder="记录难忘的经历..." />
          </Form.Item>

          <Form.Item>
            <div className="flex justify-end gap-2">
              <Button onClick={() => setModalVisible(false)}>取消</Button>
              <Button type="primary" htmlType="submit">
                {editingCity ? '更新' : '添加'}
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default CityManage
