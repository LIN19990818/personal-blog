@echo off
set "JAVA_HOME=C:\Users\Administrator\jdk17\jdk-17.0.18+8"
set "MAVEN_HOME=C:\Users\Administrator\maven\apache-maven-3.9.6"
set "PATH=%JAVA_HOME%\bin;%MAVEN_HOME%\bin;%PATH%"

%MAVEN_HOME%\bin\mvn.cmd %*