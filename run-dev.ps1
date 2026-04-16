# Script para rodar em modo desenvolvimento
# Execute: .\run-dev.ps1

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  MODO DESENVOLVIMENTO" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Este script irá iniciar:" -ForegroundColor Yellow
Write-Host "  1. Backend Spring Boot (porta 8080)" -ForegroundColor White
Write-Host "  2. Frontend Vite (porta 5173)" -ForegroundColor White
Write-Host ""
Write-Host "Pressione Ctrl+C para parar ambos os servidores" -ForegroundColor Gray
Write-Host ""

# Inicia o backend em background
Write-Host "Iniciando Spring Boot..." -ForegroundColor Yellow
$backend = Start-Job -ScriptBlock {
    Set-Location $using:PWD
    if (Get-Command mvn -ErrorAction SilentlyContinue) {
        mvn spring-boot:run
    } else {
        & .\mvnw.cmd spring-boot:run
    }
}

Start-Sleep -Seconds 3

# Inicia o frontend
Write-Host "Iniciando Vite dev server..." -ForegroundColor Yellow
Set-Location frontend

try {
    npm run dev
} finally {
    # Quando Ctrl+C é pressionado, para o backend também
    Write-Host "Parando servidores..." -ForegroundColor Yellow
    Stop-Job -Job $backend
    Remove-Job -Job $backend
    Write-Host "Servidores parados!" -ForegroundColor Green
}
