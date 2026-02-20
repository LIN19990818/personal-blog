@echo off
echo ========================================
echo   Starting Backend Server
echo ========================================
echo.

cd /d "d:\trae\personal blog\code\backend"

echo Current Java version:
java -version
echo.

echo Running Maven clean using Maven Wrapper...
..\..\mvnw.cmd clean

echo.
echo Running Maven package using Maven Wrapper...
..\..\mvnw.cmd package -DskipTests

if exist "target\personal-blog-backend-1.0.0.jar" (
    echo.
    echo Build successful! JAR file found.
    echo.
    echo Starting Spring Boot application...
    java -jar target\personal-blog-backend-1.0.0.jar
) else (
    echo.
    echo Build failed! JAR file not found.
    echo Checking target directory contents:
    dir target
    pause
)
