@echo off
REM Script pour pousser le projet sur GitHub
REM Exécutez ce script depuis le répertoire du projet

echo ========================================
echo  PUSH SUR GITHUB - ARCHÉ
echo ========================================
echo.

REM Vérifier qu'on est dans le bon répertoire
if not exist "package.json" (
    echo ERREUR: package.json introuvable
    echo Exécutez ce script depuis le répertoire du projet
    pause
    exit /b 1
)

echo [1/5] Initialisation Git...
if exist ".git" (
    echo .git existe déjà, on continue...
) else (
    git init
)

echo.
echo [2/5] Ajout des fichiers...
git add .

echo.
echo [3/5] Commit...
git commit -m "Initial commit - Ready for Vercel deployment" 2>nul
if errorlevel 1 (
    echo Aucun changement à commiter, on continue...
)

echo.
echo [4/5] Configuration du remote...
git remote remove origin 2>nul
git remote add origin https://github.com/echofield/arch-.git

echo.
echo [5/5] Push sur GitHub...
git branch -M main
git push -u origin main

echo.
echo ========================================
echo  TERMINE!
echo ========================================
echo.
echo Si le push a échoué, vérifiez:
echo - Vos credentials GitHub
echo - Que le repo existe sur GitHub
echo.
pause

