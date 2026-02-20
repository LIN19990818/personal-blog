# Database Backup Script
# Version: v1.0.0

$backupDir = "D:\trae\personal blog\backups"
$date = Get-Date -Format "yyyy-MM-dd_HH-mm-ss"
$backupFile = "$backupDir\blog_backup_$date.sql"

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "   Database Backup Tool" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Create backup directory
if (!(Test-Path $backupDir)) {
    New-Item -ItemType Directory -Path $backupDir -Force | Out-Null
    Write-Host "Created backup directory: $backupDir" -ForegroundColor Yellow
}

# Check MySQL connection
try {
    $result = mysql -h localhost -P 13306 -u root -proot123456 -e "SELECT 1" 2>&1
    if ($LASTEXITCODE -ne 0) {
        throw "Connection failed"
    }
} catch {
    Write-Host "[ERROR] Cannot connect to MySQL" -ForegroundColor Red
    Write-Host "Please ensure MySQL container is running: docker start mysql" -ForegroundColor Yellow
    exit 1
}

# Execute backup
Write-Host "Backing up database..." -ForegroundColor Yellow
mysqldump -h localhost -P 13306 -u root -proot123456 blog > $backupFile

if ($LASTEXITCODE -eq 0) {
    $fileSize = (Get-Item $backupFile).Length / 1KB
    Write-Host "Backup successful!" -ForegroundColor Green
    Write-Host "  File: $backupFile" -ForegroundColor White
    Write-Host "  Size: $([math]::Round($fileSize, 2)) KB" -ForegroundColor White
    
    # Keep only last 10 backups
    $oldBackups = Get-ChildItem $backupDir -Filter "blog_backup_*.sql" | 
        Sort-Object CreationTime -Descending | 
        Select-Object -Skip 10
    
    if ($oldBackups) {
        Write-Host "Cleaning old backup files..." -ForegroundColor Yellow
        $oldBackups | Remove-Item -Force
    }
    
    # Show existing backups
    Write-Host ""
    Write-Host "Existing backup files:" -ForegroundColor Cyan
    Get-ChildItem $backupDir -Filter "blog_backup_*.sql" | 
        Sort-Object CreationTime -Descending | 
        ForEach-Object { 
            $size = $_.Length / 1KB
            Write-Host "  - $($_.Name) ($([math]::Round($size, 2)) KB) - $($_.CreationTime)" 
        }
} else {
    Write-Host "[ERROR] Backup failed!" -ForegroundColor Red
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
