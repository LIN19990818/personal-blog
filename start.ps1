# 个人博客系统启动脚本
# 版本: v1.0.0

Write-Host "=========================================" -ForegroundColor Cyan
Write-Host "  个人博客系统启动脚本 v1.0.0" -ForegroundColor Cyan
Write-Host "=========================================" -ForegroundColor Cyan
Write-Host ""

# 检查Docker是否安装
$dockerInstalled = Get-Command docker -ErrorAction SilentlyContinue
if (-not $dockerInstalled) {
    Write-Host "❌ 错误: Docker未安装，请先安装Docker" -ForegroundColor Red
    exit 1
}

# 检查Docker Compose是否安装
$dockerComposeInstalled = Get-Command docker-compose -ErrorAction SilentlyContinue
if (-not $dockerComposeInstalled) {
    Write-Host "❌ 错误: Docker Compose未安装，请先安装Docker Compose" -ForegroundColor Red
    exit 1
}

# 检查.env文件是否存在
if (-not (Test-Path "deploy\.env")) {
    Write-Host "⚠️  警告: .env文件不存在，正在从.env.example创建..." -ForegroundColor Yellow
    Copy-Item "deploy\.env.example" "deploy\.env"
    Write-Host "✅ 已创建.env文件，请编辑deploy\.env文件配置环境变量" -ForegroundColor Green
    Write-Host ""
    Write-Host "请修改以下配置项：" -ForegroundColor Yellow
    Write-Host "  - MYSQL_ROOT_PASSWORD: MySQL root密码"
    Write-Host "  - MYSQL_PASSWORD: MySQL用户密码"
    Write-Host "  - JWT_SECRET: JWT密钥（至少32字符）"
    Write-Host ""
    Read-Host "按Enter键继续，或按Ctrl+C退出"
}

# 进入deploy目录
Set-Location deploy

Write-Host "📦 开始构建和启动Docker容器..." -ForegroundColor Cyan
Write-Host ""

# 停止并删除旧容器
Write-Host "🛑 停止旧容器..." -ForegroundColor Yellow
docker-compose down

# 构建并启动新容器
Write-Host "🚀 构建并启动新容器..." -ForegroundColor Green
docker-compose up -d --build

Write-Host ""
Write-Host "⏳ 等待服务启动..." -ForegroundColor Yellow
Start-Sleep -Seconds 10

# 检查容器状态
Write-Host ""
Write-Host "📊 检查容器状态..." -ForegroundColor Cyan
docker-compose ps

# 健康检查
Write-Host ""
Write-Host "🏥 执行健康检查..." -ForegroundColor Cyan

# 检查MySQL
$mysqlHealth = docker-compose exec -T mysql mysqladmin ping -h localhost --silent 2>&1
if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ MySQL: 运行正常" -ForegroundColor Green
} else {
    Write-Host "❌ MySQL: 启动失败" -ForegroundColor Red
}

# 检查后端
try {
    $response = Invoke-WebRequest -Uri "http://localhost:8080/api/actuator/health" -UseBasicParsing -TimeoutSec 5
    Write-Host "✅ 后端API: 运行正常" -ForegroundColor Green
} catch {
    Write-Host "⚠️  后端API: 正在启动中..." -ForegroundColor Yellow
}

# 检查前端
try {
    $response = Invoke-WebRequest -Uri "http://localhost" -UseBasicParsing -TimeoutSec 5
    Write-Host "✅ 前端应用: 运行正常" -ForegroundColor Green
} catch {
    Write-Host "⚠️  前端应用: 正在启动中..." -ForegroundColor Yellow
}

Write-Host ""
Write-Host "=========================================" -ForegroundColor Cyan
Write-Host "  🎉 个人博客系统启动成功！" -ForegroundColor Green
Write-Host "=========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "📍 访问地址：" -ForegroundColor Cyan
Write-Host "  - 前端: http://localhost" -ForegroundColor White
Write-Host "  - 后端API: http://localhost:8080" -ForegroundColor White
Write-Host "  - API文档: http://localhost:8080/swagger-ui.html" -ForegroundColor White
Write-Host ""
Write-Host "📋 常用命令：" -ForegroundColor Cyan
Write-Host "  - 查看日志: docker-compose logs -f" -ForegroundColor White
Write-Host "  - 停止服务: docker-compose down" -ForegroundColor White
Write-Host "  - 重启服务: docker-compose restart" -ForegroundColor White
Write-Host "  - 查看容器状态: docker-compose ps" -ForegroundColor White
Write-Host ""
Write-Host "📝 后台登录：" -ForegroundColor Cyan
Write-Host "  - 默认用户名: admin" -ForegroundColor White
Write-Host "  - 默认密码: admin123" -ForegroundColor White
Write-Host "  - 请登录后立即修改密码" -ForegroundColor Yellow
Write-Host ""
Write-Host "=========================================" -ForegroundColor Cyan

# 返回项目根目录
Set-Location ..