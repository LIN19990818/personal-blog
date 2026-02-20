# 个人博客系统 - 开发指南

**版本**: v1.1.0  
**创建日期**: 2026-02-17  
**目标读者**: 代码开发智能体  
**依据文档**: 未完成需求技术实现方案_v1.1.0.md

---

## 一、开发规范总则

### 1.1 代码风格

| 规范项 | 要求 |
|--------|------|
| **语言** | TypeScript + React |
| **组件风格** | 函数式组件 + Hooks |
| **样式方案** | Tailwind CSS 优先，复杂样式使用 CSS Modules |
| **命名规范** | 组件使用 PascalCase，函数/变量使用 camelCase |
| **注释语言** | 中文注释，代码中不添加多余注释 |

### 1.2 文件结构规范

```
src/
├── api/              # API接口定义
├── components/       # 公共组件
├── layouts/          # 布局组件
├── pages/            # 页面组件
│   ├── admin/        # 后台页面
│   └── front/        # 前台页面
├── stores/           # Zustand状态管理
├── types/            # TypeScript类型定义
└── utils/            # 工具函数
```

### 1.3 开发前检查

- [ ] 确认依赖已安装：`npm install`
- [ ] 确认开发服务器运行：`npm run dev`
- [ ] 确认后端服务运行
- [ ] 阅读相关API文档

---

## 二、第一阶段开发任务（P0紧急）

### 2.1 REQ-001: 人间足迹路由配置

**开发步骤**：

```
步骤1: 打开 src/App.tsx
步骤2: 在import区域添加组件导入
步骤3: 在FrontLayout子路由中添加路由配置
步骤4: 验证访问 /gallery 页面正常显示
```

**代码修改**：

**文件**: `src/App.tsx`

```typescript
// 步骤2: 添加导入（约第17行后）
import Gallery from './pages/front/Gallery';

// 步骤3: 添加路由（在 <Route path="/" element={<FrontLayout />}> 内部）
// 约第50行，在 <Route index element={<Home />} /> 后添加
<Route path="gallery" element={<Gallery />} />
```

**验收标准**：
- 访问 `http://localhost:5173/gallery` 显示图片画廊页面
- 页面展示网格布局的图片列表
- 点击图片弹出详情弹窗

---

### 2.2 REQ-002: 人生地图路由配置

**开发步骤**：

```
步骤1: 打开 src/App.tsx
步骤2: 添加MapPage组件导入
步骤3: 在FrontLayout子路由中添加路由配置
步骤4: 验证访问 /map 页面正常显示
```

**代码修改**：

**文件**: `src/App.tsx`

```typescript
// 步骤2: 添加导入
import MapPage from './pages/front/MapPage';

// 步骤3: 添加路由（在gallery路由后）
<Route path="map" element={<MapPage />} />
```

**验收标准**：
- 访问 `http://localhost:5173/map` 显示地图页面
- 地图正确加载中国区域
- 城市标记点可点击

---

### 2.3 REQ-003: 音乐播放器前台集成

**开发步骤**：

```
步骤1: 打开 src/layouts/FrontLayout.tsx
步骤2: 添加MusicPlayer组件导入
步骤3: 在Layout中集成MusicPlayer组件
步骤4: 调整Footer样式避免遮挡
步骤5: 验证播放器在所有前台页面显示
```

**代码修改**：

**文件**: `src/layouts/FrontLayout.tsx`

```typescript
// 步骤2: 添加导入（约第3行后）
import MusicPlayer from '@/components/MusicPlayer';

// 步骤3: 在Content和Footer之间添加（约第70行）
<Content className="bg-gray-50">
  <Outlet />
</Content>
<MusicPlayer />  {/* 新增此行 */}
<Footer className="text-center bg-gray-100 pb-20">  {/* 添加pb-20 */}
  {/* ... */}
</Footer>
```

**验收标准**：
- 前台所有页面底部显示音乐播放器
- 播放器不遮挡Footer内容
- 播放/暂停、上下首功能正常

---

### 2.4 REQ-004/005/006: 后台管理模块集成

**开发步骤**：

