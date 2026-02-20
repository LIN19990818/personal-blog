# PRD需求-架构模块映射确认清单

**文档版本**：v1.0.0  
**创建日期**：2026-02-15  
**创建者**：Architect智能体  
**依据文档**：blog_prd_v1.0.0.md（🔒已锁定）  
**状态**：待审核确认

---

## 一、映射概述

| 项目 | 内容 |
|------|------|
| PRD版本 | v1.0.0（已锁定） |
| 功能模块数 | 8个 |
| 功能点数 | 26个 |
| 页面数 | 14个（前台6个 + 后台8个） |
| 接口数 | 26个（前台8个 + 后台18个） |
| 数据实体 | 5个 |
| 映射结论 | ✅ **映射无误，可进入全量架构设计** |

---

## 二、功能模块映射

### 2.1 M01 文章管理模块

| 功能编号 | 功能名称 | 前端模块 | 后端模块 | 数据实体 | 接口支撑 |
|----------|----------|----------|----------|----------|----------|
| M01-F01 | 文章发布 | ArticleEditor | ArticleController | Article | API-106 |
| M01-F02 | 文章编辑 | ArticleEditor | ArticleController | Article | API-107 |
| M01-F03 | 文章下架 | ArticleList | ArticleController | Article | API-108 |
| M01-F04 | 文章列表 | ArticleList | ArticleController | Article | API-105 |
| M01-F05 | 文章详情 | ArticleDetail | ArticleController | Article | API-002 |

**前端模块职责**：

| 模块名 | 目录 | 核心职责 |
|--------|------|----------|
| ArticleEditor | `/frontend/src/pages/admin/ArticleEditor` | Markdown编辑器、实时预览、封面图上传、分类/标签选择 |
| ArticleList | `/frontend/src/pages/admin/ArticleList` | 文章列表展示、状态筛选、分类筛选、时间筛选 |
| ArticleDetail | `/frontend/src/pages/front/ArticleDetail` | Markdown渲染、代码高亮、目录导航、浏览量统计 |

**后端模块职责**：

| 模块名 | 目录 | 核心职责 |
|--------|------|----------|
| ArticleController | `/backend/.../controller/ArticleController` | 文章CRUD接口、状态管理、slug生成 |
| ArticleService | `/backend/.../service/ArticleService` | 文章业务逻辑、Markdown处理、搜索支持 |
| ArticleRepository | `/backend/.../repository/ArticleRepository` | 文章数据访问、分页查询、关联查询 |

### 2.2 M02 分类管理模块

| 功能编号 | 功能名称 | 前端模块 | 后端模块 | 数据实体 | 接口支撑 |
|----------|----------|----------|----------|----------|----------|
| M02-F01 | 分类创建 | CategoryManage | CategoryController | Category | API-111 |
| M02-F02 | 分类编辑 | CategoryManage | CategoryController | Category | API-112 |
| M02-F03 | 分类删除 | CategoryManage | CategoryController | Category | API-113 |
| M02-F04 | 分类展示 | CategoryList | CategoryController | Category | API-003, API-004 |

**前端模块职责**：

| 模块名 | 目录 | 核心职责 |
|--------|------|----------|
| CategoryManage | `/frontend/src/pages/admin/CategoryManage` | 分类CRUD操作、排序设置、关联文章数展示 |
| CategoryList | `/frontend/src/pages/front/CategoryList` | 分类列表展示、分类下文章列表 |

**后端模块职责**：

| 模块名 | 目录 | 核心职责 |
|--------|------|----------|
| CategoryController | `/backend/.../controller/CategoryController` | 分类CRUD接口、关联检查 |
| CategoryService | `/backend/.../service/CategoryService` | 分类业务逻辑、文章数统计 |
| CategoryRepository | `/backend/.../repository/CategoryRepository` | 分类数据访问 |

### 2.3 M03 标签管理模块

