$env:JAVA_HOME = "C:\Users\Administrator\jdk17\jdk-17.0.18+8"
$env:MAVEN_HOME = "C:\Users\Administrator\maven\apache-maven-3.9.6"
$env:PATH = "$env:JAVA_HOME\bin;$env:MAVEN_HOME\bin;$env:PATH"

Set-Location "d:\trae\personal blog\code\backend"
mvn clean package -DskipTests
