import { Suspense, lazy } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Loading from '@/components/common/Loading'
import FrontLayout from '@/layouts/FrontLayout'
import AdminLayout from '@/layouts/AdminLayout'

const Home = lazy(() => import('@/pages/front/Home'))
const ArticleDetail = lazy(() => import('@/pages/front/ArticleDetail'))
const CategoryList = lazy(() => import('@/pages/front/CategoryList'))
const TagList = lazy(() => import('@/pages/front/TagList'))
const Search = lazy(() => import('@/pages/front/Search'))
const About = lazy(() => import('@/pages/front/About'))
const Gallery = lazy(() => import('@/pages/front/Gallery'))
const MapPage = lazy(() => import('@/pages/front/MapPage'))

const Login = lazy(() => import('@/pages/admin/Login'))
const Dashboard = lazy(() => import('@/pages/admin/Dashboard'))
const DashboardStats = lazy(() => import('@/pages/admin/DashboardStats'))
const ArticleList = lazy(() => import('@/pages/admin/ArticleList'))
const ArticleEditor = lazy(() => import('@/pages/admin/ArticleEditor'))
const CategoryManage = lazy(() => import('@/pages/admin/CategoryManage'))
const TagManage = lazy(() => import('@/pages/admin/TagManage'))
const ImageManage = lazy(() => import('@/pages/admin/ImageManage'))
const CityManage = lazy(() => import('@/pages/admin/CityManage'))
const MusicManage = lazy(() => import('@/pages/admin/MusicManage'))
const Settings = lazy(() => import('@/pages/admin/Settings'))

const Router = () => {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route element={<FrontLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/article/:slug" element={<ArticleDetail />} />
          <Route path="/category/:slug" element={<CategoryList />} />
          <Route path="/tag/:slug" element={<TagList />} />
          <Route path="/search" element={<Search />} />
          <Route path="/about" element={<About />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/map" element={<MapPage />} />
        </Route>

        <Route path="/admin/login" element={<Login />} />
        
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="dashboard" element={<DashboardStats />} />
          <Route path="articles" element={<ArticleList />} />
          <Route path="articles/new" element={<ArticleEditor />} />
          <Route path="articles/edit/:id" element={<ArticleEditor />} />
          <Route path="categories" element={<CategoryManage />} />
          <Route path="tags" element={<TagManage />} />
          <Route path="images" element={<ImageManage />} />
          <Route path="cities" element={<CityManage />} />
          <Route path="music" element={<MusicManage />} />
          <Route path="settings" element={<Settings />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  )
}

export default Router
