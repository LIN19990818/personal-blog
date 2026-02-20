$Host.UI.RawUI.WindowTitle = "Personal Blog System"

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "   Personal Blog - Quick Start" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

$env:JAVA_HOME = "C:\Users\Administrator\jdk17\jdk-17.0.18+8"
$env:MAVEN_HOME = "C:\Users\Administrator\maven\apache-maven-3.9.6"
$env:PATH = "$env:JAVA_HOME\bin;$env:MAVEN_HOME\bin;$env:PATH"

$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$backendDir = Join-Path $scriptDir "backend"
$frontendDir = Join-Path $scriptDir "frontend"

Write-Host "[1/5] Checking environment..." -ForegroundColor Yellow

try {
    $javaVersion = java -version 2>&1 | Select-Object -First 1
    Write-Host "      Java: OK" -ForegroundColor Green
} catch {
    Write-Host "[ERROR] Java not configured" -ForegroundColor Red
    Read-Host "Press Enter to exit"
    exit 1
}

try {
    $mvnVersion = mvn -version 2>&1 | Select-Object -First 1
    Write-Host "      Maven: OK" -ForegroundColor Green
} catch {
    Write-Host "[ERROR] Maven not configured" -ForegroundColor Red
    Read-Host "Press Enter to exit"
    exit 1
}

Write-Host ""
Write-Host "[2/5] Checking database..." -ForegroundColor Yellow

try {
    $result = mysql -h localhost -P 13306 -u root -proot123456 -e "SELECT 1" 2>&1
    if ($LASTEXITCODE -eq 0) {
        Write-Host "      MySQL: OK" -ForegroundColor Green
    } else {
        throw "Connection failed"
    }
} catch {
    Write-Host "[ERROR] Cannot connect to MySQL" -ForegroundColor Red
    Write-Host "      Run: docker start mysql" -ForegroundColor Yellow
    Read-Host "Press Enter to exit"
    exit 1
}

Write-Host ""
Write-Host "[3/5] Starting backend..." -ForegroundColor Yellow

$backendScript = @"
Set-Location -Path '$backendDir'
`$env:JAVA_HOME = '$env:JAVA_HOME'
`$env:PATH = "`$env:JAVA_HOME\bin;`$env:PATH"
Write-Host 'Building backend...' -ForegroundColor Yellow
mvn clean package -DskipTests
if (`$LASTEXITCODE -eq 0) {
    Write-Host 'Starting Spring Boot...' -ForegroundColor Green
    java -jar target/personal-blog-backend-1.0.0.jar
} else {
    Write-Host 'Build failed!' -ForegroundColor Red
    Read-Host 'Press Enter to exit'
}
"@

Start-Process powershell -ArgumentList "-NoExit", "-Command", $backendScript -WindowStyle Normal
Write-Host "      Backend starting on port 8080" -ForegroundColor Green

Write-Host ""
Write-Host "[4/5] Waiting for backend..." -ForegroundColor Yellow
Start-Sleep -Seconds 15

Write-Host ""
Write-Host "[5/5] Starting frontend..." -ForegroundColor Yellow

$frontendScript = @"
Set-Location -Path '$frontendDir'
npm run dev
"@

Start-Process powershell -ArgumentList "-NoExit", "-Command", $frontendScript -WindowStyle Normal
Write-Host "      Frontend starting on port 3000" -ForegroundColor Green

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "   System Started!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "   Frontend: " -NoNewline; Write-Host "http://localhost:3000" -ForegroundColor White
Write-Host "   Admin:    " -NoNewline; Write-Host "http://localhost:3000/admin" -ForegroundColor White
Write-Host "   API:      " -NoNewline; Write-Host "http://localhost:8080/api" -ForegroundColor White
Write-Host ""
Write-Host "   Username: " -NoNewline; Write-Host "admin" -ForegroundColor Yellow
Write-Host "   Password: " -NoNewline; Write-Host "123456" -ForegroundColor Yellow
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

Start-Sleep -Seconds 3
Start-Process "http://localhost:3000"

Write-Host "Startup complete. You can close this window." -ForegroundColor Gray
Read-Host "Press Enter to exit"
