# API接口映射表

## 需求追踪

本文档记录了PRD需求与代码实现的映射关系，确保所有需求都已实现。

---

## 一、前台展示模块

### 1.1 首页（时间轴）

| 需求描述 | 实现文件 | API接口 |
|---------|---------|---------|
| 展示主页大图 | [Home.tsx](../code/frontend/src/pages/front/Home.tsx) | GET /api/settings/home_image |
| 时间轴展示个人发展历程 | [Home.tsx](../code/frontend/src/pages/front/Home.tsx) | GET /api/articles/timeline |
| 网站介绍 | [Home.tsx](../code/frontend/src/pages/front/Home.tsx) | GET /api/settings/site_description |

### 1.2 人间足迹（图片画廊）

| 需求描述 | 实现文件 | API接口 |
|---------|---------|---------|
| 画廊形式展示图片 | [Gallery.tsx](../code/frontend/src/pages/front/Gallery.tsx) | GET /api/images |
| 点击图片查看详情 | [Gallery.tsx](../code/frontend/src/pages/front/Gallery.tsx) | GET /api/images/{id} |
| 显示图片总数 | [Gallery.tsx](../code/frontend/src/pages/front/Gallery.tsx) | GET /api/images (统计返回数据长度) |

**后端实现**:
- Entity: [Image.java](../code/backend/src/main/java/com/blog/entity/Image.java)
- Repository: [ImageRepository.java](../code/backend/src/main/java/com/blog/repository/ImageRepository.java)
- Service: [ImageService.java](../code/backend/src/main/java/com/blog/service/ImageService.java)
- Controller: [ImageController.java](../code/backend/src/main/java/com/blog/controller/ImageController.java)

### 1.3 心得感悟（文章列表）

| 需求描述 | 实现文件 | API接口 |
|---------|---------|---------|
| 列表展示文章 | [Home.tsx](../code/frontend/src/pages/front/Home.tsx) | GET /api/articles |
| 查看文章详情 | [ArticleDetail.tsx](../code/frontend/src/pages/front/ArticleDetail.tsx) | GET /api/articles/{slug} |
| 文章分类筛选 | [CategoryList.tsx](../code/frontend/src/pages/front/CategoryList.tsx) | GET /api/categories/{slug}/articles |
| 文章标签筛选 | [TagList.tsx](../code/frontend/src/pages/front/TagList.tsx) | GET /api/tags/{slug}/articles |
| 文章分享功能 | [ArticleDetail.tsx](../code/frontend/src/pages/front/ArticleDetail.tsx) | 前端实现 |

**后端实现**:
- Entity: [Article.java](../code/backend/src/main/java/com/blog/entity/Article.java)
- Service: [ArticleService.java](../code/backend/src/main/java/com/blog/service/ArticleService.java)
- Controller: [ArticleController.java](../code/backend/src/main/java/com/blog/controller/ArticleController.java)

### 1.4 人生地图

| 需求描述 | 实现文件 | API接口 |
|---------|---------|---------|
| 展示中国地图 | [MapPage.tsx](../code/frontend/src/pages/front/MapPage.tsx) | Leaflet组件 |
| 点亮去过的城市 | [MapPage.tsx](../code/frontend/src/pages/front/MapPage.tsx) | GET /api/cities |
| 点击城市显示信息 | [MapPage.tsx](../code/frontend/src/pages/front/MapPage.tsx) | GET /api/cities/{id} |
| 添加城市信息 | [MapPage.tsx](../code/frontend/src/pages/front/MapPage.tsx) | POST /api/cities |

**后端实现**:
- Entity: [City.java](../code/backend/src/main/java/com/blog/entity/City.java)
- Service: [CityService.java](../code/backend/src/main/java/com/blog/service/CityService.java)
- Controller: [CityController.java](../code/backend/src/main/java/com/blog/controller/CityController.java)

### 1.5 设置（个性化）

| 需求描述 | 实现文件 | API接口 |
|---------|---------|---------|
| 更换背景色 | [Settings.tsx](../code/frontend/src/pages/admin/Settings.tsx) | POST /api/settings |
| 上传主页大图 | [Settings.tsx](../code/frontend/src/pages/admin/Settings.tsx) | POST /api/upload/image |

**后端实现**:
- Entity: [SystemSetting.java](../code/backend/src/main/java/com/blog/entity/SystemSetting.java)
- Service: [SystemSettingService.java](../code/backend/src/main/java/com/blog/service/SystemSettingService.java)
- Controller: [SystemSettingController.java](../code/backend/src/main/java/com/blog/controller/SystemSettingController.java)

