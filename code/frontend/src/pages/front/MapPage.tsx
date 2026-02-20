import { useEffect, useState, useRef, useCallback } from 'react'
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap, useMapEvents } from 'react-leaflet'
import { Modal, Button, Form, Input, InputNumber, DatePicker, message, Select, Spin, Card, Statistic, Row, Col, Tag, Tooltip, Segmented, Empty } from 'antd'
import { PlusOutlined, EnvironmentOutlined, CompassOutlined, GlobalOutlined, CalendarOutlined, SearchOutlined, ReloadOutlined, AimOutlined } from '@ant-design/icons'
import { cityApi, City, CityCreateRequest } from '@/api'
import Loading from '@/components/common/Loading'
import dayjs from 'dayjs'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'

type MapTheme = 'light' | 'dark' | 'satellite' | 'terrain'

const mapThemes: Record<MapTheme, { url: string; attribution: string; name: string }> = {
  light: {
    url: 'https://webrd0{s}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}',
    attribution: '&copy; <a href="https://www.amap.com/">高德地图</a>',
    name: '明亮'
  },
  dark: {
    url: 'https://webst0{s}.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}',
    attribution: '&copy; <a href="https://www.amap.com/">高德地图</a>',
    name: '暗黑'
  },
  satellite: {
    url: 'https://webst0{s}.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}',
    attribution: '&copy; <a href="https://www.amap.com/">高德地图</a>',
    name: '卫星'
  },
  terrain: {
    url: 'https://webrd0{s}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=6&x={x}&y={y}&z={z}',
    attribution: '&copy; <a href="https://www.amap.com/">高德地图</a>',
    name: '地形'
  }
}

const createCustomIcon = (visitCount: number, isSelected: boolean = false) => {
  const size = Math.min(40, 25 + visitCount * 3)
  const hue = Math.max(0, 200 - visitCount * 15)
  
  return L.divIcon({
    className: 'custom-marker',
    html: `
      <div class="marker-container ${isSelected ? 'selected' : ''}" style="
        width: ${size}px;
        height: ${size}px;
        background: linear-gradient(135deg, hsl(${hue}, 80%, 50%), hsl(${hue + 20}, 80%, 40%));
        border-radius: 50% 50% 50% 0;
        transform: rotate(-45deg);
        border: 3px solid white;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3), 0 0 0 2px rgba(255,255,255,0.3);
        display: flex;
        align-items: center;
        justify-content: center;
        animation: markerBounce 0.5s ease-out;
      ">
        <span style="
          transform: rotate(45deg);
          color: white;
          font-size: ${size * 0.4}px;
          font-weight: bold;
          text-shadow: 0 1px 2px rgba(0,0,0,0.3);
        ">${visitCount}</span>
      </div>
    `,
    iconSize: [size, size],
    iconAnchor: [size / 2, size],
    popupAnchor: [0, -size]
  })
}

const createPulseIcon = () => {
  return L.divIcon({
    className: 'pulse-marker',
    html: `
      <div class="pulse-container">
        <div class="pulse-ring"></div>
        <div class="pulse-dot"></div>
      </div>
    `,
    iconSize: [30, 30],
    iconAnchor: [15, 15]
  })
}

const MapController: React.FC<{ center?: [number, number]; zoom?: number; cities: City[]; showConnections: boolean }> = ({ center, zoom, cities, showConnections }) => {
  const map = useMap()
  const prevCenter = useRef<[number, number] | undefined>(undefined)
  
  useEffect(() => {
    if (center && (prevCenter.current?.[0] !== center[0] || prevCenter.current?.[1] !== center[1])) {
      map.flyTo(center, zoom || map.getZoom(), {
        duration: 1.5,
        easeLinearity: 0.25
      })
      prevCenter.current = center
    }
  }, [center, zoom, map])
  
  useEffect(() => {
    if (cities.length > 0 && !center) {
      const bounds = L.latLngBounds(cities.map(c => [c.latitude, c.longitude]))
      map.fitBounds(bounds, { padding: [50, 50], maxZoom: 10 })
    }
  }, [cities, center, map])
  
  return null
}