```
步骤1: 打开 src/App.tsx
步骤2: 添加三个管理组件的导入
步骤3: 在AdminLayout子路由中添加路由配置
步骤4: 打开 src/layouts/AdminLayout.tsx
步骤5: 添加新图标导入
步骤6: 修改menuItems添加分组菜单
步骤7: 更新getSelectedKey函数
步骤8: 验证后台菜单和路由正常
```

**代码修改**：

**文件1**: `src/App.tsx`

```typescript
// 步骤2: 添加导入
import ImageManage from './pages/admin/ImageManage';
import CityManage from './pages/admin/CityManage';
import MusicManage from './pages/admin/MusicManage';

// 步骤3: 在AdminLayout子路由中添加（在tags路由后）
<Route path="images" element={<ImageManage />} />
<Route path="cities" element={<CityManage />} />
<Route path="music" element={<MusicManage />} />
```

**文件2**: `src/layouts/AdminLayout.tsx`

```typescript
// 步骤5: 添加图标导入
import {
  DashboardOutlined,
  FileTextOutlined,
  FolderOutlined,
  TagsOutlined,
  SettingOutlined,
  LogoutOutlined,
  UserOutlined,
  PictureOutlined,      // 新增
  EnvironmentOutlined,  // 新增
  CustomerServiceOutlined,  // 新增
} from '@ant-design/icons';

// 步骤6: 修改menuItems为数组结构
const menuItems = [
  {
    key: '/admin',
    icon: <DashboardOutlined />,
    label: '仪表盘',
  },
  {
    key: 'content-group',
    icon: <FolderOutlined />,
    label: '内容管理',
    children: [
      {
        key: '/admin/articles',
        icon: <FileTextOutlined />,
        label: '文章管理',
      },
      {
        key: '/admin/categories',
        icon: <FolderOutlined />,
        label: '分类管理',
      },
      {
        key: '/admin/tags',
        icon: <TagsOutlined />,
        label: '标签管理',
      },
      {
        key: '/admin/images',
        icon: <PictureOutlined />,
        label: '图片管理',
      },
      {
        key: '/admin/cities',
        icon: <EnvironmentOutlined />,
        label: '城市管理',
      },
      {
        key: '/admin/music',
        icon: <CustomerServiceOutlined />,
        label: '音乐管理',
      },
    ],
  },
  {
    key: '/admin/settings',
    icon: <SettingOutlined />,
    label: '系统设置',
  },
];

// 步骤7: 更新getSelectedKey函数
const getSelectedKey = () => {
  const path = location.pathname;
  if (path === '/admin') return '/admin';
  if (path.startsWith('/admin/articles')) return '/admin/articles';
  if (path.startsWith('/admin/categories')) return '/admin/categories';
  if (path.startsWith('/admin/tags')) return '/admin/tags';
  if (path.startsWith('/admin/images')) return '/admin/images';
  if (path.startsWith('/admin/cities')) return '/admin/cities';
  if (path.startsWith('/admin/music')) return '/admin/music';
  if (path.startsWith('/admin/settings')) return '/admin/settings';
  return '/admin';
};
```

**验收标准**：
- 后台侧边栏显示"内容管理"分组
- 分组下显示图片/城市/音乐管理菜单项
- 点击菜单项正确跳转到对应页面

---

### 2.5 REQ-007: 前台导航栏扩展

**开发步骤**：

```
步骤1: 打开 src/layouts/FrontLayout.tsx
步骤2: 添加新图标导入
步骤3: 修改menuItems添加新菜单项
步骤4: 更新getSelectedKey函数
步骤5: 验证导航栏显示和高亮正确
```

**代码修改**：

**文件**: `src/layouts/FrontLayout.tsx`

