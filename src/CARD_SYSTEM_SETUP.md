# 🎫 ARCHÉ — SYSTÈME DE CARTES SANS EMAIL

## 📋 RÉCAPITULATIF

**Implémentation complète d'un système d'authentification par carte physique sans email.**

### Philosophie
- ✅ **Carte = identité** (pas de compte utilisateur)
- ✅ **Code unique imprimé** = point d'entrée
- ✅ **Mot de passe** = protection
- ✅ **Zéro email** = zéro surveillance
- ✅ **Mot de passe oublié = carte perdue** (cohérence objet)

### Workflow
1. **Scan QR code** → `arche.paris/c/X7K9P2`
2. **Première fois** → Activation (création mot de passe)
3. **Fois suivantes** → Login (vérification mot de passe)
4. **Anti-bruteforce** → 5 tentatives max, lock 15 min

---

## 🗄️ ÉTAPE 1 : SETUP SUPABASE

### 1.1 Créer les tables

**Aller dans Supabase SQL Editor et exécuter :**

```sql
-- Copier le contenu de /SUPABASE_SETUP.sql
```

Le fichier `/SUPABASE_SETUP.sql` contient :
- Table `cards` (stockage des cartes)
- Table `card_quests` (quêtes activées par carte)
- Table `card_events` (journal silencieux)
- RLS policies (sécurité)
- Function `check_card_status` (RPC sécurisé)

### 1.2 Vérifier les tables

```sql
-- Vérifier que les tables existent
SELECT table_name FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name IN ('cards', 'card_quests', 'card_events');

-- Devrait retourner 3 lignes
```

---

## 🎲 ÉTAPE 2 : GÉNÉRER LES CODES

### 2.1 Exécuter le script

**Depuis la racine du projet :**

```bash
# Avec Node.js + ts-node
npx ts-node scripts/generate-card-codes.ts

# Avec Deno
deno run scripts/generate-card-codes.ts

# Avec Bun
bun run scripts/generate-card-codes.ts
```

### 2.2 Résultat

Le script affiche :
- ✅ Liste des 50 codes générés (ex: X7K9P2, M4H8L3, etc.)
- ✅ SQL prêt à exécuter dans Supabase
- ✅ CSV pour impression
- ✅ JSON pour backup

### 2.3 Insérer les codes dans Supabase

**Copier la section SQL du script et l'exécuter dans Supabase SQL Editor :**

```sql
INSERT INTO cards (code) VALUES
  ('X7K9P2'),
  ('M4H8L3'),
  ('R9T2N6'),
  -- ... 47 autres codes
  ('Z3P5Q8');
```

### 2.4 Vérifier l'insertion

```sql
SELECT COUNT(*) FROM cards;
-- Devrait retourner 50

SELECT code FROM cards ORDER BY code LIMIT 10;
-- Affiche les 10 premiers codes
```

---

## 🔧 ÉTAPE 3 : VARIABLES D'ENVIRONNEMENT

### 3.1 Créer le fichier `.env`

**À la racine du projet :**

```bash
cp .env.example .env
```

### 3.2 Remplir les valeurs

**Aller dans Supabase → Project Settings → API**

```env
VITE_SUPABASE_PROJECT_ID=your-project-id
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Important :**
- `VITE_SUPABASE_PROJECT_ID` = l'ID visible dans l'URL Supabase (ex: `abcdefgh`)
- `VITE_SUPABASE_ANON_KEY` = clé publique (anon/public key)

---

## 🚀 ÉTAPE 4 : DÉPLOYER LES EDGE FUNCTIONS

### 4.1 Installer Supabase CLI

```bash
# macOS
brew install supabase/tap/supabase

# Windows
scoop bucket add supabase https://github.com/supabase/scoop-bucket.git
scoop install supabase

# Linux
curl -L https://github.com/supabase/cli/releases/latest/download/supabase_linux_amd64.tar.gz | tar -xz
```

### 4.2 Login Supabase

```bash
supabase login
```

### 4.3 Déployer les 3 fonctions

```bash
# Déployer check-card
supabase functions deploy check-card