const LocationMarker: React.FC<{ onLocationFound: (lat: number, lng: number) => void }> = ({ onLocationFound }) => {
  const [position, setPosition] = useState<[number, number] | null>(null)
  
  useMapEvents({
    click(e) {
      setPosition([e.latlng.lat, e.latlng.lng])
      onLocationFound(e.latlng.lat, e.latlng.lng)
    },
  })
  
  return position ? (
    <Marker position={position} icon={createPulseIcon()} />
  ) : null
}

interface SearchResult {
  place_id: number
  display_name: string
  lat: string
  lon: string
}

const MapPage = () => {
  const [cities, setCities] = useState<City[]>([])
  const [loading, setLoading] = useState(true)
  const [modalVisible, setModalVisible] = useState(false)
  const [form] = Form.useForm()
  const [editingCity, setEditingCity] = useState<City | null>(null)
  const [mapTheme, setMapTheme] = useState<MapTheme>('light')
  const [selectedCity, setSelectedCity] = useState<City | null>(null)
  const [mapCenter, setMapCenter] = useState<[number, number] | undefined>(undefined)
  const [mapZoom, setMapZoom] = useState<number | undefined>(undefined)
  const [showConnections, setShowConnections] = useState(true)
  const [searchLoading, setSearchLoading] = useState(false)
  const [searchResults, setSearchResults] = useState<SearchResult[]>([])
  const [clickMode, setClickMode] = useState(false)
  const [statsVisible, setStatsVisible] = useState(true)

  useEffect(() => {
    loadCities()
  }, [])

  useEffect(() => {
    const style = document.createElement('style')
    style.textContent = `
      @keyframes markerBounce {
        0% { transform: rotate(-45deg) scale(0); opacity: 0; }
        50% { transform: rotate(-45deg) scale(1.2); }
        100% { transform: rotate(-45deg) scale(1); opacity: 1; }
      }
      @keyframes pulse {
        0% { transform: scale(1); opacity: 1; }
        100% { transform: scale(2.5); opacity: 0; }
      }
      .pulse-container {
        position: relative;
        width: 30px;
        height: 30px;
      }
      .pulse-ring {
        position: absolute;
        width: 100%;
        height: 100%;
        border-radius: 50%;
        background: rgba(59, 130, 246, 0.4);
        animation: pulse 1.5s ease-out infinite;
      }
      .pulse-dot {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 12px;
        height: 12px;
        border-radius: 50%;
        background: #3b82f6;
        border: 2px solid white;
        box-shadow: 0 2px 8px rgba(0,0,0,0.3);
      }
      .custom-marker {
        background: transparent !important;
        border: none !important;
      }
      .leaflet-popup-content-wrapper {
        border-radius: 12px !important;
        box-shadow: 0 8px 32px rgba(0,0,0,0.15) !important;
      }
      .leaflet-popup-content {
        margin: 0 !important;
        min-width: 220px !important;
      }
      .marker-container.selected {
        animation: markerBounce 0.3s ease-out !important;
        box-shadow: 0 0 20px rgba(59, 130, 246, 0.6), 0 4px 12px rgba(0,0,0,0.3) !important;
      }
    `
    document.head.appendChild(style)
    return () => {
      document.head.removeChild(style)
    }
  }, [])

  const loadCities = async () => {
    try {
      const response = await cityApi.getAll()
      if (response) {
        const sortedCities = response.sort((a, b) => 
          new Date(b.firstVisit).getTime() - new Date(a.firstVisit).getTime()
        )
        setCities(sortedCities)
      }
    } catch (error) {
      console.error('Failed to load cities:', error)
    } finally {
      setLoading(false)
    }
  }

  const searchCity = async (query: string) => {
    if (!query || query.length < 2) {
      setSearchResults([])
      return
    }
    
    setSearchLoading(true)
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=5&accept-language=zh`
      )
      const data: SearchResult[] = await response.json()
      setSearchResults(data)
    } catch (error) {
      console.error('Search failed:', error)
    } finally {
      setSearchLoading(false)
    }
  }

  const handleCitySelect = (value: string) => {
    const result = searchResults.find(r => r.place_id.toString() === value)
    if (result) {
      form.setFieldsValue({
        name: result.display_name.split(',')[0],
        latitude: parseFloat(result.lat).toFixed(4),
        longitude: parseFloat(result.lon).toFixed(4)
      })
      setMapCenter([parseFloat(result.lat), parseFloat(result.lon)])
      setMapZoom(12)
    }
  }

  const handleAddCity = () => {
    setEditingCity(null)
    form.resetFields()
    setSearchResults([])
    setClickMode(false)
    setMapCenter(undefined)
    setModalVisible(true)
  }

  const handleEditCity = (city: City) => {
    setEditingCity(city)
    form.setFieldsValue({
      name: city.name,
      latitude: city.latitude,
      longitude: city.longitude,
      visitCount: city.visitCount,
      firstVisit: dayjs(city.firstVisit),
      notes: city.notes,
    })
    setMapCenter([city.latitude, city.longitude])
    setMapZoom(10)
    setModalVisible(true)
  }

  const handleCityClick = (city: City) => {
    setSelectedCity(city)
    setMapCenter([city.latitude, city.longitude])
    setMapZoom(10)
  }

  const handleLocationFound = (lat: number, lng: number) => {
    form.setFieldsValue({
      latitude: lat.toFixed(4),
      longitude: lng.toFixed(4)
    })
    setClickMode(false)
    message.success('已获取坐标，请填写其他信息')
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

  const handleDeleteCity = async (id: number) => {
    Modal.confirm({
      title: '确认删除',
      content: '确定要删除这个城市吗？',
      okText: '确定',
      cancelText: '取消',
      onOk: async () => {
        try {
          await cityApi.delete(id)
          message.success('删除成功')
          setSelectedCity(null)
          loadCities()
        } catch (error) {
          message.error('删除失败')
        }
      },
    })
  }

  const getConnectionLines = useCallback(() => {
    if (!showConnections || cities.length < 2) return []
    
    const sortedCities = [...cities].sort((a, b) => 
      new Date(a.firstVisit).getTime() - new Date(b.firstVisit).getTime()
    )
    
    return sortedCities.slice(0, -1).map((city, index) => ({
      positions: [
        [city.latitude, city.longitude],
        [sortedCities[index + 1].latitude, sortedCities[index + 1].longitude]
      ] as [number, number][],
      key: `${city.id}-${sortedCities[index + 1].id}`
    }))
  }, [cities, showConnections])

  const getStats = () => {
    const totalCities = cities.length
    const totalVisits = cities.reduce((sum, c) => sum + c.visitCount, 0)
    const mostVisited = cities.reduce((max, c) => c.visitCount > (max?.visitCount || 0) ? c : max, cities[0])
    const recentCity = cities[0]
    const uniqueYears = new Set(cities.map(c => new Date(c.firstVisit).getFullYear())).size
    
    return { totalCities, totalVisits, mostVisited, recentCity, uniqueYears }
  }

  if (loading) {
    return <Loading />
  }

  const stats = getStats()
  const defaultCenter: [number, number] = [35.8617, 104.1954]
  const theme = mapThemes[mapTheme]

  return (
    <div className={`min-h-screen py-8 transition-colors duration-500 ${mapTheme === 'dark' ? 'bg-gray-900' : 'bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6 gap-4">
          <div>
            <h1 className={`text-4xl font-bold mb-2 flex items-center gap-3 ${mapTheme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              <GlobalOutlined className="text-blue-500" />
              人生地图
            </h1>
            <p className={mapTheme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
              记录走过的城市，留下美好的回忆
            </p>
          </div>
          
          <div className="flex flex-wrap items-center gap-3">
            <Segmented
              value={mapTheme}
              onChange={(value) => setMapTheme(value as MapTheme)}
              options={[
                { label: '明亮', value: 'light' },
                { label: '暗黑', value: 'dark' },
                { label: '卫星', value: 'satellite' },
                { label: '地形', value: 'terrain' }
              ]}
            />
            <Tooltip title={showConnections ? '隐藏足迹连线' : '显示足迹连线'}>
              <Button
                type={showConnections ? 'primary' : 'default'}
                icon={<CompassOutlined />}
                onClick={() => setShowConnections(!showConnections)}
              >
                足迹连线
              </Button>
            </Tooltip>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={handleAddCity}
              size="large"
            >
              添加城市
            </Button>
          </div>
        </div>

        {statsVisible && cities.length > 0 && (
          <Card 
            className={`mb-6 shadow-lg ${mapTheme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white/80 backdrop-blur'}`}
            bodyStyle={{ padding: '16px 24px' }}
          >
            <Row gutter={[24, 16]}>
              <Col xs={12} sm={6}>
                <Statistic 
                  title={<span className={mapTheme === 'dark' ? 'text-gray-400' : ''}>足迹城市</span>}
                  value={stats.totalCities}
                  suffix="个"
                  prefix={<EnvironmentOutlined className="text-blue-500" />}
                  valueStyle={{ color: mapTheme === 'dark' ? '#fff' : undefined }}
                />
              </Col>
              <Col xs={12} sm={6}>
                <Statistic 
                  title={<span className={mapTheme === 'dark' ? 'text-gray-400' : ''}>总访问次数</span>}
                  value={stats.totalVisits}
                  suffix="次"
                  prefix={<CompassOutlined className="text-green-500" />}
                  valueStyle={{ color: mapTheme === 'dark' ? '#fff' : undefined }}
                />
              </Col>
              <Col xs={12} sm={6}>
                <Statistic 
                  title={<span className={mapTheme === 'dark' ? 'text-gray-400' : ''}>跨越年份</span>}
                  value={stats.uniqueYears}
                  suffix="年"
                  prefix={<CalendarOutlined className="text-purple-500" />}
                  valueStyle={{ color: mapTheme === 'dark' ? '#fff' : undefined }}
                />
              </Col>
              <Col xs={12} sm={6}>
                <div className={mapTheme === 'dark' ? 'text-gray-400' : 'text-gray-500'}>最常去</div>
                <div className="flex items-center gap-2 mt-1">
                  <Tag color="blue" className="text-base px-3 py-1">
                    {stats.mostVisited?.name || '-'}
                  </Tag>
                  <span className={mapTheme === 'dark' ? 'text-white' : 'text-gray-700'}>
                    {stats.mostVisited?.visitCount || 0}次
                  </span>
                </div>
              </Col>
            </Row>
          </Card>
        )}

        <div className={`rounded-2xl shadow-2xl overflow-hidden ${mapTheme === 'dark' ? 'ring-1 ring-gray-700' : 'ring-1 ring-white/50'}`}>
          <MapContainer
            center={cities.length > 0 ? [cities[0].latitude, cities[0].longitude] : defaultCenter}
            zoom={4}
            style={{ height: '550px', width: '100%' }}
            className={mapTheme === 'dark' ? 'dark-map' : ''}
          >
            <TileLayer
              key={mapTheme}
              attribution={theme.attribution}
              url={theme.url}
              subdomains="1234"
            />
            <MapController 
              center={mapCenter} 
              zoom={mapZoom} 
              cities={cities}
              showConnections={showConnections}
            />
            
            {getConnectionLines().map((line) => (
              <Polyline
                key={line.key}
                positions={line.positions}
                pathOptions={{
                  color: mapTheme === 'dark' ? '#60a5fa' : '#3b82f6',
                  weight: 2,
                  opacity: 0.6,
                  dashArray: '10, 10'
                }}
              />
            ))}
            
            {cities.map((city) => (
              <Marker
                key={city.id}
                position={[city.latitude, city.longitude]}
                icon={createCustomIcon(city.visitCount, selectedCity?.id === city.id)}
                eventHandlers={{
                  click: () => handleCityClick(city)
                }}
              >
                <Popup>
                  <div className="p-2">
                    <div className="flex items-center gap-2 mb-3 pb-2 border-b">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-lg">
                        {city.visitCount}
                      </div>
                      <div>
                        <h3 className="font-bold text-lg text-gray-800">{city.name}</h3>
                        <p className="text-xs text-gray-500">访问 {city.visitCount} 次</p>
                      </div>
                    </div>
                    <div className="space-y-2 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <CalendarOutlined className="text-blue-400" />
                        <span>首次访问：{city.firstVisit}</span>
                      </div>
                      {city.notes && (
                        <p className="text-gray-500 italic bg-gray-50 p-2 rounded">
                          "{city.notes}"
                        </p>
                      )}
                    </div>
                    <div className="flex gap-2 mt-4 pt-2 border-t">
                      <Button
                        size="small"
                        type="primary"
                        ghost
                        onClick={() => handleEditCity(city)}
                      >
                        编辑
                      </Button>
                      <Button
                        size="small"
                        danger
                        onClick={() => handleDeleteCity(city.id)}
                      >
                        删除
                      </Button>
                    </div>
                  </div>
                </Popup>
              </Marker>
            ))}
            
            {clickMode && modalVisible && (
              <LocationMarker onLocationFound={handleLocationFound} />
            )}
          </MapContainer>
        </div>

        <div className="mt-8">
          <h2 className={`text-xl font-bold mb-4 ${mapTheme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
            足迹列表
          </h2>
          {cities.length === 0 ? (
            <Card className="text-center py-12">
              <Empty
                description="还没有记录任何城市"
                image={Empty.PRESENTED_IMAGE_SIMPLE}
              >
                <Button type="primary" icon={<PlusOutlined />} onClick={handleAddCity}>
                  添加第一个城市
                </Button>
              </Empty>
            </Card>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {cities.map((city, index) => (
                <Card
                  key={city.id}
                  hoverable
                  className={`cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-xl ${
                    selectedCity?.id === city.id 
                      ? 'ring-2 ring-blue-500 shadow-lg' 
                      : ''
                  } ${mapTheme === 'dark' ? 'bg-gray-800 border-gray-700' : ''}`}
                  onClick={() => handleCityClick(city)}
                >
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-xl shadow-lg">
                      {index + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className={`font-bold text-lg truncate ${mapTheme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
                        {city.name}
                      </h3>
                      <div className="flex items-center gap-2 mt-1">
                        <Tag color="blue">{city.visitCount}次</Tag>
                        <span className={`text-xs ${mapTheme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`}>
                          {city.firstVisit}
                        </span>
                      </div>
                      {city.notes && (
                        <p className={`text-xs mt-2 truncate ${mapTheme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`}>
                          {city.notes}
                        </p>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>

        <Modal
          title={editingCity ? '编辑城市' : '添加城市'}
          open={modalVisible}
          onCancel={() => {
            setModalVisible(false)
            setClickMode(false)
          }}
          footer={null}
          width={550}
          destroyOnClose
        >
          <Form
            form={form}
            layout="vertical"
            onFinish={handleSubmit}
            className="mt-4"
          >
            <Form.Item label="搜索城市（自动获取坐标）">
              <Select
                showSearch
                placeholder="输入城市名称搜索..."
                filterOption={false}
                onSearch={searchCity}
                onSelect={handleCitySelect}
                loading={searchLoading}
                notFoundContent={searchLoading ? <Spin size="small" /> : '输入城市名搜索'}
                options={searchResults.map(r => ({
                  value: r.place_id.toString(),
                  label: r.display_name
                }))}
              />
            </Form.Item>

            <div className="text-center text-gray-400 text-sm mb-4">
              —————— 或 ——————
            </div>

            <Form.Item
              name="name"
              label="城市名称"
              rules={[{ required: true, message: '请输入城市名称' }]}
            >
              <Input placeholder="请输入城市名称" />
            </Form.Item>

            <div className="mb-4">
              <Button 
                type={clickMode ? 'primary' : 'default'} 
                icon={<AimOutlined />}
                onClick={() => {
                  setClickMode(!clickMode)
                  if (!clickMode) {
                    message.info('请在地图上点击选择位置')
                  }
                }}
              >
                {clickMode ? '点击地图选择位置...' : '点击地图选点'}
              </Button>
            </div>

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
                  precision={4}
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
                  precision={4}
                />
              </Form.Item>
            </div>

            <div className="grid grid-cols-2 gap-4">
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
            </div>

            <Form.Item name="notes" label="备注">
              <Input.TextArea rows={3} placeholder="记录难忘的经历..." maxLength={200} showCount />
            </Form.Item>

            <Form.Item>
              <div className="flex justify-end gap-2">
                <Button onClick={() => {
                  setModalVisible(false)
                  setClickMode(false)
                }}>
                  取消
                </Button>
                <Button type="primary" htmlType="submit">
                  {editingCity ? '更新' : '添加'}
                </Button>
              </div>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </div>
  )
}

export default MapPage
