Write-Host "========================================"
Write-Host "  Running Backend in Development Mode"
Write-Host "========================================"
Write-Host ""

$env:JAVA_HOME="C:\Users\Administrator\jdk17\jdk-17.0.18+8"
$env:MAVEN_HOME="C:\Users\Administrator\maven\apache-maven-3.9.6"
$env:PATH="$env:JAVA_HOME\bin;$env:MAVEN_HOME\bin;$env:PATH"

Write-Host "JAVA_HOME: $env:JAVA_HOME"
Write-Host ""

Set-Location "c:\Users\Administrator\Desktop\personal blog\code\backend"

Write-Host "Running Spring Boot application in development mode..."

# Use Java 17 to run Maven
& "$env:JAVA_HOME\bin\java.exe" -cp "$env:MAVEN_HOME\boot\plexus-classworlds-2.7.0.jar" org.codehaus.plexus.classworlds.launcher.Launcher spring-boot:run

Read-Host "Press Enter to continue..."