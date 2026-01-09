# Configuration Supabase — PETIT SOUVENIR

## 🎯 Ce que Supabase apporte

### **HISTOIRE — Journal de Paris**
- Tracking discret des lectures quotidiennes
- Aucune UI visible, juste une trace silencieuse en backend
- Savoir quel jour a été consulté (pas de gamification)

### **Carnet Parisien**
- Persistence réelle des souvenirs écrits
- Multi-device : écris sur mobile, lis sur desktop
- Synchronisation automatique
- Les souvenirs ne disparaissent plus au refresh

### **Codex**
- Archive automatique des événements vécus
- Inscription factuelle, non-gamifiée
- Lecture seule (pas d'édition utilisateur)
- Traces générées par le système

---

## 📋 Tables créées

### 1. `daily_history_reads`
```sql
id          UUID
user_id     UUID
date_key    TEXT      -- Format: "MM-DD" (ex: "12-06")
read_at     TIMESTAMP
```

**Purpose** : Tracker silencieusement quand un utilisateur lit l'anecdote du jour.

### 2. `carnet_entries`
```sql
id          UUID
user_id     UUID
content     TEXT      -- Le souvenir écrit
lieu        TEXT      -- Optionnel (ex: "Montmartre")
created_at  TIMESTAMP
```

**Purpose** : Sauvegarder les souvenirs du Carnet Parisien de manière permanente.

### 3. `codex_entries`
```sql
id            UUID
user_id       UUID
date_display  TEXT      -- Ex: "6 décembre 2024"
lieu          TEXT      -- Nom du lieu (visible)
trace         TEXT      -- Phrase générée automatiquement
event_type    TEXT      -- Type d'événement (métadonnée)
quest_id      TEXT      -- ID de quête associée
source        TEXT      -- Source (scan, présence, etc.)
created_at    TIMESTAMP
```

**Purpose** : Archive automatique des événements attestés (quêtes, scans, présences).

---

## 🔐 Authentification

Le système utilise un **mode hybride** :

### Mode Local (actuel)
- Pas de signup/login
- `user_id` généré localement : `local-{uuid}`
- Stockage dans localStorage
- Fonctionne immédiatement (pas de config Supabase requise)
- Persistence entre sessions sur le même device

### Mode Supabase (optionnel)
Pour activer la sync multi-device, active **Anonymous Auth** dans Supabase :
1. Dashboard → **Authentication** → **Settings**
2. Sous "Auth Providers", active **Anonymous sign-ins**
3. L'app basculera automatiquement vers Supabase

**Avantage mode local** : Expérience transparente, zéro friction.
**Avantage mode Supabase** : Sync multi-device, backup cloud.

---

## 🚀 Configuration (optionnelle)

### Option 1 : Mode Local (actif par défaut)
✅ **Rien à faire !** L'app fonctionne avec localStorage.

### Option 2 : Mode Supabase (pour sync multi-device)

#### Étape 1 : Activer Anonymous Auth
1. Dans Supabase Dashboard → **Authentication** → **Settings**
2. Sous "Auth Providers", active **Anonymous sign-ins**
3. Save

#### Étape 2 : Exécuter les migrations
1. Va dans **SQL Editor**
2. Copie le contenu de `/supabase/migrations/20251212_histoire_carnet.sql`
3. Exécute le SQL
4. Vérifie que les 3 tables apparaissent dans **Table Editor**

---

## 🧪 Comment tester

### Test 1 : Histoire Quotidienne
1. Navigue vers "Histoire Quotidienne"
2. L'anecdote du jour s'affiche
3. En backend (invisible) : une entrée est créée dans `daily_history_reads` (localStorage ou Supabase)
4. Si tu reviens le même jour → pas de doublon

### Test 2 : Carnet Parisien
1. Navigue vers "Carnet Parisien"
2. Écris un souvenir : "La lumière dorée sur les toits de Montmartre ce soir..."
3. Lieu : "Montmartre"
4. Clique "Conserver"
5. Le souvenir s'affiche immédiatement (optimistic UI)
6. **Refresh la page** → le souvenir est toujours là ✅

### Test 3 : Codex
1. Navigue vers "Codex"
2. État vide : "Aucune inscription pour le moment."
3. Pour tester l'inscription automatique, voir `/CODEX_USAGE.md`

---

## 📊 Architecture des modules

| Module | Nature | Auteur | Stockage | Interaction |
|--------|--------|--------|----------|-------------|
| **Histoire Quotidienne** | Lecture contemplative | Système (anecdotes) | Tracking silencieux | Lecture seule |
| **Carnet Parisien** | Écriture libre | Utilisateur | localStorage/Supabase | Écrire, supprimer |
| **Codex** | Archive factuelle | Système (événements) | localStorage/Supabase | Lecture seule |

**Phrase clé** :
> Le Carnet accueille ce que tu écris.
> Le Codex conserve ce qui a eu lieu.

---

## 🧘 Philosophie : Trace silencieuse

### Ce que tu **NE VERRAS PAS** dans l'UI :

❌ "Vous avez lu 5 histoires cette semaine"
❌ Badges de progression
❌ Streaks
❌ Notifications "Revenez demain !"
❌ Compteurs visibles
❌ Leaderboards

### Ce qui se passe réellement :

✅ Les lectures sont trackées (pour analytics futures)
✅ Les souvenirs persistent (pour l'utilisateur)
✅ Les événements sont archivés (pour le Codex)
✅ La synchronisation est automatique (invisible)
✅ L'expérience reste contemplative

**Supabase = mémoire, pas moteur de gamification**

---

## 🔮 Évolutions futures possibles

### Court terme
- Ajouter une fonction "Exporter mon Carnet en PDF"
- Filtrer les souvenirs par lieu
- Recherche dans le Carnet

### Moyen terme
- Magic Link auth pour vraie sync multi-device
- Partager un souvenir spécifique (lien)
- Backup automatique

### Long terme
- API pour générer du contenu narratif avec AI
- Intégration avec les Quêtes (compléter une quête → inscription auto dans Codex)
- Archives mensuelles ("Décembre 2025")

---

## ⚠️ Sécurité & Privacy

### Mode Local
- Données stockées uniquement dans le navigateur
- Aucune transmission réseau
- Privacy maximale

### Mode Supabase (si activé)
- Row Level Security (RLS) activé
- Un utilisateur ne voit que SES données
- Impossible de lire les souvenirs des autres

### Données collectées
- `user_id` : UUID anonyme (local ou Supabase)
- `content` : Le texte du souvenir (privé)
- `lieu` : Optionnel
- `date_key` : Jour de lecture (ex: "12-12")

**Pas de PII** (Personally Identifiable Information) :
- Pas d'email
- Pas de nom
- Pas de géolocalisation précise
- Pas de tracking publicitaire

---

## 🐛 Debugging

### Si les souvenirs ne s'affichent pas :
1. Ouvre la console navigateur (F12)
2. Vérifie localStorage : `localStorage.getItem('carnet-entries')`
3. Check si un `user_id` local existe : `localStorage.getItem('petit-souvenir-user-id')`

### Si le Codex reste vide :
1. Voir `/CODEX_USAGE.md` pour activer les inscriptions automatiques
2. Vérifier localStorage : `localStorage.getItem('codex-entries')`
3. Les inscriptions sont manuelles pour l'instant (pas de quêtes complétées automatiquement)

---

## 📖 Résumé

**Mode actuel (localStorage)** :
- ✅ Fonctionne immédiatement
- ✅ Persistence locale
- ✅ Pas de config requise
- ✅ Privacy maximale

**Mode Supabase (optionnel)** :
- ✅ Sync multi-device
- ✅ Backup cloud
- ✅ Évolutif

**Philosophie** :
> Ce produit n'essaie pas de retenir l'utilisateur.
> Il accepte qu'il revienne quand le temps est juste.

Supabase n'est pas là pour gamifier, mais pour **laisser une trace silencieuse**.