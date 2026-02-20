@echo off
echo ========================================
echo   Starting Backend Server
echo ========================================
echo.

set "JAVA_HOME=C:\Users\Administrator\jdk17\jdk-17.0.18+8"
set "MAVEN_HOME=C:\Users\Administrator\maven\apache-maven-3.9.6"

set "PATH=%JAVA_HOME%\bin;%MAVEN_HOME%\bin;%PATH%"

echo JAVA_HOME: %JAVA_HOME%
echo MAVEN_HOME: %MAVEN_HOME%
echo.
echo Checking Java version:
java -version
echo.

cd /d "c:\Users\Administrator\Desktop\personal blog\code\backend"

echo Running Maven clean...
mvn clean
echo.
echo Running Maven package...
mvn package -DskipTests

echo.
echo Checking target directory:
dir target
echo.

if exist "target\personal-blog-backend-1.0.0.jar" (
    echo Build successful! JAR file found.
    echo.
    echo Starting Spring Boot application...
    java -jar target\personal-blog-backend-1.0.0.jar
) else (
    echo Build failed! JAR file not found.
    pause
)