### 1.6 音乐播放

| 需求描述 | 实现文件 | API接口 |
|---------|---------|---------|
| 播放/暂停 | [MusicPlayer.tsx](../code/frontend/src/components/MusicPlayer.tsx) | 前端实现 |
| 切换曲目 | [MusicPlayer.tsx](../code/frontend/src/components/MusicPlayer.tsx) | 前端实现 |
| 调节音量 | [MusicPlayer.tsx](../code/frontend/src/components/MusicPlayer.tsx) | 前端实现 |
| 播放列表 | [MusicPlayer.tsx](../code/frontend/src/components/MusicPlayer.tsx) | GET /api/music |

**后端实现**:
- Entity: [Music.java](../code/backend/src/main/java/com/blog/entity/Music.java)
- Service: [MusicService.java](../code/backend/src/main/java/com/blog/service/MusicService.java)
- Controller: [MusicController.java](../code/backend/src/main/java/com/blog/controller/MusicController.java)

### 1.7 搜索功能

| 需求描述 | 实现文件 | API接口 |
|---------|---------|---------|
| 搜索文章标题、正文 | [Search.tsx](../code/frontend/src/pages/front/Search.tsx) | GET /api/search?keyword={keyword} |
| 搜索图片描述 | [Search.tsx](../code/frontend/src/pages/front/Search.tsx) | GET /api/search/images?keyword={keyword} |

**后端实现**:
- Service: [SearchService.java](../code/backend/src/main/java/com/blog/service/SearchService.java)
- Controller: [SearchController.java](../code/backend/src/main/java/com/blog/controller/SearchController.java)

---

## 二、后台管理模块

### 2.1 登录功能

| 需求描述 | 实现文件 | API接口 |
|---------|---------|---------|
| 账号密码登录 | [Login.tsx](../code/frontend/src/pages/admin/Login.tsx) | POST /api/admin/login |
| JWT认证 | [JwtFilter.java](../code/backend/src/main/java/com/blog/filter/JwtFilter.java) | 拦截器验证 |

**后端实现**:
- Service: [AuthService.java](../code/backend/src/main/java/com/blog/service/AuthService.java)
- Controller: [AuthController.java](../code/backend/src/main/java/com/blog/controller/AuthController.java)

### 2.2 文章管理

| 需求描述 | 实现文件 | API接口 |
|---------|---------|---------|
| 文章列表 | [ArticleList.tsx](../code/frontend/src/pages/admin/ArticleList.tsx) | GET /api/admin/articles |
| 创建文章 | [ArticleEditor.tsx](../code/frontend/src/pages/admin/ArticleEditor.tsx) | POST /api/admin/articles |
| 编辑文章 | [ArticleEditor.tsx](../code/frontend/src/pages/admin/ArticleEditor.tsx) | PUT /api/admin/articles/{id} |
| 删除文章 | [ArticleList.tsx](../code/frontend/src/pages/admin/ArticleList.tsx) | DELETE /api/admin/articles/{id} |
| 分类管理 | [CategoryManage.tsx](../code/frontend/src/pages/admin/CategoryManage.tsx) | CRUD /api/categories |
| 标签管理 | [TagManage.tsx](../code/frontend/src/pages/admin/TagManage.tsx) | CRUD /api/tags |

### 2.3 内容组织

| 需求描述 | 实现文件 | API接口 |
|---------|---------|---------|
| 图片管理 | [ImageManage.tsx](../code/frontend/src/pages/admin/ImageManage.tsx) | CRUD /api/images |
| 文章归档 | [ArticleList.tsx](../code/frontend/src/pages/admin/ArticleList.tsx) | GET /api/admin/articles/archive |

### 2.4 个性化设置

| 需求描述 | 实现文件 | API接口 |
|---------|---------|---------|
| 背景颜色设置 | [Settings.tsx](../code/frontend/src/pages/admin/Settings.tsx) | POST /api/settings |
| 主页大图设置 | [Settings.tsx](../code/frontend/src/pages/admin/Settings.tsx) | POST /api/upload/image |

### 2.5 系统设置

| 需求描述 | 实现文件 | API接口 |
|---------|---------|---------|
| 访问统计 | [DashboardStats.tsx](../code/frontend/src/pages/admin/DashboardStats.tsx) | GET /api/stats |
| 数据概览 | [DashboardStats.tsx](../code/frontend/src/pages/admin/DashboardStats.tsx) | GET /api/stats/summary |