```typescript
// 步骤2: 添加图标导入
import { 
  SearchOutlined, 
  HomeOutlined, 
  FolderOutlined, 
  TagsOutlined, 
  UserOutlined,
  PictureOutlined,      // 新增
  EnvironmentOutlined,  // 新增
} from '@ant-design/icons';

// 步骤3: 修改menuItems
const menuItems = [
  {
    key: '/',
    icon: <HomeOutlined />,
    label: <Link to="/">首页</Link>,
  },
  {
    key: '/gallery',
    icon: <PictureOutlined />,
    label: <Link to="/gallery">人间足迹</Link>,
  },
  {
    key: '/map',
    icon: <EnvironmentOutlined />,
    label: <Link to="/map">人生地图</Link>,
  },
  {
    key: '/category',
    icon: <FolderOutlined />,
    label: <Link to="/category">分类</Link>,
  },
  {
    key: '/tag',
    icon: <TagsOutlined />,
    label: <Link to="/tag">标签</Link>,
  },
  {
    key: '/about',
    icon: <UserOutlined />,
    label: <Link to="/about">关于</Link>,
  },
];

// 步骤4: 更新getSelectedKey函数
const getSelectedKey = () => {
  const path = location.pathname;
  if (path === '/') return '/';
  if (path.startsWith('/gallery')) return '/gallery';
  if (path.startsWith('/map')) return '/map';
  if (path.startsWith('/category')) return '/category';
  if (path.startsWith('/tag')) return '/tag';
  if (path.startsWith('/about')) return '/about';
  return '/';
};
```

**验收标准**：
- 导航栏显示"人间足迹"和"人生地图"菜单项
- 点击菜单项正确跳转
- 当前页面导航项高亮显示

---

## 三、第二阶段开发任务（P1重要）

### 3.1 REQ-009: 首页时间轴

**开发步骤**：

```
后端开发:
步骤1: 创建Timeline实体类
步骤2: 创建TimelineRepository
步骤3: 创建TimelineService
步骤4: 创建TimelineController
步骤5: 运行数据库迁移

前端开发:
步骤6: 创建 src/api/timeline.ts
步骤7: 创建 src/components/Timeline.tsx
步骤8: 修改 src/pages/front/Home.tsx 集成时间轴
```

**代码实现**：

**文件1**: `src/api/timeline.ts`（新建）

```typescript
import request from '@/utils/request';
import { IApiResponse } from '@/types';

export interface Timeline {
  id: number;
  name: string;
  time: string;
  description?: string;
  image?: string;
  articleId?: number;
  sortOrder: number;
}

export interface TimelineCreateRequest {
  name: string;
  time: string;
  description?: string;
  image?: string;
  articleId?: number;
  sortOrder?: number;
}

export const timelineApi = {
  getAll: () => request.get<IApiResponse<Timeline[]>>('/api/timeline'),
  getById: (id: number) => request.get<IApiResponse<Timeline>>(`/api/timeline/${id}`),
  create: (data: TimelineCreateRequest) => request.post<IApiResponse<Timeline>>('/api/timeline', data),
  update: (id: number, data: TimelineCreateRequest) => request.put<IApiResponse<Timeline>>(`/api/timeline/${id}`, data),
  delete: (id: number) => request.delete(`/api/timeline/${id}`),
};
```

**文件2**: `src/components/Timeline.tsx`（新建）

```typescript
import React from 'react';
import { Link } from 'react-router-dom';
import { Timeline as TimelineType } from '@/api/timeline';

interface TimelineProps {
  items: TimelineType[];
}

const Timeline: React.FC<TimelineProps> = ({ items }) => {
  return (
    <div className="relative py-12 max-w-4xl mx-auto px-4">
      <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-blue-500 -translate-x-1/2 hidden md:block" />
      
      {items.map((item, index) => (
        <div
          key={item.id}
          className={`relative flex items-center mb-8 timeline-item ${
            index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
          } flex-row`}
        >
          <div className="absolute left-4 md:left-1/2 md:-translate-x-1/2 w-4 h-4 bg-blue-500 rounded-full border-4 border-white shadow z-10" />
          
          <div className={`w-full md:w-5/12 pl-12 md:pl-0 ${
            index % 2 === 0 ? 'md:pr-8 md:text-right' : 'md:pl-8 md:text-left'
          }`}>
            <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow">
              {item.image && (
                <img src={item.image} alt="" className="w-full h-32 object-cover rounded mb-2" />
              )}
              <h3 className="font-bold text-lg">{item.name}</h3>
              <p className="text-sm text-gray-500">{item.time}</p>
              {item.description && (
                <p className="text-gray-600 mt-2">{item.description}</p>
              )}
              {item.articleId && (
                <Link to={`/article/${item.articleId}`} className="text-blue-500 text-sm mt-2 inline-block">
                  查看相关文章 →
                </Link>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Timeline;
```

