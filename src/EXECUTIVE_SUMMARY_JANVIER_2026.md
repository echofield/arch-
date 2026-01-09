# PETIT SOUVENIR — CityNodes Paris
## Executive Summary — Janvier 2026

---

## 🎯 CONCEPT PRINCIPAL

**Une plateforme de découverte parisienne haut de gamme qui est un objet éditorial numérique imprimable, PAS une app.**

- **Identité visuelle** : Luxe éditorial (Cormorant Garamond, fond parchemin #FAF8F2, vert profond #003D2C)
- **Principe absolu** : Chaque écran doit être imprimable comme une page de magazine de luxe
- **Modèle économique** : Cartes physiques premium avec QR code → accès vault privé sécurisé

---

## ✅ ÉTAT ACTUEL (100% FONCTIONNEL)

### Architecture Technique
```
Frontend (React/Tailwind) 
    ↓ Accès DIRECT
Supabase Database (RLS désactivé temporairement)
    ├─ activation_codes (codes d'activation)
    └─ journal_entries (souvenirs du Carnet)
```

**⚠️ IMPORTANT** : Les Edge Functions ont été contournées. Actuellement tout passe en direct via le client Supabase singleton (`/utils/supabase/client.ts`).

### Codes d'Activation Test Disponibles
```
ARCHE-6C3F-2E9D
ARCHE-TEST-DEMO
ARCHE-DEMO-2024
```
Tous avec mot de passe : `test123`

### Tables Supabase Actives
1. **`activation_codes`**
   - Colonnes : `code`, `vault_id`, `is_activated`, `activated_at`, `password_hash`
   - Gère l'activation unique des cartes

2. **`journal_entries`**
   - Colonnes : `id`, `vault_id`, `content`, `place_id`, `created_at`, `updated_at`
   - Stocke les souvenirs du Carnet Parisien

---

## 🗺️ FLOW COMPLET DE L'APPLICATION

### 1️⃣ **Porte d'Entrée : Activation**
```
Scan QR Code (sur carte physique)
    ↓
Page d'Activation
    ├─ Input : Code unique (ARCHE-XXXX-XXXX)
    └─ Input : Mot de passe personnel (choisi par utilisateur)
    ↓
Vérification + Création vault_token
    ↓
Stockage localStorage : vault_token + vault_id
    ↓
Redirection → Homepage
```

**Fichier** : `/components/ActivationPage.tsx`

---

### 2️⃣ **Homepage : Monument d'Entrée**
Le portail principal avec 4 grandes portes :

```
┌─────────────────────────────────────┐
│     PETIT SOUVENIR — CityNodes      │
│                                     │
│  ┌──────────┐  ┌──────────┐        │
│  │ ORIGINE  │  │ QUÊTES   │        │
│  └──────────┘  └──────────┘        │
│                                     │
│  ┌──────────┐  ┌──────────┐        │
│  │ HISTOIRE │  │ CARNET   │        │
│  └──────────┘  └──────────┘        │
└─────────────────────────────────────┘
```

**Fichier** : `/components/HomepageV1.tsx`

---

### 3️⃣ **Page Origine : Carte Interactive**
- Révélation progressive de la philosophie ARCHÉ
- Carte de Paris avec points d'intérêt
- Design éditorial avec grilles géométriques

**Fichier** : `/components/OrigineMap.tsx`

---

### 4️⃣ **Page Quêtes : 3 Portes Temporelles**

```
┌─────────────────────────────────────┐
│           LES QUÊTES                │
│                                     │
│  ┌─────────────────────┐            │
│  │  🏛️ LUTÈCE          │            │
│  │  Paris Antique      │            │
│  └─────────────────────┘            │
│                                     │
│  ┌─────────────────────┐            │
│  │  🔥 1789            │            │
│  │  Révolution         │            │
│  └─────────────────────┘            │
│                                     │
│  ┌─────────────────────┐            │
│  │  🍷 À TABLE         │            │
│  │  Gastronomie        │            │
│  └─────────────────────┘            │
└─────────────────────────────────────┘
```

Chaque quête contient plusieurs lieux à découvrir.

**Fichiers** : 
- `/components/QuetesV1.tsx` (liste)
- `/components/QueteDetail.tsx` (détail d'une quête)
- `/data/quests-enriched.ts` (contenu éditorial)

---

### 5️⃣ **Page Histoire : Archives Éditoriales**
- Timeline historique de Paris
- Narrations quotidiennes
- Design type magazine historique

**Fichier** : `/components/HistoireArchives.tsx`

---

### 6️⃣ **Carnet Parisien : Journal Intime Privé** ⭐

```
┌──────────────────────────────────────┐
│  📖 CARNET PARISIEN                  │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  │ ← Lignes de cahier
│                                      │
│  [Ajouter un Souvenir]               │
│                                      │
│  Lieu...                             │
│  ──────────────────────                │
│                                      │
│  Écrire un souvenir...               │
│  ___________________________________  │
│  ___________________________________  │
│  ___________________________________  │
│                                      │
│  → Conserver                         │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  │
│                                      │
│  9 JANVIER 2026                      │
│  La vie est belle                    │
│  ___________________________________  │
│                                      │
└──────────────────────────────────────┘
```

**FONCTIONNALITÉS ACTUELLES** :
- ✅ Chargement des souvenirs depuis Supabase
- ✅ Ajout de nouveaux souvenirs (optimistic UI)
- ✅ Sauvegarde en temps réel dans `journal_entries`
- ✅ Design cahier avec lignes + marge rouge
- ✅ Export PDF via `window.print()`
- ✅ Zone de saisie permanente (comme un vrai cahier)

**Fichier** : `/components/CarnetParisien.tsx`

---

## 🎨 DESIGN SYSTEM

### Couleurs
```css
--cream: #FAF8F2        /* Fond parchemin principal */
--notebook: #F5F3ED     /* Fond carnet légèrement plus foncé */
--green: #003D2C        /* Vert profond ARCHÉ */
--black: #1A1A1A        /* Texte principal */
--lines: #D4CFC5        /* Lignes de cahier */
--margin: #E8A5A5       /* Marge rouge du carnet */
```

### Typographie
```css
--font-serif: 'Cormorant Garamond'  /* Titres, texte éditorial */
--font-sans: 'Inter'                /* Labels, UI */
```

### Grilles Géométriques
- **MamlukGrid** : Patterns géométriques islamiques (star8, hexagon, etc.)
- **GeometricBackground** : Grilles subtiles pour fond
- Opacité très faible (0.015 - 0.03) pour effet fantôme

---

## 🔐 SYSTÈME DE SÉCURITÉ (VAULT)

### Principe
1. Carte physique vendue avec :
   - **Code d'activation** unique (ARCHE-XXXX-XXXX)
   - Imprimé sur la carte
   
2. Premier accès :
   - Utilisateur scanne QR → page activation
   - Entre le code + choisit son mot de passe personnel
   - Code devient "activé" et ne peut plus être réutilisé
   
3. Accès ultérieurs :
   - Entre le même code + son mot de passe
   - Récupère son vault_token
   - Accède à SON carnet privé

### Fichiers Clés
```
/components/ActivationPage.tsx      → UI d'activation
/utils/supabase/client.ts           → Client Supabase singleton
/supabase/migrations/*.sql          → Schéma database
```

---

## 📂 STRUCTURE FICHIERS IMPORTANTES

```
/App.tsx                            → Router principal + auth check
/components/
  ├─ ActivationPage.tsx            → Porte d'entrée (activation/login)
  ├─ HomepageV1.tsx                → Monument d'accueil
  ├─ OrigineMap.tsx                → Philosophie ARCHÉ
  ├─ QuetesV1.tsx                  → Liste des 3 quêtes
  ├─ QueteDetail.tsx               → Détail d'une quête
  ├─ HistoireArchives.tsx          → Timeline historique
  └─ CarnetParisien.tsx            → Journal intime ⭐
  
/data/
  ├─ quests-enriched.ts            → Contenu des quêtes
  ├─ lieux-paris.ts                → Database de lieux parisiens
  └─ histoire-quotidienne.ts       → Narrations historiques
  
/utils/
  ├─ supabase/client.ts            → Client Supabase
  └─ codex-helpers.ts              → Utilitaires (dates, etc.)
```

---

## 🚀 CE QUI EST POSSIBLE MAINTENANT

### ✅ Totalement Fonctionnel
1. **Activation de carte** avec code unique + password
2. **Navigation complète** entre les 6 écrans
3. **Chargement** du Carnet Parisien depuis database
4. **Ajout de souvenirs** avec sauvegarde Supabase
5. **Export PDF** de n'importe quelle page
6. **Design éditorial** cohérent sur tous les écrans

### 🎯 Prêt à Tester
- Ajouter plusieurs souvenirs dans le Carnet
- Tester persistance : logout → login → retrouver souvenirs
- Activer plusieurs cartes avec des vault différents
- Imprimer le Carnet en PDF

### 🔧 Améliorations Possibles

#### 1. **Carnet Parisien**
- [ ] Édition de souvenirs existants
- [ ] Suppression de souvenirs
- [ ] Filtrage par lieu
- [ ] Recherche dans les souvenirs
- [ ] Tags/catégories personnalisés
- [ ] Photos/images dans les souvenirs
- [ ] Mise en page PDF customisée

#### 2. **Quêtes**
- [ ] Tracking de progression (quêtes visitées)
- [ ] Favoris/bookmarks
- [ ] Notes personnelles sur les lieux
- [ ] Intégration Google Maps directions
- [ ] Réalité augmentée (scan lieux réels)

#### 3. **Système Vault**
- [ ] Réactiver Edge Functions pour sécurité production
- [ ] Activer Row Level Security (RLS)
- [ ] Partage sécurisé de carnet (lecture seule)
- [ ] Backup/export complet du vault
- [ ] Changement de mot de passe

#### 4. **Expérience Utilisateur**
- [ ] Onboarding interactif après activation
- [ ] Tutoriel guidé des 6 écrans
- [ ] Animations de transition entre pages
- [ ] Mode hors ligne (PWA)
- [ ] Dark mode pour lecture de nuit

#### 5. **Contenu Éditorial**
- [ ] Plus de quêtes (actuellement 3)
- [ ] Narrations audio des lieux
- [ ] Vidéos historiques courtes
- [ ] Cartes anciennes superposées
- [ ] Interviews de Parisiens

---

## 🐛 POINTS D'ATTENTION

### Architecture Temporaire
⚠️ **Actuellement** : Accès direct frontend → Supabase sans RLS  
✅ **Production** : Il faudra réactiver les Edge Functions + RLS

### Sécurité
- Mots de passe hashés (bcrypt) côté activation
- Tokens stockés en localStorage (temporaire)
- En production : utiliser httpOnly cookies + sessions

### Performance
- Les souvenirs se chargent tous d'un coup (OK pour prototypage)
- Pour scale : pagination + lazy loading
- Images : pas encore implémenté dans le Carnet

---

## 📊 MÉTRIQUES DE SUCCÈS

### Version Prototype (Actuelle)
- [x] 6 écrans fonctionnels
- [x] Flow complet Homepage → Quêtes → Détail
- [x] Système d'activation opérationnel
- [x] Carnet chargement + sauvegarde
- [x] Design éditorial cohérent

### Version MVP (Prochaine)
- [ ] 100 cartes physiques produites
- [ ] 10 utilisateurs beta test
- [ ] Edge Functions sécurisées
- [ ] Export PDF parfait
- [ ] 20+ lieux par quête

### Version Production
- [ ] 1000+ cartes vendues
- [ ] 50+ quêtes
- [ ] App mobile native (optionnel)
- [ ] Marketplace de cartes collector
- [ ] API publique pour partenaires

---

## 🎬 POUR DÉMARRER (Autre IA / Nouveau Dev)

### 1. Context Essentiel
```
Ce n'est PAS une app mobile.
C'est un objet éditorial numérique imprimable.
Chaque pixel doit respirer le luxe éditorial parisien.
```

### 2. Tester l'App
```bash
1. Ouvrir l'app
2. Entrer code : ARCHE-TEST-DEMO
3. Mot de passe : test123
4. Explorer les 6 écrans
5. Ajouter un souvenir dans le Carnet
```

### 3. Tables Supabase à Connaître
```sql
activation_codes    → Gère les cartes physiques
journal_entries     → Stocke les souvenirs du Carnet
```

### 4. Fichiers à NE JAMAIS Modifier
```
/utils/supabase/info.tsx                    → Config Supabase auto-générée
/components/figma/ImageWithFallback.tsx     → Système images
/supabase/functions/server/kv_store.tsx     → Protected
```

---

## 💡 VISION LONG TERME

**PETIT SOUVENIR n'est pas Airbnb Experiences.**  
C'est un **objet de collection physique + numérique** qui donne accès à une **archive intime personnelle de Paris**.

La carte physique est le **titre de propriété**.  
Le Carnet Parisien est le **coffre-fort personnel**.  
Les Quêtes sont les **clés d'accès à la mémoire de Paris**.

---

## 📞 QUESTIONS À SE POSER

1. **Contenu** : Faut-il enrichir les quêtes existantes ou en créer de nouvelles ?
2. **Carnet** : Quelles fonctionnalités manquent le plus (édition, photos, tags) ?
3. **Sécurité** : Quand passer en production avec Edge Functions ?
4. **Business** : Comment produire les premières cartes physiques ?
5. **Design** : Le Carnet est-il assez "imprimable" ?

---

**STATUT ACTUEL : Prototype V1 Fonctionnel ✅**  
**PRÊT POUR : Beta testing, production de cartes physiques, enrichissement contenu**  
**BLOQUANT : Rien. Tout fonctionne.**

---

*Document généré le 9 janvier 2026*  
*Version courante accessible à : [votre URL Figma Make]*
