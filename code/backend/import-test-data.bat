@echo off
chcp 65001 >nul
echo ============================================
echo 个人博客测试数据导入脚本
echo ============================================
echo.

set MYSQL_HOST=localhost
set MYSQL_PORT=13306
set MYSQL_USER=root
set MYSQL_PASSWORD=root123456
set MYSQL_DATABASE=blog

echo 正在导入测试数据...
echo 数据库: %MYSQL_DATABASE%
echo 主机: %MYSQL_HOST%:%MYSQL_PORT%
echo.

mysql -h%MYSQL_HOST% -P%MYSQL_PORT% -u%MYSQL_USER% -p%MYSQL_PASSWORD% %MYSQL_DATABASE% < src\main\resources\data-test.sql

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ============================================
    echo 测试数据导入成功！
    echo ============================================
) else (
    echo.
    echo ============================================
    echo 测试数据导入失败，请检查数据库连接配置
    echo ============================================
)

pause