**验收标准**：
- 时间轴正确展示在首页
- 节点按时间倒序排列
- PC端左右交替，移动端单侧布局

---

### 3.2 REQ-011: 文章回收站

**开发步骤**：

```
后端开发:
步骤1: 修改Article实体添加deletedAt字段
步骤2: 创建回收站相关API
步骤3: 创建定时清理任务

前端开发:
步骤4: 扩展 src/api/article.ts 添加回收站API
步骤5: 修改 src/pages/admin/ArticleList.tsx 添加回收站Tab
```

**代码实现**：

**文件1**: `src/api/article.ts`（扩展）

```typescript
// 添加以下方法到articleApi对象中

export interface TrashedArticle extends Article {
  deletedAt: string;
}

export const articleApi = {
  // ... 现有方法
  
  getTrashList: (params: { page: number; size: number }) =>
    request.get<IApiResponse<PageResult<TrashedArticle>>>('/api/admin/articles/trash', { params }),
  
  restore: (id: number) =>
    request.post<IApiResponse<void>>(`/api/admin/articles/${id}/restore`),
  
  permanentDelete: (id: number) =>
    request.delete<IApiResponse<void>>(`/api/admin/articles/${id}/permanent`),
};
```

**文件2**: `src/pages/admin/ArticleList.tsx`（修改）

```typescript
// 在文件顶部添加
import { Tabs, Tag } from 'antd';
import dayjs from 'dayjs';

// 修改组件主体
const ArticleList: React.FC = () => {
  const [activeTab, setActiveTab] = useState('published');
  
  return (
    <div className="p-6">
      <Tabs activeKey={activeTab} onChange={setActiveTab}>
        <Tabs.TabPane tab="已发布" key="published">
          <ArticleTable status="published" />
        </Tabs.TabPane>
        <Tabs.TabPane tab="草稿" key="draft">
          <ArticleTable status="draft" />
        </Tabs.TabPane>
        <Tabs.TabPane tab="回收站" key="trash">
          <TrashTable />
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
};

// 添加回收站表格组件
const TrashTable: React.FC = () => {
  const [articles, setArticles] = useState<TrashedArticle[]>([]);
  const [loading, setLoading] = useState(false);
  
  const loadArticles = async () => {
    setLoading(true);
    try {
      const res = await articleApi.getTrashList({ page: 1, size: 100 });
      if (res.data) setArticles(res.data.list);
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => { loadArticles(); }, []);
  
  const handleRestore = async (id: number) => {
    await articleApi.restore(id);
    message.success('恢复成功');
    loadArticles();
  };
  
  const handlePermanentDelete = async (id: number) => {
    Modal.confirm({
      title: '永久删除',
      content: '此操作不可恢复，确定要永久删除吗？',
      onOk: async () => {
        await articleApi.permanentDelete(id);
        message.success('已永久删除');
        loadArticles();
      },
    });
  };
  
  const columns = [
    { title: '标题', dataIndex: 'title' },
    { title: '删除时间', dataIndex: 'deletedAt', render: (v: string) => dayjs(v).format('YYYY-MM-DD HH:mm') },
    { 
      title: '剩余天数', 
      render: (_: any, record: TrashedArticle) => {
        const days = 30 - dayjs().diff(dayjs(record.deletedAt), 'day');
        return <Tag color={days <= 7 ? 'red' : 'blue'}>{Math.max(0, days)} 天</Tag>;
      }
    },
    {
      title: '操作',
      render: (_: any, record: TrashedArticle) => (
        <Space>
          <Button type="link" onClick={() => handleRestore(record.id)}>恢复</Button>
          <Button type="link" danger onClick={() => handlePermanentDelete(record.id)}>永久删除</Button>
        </Space>
      ),
    },
  ];
  
  return <Table columns={columns} dataSource={articles} rowKey="id" loading={loading} />;
};
```

**验收标准**：
- 删除文章进入回收站
- 回收站显示剩余天数
- 支持恢复和永久删除

---

### 3.3 REQ-013: 访问统计可视化

**开发步骤**：

```
步骤1: 安装ECharts依赖
步骤2: 修改 src/pages/admin/Dashboard.tsx
步骤3: 添加图表组件
```

**安装依赖**：

```bash
npm install echarts echarts-for-react
```

