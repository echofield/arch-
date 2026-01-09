# Script complet de déploiement ARCHÉ
# Exécutez depuis le répertoire du projet

$ErrorActionPreference = "Stop"

Write-Host "🚀 DÉPLOIEMENT COMPLET ARCHÉ" -ForegroundColor Cyan
Write-Host ""

# Trouver le répertoire du projet
$projectRoot = $PSScriptRoot
if (-not $projectRoot) {
    $projectRoot = Get-Location
}

# Vérifier qu'on est dans le bon répertoire
if (-not (Test-Path "$projectRoot\package.json")) {
    Write-Host "❌ Erreur: package.json introuvable dans $projectRoot" -ForegroundColor Red
    Write-Host "   Exécutez ce script depuis le répertoire du projet" -ForegroundColor Yellow
    exit 1
}

Set-Location $projectRoot
Write-Host "📁 Répertoire: $projectRoot" -ForegroundColor Green
Write-Host ""

# Étape 1: Initialiser Git dans le bon répertoire
Write-Host "[1/6] 🔧 Initialisation Git..." -ForegroundColor Yellow
if (Test-Path "$projectRoot\.git") {
    Write-Host "   .git existe déjà" -ForegroundColor Gray
} else {
    git init
    Write-Host "   ✅ Git initialisé" -ForegroundColor Green
}

# Étape 2: Ajouter les fichiers
Write-Host "[2/6] 📦 Ajout des fichiers..." -ForegroundColor Yellow
git add .
$fileCount = (git status --short | Measure-Object -Line).Lines
Write-Host "   ✅ $fileCount fichiers ajoutés" -ForegroundColor Green

# Étape 3: Commit
Write-Host "[3/6] 💾 Commit..." -ForegroundColor Yellow
$commitMsg = "Initial commit - Ready for Vercel deployment"
git commit -m $commitMsg 2>&1 | Out-Null
if ($LASTEXITCODE -eq 0) {
    Write-Host "   ✅ Commit créé" -ForegroundColor Green
} else {
    Write-Host "   ⚠️  Aucun changement à commiter" -ForegroundColor Yellow
}

# Étape 4: Configurer le remote
Write-Host "[4/6] 🔗 Configuration GitHub..." -ForegroundColor Yellow
git remote remove origin 2>&1 | Out-Null
git remote add origin https://github.com/echofield/arch-.git
git branch -M main
Write-Host "   ✅ Remote configuré: https://github.com/echofield/arch-.git" -ForegroundColor Green

# Étape 5: Push sur GitHub
Write-Host "[5/6] 📤 Push sur GitHub..." -ForegroundColor Yellow
Write-Host "   (Cela peut prendre quelques instants...)" -ForegroundColor Gray
try {
    git push -u origin main 2>&1 | ForEach-Object {
        if ($_ -match "error|fatal") {
            Write-Host "   ⚠️  $_" -ForegroundColor Yellow
        } else {
            Write-Host "   $_" -ForegroundColor Gray
        }
    }
    if ($LASTEXITCODE -eq 0) {
        Write-Host "   ✅ Code poussé sur GitHub!" -ForegroundColor Green
    } else {
        Write-Host "   ⚠️  Push échoué. Vérifiez vos credentials GitHub." -ForegroundColor Yellow
        Write-Host "   Vous pouvez continuer avec le déploiement Vercel manuellement." -ForegroundColor Yellow
    }
} catch {
    Write-Host "   ⚠️  Erreur lors du push: $_" -ForegroundColor Yellow
}

# Étape 6: Déployer sur Vercel
Write-Host "[6/6] 🌐 Déploiement sur Vercel..." -ForegroundColor Yellow
Write-Host ""
Write-Host "   Option A: Via l'interface web (RECOMMANDÉ)" -ForegroundColor Cyan
Write-Host "   1. Aller sur https://vercel.com/dashboard" -ForegroundColor White
Write-Host "   2. Cliquer 'Add New Project'" -ForegroundColor White
Write-Host "   3. Importer echofield/arch-" -ForegroundColor White
Write-Host "   4. Ajouter les variables d'environnement" -ForegroundColor White
Write-Host "   5. Cliquer 'Deploy'" -ForegroundColor White
Write-Host ""
Write-Host "   Option B: Via CLI" -ForegroundColor Cyan
Write-Host "   vercel --prod" -ForegroundColor White
Write-Host ""

# Vérifier si Vercel CLI est disponible
$vercelInstalled = Get-Command vercel -ErrorAction SilentlyContinue
if ($vercelInstalled) {
    Write-Host "   Vercel CLI détecté. Voulez-vous déployer maintenant? (O/N)" -ForegroundColor Yellow
    $response = Read-Host
    if ($response -eq "O" -or $response -eq "o" -or $response -eq "Y" -or $response -eq "y") {
        Write-Host "   Déploiement en cours..." -ForegroundColor Yellow
        vercel --prod
    }
} else {
    Write-Host "   ⚠️  Vercel CLI non installé. Installez-le avec: npm install -g vercel" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "✅ PROCESSUS TERMINÉ!" -ForegroundColor Green
Write-Host ""
Write-Host "📋 PROCHAINES ÉTAPES:" -ForegroundColor Cyan
Write-Host "   1. Configurer les variables d'environnement dans Vercel" -ForegroundColor White
Write-Host "   2. Exécuter runMigration() dans la console du navigateur" -ForegroundColor White
Write-Host "   3. Générez les codes QR pour les cartes" -ForegroundColor White
Write-Host ""

