# One-Click Fix Script
# Version: v1.0.0
# Date: 2026-02-19
# Purpose: Fix all known issues

$Host.UI.RawUI.WindowTitle = "Personal Blog - Fix All Issues"

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "   Personal Blog - Fix All Issues" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$sqlDir = Join-Path (Split-Path $scriptDir -Parent) "sql"

# Set Java 17 environment
$env:JAVA_HOME = "C:\Users\Administrator\jdk17\jdk-17.0.18+8"
$env:MAVEN_HOME = "C:\Users\Administrator\maven\apache-maven-3.9.6"
$env:PATH = "$env:JAVA_HOME\bin;$env:MAVEN_HOME\bin;$env:PATH"

Write-Host "[1/4] Checking MySQL connection..." -ForegroundColor Yellow

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
Write-Host "[2/4] Fixing database schema..." -ForegroundColor Yellow

# Fix system_setting table
Write-Host "      Fixing system_setting table..." -ForegroundColor Gray
mysql -h localhost -P 13306 -u root -proot123456 -e "SET FOREIGN_KEY_CHECKS=0; DROP TABLE IF EXISTS system_setting; CREATE TABLE system_setting (id BIGINT NOT NULL AUTO_INCREMENT, \`key\` VARCHAR(50) NOT NULL, value TEXT NOT NULL, description VARCHAR(255) DEFAULT NULL, updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, PRIMARY KEY (id), UNIQUE KEY uk_key (\`key\`)) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci; SET FOREIGN_KEY_CHECKS=1;" blog 2>$null

if ($LASTEXITCODE -eq 0) {
    Write-Host "      Schema fixed: OK" -ForegroundColor Green
} else {
    Write-Host "      Schema fix: Warning (may already be correct)" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "[3/4] Clearing old data..." -ForegroundColor Yellow

# Clear all data to let DataInitializer recreate
$clearSql = @"
SET FOREIGN_KEY_CHECKS = 0;
TRUNCATE TABLE article_tag;
TRUNCATE TABLE article;
TRUNCATE TABLE category;
TRUNCATE TABLE tag;
TRUNCATE TABLE admin;
TRUNCATE TABLE image;
TRUNCATE TABLE city;
TRUNCATE TABLE music;
TRUNCATE TABLE system_setting;
TRUNCATE TABLE visit_stat;
TRUNCATE TABLE inspiration;
SET FOREIGN_KEY_CHECKS = 1;
"@

$clearSql | mysql -h localhost -P 13306 -u root -proot123456 blog 2>$null

if ($LASTEXITCODE -eq 0) {
    Write-Host "      Data cleared: OK" -ForegroundColor Green
} else {
    Write-Host "      Data clear: Warning" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "[4/4] Verifying fix..." -ForegroundColor Yellow

# Verify tables
$tables = mysql -h localhost -P 13306 -u root -proot123456 -e "SHOW TABLES;" blog 2>$null
$tableCount = ($tables | Measure-Object).Count - 1
Write-Host "      Tables: $tableCount" -ForegroundColor White

# Verify system_setting structure
$settingSchema = mysql -h localhost -P 13306 -u root -proot123456 -e "DESCRIBE system_setting;" blog 2>$null
if ($settingSchema -match "key") {
    Write-Host "      system_setting.key: OK" -ForegroundColor Green
} else {
    Write-Host "      system_setting.key: Warning" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "   Fix Completed!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "   IMPORTANT: You MUST restart backend now!" -ForegroundColor Red
Write-Host ""
Write-Host "   Option 1: Use start script" -ForegroundColor White
Write-Host "   Run: .\code\start.ps1" -ForegroundColor Yellow
Write-Host ""
Write-Host "   Option 2: Manual start" -ForegroundColor White
Write-Host "   Run: `$env:JAVA_HOME = 'C:\Users\Administrator\jdk17\jdk-17.0.18+8'" -ForegroundColor Yellow
Write-Host "   Run: java -jar code\backend\target\personal-blog-backend-1.0.0.jar --spring.profiles.active=dev" -ForegroundColor Yellow
Write-Host ""
Write-Host "   Login credentials:" -ForegroundColor White
Write-Host "   Username: admin" -ForegroundColor Cyan
Write-Host "   Password: 123456" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "Do you want to start backend now? (Y/N): " -NoNewline -ForegroundColor Yellow
$response = Read-Host
if ($response -eq 'Y' -or $response -eq 'y') {
    Write-Host "Starting backend..." -ForegroundColor Green
    $backendScript = @"
`$env:JAVA_HOME = 'C:\Users\Administrator\jdk17\jdk-17.0.18+8'
`$env:PATH = "`$env:JAVA_HOME\bin;`$env:PATH"
java -jar 'd:\trae\personal blog\code\backend\target\personal-blog-backend-1.0.0.jar' --spring.profiles.active=dev
"@
    Start-Process powershell -ArgumentList "-NoExit", "-Command", $backendScript -WindowStyle Normal
    Write-Host "Backend started! Wait 15 seconds for initialization..." -ForegroundColor Green
    Start-Sleep -Seconds 15
    Start-Process "http://localhost:3000/admin"
}

Read-Host "Press Enter to exit"
