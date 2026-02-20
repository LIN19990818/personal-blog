#!/usr/bin/env pwsh
# 个人博客测试数据导入脚本

Write-Host "============================================" -ForegroundColor Cyan
Write-Host "个人博客测试数据导入脚本" -ForegroundColor Cyan
Write-Host "============================================" -ForegroundColor Cyan
Write-Host ""

$MYSQL_HOST = "localhost"
$MYSQL_PORT = "13306"
$MYSQL_USER = "root"
$MYSQL_PASSWORD = "root123456"
$MYSQL_DATABASE = "blog"

Write-Host "正在导入测试数据..." -ForegroundColor Yellow
Write-Host "数据库: $MYSQL_DATABASE"
Write-Host "主机: ${MYSQL_HOST}:${MYSQL_PORT}"
Write-Host ""

$env:MYSQL_PWD = $MYSQL_PASSWORD
mysql -h"$MYSQL_HOST" -P"$MYSQL_PORT" -u"$MYSQL_USER" "$MYSQL_DATABASE" -e "source src/main/resources/data-test.sql"

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "============================================" -ForegroundColor Green
    Write-Host "测试数据导入成功！" -ForegroundColor Green
    Write-Host "============================================" -ForegroundColor Green
} else {
    Write-Host ""
    Write-Host "============================================" -ForegroundColor Red
    Write-Host "测试数据导入失败，请检查数据库连接配置" -ForegroundColor Red
    Write-Host "============================================" -ForegroundColor Red
}

Read-Host "按任意键继续"