**代码实现**：

**文件**: `src/pages/admin/Dashboard.tsx`（修改）

```typescript
// 添加导入
import ReactECharts from 'echarts-for-react';
import { statsApi, VisitStat } from '@/api/stats';
import { Select } from 'antd';

// 在Dashboard组件内添加
const [visitStats, setVisitStats] = useState<VisitStat[]>([]);
const [timeRange, setTimeRange] = useState<'7d' | '30d'>('7d');

useEffect(() => {
  const endDate = dayjs().format('YYYY-MM-DD');
  const startDate = timeRange === '7d' 
    ? dayjs().subtract(7, 'day').format('YYYY-MM-DD')
    : dayjs().subtract(30, 'day').format('YYYY-MM-DD');
  
  statsApi.getByDateRange(startDate, endDate).then(res => {
    if (res.data) setVisitStats(res.data);
  });
}, [timeRange]);

const getLineChartOption = () => ({
  title: { text: '访问趋势', left: 'center' },
  tooltip: { trigger: 'axis' },
  legend: { data: ['PV', 'UV'], bottom: 0 },
  xAxis: {
    type: 'category',
    data: visitStats.map(s => s.visitDate),
  },
  yAxis: { type: 'value' },
  series: [
    {
      name: 'PV',
      type: 'line',
      data: visitStats.map(s => s.pageViews),
      smooth: true,
      areaStyle: { opacity: 0.3 },
    },
    {
      name: 'UV',
      type: 'line',
      data: visitStats.map(s => s.uniqueVisitors),
      smooth: true,
    },
  ],
});

// 在return的JSX中添加图表区域
<Row gutter={[16, 16]} className="mt-6">
  <Col span={24}>
    <Card 
      title="访问统计"
      extra={
        <Select value={timeRange} onChange={setTimeRange} style={{ width: 120 }}>
          <Select.Option value="7d">近7天</Select.Option>
          <Select.Option value="30d">近30天</Select.Option>
        </Select>
      }
    >
      <ReactECharts option={getLineChartOption()} style={{ height: 300 }} />
    </Card>
  </Col>
</Row>
```

**验收标准**：
- 仪表盘显示访问趋势折线图
- 支持切换时间维度
- 图表数据正确显示

---

### 3.4 REQ-014: 登录安全增强

**开发步骤**：

```
步骤1: 创建 src/hooks/useAutoLogout.ts
步骤2: 修改 src/pages/admin/Login.tsx 添加错误处理
步骤3: 在AdminLayout中使用自动登出Hook
```

**代码实现**：

**文件1**: `src/hooks/useAutoLogout.ts`（新建）

```typescript
import { useState, useEffect, useCallback, useRef } from 'react';
import { useAuthStore } from '@/stores/authStore';

export const useAutoLogout = (timeout: number = 2 * 60 * 60 * 1000) => {
  const { logout } = useAuthStore();
  const [showWarning, setShowWarning] = useState(false);
  const timerRef = useRef<NodeJS.Timeout>();
  const warningTimerRef = useRef<NodeJS.Timeout>();
  
  const resetTimer = useCallback(() => {
    clearTimeout(timerRef.current);
    clearTimeout(warningTimerRef.current);
    setShowWarning(false);
    
    warningTimerRef.current = setTimeout(() => {
      setShowWarning(true);
    }, timeout - 5 * 60 * 1000);
    
    timerRef.current = setTimeout(() => {
      logout();
    }, timeout);
  }, [timeout, logout]);
  
  useEffect(() => {
    const events = ['mousedown', 'keydown', 'scroll', 'touchstart'];
    events.forEach(event => window.addEventListener(event, resetTimer));
    resetTimer();
    
    return () => {
      events.forEach(event => window.removeEventListener(event, resetTimer));
      clearTimeout(timerRef.current);
      clearTimeout(warningTimerRef.current);
    };
  }, [resetTimer]);
  
  return { showWarning, extendSession: resetTimer };
};
```

**文件2**: `src/layouts/AdminLayout.tsx`（修改）