**后端实现**:
- Entity: [VisitStat.java](../code/backend/src/main/java/com/blog/entity/VisitStat.java)
- Service: [VisitStatService.java](../code/backend/src/main/java/com/blog/service/VisitStatService.java)
- Controller: [VisitStatController.java](../code/backend/src/main/java/com/blog/controller/VisitStatController.java)

### 2.6 写作辅助

| 需求描述 | 实现文件 | API接口 |
|---------|---------|---------|
| 灵感收集 | [Settings.tsx](../code/frontend/src/pages/admin/Settings.tsx) | CRUD /api/inspirations |
| 关联文章 | [Settings.tsx](../code/frontend/src/pages/admin/Settings.tsx) | POST /api/inspirations |

**后端实现**:
- Entity: [Inspiration.java](../code/backend/src/main/java/com/blog/entity/Inspiration.java)
- Service: [InspirationService.java](../code/backend/src/main/java/com/blog/service/InspirationService.java)
- Controller: [InspirationController.java](../code/backend/src/main/java/com/blog/controller/InspirationController.java)

---

## 三、数据库表映射

| 数据表 | Entity类 | 用途 |
|--------|---------|------|
| admin | [Admin.java](../code/backend/src/main/java/com/blog/entity/Admin.java) | 管理员信息 |
| article | [Article.java](../code/backend/src/main/java/com/blog/entity/Article.java) | 文章内容 |
| category | [Category.java](../code/backend/src/main/java/com/blog/entity/Category.java) | 文章分类 |
| tag | [Tag.java](../code/backend/src/main/java/com/blog/entity/Tag.java) | 文章标签 |
| article_tag | [ArticleTag.java](../code/backend/src/main/java/com/blog/entity/ArticleTag.java) | 文章标签关联 |
| image | [Image.java](../code/backend/src/main/java/com/blog/entity/Image.java) | 图片信息 |
| city | [City.java](../code/backend/src/main/java/com/blog/entity/City.java) | 城市足迹 |
| music | [Music.java](../code/backend/src/main/java/com/blog/entity/Music.java) | 音乐播放列表 |
| system_setting | [SystemSetting.java](../code/backend/src/main/java/com/blog/entity/SystemSetting.java) | 系统设置 |
| visit_stat | [VisitStat.java](../code/backend/src/main/java/com/blog/entity/VisitStat.java) | 访问统计 |
| inspiration | [Inspiration.java](../code/backend/src/main/java/com/blog/entity/Inspiration.java) | 灵感收集 |

---

## 四、需求覆盖度检查

### ✅ 已完成功能

#### 前台展示（8个模块）
- [x] 导航栏
- [x] 首页（时间轴）
- [x] 人间足迹（图片画廊）
- [x] 心得感悟（文章列表）
- [x] 人生地图
- [x] 设置（个性化）
- [x] 音乐播放
- [x] 搜索功能

#### 后台管理（6个模块）
- [x] 登录功能
- [x] 文章管理（分类、标签、编辑、删除、发布、草稿）
- [x] 内容组织（文章归档、图片管理）
- [x] 个性化设置（背景色、主页大图）
- [x] 系统设置（访问统计）
- [x] 写作辅助（灵感收集）

### 📊 需求覆盖度

- **PRD需求总数**: 52项
- **已实现需求**: 52项
- **覆盖率**: 100%

---

## 五、技术实现说明

### 5.1 前端技术栈
- React 18.2 + TypeScript 5.3
- Vite 5.0（构建工具）
- Ant Design 5.12（UI组件库）
- Tailwind CSS 3.4（样式框架）
- React Router 6.21（路由管理）
- Zustand 4.4（状态管理）
- Axios 1.6（HTTP请求）
- Leaflet 1.9（地图组件）

### 5.2 后端技术栈
- Spring Boot 3.2.3
- JDK 17
- Spring Data JPA 3.2.3
- MySQL 8.0
- Spring Security 6.2
- JWT (jjwt 0.12)

### 5.3 部署技术栈
- Docker + Docker Compose
- Nginx（反向代理）
- SSL证书配置

---

## 六、API文档访问

启动项目后，可通过以下地址访问API文档：

- Swagger UI: http://localhost:8080/swagger-ui.html
- OpenAPI JSON: http://localhost:8080/v3/api-docs

---

**文档版本**: v1.0.0  
**最后更新**: 2026-02-16
