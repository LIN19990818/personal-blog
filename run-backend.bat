@echo off
set JAVA_HOME=C:\Users\Administrator\jdk17\jdk-17.0.18+8
set MAVEN_HOME=C:\Users\Administrator\maven\apache-maven-3.9.6
set PATH=%JAVA_HOME%\bin;%MAVEN_HOME%\bin;%PATH%

cd /d "c:\Users\Administrator\Desktop\personal blog\code\backend"

echo Starting backend server...
%MAVEN_HOME%\bin\mvn.cmd spring-boot:run -Dspring-boot.run.arguments="--server.port=8080 --spring.datasource.url=jdbc:mysql://localhost:13306/blog --spring.datasource.username=blog_user --spring.datasource.password=blog123456"
