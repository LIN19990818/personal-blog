#!/bin/bash

# 个人博客系统启动脚本
# 版本: v1.0.0

set -e

echo "========================================="
echo "  个人博客系统启动脚本 v1.0.0"
echo "========================================="
echo ""

# 检查Docker是否安装
if ! command -v docker &> /dev/null; then
    echo "❌ 错误: Docker未安装，请先安装Docker"
    exit 1
fi

# 检查Docker Compose是否安装
if ! command -v docker-compose &> /dev/null; then
    echo "❌ 错误: Docker Compose未安装，请先安装Docker Compose"
    exit 1
fi

# 检查.env文件是否存在
if [ ! -f "deploy/.env" ]; then
    echo "⚠️  警告: .env文件不存在，正在从.env.example创建..."
    cp deploy/.env.example deploy/.env
    echo "✅ 已创建.env文件，请编辑deploy/.env文件配置环境变量"
    echo ""
    echo "请修改以下配置项："
    echo "  - MYSQL_ROOT_PASSWORD: MySQL root密码"
    echo "  - MYSQL_PASSWORD: MySQL用户密码"
    echo "  - JWT_SECRET: JWT密钥（至少32字符）"
    echo ""
    read -p "按Enter键继续，或按Ctrl+C退出..."
fi

# 进入deploy目录
cd deploy

echo "📦 开始构建和启动Docker容器..."
echo ""

# 停止并删除旧容器
echo "🛑 停止旧容器..."
docker-compose down

# 构建并启动新容器
echo "🚀 构建并启动新容器..."
docker-compose up -d --build

echo ""
echo "⏳ 等待服务启动..."
sleep 10

# 检查容器状态
echo ""
echo "📊 检查容器状态..."
docker-compose ps

# 健康检查
echo ""
echo "🏥 执行健康检查..."

# 检查MySQL
if docker-compose exec -T mysql mysqladmin ping -h localhost --silent; then
    echo "✅ MySQL: 运行正常"
else
    echo "❌ MySQL: 启动失败"
    exit 1
fi

# 检查后端
if curl -s http://localhost:8080/api/actuator/health > /dev/null 2>&1; then
    echo "✅ 后端API: 运行正常"
else
    echo "⚠️  后端API: 正在启动中..."
fi

# 检查前端
if curl -s http://localhost > /dev/null 2>&1; then
    echo "✅ 前端应用: 运行正常"
else
    echo "⚠️  前端应用: 正在启动中..."
fi

echo ""
echo "========================================="
echo "  🎉 个人博客系统启动成功！"
echo "========================================="
echo ""
echo "📍 访问地址："
echo "  - 前端: http://localhost"
echo "  - 后端API: http://localhost:8080"
echo "  - API文档: http://localhost:8080/swagger-ui.html"
echo ""
echo "📋 常用命令："
echo "  - 查看日志: docker-compose logs -f"
echo "  - 停止服务: docker-compose down"
echo "  - 重启服务: docker-compose restart"
echo "  - 查看容器状态: docker-compose ps"
echo ""
echo "📝 后台登录："
echo "  - 默认用户名: admin"
echo "  - 默认密码: admin123"
echo "  - 请登录后立即修改密码"
echo ""
echo "========================================="