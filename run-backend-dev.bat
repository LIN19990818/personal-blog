@echo off
echo ========================================
echo   Running Backend in Development Mode
echo ========================================
echo.

set "JAVA_HOME=C:\Users\Administrator\jdk17\jdk-17.0.18+8"
set "MAVEN_HOME=C:\Users\Administrator\maven\apache-maven-3.9.6"
set "PATH=%JAVA_HOME%\bin;%MAVEN_HOME%\bin;%PATH%"

echo JAVA_HOME: %JAVA_HOME%
echo.

cd /d "c:\Users\Administrator\Desktop\personal blog\code\backend"

echo Running Spring Boot application in development mode...
mvn spring-boot:run

pause