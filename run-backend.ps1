$env:JAVA_HOME = 'C:\Users\Administrator\jdk17\jdk-17.0.18+8'
$env:PATH = "$env:JAVA_HOME\bin;$env:PATH"

Set-Location 'c:\Users\Administrator\Desktop\personal blog\code\backend'

Write-Host "Starting backend server with JDK 17..."
Write-Host "JAVA_HOME: $env:JAVA_HOME"

& 'C:\Users\Administrator\maven\apache-maven-3.9.6\bin\mvn.cmd' spring-boot:run `
    -D"spring-boot.run.arguments=--server.port=8080 --spring.datasource.url=jdbc:mysql://localhost:13306/blog --spring.datasource.username=blog_user --spring.datasource.password=blog123456"
