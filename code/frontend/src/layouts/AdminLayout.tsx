import React from 'react';
import { Layout, Menu, Avatar, Dropdown, Button } from 'antd';
import {
  DashboardOutlined,
  FileTextOutlined,
  FolderOutlined,
  TagsOutlined,
  SettingOutlined,
  LogoutOutlined,
  UserOutlined,
  PictureOutlined,
  EnvironmentOutlined,
  CustomerServiceOutlined,
  ClockCircleOutlined,
  DeleteOutlined,
  BulbOutlined,
} from '@ant-design/icons';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '@/stores/authStore';

const { Header, Sider, Content } = Layout;

const AdminLayout: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { admin, logout } = useAuthStore();

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
        {
          key: '/admin/timeline',
          icon: <ClockCircleOutlined />,
          label: '时间轴管理',
        },
        {
          key: '/admin/trash',
          icon: <DeleteOutlined />,
          label: '回收站',
        },
        {
          key: '/admin/inspiration',
          icon: <BulbOutlined />,
          label: '灵感收集',
        },
      ],
    },
    {
      key: '/admin/settings',
      icon: <SettingOutlined />,
      label: '系统设置',
    },
  ];

  const handleMenuClick = ({ key }: { key: string }) => {
    navigate(key);
  };

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const userMenuItems = [
    {
      key: 'settings',
      icon: <SettingOutlined />,
      label: '系统设置',
      onClick: () => navigate('/admin/settings'),
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: '退出登录',
      onClick: handleLogout,
    },
  ];

  const getSelectedKey = () => {
    const path = location.pathname;
    if (path === '/admin') return '/admin';
    if (path.startsWith('/admin/articles')) return '/admin/articles';
    if (path.startsWith('/admin/categories')) return '/admin/categories';
    if (path.startsWith('/admin/tags')) return '/admin/tags';
    if (path.startsWith('/admin/images')) return '/admin/images';
    if (path.startsWith('/admin/cities')) return '/admin/cities';
    if (path.startsWith('/admin/music')) return '/admin/music';
    if (path.startsWith('/admin/timeline')) return '/admin/timeline';
    if (path.startsWith('/admin/trash')) return '/admin/trash';
    if (path.startsWith('/admin/inspiration')) return '/admin/inspiration';
    if (path.startsWith('/admin/settings')) return '/admin/settings';
    return '/admin';
  };

  return (
    <Layout className="min-h-screen">
      <Sider
        theme="dark"
        breakpoint="lg"
        collapsedWidth="80"
        className="shadow-lg"
      >
        <div className="h-16 flex items-center justify-center">
          <h1 className="text-white text-xl font-bold">星落林间</h1>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[getSelectedKey()]}
          items={menuItems}
          onClick={handleMenuClick}
        />
      </Sider>
      <Layout>
        <Header className="bg-white px-6 flex items-center justify-between shadow">
          <div className="flex items-center gap-2">
            <Button type="link" onClick={() => window.open('/', '_blank')}>
              访问前台
            </Button>
          </div>
          <Dropdown menu={{ items: userMenuItems }} placement="bottomRight">
            <div className="flex items-center gap-2 cursor-pointer">
              <Avatar src={admin?.avatar} icon={<UserOutlined />} />
              <span>{admin?.nickname || admin?.username || '管理员'}</span>
            </div>
          </Dropdown>
        </Header>
        <Content className="m-4 bg-white rounded-lg shadow min-h-[calc(100vh-120px)]">
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;
