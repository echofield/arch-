# 🎫 SYSTÈME DE CARTES ARCHÉ — INSTALLATION RAPIDE

## ⚡ SETUP EN 5 MINUTES

### 1. Créer les tables Supabase

```sql
-- Copier le contenu de SUPABASE_SETUP.sql
-- Exécuter dans Supabase SQL Editor
```

### 2. Générer et insérer 50 codes

```bash
# Générer les codes
npx ts-node scripts/generate-card-codes.ts

# Copier le SQL affiché
# Exécuter dans Supabase SQL Editor
```

### 3. Configurer les variables d'environnement

```bash
# Créer .env
cp .env.example .env

# Remplir avec vos valeurs Supabase
VITE_SUPABASE_PROJECT_ID=your-project-id
VITE_SUPABASE_ANON_KEY=your-anon-key
```

### 4. Déployer les Edge Functions

```bash
# Installer Supabase CLI
brew install supabase/tap/supabase

# Login
supabase login

# Déployer
supabase functions deploy check-card
supabase functions deploy activate-card
supabase functions deploy login-card
```

### 5. Tester

```
http://localhost:5173/c/X7K9P2
```

---

## 📚 DOCUMENTATION COMPLÈTE

- **Setup détaillé** : `CARD_SYSTEM_SETUP.md`
- **Flow Quiz/Results** : `FLOW_INTENTION_TO_RESULTS.md`
- **Nettoyage récent** : `CLEANUP_RECAP.md`

---

## 🏗️ ARCHITECTURE

```
Carte physique (QR code)
    ↓
arche.paris/c/X7K9P2
    ↓
CardGate (détection statut)
    ↓
├─ Carte vierge → CardActivation → Créer mot de passe
└─ Carte activée → CardLogin → Vérifier mot de passe
    ↓
Session localStorage
    ↓
Intention → Quiz → Results
```

---

## 🔐 SÉCURITÉ

- ✅ Hash bcrypt côté serveur
- ✅ RLS policies (password_hash jamais exposé)
- ✅ Anti-bruteforce (5 tentatives → lock 15 min)
- ✅ Mot de passe oublié = carte perdue (cohérent avec l'objet)

---

## 🎨 DESIGN

Minimaliste, cohérent avec la DA existante :
- Fond parchemin #FAF8F2
- Typo Cormorant Garamond
- Accent vert #003D2C
- Ghost Grid (opacity 3%)

---

## ✅ CHECKLIST

- [ ] Tables Supabase créées
- [ ] 50 codes insérés
- [ ] `.env` configuré
- [ ] Edge Functions déployées
- [ ] Test activation OK
- [ ] Test login OK
- [ ] Test anti-bruteforce OK

---

**Prêt à imprimer les cartes ! 🏛✨**
