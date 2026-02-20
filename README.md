# 个人技术博客

一个基于 React + Spring Boot 的全栈技术博客系统，支持文章发布、分类管理、标签管理等功能。

## 技术栈

### 前端
- React 18 + TypeScript 5
- Vite 5
- Ant Design 5
- Tailwind CSS 3
- Zustand (状态管理)
- React Router 6
- ByteMD (Markdown 编辑器)
- Axios

### 后端
- Spring Boot 3.2
- JDK 17
- Spring Data JPA
- Spring Security + JWT
- MySQL 8.0
- Maven

### 部署
- Docker
- Docker Compose
- Nginx

## 项目结构

```
personal blog/
├── code/
│   ├── frontend/          # 前端项目
│   │   ├── src/
│   │   │   ├── api/       # API 接口
│   │   │   ├── components/# 通用组件
│   │   │   ├── hooks/     # 自定义 Hooks
│   │   │   ├── layouts/   # 布局组件
│   │   │   ├── pages/     # 页面组件
│   │   │   ├── stores/    # 状态管理
│   │   │   ├── types/     # TypeScript 类型
│   │   │   └── utils/     # 工具函数
│   │   └── ...
│   └── backend/           # 后端项目
│       └── src/main/java/com/blog/
│           ├── common/    # 通用类
│           ├── config/    # 配置类
│           ├── controller/# 控制器
│           ├── dto/       # 数据传输对象
│           ├── entity/    # 实体类
│           ├── exception/ # 异常处理
│           ├── filter/    # 过滤器
│           ├── repository/# 数据访问层
│           ├── service/   # 业务逻辑层
│           └── util/      # 工具类
├── sql/                   # 数据库脚本
│   ├── schema.sql         # 表结构
│   └── init-data.sql      # 初始数据
├── deploy/                # 部署配置
│   ├── docker-compose.yml
│   ├── nginx/
│   └── Dockerfile
└── docs/                  # 项目文档
```

## 功能特性

### 前台功能
- 文章列表展示（分页、分类/标签筛选）
- 文章详情页（Markdown 渲染、代码高亮）
- 分类文章列表
- 标签文章列表
- 文章搜索
- 关于页面

### 后台功能
- 管理员登录/登出
- 仪表盘（统计数据展示）
- 文章管理（增删改查、发布/草稿状态）
- 分类管理
- 标签管理
- 个人设置（修改昵称、邮箱、头像、密码）

## 快速开始

### 环境要求
- Node.js 18+
- JDK 17+
- MySQL 8.0+
- Maven 3.8+

### 本地开发

#### 1. 克隆项目
```bash
git clone <repository-url>
cd personal blog
```

#### 2. 初始化数据库
```bash
mysql -u root -p < sql/schema.sql
mysql -u root -p < sql/init-data.sql
```

#### 3. 启动后端
```bash
cd code/backend
mvn spring-boot:run
```

#### 4. 启动前端
```bash
cd code/frontend
npm install
npm run dev
```

#### 5. 访问应用
- 前台: http://localhost:5173
- 后台: http://localhost:5173/admin/login

### 默认账号
- 用户名: admin
- 密码: admin123

## Docker 部署

### 一键启动
```bash
cd deploy
docker-compose up -d
```

### 访问地址
- 前台: http://localhost
- 后台: http://localhost/admin/login

## API 接口

### 认证相关
- POST `/api/auth/login` - 登录
- GET `/api/auth/profile` - 获取个人信息
- PUT `/api/auth/profile` - 更新个人信息
- PUT `/api/auth/password` - 修改密码

### 文章相关
- GET `/api/articles` - 获取文章列表
- GET `/api/articles/{id}` - 获取文章详情
- GET `/api/articles/slug/{slug}` - 通过 slug 获取文章
- POST `/api/admin/articles` - 创建文章
- PUT `/api/admin/articles/{id}` - 更新文章
- DELETE `/api/admin/articles/{id}` - 删除文章
- PUT `/api/admin/articles/{id}/status` - 更新文章状态

### 分类相关
- GET `/api/categories` - 获取分类列表
- POST `/api/admin/categories` - 创建分类
- PUT `/api/admin/categories/{id}` - 更新分类
- DELETE `/api/admin/categories/{id}` - 删除分类

### 标签相关
- GET `/api/tags` - 获取标签列表
- POST `/api/admin/tags` - 创建标签
- PUT `/api/admin/tags/{id}` - 更新标签
- DELETE `/api/admin/tags/{id}` - 删除标签

### 其他
- GET `/api/search` - 搜索文章
- POST `/api/admin/upload` - 上传文件
- GET `/api/sitemap.xml` - 获取站点地图

## 配置说明

### 后端配置
编辑 `code/backend/src/main/resources/application.yml`:
```yaml
server:
  port: 8080

spring:
  datasource:
    url: jdbc:mysql://localhost:3306/blog?useSSL=false&serverTimezone=Asia/Shanghai
    username: root
    password: your_password

jwt:
  secret: your_jwt_secret_key
  expiration: 86400000
```

### 前端配置
编辑 `code/frontend/.env`:
```
VITE_API_BASE_URL=http://localhost:8080/api
```

## 许可证

MIT License
