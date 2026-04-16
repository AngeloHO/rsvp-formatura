# Script para build completo do projeto (frontend + backend)
# Execute: .\build-local.ps1

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  BUILD COMPLETO - RSVP Formatura" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# 1. Build do Frontend
Write-Host "[1/4] Building frontend React..." -ForegroundColor Yellow
Set-Location frontend
npm run build
if ($LASTEXITCODE -ne 0) {
    Write-Host "ERRO: Build do frontend falhou!" -ForegroundColor Red
    exit 1
}
Set-Location ..
Write-Host "✓ Frontend build concluído!" -ForegroundColor Green
Write-Host ""

# 2. Criar pasta static se não existir
Write-Host "[2/4] Criando pasta static..." -ForegroundColor Yellow
New-Item -ItemType Directory -Path "src\main\resources\static" -Force | Out-Null
Write-Host "✓ Pasta criada!" -ForegroundColor Green
Write-Host ""

# 3. Copiar arquivos do frontend para static
Write-Host "[3/4] Copiando arquivos do frontend..." -ForegroundColor Yellow
Remove-Item -Path "src\main\resources\static\*" -Recurse -Force -ErrorAction SilentlyContinue
Copy-Item -Path "frontend\dist\*" -Destination "src\main\resources\static\" -Recurse -Force
Write-Host "✓ Arquivos copiados!" -ForegroundColor Green
Write-Host ""
Write-Host "Conteúdo da pasta static:" -ForegroundColor Gray
Get-ChildItem src\main\resources\static\ | Format-Table Name, Length
Write-Host ""

# 4. Build do Spring Boot
Write-Host "[4/4] Building Spring Boot..." -ForegroundColor Yellow
if (Get-Command mvn -ErrorAction SilentlyContinue) {
    mvn clean package -DskipTests
} else {
    Write-Host "Maven não encontrado no PATH. Tentando usar wrapper..." -ForegroundColor Yellow
    & .\mvnw.cmd clean package -DskipTests
}

if ($LASTEXITCODE -ne 0) {
    Write-Host "ERRO: Build do Maven falhou!" -ForegroundColor Red
    exit 1
}
Write-Host "✓ Spring Boot build concluído!" -ForegroundColor Green
Write-Host ""

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  BUILD COMPLETO COM SUCESSO! 🎉" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Para executar a aplicação:" -ForegroundColor Yellow
Write-Host "  java -jar target\rsvp-formatura-0.0.1-SNAPSHOT.jar" -ForegroundColor White
Write-Host ""
Write-Host "Depois acesse: http://localhost:8080" -ForegroundColor Yellow
Write-Host ""
