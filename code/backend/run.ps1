Set-Location -Path $PSScriptRoot
Write-Host "Setting up environment variables..."
$env:JAVA_HOME="C:\Users\Administrator\jdk17\jdk-17.0.18+8"
$env:MAVEN_HOME="C:\Users\Administrator\maven\apache-maven-3.9.6"
$env:PATH="$env:JAVA_HOME\bin;$env:MAVEN_HOME\bin;$env:PATH"

Write-Host "JAVA_HOME: $env:JAVA_HOME"
Write-Host "MAVEN_HOME: $env:MAVEN_HOME"
Write-Host ""
Write-Host "Checking Java version:"
java -version
Write-Host ""

Write-Host "Running Maven clean package..."
mvn clean package -DskipTests
Write-Host ""

Write-Host "Checking target directory:"
get-childitem target
Write-Host ""

if (Test-Path "target\personal-blog-backend-1.0.0.jar") {
    Write-Host "Build successful! JAR file found."
    Write-Host ""
    Write-Host "Starting Spring Boot application..."
    java -jar target\personal-blog-backend-1.0.0.jar
} else {
    Write-Host "Build failed! JAR file not found."
    Read-Host "Press Enter to continue..."
}
