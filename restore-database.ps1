# Database Restore Script
# Version: v1.0.0

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "   Database Restore Tool" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Check MySQL connection
try {
    $result = mysql -h localhost -P 13306 -u root -proot123456 -e "SELECT 1" 2>&1
    if ($LASTEXITCODE -ne 0) {
        throw "Connection failed"
    }
    Write-Host "MySQL connection OK" -ForegroundColor Green
} catch {
    Write-Host "[ERROR] Cannot connect to MySQL" -ForegroundColor Red
    Write-Host "Please ensure MySQL container is running: docker start mysql" -ForegroundColor Yellow
    exit 1
}

# List available backups
$backupDir = "D:\trae\personal blog\backups"
$sqlDir = "D:\trae\personal blog\sql"

Write-Host ""
Write-Host "Select restore option:" -ForegroundColor Cyan
Write-Host "  [0] Use initial data (init-data-ascii.sql)" -ForegroundColor White

$backups = @()
if (Test-Path $backupDir) {
    $backups = Get-ChildItem $backupDir -Filter "blog_backup_*.sql" | Sort-Object CreationTime -Descending
    
    for ($i = 0; $i -lt $backups.Count; $i++) {
        $size = $backups[$i].Length / 1KB
        Write-Host "  [$($i+1)] $($backups[$i].Name) ($([math]::Round($size, 2)) KB) - $($backups[$i].CreationTime)" -ForegroundColor White
    }
}

Write-Host ""
$choice = Read-Host "Enter option number"

# Confirm restore
Write-Host ""
$confirm = Read-Host "WARNING: Restore will overwrite existing data! Continue? (yes/no)"
if ($confirm -ne "yes") {
    Write-Host "Operation cancelled" -ForegroundColor Yellow
    exit 0
}

# Execute restore
if ($choice -eq "0") {
    Write-Host ""
    Write-Host "Restoring with initial data..." -ForegroundColor Yellow
    
    # Create table structure first
    if (Test-Path "$sqlDir\schema.sql") {
        Write-Host "  Creating table structure..." -ForegroundColor Gray
        type "$sqlDir\schema.sql" | mysql -h localhost -P 13306 -u root -proot123456 blog 2>$null
    }
    
    # Import initial data
    if (Test-Path "$sqlDir\init-data-ascii.sql") {
        Write-Host "  Importing initial data..." -ForegroundColor Gray
        type "$sqlDir\init-data-ascii.sql" | mysql -h localhost -P 13306 -u root -proot123456 blog
    } else {
        Write-Host "[ERROR] Initial data file not found" -ForegroundColor Red
        exit 1
    }
} else {
    $backupIndex = [int]$choice - 1
    if ($backupIndex -ge 0 -and $backupIndex -lt $backups.Count) {
        $selectedBackup = $backups[$backupIndex].FullName
        Write-Host ""
        Write-Host "Restoring backup: $($backups[$backupIndex].Name)" -ForegroundColor Yellow
        mysql -h localhost -P 13306 -u root -proot123456 blog < $selectedBackup
    } else {
        Write-Host "[ERROR] Invalid option" -ForegroundColor Red
        exit 1
    }
}

# Verify restore result
if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "Restore completed!" -ForegroundColor Green
    Write-Host ""
    Write-Host "Verification:" -ForegroundColor Cyan
    
    $tables = mysql -h localhost -P 13306 -u root -proot123456 -e "SHOW TABLES;" blog 2>$null
    $tableCount = ($tables | Measure-Object).Count - 1
    Write-Host "  Tables: $tableCount" -ForegroundColor White
    
    $adminCount = mysql -h localhost -P 13306 -u root -proot123456 -e "SELECT COUNT(*) FROM admin;" blog 2>$null | Select-Object -Skip 1
    Write-Host "  Admins: $adminCount" -ForegroundColor White
    
    $categoryCount = mysql -h localhost -P 13306 -u root -proot123456 -e "SELECT COUNT(*) FROM category;" blog 2>$null | Select-Object -Skip 1
    Write-Host "  Categories: $categoryCount" -ForegroundColor White
    
    $tagCount = mysql -h localhost -P 13306 -u root -proot123456 -e "SELECT COUNT(*) FROM tag;" blog 2>$null | Select-Object -Skip 1
    Write-Host "  Tags: $tagCount" -ForegroundColor White
} else {
    Write-Host ""
    Write-Host "[ERROR] Restore failed!" -ForegroundColor Red
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
