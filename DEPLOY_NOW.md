# 🚀 DÉPLOIEMENT IMMÉDIAT - Instructions

## ⚡ MÉTHODE RAPIDE (Recommandée)

### Option 1 : Via l'interface Vercel (Plus simple)

1. **Aller sur [vercel.com](https://vercel.com)** et se connecter avec GitHub
2. **Cliquer sur "Add New Project"**
3. **Importer le repository** : `echofield/arch-`
4. **Configuration automatique** :
   - Framework : Vite (détecté automatiquement)
   - Build Command : `npm run build`
   - Output Directory : `dist`
5. **Ajouter les variables d'environnement** :
   - `VITE_SUPABASE_URL` = `https://qvyrpzgxsppkwfvqvgcn.supabase.co`
   - `VITE_SUPABASE_ANON_KEY` = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF2eXJwemd4c3Bwa3dmdnF2Z2NuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE4NTc0MDIsImV4cCI6MjA3NzQzMzQwMn0.mYqlWWtonfV2etTLLsMQ0eXP805vpqC3nTZ6Pwy4on0`
6. **Cliquer sur "Deploy"**

### Option 2 : Via CLI (Si vous préférez)

Exécutez le script PowerShell `deploy.ps1` que j'ai créé :

```powershell
.\deploy.ps1
```

---

## 📤 PUSH SUR GITHUB (Si pas encore fait)

**Ouvrez PowerShell dans le répertoire du projet et exécutez :**

```powershell
# Si Git n'est pas initialisé dans ce répertoire
git init
git add .
git commit -m "Initial commit - Ready for Vercel deployment"

# Ajouter le remote
git remote add origin https://github.com/echofield/arch-.git
git branch -M main

# Pousser
git push -u origin main
```

**Note** : Si vous avez des problèmes d'encodage avec PowerShell, utilisez Git Bash ou l'interface GitHub Desktop.

---

## 🔐 CONFIGURATION SUPABASE

### Variables d'environnement Supabase (pour Edge Functions)

Ces variables doivent être configurées dans **Supabase Dashboard**, pas dans Vercel :

1. **Aller sur [supabase.com](https://supabase.com)**
2. **Sélectionner votre projet** : `qvyrpzgxsppkwfvqvgcn`
3. **Settings → Edge Functions → Secrets**

Ajoutez :
- `SUPABASE_URL` = `https://qvyrpzgxsppkwfvqvgcn.supabase.co`
- `SUPABASE_SERVICE_ROLE_KEY` = (trouvez-le dans Settings → API → service_role key)
- `JWT_SECRET` = (trouvez-le dans Settings → API → JWT Secret)

### Déployer les Edge Functions

```powershell
# Installer Supabase CLI
npm install -g supabase

# Se connecter
supabase login

# Lier au projet
supabase link --project-ref qvyrpzgxsppkwfvqvgcn

# Déployer les fonctions
supabase functions deploy check-card
supabase functions deploy activate-card
supabase functions deploy login-card
supabase functions deploy server
```

---

## ✅ POST-DÉPLOIEMENT

### 1. Exécuter la migration

Une fois le site déployé, ouvrez la console du navigateur sur votre site Vercel et exécutez :

```javascript
runMigration()
```

### 2. Générer les codes QR

```powershell
# Option A : Via script
npx ts-node src/scripts/generate-card-codes.ts

# Option B : Via Supabase SQL Editor
# Copiez le SQL généré et exécutez-le dans Supabase
```

---

## 🎯 URLS IMPORTANTES

- **Vercel Dashboard** : https://vercel.com/dashboard
- **Supabase Dashboard** : https://supabase.com/dashboard/project/qvyrpzgxsppkwfvqvgcn
- **GitHub Repo** : https://github.com/echofield/arch-

---

**🚀 Votre projet sera déployé en quelques minutes !**

