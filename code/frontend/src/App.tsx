import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import { useAuthStore } from './stores/authStore';
import { ThemeProvider } from './contexts/ThemeContext';

import AdminLayout from './layouts/AdminLayout';
import FrontLayout from './layouts/FrontLayout';

import Login from './pages/admin/Login';
import Dashboard from './pages/admin/Dashboard';
import ArticleList from './pages/admin/ArticleList';
import ArticleEditor from './pages/admin/ArticleEditor';
import CategoryManage from './pages/admin/CategoryManage';
import TagManage from './pages/admin/TagManage';
import Settings from './pages/admin/Settings';

import Home from './pages/front/Home';
import ArticleDetail from './pages/front/ArticleDetail';
import CategoryList from './pages/front/CategoryList';
import TagList from './pages/front/TagList';
import Search from './pages/front/Search';
import About from './pages/front/About';
import Gallery from './pages/front/Gallery';
import MapPage from './pages/front/MapPage';
import Archive from './pages/front/Archive';

import ImageManage from './pages/admin/ImageManage';
import CityManage from './pages/admin/CityManage';
import MusicManage from './pages/admin/MusicManage';
import TimelineManage from './pages/admin/TimelineManage';
import TrashManage from './pages/admin/TrashManage';
import InspirationManage from './pages/admin/InspirationManage';

import { ErrorBoundary } from './components/common';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { token } = useAuthStore();
  if (!token) {
    return <Navigate to="/admin/login" replace />;
  }
  return <>{children}</>;
};

const App: React.FC = () => {
  return (
    <ConfigProvider locale={zhCN}>
      <ThemeProvider>
        <ErrorBoundary>
          <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
          <Routes>
            <Route path="/admin/login" element={<Login />} />
            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <AdminLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Dashboard />} />
              <Route path="articles" element={<ArticleList />} />
              <Route path="articles/create" element={<ArticleEditor />} />
              <Route path="articles/edit/:id" element={<ArticleEditor />} />
              <Route path="categories" element={<CategoryManage />} />
              <Route path="tags" element={<TagManage />} />
              <Route path="images" element={<ImageManage />} />
              <Route path="cities" element={<CityManage />} />
              <Route path="music" element={<MusicManage />} />
              <Route path="timeline" element={<TimelineManage />} />
              <Route path="trash" element={<TrashManage />} />
              <Route path="inspiration" element={<InspirationManage />} />
              <Route path="settings" element={<Settings />} />
            </Route>
            <Route path="/" element={<FrontLayout />}>
              <Route index element={<Home />} />
              <Route path="gallery" element={<Gallery />} />
              <Route path="map" element={<MapPage />} />
              <Route path="article/:id" element={<ArticleDetail />} />
              <Route path="category/:id" element={<CategoryList />} />
              <Route path="category" element={<CategoryList />} />
              <Route path="tag/:id" element={<TagList />} />
              <Route path="tag" element={<TagList />} />
              <Route path="search" element={<Search />} />
              <Route path="archive" element={<Archive />} />
              <Route path="about" element={<About />} />
            </Route>
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
          </BrowserRouter>
        </ErrorBoundary>
      </ThemeProvider>
    </ConfigProvider>
  );
};

export default App;