| 功能编号 | 功能名称 | 前端模块 | 后端模块 | 数据实体 | 接口支撑 |
|----------|----------|----------|----------|----------|----------|
| M03-F01 | 标签创建 | TagManage | TagController | Tag | API-115 |
| M03-F02 | 标签编辑 | TagManage | TagController | Tag | API-116 |
| M03-F03 | 标签删除 | TagManage | TagController | Tag, ArticleTag | API-117 |
| M03-F04 | 标签展示 | TagList | TagController | Tag | API-005, API-006 |

**前端模块职责**：

| 模块名 | 目录 | 核心职责 |
|--------|------|----------|
| TagManage | `/frontend/src/pages/admin/TagManage` | 标签CRUD操作、关联文章数展示 |
| TagList | `/frontend/src/pages/front/TagList` | 标签云展示、标签下文章列表 |

**后端模块职责**：

| 模块名 | 目录 | 核心职责 |
|--------|------|----------|
| TagController | `/backend/.../controller/TagController` | 标签CRUD接口、级联删除关联 |
| TagService | `/backend/.../service/TagService` | 标签业务逻辑、文章关联管理 |
| TagRepository | `/backend/.../repository/TagRepository` | 标签数据访问 |
| ArticleTagRepository | `/backend/.../repository/ArticleTagRepository` | 文章-标签关联数据访问 |

### 2.4 M04 文章搜索模块

| 功能编号 | 功能名称 | 前端模块 | 后端模块 | 数据实体 | 接口支撑 |
|----------|----------|----------|----------|----------|----------|
| M04-F01 | 关键词搜索 | SearchPage | SearchController | Article | API-007 |
| M04-F02 | 搜索结果展示 | SearchPage | SearchController | Article | API-007 |

**前端模块职责**：

| 模块名 | 目录 | 核心职责 |
|--------|------|----------|
| SearchPage | `/frontend/src/pages/front/SearchPage` | 搜索输入、结果展示、关键词高亮、分页 |
| SearchBar | `/frontend/src/components/SearchBar` | 搜索框组件、搜索建议 |

**后端模块职责**：

| 模块名 | 目录 | 核心职责 |
|--------|------|----------|
| SearchController | `/backend/.../controller/SearchController` | 搜索接口 |
| SearchService | `/backend/.../service/SearchService` | 全文搜索、关键词匹配、结果排序 |

### 2.5 M05 后台鉴权模块

| 功能编号 | 功能名称 | 前端模块 | 后端模块 | 数据实体 | 接口支撑 |
|----------|----------|----------|----------|----------|----------|
| M05-F01 | 管理员登录 | LoginPage | AuthController | Admin | API-101 |
| M05-F02 | 登录鉴权 | AuthGuard | JwtFilter | Admin | - |
| M05-F03 | 登录退出 | LoginPage | AuthController | Admin | API-102 |

**前端模块职责**：

| 模块名 | 目录 | 核心职责 |
|--------|------|----------|
| LoginPage | `/frontend/src/pages/admin/LoginPage` | 登录表单、Token存储、跳转 |
| AuthGuard | `/frontend/src/guards/AuthGuard` | 路由守卫、Token验证、登录跳转 |
| AuthContext | `/frontend/src/contexts/AuthContext` | 登录状态管理、Token管理 |

**后端模块职责**：

| 模块名 | 目录 | 核心职责 |
|--------|------|----------|
| AuthController | `/backend/.../controller/AuthController` | 登录、登出接口 |
| AuthService | `/backend/.../service/AuthService` | 密码验证、Token生成、Token失效 |
| JwtFilter | `/backend/.../filter/JwtFilter` | JWT验证过滤器 |
| JwtUtil | `/backend/.../util/JwtUtil` | JWT工具类 |
| AdminRepository | `/backend/.../repository/AdminRepository` | 管理员数据访问 |

### 2.6 M06 响应式适配模块

| 功能编号 | 功能名称 | 前端模块 | 后端模块 | 数据实体 | 接口支撑 |
|----------|----------|----------|----------|----------|----------|
| M06-F01 | PC端适配 | 全局样式 | - | - | - |
| M06-F02 | 平板适配 | 全局样式 | - | - | - |
| M06-F03 | 移动端适配 | 全局样式 | - | - | - |

