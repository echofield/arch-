# 📊 STATUT DU DÉPLOIEMENT ARCHÉ

## ✅ CE QUI EST FAIT

1. ✅ **Dépendances installées** : `npm install` réussi
2. ✅ **Build testé** : `npm run build` réussi (dossier `dist/` créé)
3. ✅ **Vercel CLI installé** : Version 50.1.6
4. ✅ **Connecté à Vercel** : Compte `echofield`
5. ✅ **Configuration Vercel** : `vercel.json` créé à la racine
6. ✅ **Vite config corrigé** : Output directory = `dist`

## 🔄 EN COURS / À FAIRE

### 1. Push sur GitHub (NÉCESSAIRE)

**Problème** : Git est initialisé dans le mauvais répertoire à cause d'un problème d'encodage avec le caractère "é" dans "archée1".

**Solution** : Exécutez ces commandes dans **Git Bash** (pas PowerShell) :

```bash
cd /c/Users/echof/Desktop/archée1
git init
git add .
git commit -m "Initial commit - Ready for Vercel deployment"
git remote add origin https://github.com/echofield/arch-.git
git branch -M main
git push -u origin main
```

**OU** utilisez **GitHub Desktop** pour pousser le code.

### 2. Déployer sur Vercel

**Option A : Via l'interface web (RECOMMANDÉ)**
1. Aller sur https://vercel.com/dashboard
2. Cliquer "Add New Project"
3. Importer `echofield/arch-` depuis GitHub
4. Vercel détectera automatiquement Vite
5. Ajouter les variables d'environnement (voir ci-dessous)
6. Cliquer "Deploy"

**Option B : Via CLI** (une fois le code sur GitHub)
```bash
vercel --prod
```

### 3. Variables d'environnement Vercel

Dans **Vercel Dashboard → Settings → Environment Variables** :

| Variable | Valeur |
|----------|--------|
| `VITE_SUPABASE_URL` | `https://qvyrpzgxsppkwfvqvgcn.supabase.co` |
| `VITE_SUPABASE_ANON_KEY` | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF2eXJwemd4c3Bwa3dmdnF2Z2NuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE4NTc0MDIsImV4cCI6MjA3NzQzMzQwMn0.mYqlWWtonfV2etTLLsMQ0eXP805vpqC3nTZ6Pwy4on0` |

### 4. Configuration Supabase Edge Functions

**Dans Supabase Dashboard** : https://supabase.com/dashboard/project/qvyrpzgxsppkwfvqvgcn

**Settings → Edge Functions → Secrets** :
- `SUPABASE_URL` = `https://qvyrpzgxsppkwfvqvgcn.supabase.co`
- `SUPABASE_SERVICE_ROLE_KEY` = (trouvez dans Settings → API → service_role key)
- `JWT_SECRET` = (trouvez dans Settings → API → JWT Secret)

**Déployer les fonctions** :
```bash
npm install -g supabase
supabase login
supabase link --project-ref qvyrpzgxsppkwfvqvgcn
supabase functions deploy check-card
supabase functions deploy activate-card
supabase functions deploy login-card
supabase functions deploy server
```

### 5. Post-déploiement

1. **Migration** : Ouvrir la console du navigateur sur votre site Vercel et exécuter `runMigration()`
2. **Codes QR** : `npx ts-node src/scripts/generate-card-codes.ts`

---

## 📝 INFORMATIONS SUPABASE

- **Project ID** : `qvyrpzgxsppkwfvqvgcn`
- **URL** : `https://qvyrpzgxsppkwfvqvgcn.supabase.co`
- **Anon Key** : Déjà dans `src/utils/supabase/info.tsx`

**Edge Functions à déployer** :
- `check-card` : Vérifie le statut d'une carte
- `activate-card` : Active une nouvelle carte
- `login-card` : Authentifie avec une carte
- `server` : API principale (migration, etc.)

---

## 🎯 PROCHAINES ÉTAPES IMMÉDIATES

1. **Push sur GitHub** (utilisez Git Bash pour éviter les problèmes d'encodage)
2. **Déployer sur Vercel** (via interface web ou CLI)
3. **Configurer les variables d'environnement** dans Vercel
4. **Configurer Supabase Edge Functions** (secrets + déploiement)
5. **Exécuter la migration** après le déploiement

---

## 📚 FICHIERS CRÉÉS

- `DEPLOYMENT_GUIDE.md` : Guide complet de déploiement
- `DEPLOY_NOW.md` : Instructions rapides
- `QUICK_DEPLOY.txt` : Commandes à copier-coller
- `deploy.ps1` : Script PowerShell de déploiement
- `vercel.json` : Configuration Vercel
- `.gitignore` : Fichiers à ignorer

---

**🚀 Votre projet est prêt à être déployé !**

