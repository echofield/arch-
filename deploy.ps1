# Script de déploiement ARCHÉ sur Vercel
# Exécutez ce script depuis le répertoire du projet

Write-Host "🚀 Déploiement ARCHÉ sur Vercel" -ForegroundColor Cyan
Write-Host ""

# Étape 1: Vérifier qu'on est dans le bon répertoire
if (-not (Test-Path "package.json")) {
    Write-Host "❌ Erreur: package.json introuvable. Exécutez ce script depuis le répertoire du projet." -ForegroundColor Red
    exit 1
}

# Étape 2: Installer les dépendances si nécessaire
if (-not (Test-Path "node_modules")) {
    Write-Host "📦 Installation des dépendances..." -ForegroundColor Yellow
    npm install
}

# Étape 3: Tester le build
Write-Host "🔨 Test du build..." -ForegroundColor Yellow
npm run build
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Erreur lors du build. Corrigez les erreurs avant de continuer." -ForegroundColor Red
    exit 1
}
Write-Host "✅ Build réussi!" -ForegroundColor Green

# Étape 4: Initialiser Git si nécessaire
if (-not (Test-Path ".git")) {
    Write-Host "📝 Initialisation de Git..." -ForegroundColor Yellow
    git init
    git add .
    git commit -m "Initial commit - Ready for Vercel deployment"
}

# Étape 5: Vérifier le remote GitHub
$remote = git remote get-url origin 2>$null
if (-not $remote) {
    Write-Host "🔗 Ajout du remote GitHub..." -ForegroundColor Yellow
    git remote add origin https://github.com/echofield/arch-.git
    git branch -M main
} else {
    Write-Host "✅ Remote GitHub déjà configuré: $remote" -ForegroundColor Green
}

# Étape 6: Pousser sur GitHub
Write-Host "📤 Push sur GitHub..." -ForegroundColor Yellow
git add .
git commit -m "Deploy to Vercel" 2>$null
git push -u origin main
if ($LASTEXITCODE -ne 0) {
    Write-Host "⚠️  Push échoué. Vérifiez vos credentials GitHub." -ForegroundColor Yellow
    Write-Host "   Vous pouvez continuer avec le déploiement Vercel manuellement." -ForegroundColor Yellow
}

# Étape 7: Déployer sur Vercel
Write-Host ""
Write-Host "🌐 Déploiement sur Vercel..." -ForegroundColor Yellow
Write-Host ""

# Vérifier si Vercel CLI est installé
$vercelInstalled = Get-Command vercel -ErrorAction SilentlyContinue
if (-not $vercelInstalled) {
    Write-Host "📦 Installation de Vercel CLI..." -ForegroundColor Yellow
    npm install -g vercel
}

Write-Host "🔐 Connexion à Vercel (si nécessaire)..." -ForegroundColor Yellow
Write-Host "   Si vous n'êtes pas connecté, suivez les instructions." -ForegroundColor Yellow
Write-Host ""

# Déployer
vercel --prod

Write-Host ""
Write-Host "✅ Déploiement terminé!" -ForegroundColor Green
Write-Host ""
Write-Host "📋 Prochaines étapes:" -ForegroundColor Cyan
Write-Host "   1. Configurez les variables d'environnement dans Vercel Dashboard" -ForegroundColor White
Write-Host "   2. Exécutez runMigration() dans la console du navigateur" -ForegroundColor White
Write-Host "   3. Générez les codes QR pour les cartes" -ForegroundColor White