```typescript
// 添加导入
import { useAutoLogout } from '@/hooks/useAutoLogout';
import { Modal, Button } from 'antd';

// 在组件内添加
const { showWarning, extendSession } = useAutoLogout();

// 在return的JSX中添加警告Modal
<Modal
  open={showWarning}
  title="会话即将过期"
  onOk={extendSession}
  onCancel={logout}
  okText="继续使用"
  cancelText="退出登录"
>
  <p>您已超过2小时未操作，系统将在5分钟后自动登出。</p>
</Modal>
```

**验收标准**：
- 无操作2小时后自动登出
- 登出前5分钟显示警告
- 点击"继续使用"重置计时器

---

## 四、第三阶段开发任务（P2增强）

### 4.1 REQ-015: 文章分享功能

**开发步骤**：

```
步骤1: 安装qrcode.react依赖
步骤2: 创建 src/components/ShareButtons.tsx
步骤3: 在文章详情页集成分享按钮
```

**安装依赖**：

```bash
npm install qrcode.react
```

**代码实现**：

**文件**: `src/components/ShareButtons.tsx`（新建）

```typescript
import React, { useState } from 'react';
import { Button, Modal, message, Space, Tooltip } from 'antd';
import { WechatOutlined, WeiboOutlined, QqOutlined, LinkOutlined } from '@ant-design/icons';
import { QRCodeSVG } from 'qrcode.react';

interface ShareButtonsProps {
  title: string;
  url: string;
}

const ShareButtons: React.FC<ShareButtonsProps> = ({ title, url }) => {
  const [showQRCode, setShowQRCode] = useState(false);
  
  const shareToWeibo = () => {
    const weiboUrl = `https://service.weibo.com/share/share.php?title=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`;
    window.open(weiboUrl, '_blank', 'width=600,height=400');
  };
  
  const shareToQQ = () => {
    const qqUrl = `https://connect.qq.com/widget/shareqq/index.html?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`;
    window.open(qqUrl, '_blank', 'width=600,height=400');
  };
  
  const copyLink = () => {
    navigator.clipboard.writeText(url);
    message.success('链接已复制到剪贴板');
  };
  
  return (
    <>
      <Space>
        <Tooltip title="分享到微信">
          <Button icon={<WechatOutlined />} onClick={() => setShowQRCode(true)} />
        </Tooltip>
        <Tooltip title="分享到微博">
          <Button icon={<WeiboOutlined />} onClick={shareToWeibo} />
        </Tooltip>
        <Tooltip title="分享到QQ">
          <Button icon={<QqOutlined />} onClick={shareToQQ} />
        </Tooltip>
        <Tooltip title="复制链接">
          <Button icon={<LinkOutlined />} onClick={copyLink} />
        </Tooltip>
      </Space>
      
      <Modal
        title="微信扫码分享"
        open={showQRCode}
        onCancel={() => setShowQRCode(false)}
        footer={null}
        centered
      >
        <div className="flex justify-center p-4">
          <QRCodeSVG value={url} size={200} />
        </div>
      </Modal>
    </>
  );
};

export default ShareButtons;
```

**验收标准**：
- 文章详情页显示分享按钮
- 点击微信显示二维码
- 点击复制链接显示成功提示

---

### 4.2 REQ-016: 主题设置

**开发步骤**：

```
步骤1: 创建 src/themes/index.ts
步骤2: 创建 src/stores/themeStore.ts
步骤3: 修改 src/App.tsx 应用主题
步骤4: 在设置页添加主题选择器
```

**代码实现**：

**文件1**: `src/themes/index.ts`（新建）

```typescript
export const themes = {
  light: {
    name: '默认白',
    primaryColor: '#1890ff',
  },
  dark: {
    name: '暗黑模式',
    primaryColor: '#177ddc',
  },
  green: {
    name: '护眼绿',
    primaryColor: '#52c41a',
  },
  warm: {
    name: '暖色调',
    primaryColor: '#fa8c16',
  },
} as const;

export type ThemeKey = keyof typeof themes;
```

**文件2**: `src/stores/themeStore.ts`（新建）

```typescript
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { ThemeKey } from '@/themes';