**前端模块职责**：

| 模块名 | 目录 | 核心职责 |
|--------|------|----------|
| 全局样式 | `/frontend/src/styles/` | 响应式断点、媒体查询、栅格系统 |
| 响应式组件 | `/frontend/src/components/responsive/` | 响应式导航、响应式侧边栏、响应式布局 |

**技术方案**：
- 使用CSS Media Query实现响应式断点
- 断点定义：移动端<768px，平板768px-1199px，PC≥1200px
- 使用Tailwind CSS响应式类或自定义媒体查询

### 2.7 M07 SEO优化模块

| 功能编号 | 功能名称 | 前端模块 | 后端模块 | 数据实体 | 接口支撑 |
|----------|----------|----------|----------|----------|----------|
| M07-F01 | 页面Meta标签 | SEOHead | - | - | - |
| M07-F02 | URL优化 | Router | - | Article.slug | - |
| M07-F03 | 站点地图 | - | SitemapController | Article | API-008 |

**前端模块职责**：

| 模块名 | 目录 | 核心职责 |
|--------|------|----------|
| SEOHead | `/frontend/src/components/SEOHead` | 动态Meta标签、Open Graph标签 |
| Router | `/frontend/src/router/` | 路由配置、slug URL |

**后端模块职责**：

| 模块名 | 目录 | 核心职责 |
|--------|------|----------|
| SitemapController | `/backend/.../controller/SitemapController` | sitemap.xml生成 |
| SitemapService | `/backend/.../service/SitemapService` | 站点地图数据组装 |

### 2.8 M08 部署模块

| 功能编号 | 功能名称 | 前端模块 | 后端模块 | 数据实体 | 接口支撑 |
|----------|----------|----------|----------|----------|----------|
| M08-F01 | Docker部署 | - | - | - | - |
| M08-F02 | 环境配置 | - | - | - | - |

**部署模块职责**：

| 模块名 | 目录 | 核心职责 |
|--------|------|----------|
| Dockerfile.frontend | `/deploy/frontend/Dockerfile` | 前端镜像构建 |
| Dockerfile.backend | `/deploy/backend/Dockerfile` | 后端镜像构建 |
| docker-compose.yml | `/deploy/docker-compose.yml` | 容器编排、一键部署 |
| .env.example | `/deploy/.env.example` | 环境变量模板 |

---

## 三、页面-模块映射

### 3.1 前台页面映射

| 页面编号 | 页面名称 | 路由 | 前端组件 | 依赖接口 | 数据实体 |
|----------|----------|------|----------|----------|----------|
| F01 | 首页 | `/` | HomePage | API-001, API-003, API-005 | Article, Category, Tag |
| F02 | 文章详情页 | `/article/:slug` | ArticleDetailPage | API-002 | Article |
| F03 | 分类列表页 | `/category/:slug` | CategoryListPage | API-004 | Article, Category |
| F04 | 标签列表页 | `/tag/:slug` | TagListPage | API-006 | Article, Tag |
| F05 | 搜索结果页 | `/search?q=keyword` | SearchPage | API-007 | Article |
| F06 | 关于页面 | `/about` | AboutPage | - | - |

### 3.2 后台页面映射

| 页面编号 | 页面名称 | 路由 | 前端组件 | 依赖接口 | 数据实体 |
|----------|----------|------|----------|----------|----------|
| B01 | 登录页 | `/admin/login` | LoginPage | API-101 | Admin |
| B02 | 仪表盘 | `/admin/dashboard` | DashboardPage | API-103, API-105, API-110, API-114 | Article, Category, Tag |
| B03 | 文章列表 | `/admin/articles` | ArticleListPage | API-105, API-108, API-109 | Article |
| B04 | 文章编辑 | `/admin/articles/edit/:id` | ArticleEditorPage | API-002, API-107, API-110, API-114, API-118 | Article, Category, Tag |
| B05 | 文章新建 | `/admin/articles/create` | ArticleEditorPage | API-106, API-110, API-114, API-118 | Article, Category, Tag |
| B06 | 分类管理 | `/admin/categories` | CategoryManagePage | API-110, API-111, API-112, API-113 | Category |
| B07 | 标签管理 | `/admin/tags` | TagManagePage | API-114, API-115, API-116, API-117 | Tag |
| B08 | 个人设置 | `/admin/settings` | SettingsPage | API-103, API-104, API-118 | Admin |