# Déployer activate-card
supabase functions deploy activate-card

# Déployer login-card
supabase functions deploy login-card
```

### 4.4 Vérifier le déploiement

**Aller dans Supabase Dashboard → Edge Functions**

Vous devriez voir :
- ✅ `check-card` (deployed)
- ✅ `activate-card` (deployed)
- ✅ `login-card` (deployed)

---

## 🧪 ÉTAPE 5 : TESTER LE SYSTÈME

### 5.1 Tester l'URL de carte

**Dans le navigateur :**

```
http://localhost:5173/c/X7K9P2
```

**Comportement attendu :**
1. Détection du code `X7K9P2`
2. Appel à `check-card` pour vérifier le statut
3. Si jamais activée → Écran **Activation**
4. Si déjà activée → Écran **Login**

### 5.2 Tester l'activation

**Sur l'écran d'activation :**
1. Entrer un mot de passe (min 4 caractères)
2. Confirmer le mot de passe
3. Cliquer "Activer ma carte"

**Vérification dans Supabase :**

```sql
SELECT id, code, activated_at, password_hash 
FROM cards 
WHERE code = 'X7K9P2';

-- password_hash devrait être rempli
-- activated_at devrait être une date
```

### 5.3 Tester le login

**Recharger la page `/c/X7K9P2` :**
1. Écran de login apparaît
2. Entrer le mot de passe correct → Connexion réussie
3. Entrer un mot de passe incorrect → Erreur + compteur

**Tester le lock :**
1. Entrer 5 fois un mauvais mot de passe
2. Carte verrouillée pour 15 minutes
3. Message affiché avec temps restant

---

## 📦 FICHIERS CRÉÉS

### Backend (Edge Functions)

```
/supabase/functions/
  ├── check-card/index.tsx       # Vérifier statut carte
  ├── activate-card/index.tsx    # Activer carte vierge
  └── login-card/index.tsx       # Login avec mot de passe
```

### Frontend (Composants)

```
/components/
  ├── CardActivation.tsx         # Écran activation
  ├── CardLogin.tsx              # Écran login
  └── CardGate.tsx               # Orchestration activation/login
```

### Configuration

```
/
├── SUPABASE_SETUP.sql           # Tables + RLS + Functions
├── .env.example                  # Template variables env
└── scripts/
    └── generate-card-codes.ts   # Générateur de codes
```

### Documentation

```
/
├── CARD_SYSTEM_SETUP.md         # Ce fichier (setup complet)
└── FLOW_INTENTION_TO_RESULTS.md # Flow quiz/résultats
```

---

## 🔐 SÉCURITÉ

### ✅ Ce qui est sécurisé

1. **Password hash côté serveur uniquement** (bcrypt)
2. **Jamais de password_hash côté client** (RLS policies)
3. **Anti-bruteforce** (5 tentatives → lock 15 min)
4. **RPC sécurisé** pour vérifier statut sans exposer données
5. **Service role uniquement pour Edge Functions**

### ⚠️ Ce qui reste à faire (v2)

1. **Backoff exponentiel** (15 min → 30 min → 1h après locks multiples)
2. **Rate limiting global** (éviter spam API)
3. **Audit log** des tentatives suspectes
4. **Alertes admin** en cas d'attaque détectée

---

## 🎨 DESIGN

**Les écrans respectent la DA existante :**
- Fond parchemin `var(--paper)` (#FAF8F2)
- Typo serif Cormorant Garamond
- Accents vert `var(--green)` (#003D2C)
- Ghost Grid en arrière-plan (opacity 3%)
- Animations subtiles (hover, transitions)

**Aucun changement visuel sur les autres écrans.**

---

## 🧭 FLOW UTILISATEUR

### Premier accès (carte vierge)

```
1. Gratter la carte physique
2. Scanner QR code → arche.paris/c/X7K9P2
3. 📱 Détection du code → CardGate (loading)
4. 📝 CardActivation apparaît :
   - "Cette carte n'a jamais été ouverte"
   - Input mot de passe + confirmation
   - "Activer ma carte"