interface ThemeState {
  currentTheme: ThemeKey;
  setTheme: (theme: ThemeKey) => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      currentTheme: 'light',
      setTheme: (theme) => set({ currentTheme: theme }),
    }),
    { name: 'theme-storage' }
  )
);
```

**验收标准**：
- 设置页显示主题选择
- 切换主题实时生效
- 刷新页面主题保持

---

### 4.3 REQ-020: 写作模式

**开发步骤**：

```
步骤1: 创建 src/stores/writingModeStore.ts
步骤2: 修改文章编辑器添加专注模式
```

**代码实现**：

**文件**: `src/stores/writingModeStore.ts`（新建）

```typescript
import { create } from 'zustand';

interface WritingModeState {
  isWritingMode: boolean;
  wordCount: number;
  startTime: number | null;
  toggleWritingMode: () => void;
  setWordCount: (count: number) => void;
}

export const useWritingModeStore = create<WritingModeState>((set) => ({
  isWritingMode: false,
  wordCount: 0,
  startTime: null,
  toggleWritingMode: () => set((state) => ({ 
    isWritingMode: !state.isWritingMode,
    startTime: !state.isWritingMode ? Date.now() : null,
  })),
  setWordCount: (count) => set({ wordCount: count }),
}));
```

**验收标准**：
- 编辑器有"专注模式"入口
- 进入后界面简化
- 显示字数统计和专注时间

---

## 五、验收流程

### 5.1 第一阶段验收清单

| 序号 | 验收项 | 验收方法 | 预期结果 |
|------|--------|----------|----------|
| 1 | 人间足迹路由 | 访问 `/gallery` | 显示图片画廊页面 |
| 2 | 人生地图路由 | 访问 `/map` | 显示地图页面 |
| 3 | 音乐播放器 | 访问任意前台页面 | 底部显示播放器 |
| 4 | 后台图片管理 | 访问 `/admin/images` | 显示管理页面 |
| 5 | 后台城市管理 | 访问 `/admin/cities` | 显示管理页面 |
| 6 | 后台音乐管理 | 访问 `/admin/music` | 显示管理页面 |
| 7 | 前台导航栏 | 查看导航菜单 | 显示所有菜单项 |

### 5.2 第二阶段验收清单

| 序号 | 验收项 | 验收方法 | 预期结果 |
|------|--------|----------|----------|
| 1 | 首页时间轴 | 访问首页 | 显示时间轴组件 |
| 2 | 文章回收站 | 删除文章后查看回收站 | 显示已删除文章 |
| 3 | 文章归档 | 访问 `/archive` | 显示归档页面 |
| 4 | 访问统计图表 | 访问后台仪表盘 | 显示趋势图表 |
| 5 | 登录锁定 | 连续失败登录5次 | 账户锁定15分钟 |
| 6 | 自动登出 | 无操作2小时 | 自动登出 |

### 5.3 第三阶段验收清单

| 序号 | 验收项 | 验收方法 | 预期结果 |
|------|--------|----------|----------|
| 1 | 文章分享 | 查看文章详情页 | 显示分享按钮 |
| 2 | 主题切换 | 在设置页切换主题 | 主题实时变化 |
| 3 | 写作模式 | 在编辑器开启专注模式 | 界面简化 |
| 4 | 灵感收集 | 访问灵感管理页面 | 可记录灵感 |
| 5 | 数据备份 | 在设置页点击备份 | 生成备份文件 |

---

## 六、注意事项

### 6.1 开发注意事项

1. **组件已存在**：第一阶段所有组件文件已存在，仅需配置路由和菜单
2. **API已存在**：大部分API已实现，新增API需与后端协调
3. **样式一致性**：使用Tailwind CSS保持与现有代码风格一致
4. **类型安全**：所有新增代码需有完整的TypeScript类型定义

### 6.2 测试注意事项

1. **功能测试**：每个需求完成后立即测试验收标准
2. **兼容性测试**：测试Chrome、Firefox、Safari浏览器
3. **响应式测试**：测试PC端和移动端显示效果
4. **边界测试**：测试空数据、异常情况的处理

### 6.3 提交规范

1. **提交粒度**：每完成一个需求提交一次
2. **提交信息**：格式 `feat: 实现REQ-XXX功能描述`
3. **代码检查**：提交前运行 `npm run lint` 确保无错误

---

**文档版本历史**

| 版本 | 日期 | 修改内容 |
|------|------|----------|
| v1.1.0 | 2026-02-17 | 初始版本，包含22个需求的开发指南 |
