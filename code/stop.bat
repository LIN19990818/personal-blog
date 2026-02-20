@echo off
chcp 65001 >nul

echo ========================================
echo    个人博客系统 - 停止服务
echo ========================================
echo.

echo 正在停止后端服务 (端口 8080)...
for /f "tokens=5" %%a in ('netstat -ano ^| findstr :8080 ^| findstr LISTENING') do (
    taskkill /PID %%a /F >nul 2>&1
)
echo       后端已停止

echo.
echo 正在停止前端服务 (端口 3000)...
for /f "tokens=5" %%a in ('netstat -ano ^| findstr :3000 ^| findstr LISTENING') do (
    taskkill /PID %%a /F >nul 2>&1
)
echo       前端已停止

echo.
echo ========================================
echo    所有服务已停止
echo ========================================
echo.
pause
