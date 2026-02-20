import React from 'react';
import { Layout, Menu, Input } from 'antd';
import { SearchOutlined, HomeOutlined, FolderOutlined, TagsOutlined, UserOutlined, PictureOutlined, EnvironmentOutlined, ClockCircleOutlined } from '@ant-design/icons';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import MusicPlayer from '@/components/MusicPlayer';

const { Header, Footer, Content } = Layout;

const FrontLayout: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

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
      key: '/archive',
      icon: <ClockCircleOutlined />,
      label: <Link to="/archive">归档</Link>,
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

  const handleSearch = (value: string) => {
    if (value.trim()) {
      navigate(`/search?q=${encodeURIComponent(value.trim())}`);
    }
  };

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

  return (
    <Layout className="min-h-screen">
      <Header className="bg-white shadow sticky top-0 z-50 flex items-center justify-between px-8">
        <div className="flex items-center gap-8">
          <Link to="/" className="text-xl font-bold text-gray-800">
            星落林间
          </Link>
          <Menu
            mode="horizontal"
            selectedKeys={[getSelectedKey()]}
            items={menuItems}
            style={{ border: 'none', minWidth: 300 }}
          />
        </div>
        <Input.Search
          placeholder="搜索文章..."
          onSearch={handleSearch}
          enterButton={<SearchOutlined />}
          style={{ width: 250 }}
        />
      </Header>
      <Content className="bg-gray-50">
        <Outlet />
      </Content>
      <MusicPlayer />
      <Footer className="text-center bg-gray-100 pb-20">
        <p className="text-gray-600">
          © {new Date().getFullYear()} 星落林间 - Powered by React & Spring Boot
        </p>
      </Footer>
    </Layout>
  );
};

export default FrontLayout;
