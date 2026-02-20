Write-Host "========================================" -ForegroundColor Cyan
Write-Host "   个人博客系统 - 停止服务" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "正在停止后端服务 (端口 8080)..." -ForegroundColor Yellow
$backendProcess = Get-NetTCPConnection -LocalPort 8080 -ErrorAction SilentlyContinue | Select-Object -ExpandProperty OwningProcess -Unique
if ($backendProcess) {
    Stop-Process -Id $backendProcess -Force -ErrorAction SilentlyContinue
    Write-Host "      后端已停止" -ForegroundColor Green
} else {
    Write-Host "      后端未运行" -ForegroundColor Gray
}

Write-Host ""
Write-Host "正在停止前端服务 (端口 3000)..." -ForegroundColor Yellow
$frontendProcess = Get-NetTCPConnection -LocalPort 3000 -ErrorAction SilentlyContinue | Select-Object -ExpandProperty OwningProcess -Unique
if ($frontendProcess) {
    Stop-Process -Id $frontendProcess -Force -ErrorAction SilentlyContinue
    Write-Host "      前端已停止" -ForegroundColor Green
} else {
    Write-Host "      前端未运行" -ForegroundColor Gray
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "   所有服务已停止" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Read-Host "按回车键退出"