---

## 四、接口-模块映射

### 4.1 前台接口映射

| 接口编号 | 方法 | 路径 | Controller | Service | Repository |
|----------|------|------|------------|---------|------------|
| API-001 | GET | `/api/articles` | ArticleController | ArticleService | ArticleRepository |
| API-002 | GET | `/api/articles/:slug` | ArticleController | ArticleService | ArticleRepository |
| API-003 | GET | `/api/categories` | CategoryController | CategoryService | CategoryRepository |
| API-004 | GET | `/api/categories/:slug/articles` | CategoryController | CategoryService | ArticleRepository |
| API-005 | GET | `/api/tags` | TagController | TagService | TagRepository |
| API-006 | GET | `/api/tags/:slug/articles` | TagController | TagService | ArticleRepository |
| API-007 | GET | `/api/search` | SearchController | SearchService | ArticleRepository |
| API-008 | GET | `/api/sitemap.xml` | SitemapController | SitemapService | ArticleRepository |

### 4.2 后台接口映射

| 接口编号 | 方法 | 路径 | Controller | Service | Repository | 鉴权 |
|----------|------|------|------------|---------|------------|------|
| API-101 | POST | `/api/admin/login` | AuthController | AuthService | AdminRepository | 否 |
| API-102 | POST | `/api/admin/logout` | AuthController | AuthService | - | 是 |
| API-103 | GET | `/api/admin/profile` | AdminController | AdminService | AdminRepository | 是 |
| API-104 | PUT | `/api/admin/profile` | AdminController | AdminService | AdminRepository | 是 |
| API-105 | GET | `/api/admin/articles` | ArticleController | ArticleService | ArticleRepository | 是 |
| API-106 | POST | `/api/admin/articles` | ArticleController | ArticleService | ArticleRepository | 是 |
| API-107 | PUT | `/api/admin/articles/:id` | ArticleController | ArticleService | ArticleRepository | 是 |
| API-108 | PUT | `/api/admin/articles/:id/status` | ArticleController | ArticleService | ArticleRepository | 是 |
| API-109 | DELETE | `/api/admin/articles/:id` | ArticleController | ArticleService | ArticleRepository | 是 |
| API-110 | GET | `/api/admin/categories` | CategoryController | CategoryService | CategoryRepository | 是 |
| API-111 | POST | `/api/admin/categories` | CategoryController | CategoryService | CategoryRepository | 是 |
| API-112 | PUT | `/api/admin/categories/:id` | CategoryController | CategoryService | CategoryRepository | 是 |
| API-113 | DELETE | `/api/admin/categories/:id` | CategoryController | CategoryService | CategoryRepository | 是 |
| API-114 | GET | `/api/admin/tags` | TagController | TagService | TagRepository | 是 |
| API-115 | POST | `/api/admin/tags` | TagController | TagService | TagRepository | 是 |
| API-116 | PUT | `/api/admin/tags/:id` | TagController | TagService | TagRepository | 是 |
| API-117 | DELETE | `/api/admin/tags/:id` | TagController | TagService | TagRepository | 是 |
| API-118 | POST | `/api/admin/upload` | UploadController | UploadService | - | 是 |

---

## 五、数据实体映射

### 5.1 实体-表映射

| 实体名 | 数据表 | ORM实体类 | Repository |
|--------|--------|-----------|------------|
| Article | `article` | Article.java | ArticleRepository |
| Category | `category` | Category.java | CategoryRepository |
| Tag | `tag` | Tag.java | TagRepository |
| ArticleTag | `article_tag` | ArticleTag.java | ArticleTagRepository |
| Admin | `admin` | Admin.java | AdminRepository |