5. ✅ Activation réussie → localStorage session
6. → Redirection vers Intention
7. → Quiz → Loading → Results
```

### Accès suivants (carte activée)

```
1. Scanner QR code → arche.paris/c/X7K9P2
2. 📱 Détection du code → CardGate (loading)
3. 🔑 CardLogin apparaît :
   - "Bon retour"
   - Input mot de passe
   - "Entrer"
4. ✅ Login réussi → localStorage session
5. → Redirection vers Intention
6. → Reprise là où il en était
```

### Mot de passe incorrect

```
1. Entrée mot de passe incorrect
2. ❌ Erreur affichée + compteur
   - "Mot de passe incorrect"
   - "4 tentatives restantes"
3. Après 5 tentatives :
   - "Carte verrouillée"
   - "Réessayez dans 15 minutes"
   - Input désactivé
   - Bouton grisé
```

---

## 🎯 CHECKLIST FINALE

### Setup Supabase

- [ ] Tables créées (`cards`, `card_quests`, `card_events`)
- [ ] RLS policies activées
- [ ] Function `check_card_status` créée
- [ ] 50 codes insérés dans `cards`

### Edge Functions

- [ ] `check-card` déployée
- [ ] `activate-card` déployée
- [ ] `login-card` déployée

### Frontend

- [ ] `.env` configuré avec PROJECT_ID + ANON_KEY
- [ ] CardGate intégré dans App.tsx
- [ ] Routing `/c/[code]` fonctionnel

### Tests

- [ ] Activation d'une carte vierge OK
- [ ] Login avec bon mot de passe OK
- [ ] Login avec mauvais mot de passe → compteur OK
- [ ] Lock après 5 tentatives → 15 min OK
- [ ] Redirection vers Intention après auth OK

---

## 🐛 DEBUGGING

### Erreur : "Code de carte invalide"

**Vérifier :**
```sql
SELECT * FROM cards WHERE code = 'X7K9P2';
-- Si aucun résultat, le code n'existe pas en base
```

### Erreur : "Carte déjà activée"

**Vérifier :**
```sql
SELECT code, activated_at, password_hash 
FROM cards 
WHERE code = 'X7K9P2';

-- Si activated_at et password_hash sont remplis, c'est normal
-- Utiliser l'écran Login, pas Activation
```

### Edge Function ne répond pas

**Vérifier les logs :**
```bash
supabase functions logs check-card
supabase functions logs activate-card
supabase functions logs login-card
```

**Tester manuellement :**
```bash
curl -X POST \
  https://your-project.supabase.co/functions/v1/make-server-9060b10a/check-card \
  -H "Authorization: Bearer YOUR_ANON_KEY" \
  -H "Content-Type: application/json" \
  -d '{"code": "X7K9P2"}'
```

### Password hash n'est pas créé

**Vérifier que bcrypt est importé :**
```typescript
// Dans activate-card/index.tsx
import * as bcrypt from "https://deno.land/x/bcrypt@v0.4.1/mod.ts";
```

---

## 📞 SUPPORT

### En cas de problème

1. **Vérifier les logs console** (F12 dans le navigateur)
2. **Vérifier les logs Supabase** (Dashboard → Logs)
3. **Vérifier les Edge Functions** (Dashboard → Edge Functions)
4. **Vérifier les RLS policies** (Dashboard → Table Editor → Policies)

### Contact

- GitHub Issues : [votre-repo]/issues
- Email : support@arche.paris (si configuré)

---

**🎉 Le système de cartes ARCHÉ est maintenant opérationnel !**

Prochaine étape : **Imprimer les 50 codes sur les cartes physiques** et les distribuer. 🏛✨
