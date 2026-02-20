@echo off
chcp 65001 >nul
setlocal enabledelayedexpansion

echo ========================================
echo    个人博客系统 - 一键启动脚本
echo ========================================
echo.

set JAVA_HOME=C:\Users\Administrator\jdk17\jdk-17.0.18+8
set MAVEN_HOME=C:\Users\Administrator\maven\apache-maven-3.9.6
set PATH=%JAVA_HOME%\bin;%MAVEN_HOME%\bin;%PATH%

echo [1/5] 检查环境...
java -version >nul 2>&1
if errorlevel 1 (
    echo [错误] Java 未正确配置，请检查 JAVA_HOME
    pause
    exit /b 1
)
echo       Java: OK

mvn -version >nul 2>&1
if errorlevel 1 (
    echo [错误] Maven 未正确配置，请检查 MAVEN_HOME
    pause
    exit /b 1
)
echo       Maven: OK

echo.
echo [2/5] 检查数据库连接...
mysql -h localhost -P 13306 -u root -proot123456 -e "SELECT 1" >nul 2>&1
if errorlevel 1 (
    echo [错误] 无法连接数据库，请确保 MySQL 容器已启动
    echo       运行命令: docker start mysql
    pause
    exit /b 1
)
echo       MySQL: OK

echo.
echo [3/5] 启动后端服务...
cd /d "%~dp0backend"
start "Blog Backend" cmd /c "set JAVA_HOME=%JAVA_HOME% && set PATH=%JAVA_HOME%\bin;%PATH% && mvn clean package -DskipTests && java -jar target/personal-blog-backend-1.0.0.jar"
echo       后端启动中... (端口 8080)

echo.
echo [4/5] 等待后端就绪...
timeout /t 15 /nobreak >nul

echo.
echo [5/5] 启动前端服务...
cd /d "%~dp0frontend"
start "Blog Frontend" cmd /c "npm run dev"
echo       前端启动中... (端口 3000)

echo.
echo ========================================
echo    启动完成！
echo ========================================
echo.
echo    前台地址: http://localhost:3000
echo    后台地址: http://localhost:3000/admin
echo    API地址:  http://localhost:8080/api
echo.
echo    登录账号: admin
echo    登录密码: 123456
echo ========================================
echo.

timeout /t 5 /nobreak >nul
start http://localhost:3000

echo 按任意键退出此窗口...
pause >nul