### 5.2 实体关系映射

| 关系 | 类型 | 实现方式 |
|------|------|----------|
| Article → Category | 多对一 | `article.category_id` → `category.id` |
| Article ↔ Tag | 多对多 | `article_tag` 中间表 |
| Category → Article | 一对多 | 反向关联（查询使用） |
| Tag → Article | 多对多 | 反向关联（查询使用） |

---

## 六、非功能需求映射

### 6.1 性能要求映射

| 性能指标 | 要求 | 技术方案 | 实现模块 |
|----------|------|----------|----------|
| 接口响应时间 | <300ms (P95) | 数据库索引、查询优化、缓存 | Repository层、Service层 |
| 首页首屏加载 | <2s | 代码分割、懒加载、CDN | 前端构建配置 |
| 数据库查询 | 单表<50ms，关联<100ms | 索引设计、SQL优化 | Repository层 |
| 并发能力 | 100 QPS | 连接池配置、异步处理 | 后端配置 |

### 6.2 安全要求映射

| 安全指标 | 要求 | 技术方案 | 实现模块 |
|----------|------|----------|----------|
| 后台接口鉴权 | 必须鉴权 | JWT Token + Filter | JwtFilter |
| 密码存储 | BCrypt加密 | BCryptPasswordEncoder | AuthService |
| SQL注入防护 | 参数化查询 | JPA/Hibernate | Repository层 |
| XSS防护 | 输出转义 | DOMPurify | 前端Markdown渲染 |
| CSRF防护 | CSRF Token | Spring Security | 后端配置 |
| 敏感信息 | 环境变量 | .env配置 | 配置模块 |

### 6.3 代码规范映射

| 规范项 | 要求 | 工具/配置 |
|--------|------|-----------|
| 前端代码 | ESLint + Prettier | `.eslintrc.js`, `.prettierrc` |
| 后端代码 | 阿里巴巴Java规范 | Checkstyle/SpotBugs |
| Git提交 | Conventional Commits | Commitlint |

---

## 七、需求覆盖度确认

### 7.1 功能需求覆盖度

| 模块 | 功能点数 | 已映射 | 覆盖率 |
|------|----------|--------|--------|
| M01 文章管理 | 5 | 5 | ✅ 100% |
| M02 分类管理 | 4 | 4 | ✅ 100% |
| M03 标签管理 | 4 | 4 | ✅ 100% |
| M04 文章搜索 | 2 | 2 | ✅ 100% |
| M05 后台鉴权 | 3 | 3 | ✅ 100% |
| M06 响应式适配 | 3 | 3 | ✅ 100% |
| M07 SEO优化 | 3 | 3 | ✅ 100% |
| M08 部署模块 | 2 | 2 | ✅ 100% |
| **合计** | **26** | **26** | **✅ 100%** |

### 7.2 页面需求覆盖度

| 类型 | 页面数 | 已映射 | 覆盖率 |
|------|--------|--------|--------|
| 前台页面 | 6 | 6 | ✅ 100% |
| 后台页面 | 8 | 8 | ✅ 100% |
| **合计** | **14** | **14** | **✅ 100%** |

### 7.3 接口需求覆盖度

| 类型 | 接口数 | 已映射 | 覆盖率 |
|------|--------|--------|--------|
| 前台接口 | 8 | 8 | ✅ 100% |
| 后台接口 | 18 | 18 | ✅ 100% |
| **合计** | **26** | **26** | **✅ 100%** |

### 7.4 数据实体覆盖度

| 实体 | 已映射 | 覆盖率 |
|------|--------|--------|
| Article | ✅ | 100% |
| Category | ✅ | 100% |
| Tag | ✅ | 100% |
| ArticleTag | ✅ | 100% |
| Admin | ✅ | 100% |
| **合计** | **5/5** | **✅ 100%** |

---

## 八、架构模块总览

### 8.1 前端架构模块

