# 个人博客系统 - 项目启动指南

**版本**: v1.0.0  
**创建日期**: 2025-02-15  
**架构师**: Architect  
**状态**: 项目就绪

---

## 目录

1. [环境要求](#一环境要求)
2. [快速启动](#二快速启动)
3. [配置说明](#三配置说明)
4. [访问地址](#四访问地址)
5. [常用命令](#五常用命令)
6. [故障排查](#六故障排查)
7. [开发模式](#七开发模式)
8. [生产部署](#八生产部署)

---

## 一、环境要求

### 1.1 硬件要求

- **CPU**: 2核及以上
- **内存**: 4GB及以上
- **磁盘**: 20GB及以上
- **网络**: 稳定的网络连接

### 1.2 软件要求

| 软件 | 版本要求 | 说明 |
|------|----------|------|
| Docker | 20.10+ | 容器化平台 |
| Docker Compose | 2.0+ | 容器编排工具 |
| Git | 2.0+ | 版本控制工具 |
| 浏览器 | Chrome/Firefox/Edge | 现代浏览器 |

### 1.3 操作系统支持

- ✅ Linux (Ubuntu 20.04+, CentOS 7+, Debian 10+)
- ✅ Windows 10/11 (需要WSL2)
- ✅ macOS 11+ (Big Sur及以上)

---

## 二、快速启动

### 2.1 Windows系统

```powershell
# 1. 克隆项目
git clone <repository-url>
cd personal-blog

# 2. 配置环境变量
# 编辑 deploy\.env 文件，修改以下配置：
#   - MYSQL_ROOT_PASSWORD: MySQL root密码
#   - MYSQL_PASSWORD: MySQL用户密码
#   - JWT_SECRET: JWT密钥（至少32字符）

# 3. 启动项目
.\start.ps1

# 如果遇到执行策略错误，先执行：
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

### 2.2 Linux/macOS系统

```bash
# 1. 克隆项目
git clone <repository-url>
cd personal-blog

# 2. 配置环境变量
# 编辑 deploy/.env 文件，修改以下配置：
#   - MYSQL_ROOT_PASSWORD: MySQL root密码
#   - MYSQL_PASSWORD: MySQL用户密码
#   - JWT_SECRET: JWT密钥（至少32字符）

# 3. 给启动脚本添加执行权限
chmod +x start.sh

# 4. 启动项目
./start.sh
```

### 2.3 启动流程说明

启动脚本会自动执行以下步骤：

1. ✅ 检查Docker和Docker Compose是否安装
2. ✅ 检查.env配置文件是否存在
3. ✅ 停止并删除旧容器
4. ✅ 构建并启动新容器
5. ✅ 等待服务启动
6. ✅ 执行健康检查
7. ✅ 显示访问地址和常用命令

---

## 三、配置说明

### 3.1 环境变量配置

编辑 `deploy/.env` 文件：

```bash
# MySQL配置
MYSQL_ROOT_PASSWORD=your_strong_root_password_here
MYSQL_USER=blog_user
MYSQL_PASSWORD=your_strong_password_here

# JWT配置
JWT_SECRET=your_jwt_secret_key_here_at_least_32_characters_long

# 上传路径
UPLOAD_PATH=/app/uploads
```

**配置说明**:

| 配置项 | 说明 | 示例 |
|--------|------|------|
| MYSQL_ROOT_PASSWORD | MySQL root密码 | `MyStr0ngP@ssw0rd!` |
| MYSQL_USER | MySQL用户名 | `blog_user` |
| MYSQL_PASSWORD | MySQL用户密码 | `MyStr0ngP@ssw0rd!` |
| JWT_SECRET | JWT密钥（至少32字符） | `my-super-secret-jwt-key-1234567890` |
| UPLOAD_PATH | 文件上传路径 | `/app/uploads` |

**安全建议**:
- ✅ 使用强密码（至少12位，包含大小写字母、数字、特殊字符）
- ✅ JWT密钥使用随机字符串，至少32字符
- ✅ 不要将.env文件提交到Git仓库

### 3.2 数据库配置

数据库配置在 `deploy/docker-compose.yml` 中：

```yaml
mysql:
  image: mysql:8.0
  environment:
    MYSQL_ROOT_PASSWORD: ${MYSQL_ROOT_PASSWORD}
    MYSQL_DATABASE: blog
    MYSQL_USER: ${MYSQL_USER}
    MYSQL_PASSWORD: ${MYSQL_PASSWORD}
  ports:
    - "3306:3306"
  volumes:
    - mysql_data:/var/lib/mysql
```

**数据库信息**:

| 配置项 | 值 |
|--------|-----|
| 数据库名 | `blog` |
| 用户名 | `blog_user` |
| 端口 | `3306` |
| 字符集 | `utf8mb4` |

### 3.3 后端配置

后端配置在 `code/backend/src/main/resources/application-prod.yml` 中：

```yaml
spring:
  datasource:
    url: jdbc:mysql://${MYSQL_HOST:localhost}:${MYSQL_PORT:3306}/${MYSQL_DATABASE:blog}
    username: ${MYSQL_USER}
    password: ${MYSQL_PASSWORD}
    driver-class-name: com.mysql.cj.jdbc.Driver
  jpa:
    hibernate:
      ddl-auto: validate
    show-sql: false

jwt:
  secret: ${JWT_SECRET}
  expiration: 86400000 # 24小时

file:
  upload-path: ${UPLOAD_PATH:/app/uploads}
  max-size: 10MB
```

### 3.4 前端配置

前端配置在 `code/frontend/.env` 中：

```bash
# API地址
VITE_API_BASE_URL=http://localhost:8080/api

# 网站标题
VITE_SITE_TITLE=个人技术博客

# 网站描述
VITE_SITE_DESCRIPTION=记录个人经历、感悟与思考
```

---

## 四、访问地址

### 4.1 本地访问

| 服务 | 地址 | 说明 |
|------|------|------|
| 前端应用 | http://localhost | 博客前台 |
| 后台管理 | http://localhost/admin | 后台管理系统 |
| 后端API | http://localhost:8080/api | RESTful API |
| API文档 | http://localhost:8080/swagger-ui.html | Swagger UI |
| 健康检查 | http://localhost:8080/api/actuator/health | 服务健康状态 |

### 4.2 默认账号

**后台管理员账号**:
- 用户名: `admin`
- 密码: `admin123`

**⚠️ 重要提示**: 首次登录后请立即修改密码！

### 4.3 端口映射

| 服务 | 容器端口 | 主机端口 |
|------|----------|----------|
| Nginx | 80 | 80 |
| 后端API | 8080 | 8080 |
| MySQL | 3306 | 3306 |

---

## 五、常用命令

### 5.1 Docker Compose命令

```bash
# 进入deploy目录
cd deploy

# 启动所有服务
docker-compose up -d

# 停止所有服务
docker-compose down

# 重启所有服务
docker-compose restart

# 查看容器状态
docker-compose ps

# 查看所有日志
docker-compose logs

# 查看特定服务日志
docker-compose logs -f backend
docker-compose logs -f frontend
docker-compose logs -f mysql

# 重新构建并启动
docker-compose up -d --build

# 进入容器
docker-compose exec backend bash
docker-compose exec mysql bash

# 执行MySQL命令
docker-compose exec mysql mysql -u blog_user -p blog
```

### 5.2 数据库操作

```bash
# 连接到MySQL
docker-compose exec mysql mysql -u blog_user -p blog

# 备份数据库
docker-compose exec mysql mysqldump -u blog_user -p blog > backup.sql

# 恢复数据库
docker-compose exec -T mysql mysql -u blog_user -p blog < backup.sql

# 查看数据库表
docker-compose exec mysql mysql -u blog_user -p blog -e "SHOW TABLES;"
```

### 5.3 日志查看

```bash
# 查看后端日志
docker-compose logs -f backend

# 查看前端日志
docker-compose logs -f frontend

# 查看MySQL日志
docker-compose logs -f mysql

# 查看Nginx日志
docker-compose logs -f frontend

# 查看最近100行日志
docker-compose logs --tail=100 backend
```

---

## 六、故障排查

### 6.1 容器启动失败

**问题**: 容器无法启动

**解决方案**:
```bash
# 查看容器状态
docker-compose ps

# 查看容器日志
docker-compose logs backend
docker-compose logs frontend
docker-compose logs mysql

# 检查端口占用
netstat -ano | findstr :8080
netstat -ano | findstr :3306

# 停止占用端口的进程
taskkill /PID <PID> /F
```

### 6.2 数据库连接失败

**问题**: 后端无法连接到数据库

**解决方案**:
```bash
# 检查MySQL容器状态
docker-compose ps mysql

# 查看MySQL日志
docker-compose logs mysql

# 测试数据库连接
docker-compose exec mysql mysql -u blog_user -p blog -e "SELECT 1;"

# 检查网络连接
docker-compose exec backend ping mysql
```

### 6.3 前端无法访问

**问题**: 前端页面无法打开

**解决方案**:
```bash
# 检查Nginx容器状态
docker-compose ps frontend

# 查看Nginx日志
docker-compose logs frontend

# 检查Nginx配置
docker-compose exec frontend nginx -t

# 重新加载Nginx配置
docker-compose exec frontend nginx -s reload
```

### 6.4 权限问题

**问题**: 文件上传失败

**解决方案**:
```bash
# 检查上传目录权限
docker-compose exec backend ls -la /app/uploads

# 修改目录权限
docker-compose exec backend chmod 755 /app/uploads
docker-compose exec backend chown -R appuser:appuser /app/uploads
```

### 6.5 内存不足

**问题**: 容器因内存不足而崩溃

**解决方案**:
```bash
# 查看容器资源使用情况
docker stats

# 限制容器内存使用
# 编辑 deploy/docker-compose.yml
services:
  backend:
    deploy:
      resources:
        limits:
          memory: 1G
```

---

## 七、开发模式

### 7.1 前端开发模式

```bash
# 进入前端目录
cd code/frontend

# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 访问地址: http://localhost:5173
```

### 7.2 后端开发模式

```bash
# 进入后端目录
cd code/backend

# 使用Maven编译
mvn clean package

# 启动应用
java -jar target/personal-blog-backend-1.0.0.jar

# 或使用Spring Boot Maven插件
mvn spring-boot:run

# 访问地址: http://localhost:8080
```

### 7.3 数据库连接

开发模式下，可以连接到本地MySQL或Docker中的MySQL：

```bash
# 连接到Docker中的MySQL
docker-compose exec mysql mysql -u blog_user -p blog

# 或使用MySQL客户端
mysql -h localhost -P 3306 -u blog_user -p blog
```

---

## 八、生产部署

### 8.1 域名配置

编辑 `deploy/nginx/nginx.conf`：

```nginx
server {
    listen 80;
    server_name your-domain.com;  # 修改为你的域名
    
    # 其他配置...
}
```

### 8.2 SSL证书配置

#### 使用Let's Encrypt

```bash
# 安装Certbot
sudo apt-get install certbot python3-certbot-nginx

# 获取SSL证书
sudo certbot --nginx -d your-domain.com

# 自动续期
sudo certbot renew --dry-run
```

#### 配置定时任务

```bash
# 编辑crontab
sudo crontab -e

# 添加定时任务（每天凌晨3点检查并续期）
0 3 * * * /usr/bin/certbot renew --quiet --post-hook "docker-compose -f /path/to/docker-compose.yml restart frontend"
```

### 8.3 防火墙配置

```bash
# 开放HTTP端口
sudo ufw allow 80/tcp

# 开放HTTPS端口
sudo ufw allow 443/tcp

# 启用防火墙
sudo ufw enable

# 查看防火墙状态
sudo ufw status
```

### 8.4 性能优化

#### Nginx优化

```nginx
# 增加worker进程
worker_processes auto;

# 增加worker连接数
events {
    worker_connections 2048;
}

# 启用Gzip压缩
gzip on;
gzip_vary on;
gzip_min_length 1024;
gzip_types text/plain text/css application/json application/javascript;

# 启用缓存
location ~* \.(jpg|jpeg|png|gif|ico|css|js)$ {
    expires 1y;
    add_header Cache-Control "public, immutable";
}
```

#### 数据库优化

```sql
-- 增加连接池大小
SET GLOBAL max_connections = 200;

-- 优化InnoDB缓冲池
SET GLOBAL innodb_buffer_pool_size = 1G;

-- 优化查询缓存
SET GLOBAL query_cache_size = 64M;
```

### 8.5 备份策略

#### 数据库备份

```bash
# 创建备份脚本
cat > backup-db.sh << 'EOF'
#!/bin/bash
DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="/data/backups"
MYSQL_CONTAINER="blog-mysql"

# 创建备份目录
mkdir -p $BACKUP_DIR

# 备份数据库
docker exec $MYSQL_CONTAINER mysqldump -u blog_user -p${MYSQL_PASSWORD} blog > $BACKUP_DIR/blog_db_$DATE.sql

# 压缩备份文件
gzip $BACKUP_DIR/blog_db_$DATE.sql

# 删除30天前的备份
find $BACKUP_DIR -name "blog_db_*.sql.gz" -mtime +30 -delete
EOF

# 添加执行权限
chmod +x backup-db.sh

# 添加定时任务（每天凌晨2点备份）
crontab -e
# 0 2 * * * /path/to/backup-db.sh
```

#### 文件备份

```bash
# 创建备份脚本
cat > backup-files.sh << 'EOF'
#!/bin/bash
DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="/data/backups"
UPLOADS_DIR="/data/uploads"

# 创建备份目录
mkdir -p $BACKUP_DIR

# 备份上传文件
tar -czf $BACKUP_DIR/uploads_$DATE.tar.gz $UPLOADS_DIR

# 删除30天前的备份
find $BACKUP_DIR -name "uploads_*.tar.gz" -mtime +30 -delete
EOF

# 添加执行权限
chmod +x backup-files.sh

# 添加定时任务（每天凌晨3点备份）
crontab -e
# 0 3 * * * /path/to/backup-files.sh
```

---

## 九、监控和运维

### 9.1 日志管理

```bash
# 查看所有容器日志
docker-compose logs

# 查看特定容器日志
docker-compose logs -f backend

# 导出日志
docker-compose logs backend > backend.log

# 清理日志
docker-compose logs --tail=0 backend
```

### 9.2 资源监控

```bash
# 查看容器资源使用情况
docker stats

# 查看磁盘使用情况
df -h

# 查看内存使用情况
free -h

# 查看CPU使用情况
top
```

### 9.3 健康检查

```bash
# 检查后端健康状态
curl http://localhost:8080/api/actuator/health

# 检查前端访问
curl http://localhost

# 检查数据库连接
docker-compose exec mysql mysqladmin ping -h localhost
```

---

## 十、常见问题

### Q1: 如何修改默认密码？

**A**: 首次登录后台后，进入"系统设置" → "修改密码"页面，修改管理员密码。

### Q2: 如何重置数据库？

**A**: 
```bash
# 停止服务
docker-compose down

# 删除数据库卷
docker volume rm personal-blog_mysql_data

# 重新启动
docker-compose up -d
```

### Q3: 如何更新系统？

**A**:
```bash
# 拉取最新代码
git pull origin main

# 重新构建并启动
docker-compose up -d --build
```

### Q4: 如何查看API文档？

**A**: 访问 http://localhost:8080/swagger-ui.html

### Q5: 如何查看日志？

**A**: 
```bash
# 查看所有日志
docker-compose logs -f

# 查看特定服务日志
docker-compose logs -f backend
```

---

## 文档结束

*本启动指南提供了完整的项目启动流程、配置说明和故障排查方法。如有问题，请参考故障排查章节或查看日志文件。*