```
frontend/
├── src/
│   ├── pages/
│   │   ├── front/                    # 前台页面
│   │   │   ├── HomePage/             # 首页
│   │   │   ├── ArticleDetailPage/    # 文章详情页
│   │   │   ├── CategoryListPage/     # 分类列表页
│   │   │   ├── TagListPage/          # 标签列表页
│   │   │   ├── SearchPage/           # 搜索结果页
│   │   │   └── AboutPage/            # 关于页面
│   │   └── admin/                    # 后台页面
│   │       ├── LoginPage/            # 登录页
│   │       ├── DashboardPage/        # 仪表盘
│   │       ├── ArticleListPage/      # 文章列表
│   │       ├── ArticleEditorPage/    # 文章编辑/新建
│   │       ├── CategoryManagePage/   # 分类管理
│   │       ├── TagManagePage/        # 标签管理
│   │       └── SettingsPage/         # 个人设置
│   ├── components/
│   │   ├── common/                   # 通用组件
│   │   ├── layout/                   # 布局组件
│   │   ├── SEOHead/                  # SEO组件
│   │   ├── SearchBar/                # 搜索组件
│   │   └── MarkdownRenderer/         # Markdown渲染组件
│   ├── hooks/                        # 自定义Hooks
│   ├── services/                     # API服务
│   ├── stores/                       # 状态管理
│   ├── utils/                        # 工具函数
│   └── styles/                       # 全局样式
```

### 8.2 后端架构模块

```
backend/
├── src/main/java/com/blog/
│   ├── controller/                   # 控制器层
│   │   ├── ArticleController.java
│   │   ├── CategoryController.java
│   │   ├── TagController.java
│   │   ├── SearchController.java
│   │   ├── AuthController.java
│   │   ├── AdminController.java
│   │   ├── UploadController.java
│   │   └── SitemapController.java
│   ├── service/                      # 服务层
│   │   ├── ArticleService.java
│   │   ├── CategoryService.java
│   │   ├── TagService.java
│   │   ├── SearchService.java
│   │   ├── AuthService.java
│   │   ├── AdminService.java
│   │   ├── UploadService.java
│   │   └── SitemapService.java
│   ├── repository/                   # 数据访问层
│   │   ├── ArticleRepository.java
│   │   ├── CategoryRepository.java
│   │   ├── TagRepository.java
│   │   ├── ArticleTagRepository.java
│   │   └── AdminRepository.java
│   ├── entity/                       # 实体类
│   │   ├── Article.java
│   │   ├── Category.java
│   │   ├── Tag.java
│   │   ├── ArticleTag.java
│   │   └── Admin.java
│   ├── dto/                          # 数据传输对象
│   ├── vo/                           # 视图对象
│   ├── config/                       # 配置类
│   ├── filter/                       # 过滤器
│   │   └── JwtFilter.java
│   ├── util/                         # 工具类
│   │   └── JwtUtil.java
│   └── exception/                    # 异常处理
└── src/main/resources/
    └── application.yml               # 配置文件
```

---

## 九、映射结论

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│   ✅ 映射无误，可进入全量架构设计                              │
│                                                             │
│   需求覆盖度确认：                                           │
│   • 功能模块：26/26 功能点 ✅ 100%                           │
│   • 页面需求：14/14 页面 ✅ 100%                             │
│   • 接口需求：26/26 接口 ✅ 100%                             │
│   • 数据实体：5/5 实体 ✅ 100%                               │
│                                                             │
│   所有PRD核心需求已完整映射到技术模块，                        │
│   可进入下一阶段：全量架构设计文档输出                         │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## 十、附录

### 10.1 映射依据

- PRD文档：blog_prd_v1.0.0.md（🔒已锁定）
- 技术栈约束：React 18 + TypeScript + Spring Boot 3.2 + MySQL 8.0

### 10.2 映射方法

- 功能点 → 前端组件 + 后端Controller/Service/Repository
- 页面 → 前端页面组件 + 依赖接口
- 接口 → Controller + Service + Repository
- 实体 → 数据表 + ORM实体类 + Repository

---

**文档状态**：待审核确认  
**下一步**：确认后输出全量架构设计文档 `blog_arch_v1.0.0.md`
