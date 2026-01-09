# ARCHÉ V1 — SPEC UX SIMPLE
## "Scanne ta carte. Tape ta clé. Ton Paris s'ouvre."

---

## 🎯 PRINCIPE

**Une seule règle mentale pour l'utilisateur :**
1. Je scanne (QR sur la carte physique)
2. Je tape ma clé (mot de passe personnel)
3. J'entre (accès immédiat au Carnet)

**Zéro concept à comprendre :** pas de "compte", "activation", "login", "session".

---

## 📱 ÉCRAN UNIQUE : "OUVRIR MON ARCHÉ"

### URL
```
/open?c=ARCHE-LUT-2847
```

Le QR sur la carte physique encode directement cette URL.  
**L'utilisateur ne tape jamais le code.**

---

### DESIGN DE L'ÉCRAN

```
┌────────────────────────────────────────┐
│                                        │
│                                        │
│         PETIT SOUVENIR                 │
│         ──────────────                 │
│                                        │
│         Ouvrir mon ARCHÉ               │  ← Titre principal
│                                        │
│                                        │
│         Carte : LUT-2847               │  ← Optionnel, en petit
│                                        │
│                                        │
│   ┌──────────────────────────────┐    │
│   │ Clé                          │    │  ← Champ mot de passe
│   └──────────────────────────────┘    │
│                                        │
│         [Entrer]                       │  ← Bouton principal
│                                        │
│                                        │
│   Gardez cette clé.                    │  ← Avertissement discret
│   Sans elle, votre Carnet est          │
│   inaccessible.                        │
│                                        │
└────────────────────────────────────────┘
```

---

### COPY EXACT

#### Titre
```
Ouvrir mon ARCHÉ
```

#### Label du champ
```
Clé
```
Type : `password`  
Placeholder : `Votre clé personnelle`

#### Bouton
```
Entrer
```

#### Avertissement (sous le champ)
```
Gardez cette clé. Sans elle, votre Carnet est inaccessible.
```

Style : Police serif italique, taille 13px, opacité 0.5

---

### ÉTATS DE L'ÉCRAN

#### 1. État Initial
- Champ vide
- Bouton actif mais neutre
- Avertissement visible

#### 2. État Saisie
- Utilisateur tape sa clé
- Bouton s'active visuellement (opacité 1)

#### 3. État Loading
- Utilisateur a cliqué "Entrer"
- Bouton affiche "Ouverture..." ou spinner subtil
- Champ désactivé

#### 4. État Erreur
```
Impossible d'ouvrir. Vérifiez votre clé.
```
- Message d'erreur en rouge discret sous le bouton
- Champ reste rempli (l'utilisateur peut corriger)
- Bouton redevient actif

#### 5. État Succès
- Transition immédiate vers l'app
- Aucun message de confirmation (l'app qui s'ouvre EST la confirmation)

---

## 🔄 TROIS SCÉNARIOS, UN SEUL ÉCRAN

### Scénario 1 : Première utilisation
```
1. Utilisateur scanne QR → /open?c=ARCHE-LUT-2847
2. Choisit une clé → tape "monparis2026"
3. Clique "Entrer"
4. Backend crée le vault + génère token
5. Redirect → /app (Homepage)
```

### Scénario 2 : Retour plus tard (token expiré)
```
1. Utilisateur scanne QR → /open?c=ARCHE-LUT-2847
2. Retape la même clé → "monparis2026"
3. Clique "Entrer"
4. Backend vérifie + régénère token
5. Redirect → /app (Homepage)
```

### Scénario 3 : Nouveau téléphone
```
1. Utilisateur scanne QR → /open?c=ARCHE-LUT-2847
2. Retape la même clé → "monparis2026"
3. Clique "Entrer"
4. Backend vérifie + génère nouveau token
5. Redirect → /app (Homepage avec tous ses souvenirs)
```

**L'utilisateur n'a jamais besoin de comprendre la différence entre ces scénarios.**

---

## 🔐 LOGIQUE BACKEND (3 ENDPOINTS)

### 1. `POST /unlock`

#### Input
```json
{
  "code": "ARCHE-LUT-2847",
  "password": "monparis2026"
}
```

#### Output (succès)
```json
{
  "token": "eyJ...",
  "vault_id": "550e8400-e29b-41d4-a716-446655440000"
}
```

#### Output (erreur)
```json
{
  "error": "Impossible d'ouvrir. Vérifiez votre clé."
}
```

#### Logique
```
SI code n'existe pas dans activation_codes
  → ERREUR "Code invalide"

SI code existe ET is_activated = false
  → PREMIÈRE ACTIVATION
  → Créer password_hash = bcrypt(password)
  → Générer vault_id unique
  → Marquer is_activated = true
  → Retourner token

SI code existe ET is_activated = true
  → LOGIN
  → Vérifier bcrypt.compare(password, password_hash)
  → SI match → retourner token
  → SI pas match → ERREUR "Clé incorrecte"
```

---

### 2. `GET /entries`

#### Headers
```
Authorization: Bearer {token}
```

#### Output
```json
{
  "entries": [
    {
      "id": "uuid",
      "content": "La vie est belle",
      "place_id": "Montmartre",
      "created_at": "2026-01-09T14:30:00Z"
    }
  ]
}
```

---

### 3. `POST /entries`

#### Headers
```
Authorization: Bearer {token}
```

#### Input
```json
{
  "content": "Café au Procope",
  "place_id": "Saint-Germain"
}
```

#### Output
```json
{
  "entry": {
    "id": "uuid",
    "content": "Café au Procope",
    "place_id": "Saint-Germain",
    "created_at": "2026-01-09T16:45:00Z"
  }
}
```

---

## 💾 STOCKAGE LOCAL (Frontend)

### localStorage
```javascript
{
  "vault_token": "eyJ...",
  "vault_id": "550e8400-e29b-41d4-a716-446655440000"
}
```

### Logique de routing
```
AU DÉMARRAGE DE L'APP :

SI vault_token existe
  → Vérifier validité (optionnel, ou lazy)
  → Aller direct à /app

SI vault_token n'existe pas
  → Regarder params URL
  
  SI ?c=ARCHE-XXX présent
    → Afficher écran "Ouvrir mon ARCHÉ"
  
  SINON
    → Afficher page "Scannez votre carte QR"
```

---

## 📋 COPY DES MESSAGES D'ERREUR

### Code invalide
```
Cette carte n'existe pas.
```
(rare, normalement impossible si QR vient d'une vraie carte)

### Clé incorrecte
```
Impossible d'ouvrir. Vérifiez votre clé.
```

### Erreur réseau
```
Connexion impossible. Réessayez.
```

### Token expiré (si détecté côté app)
```
Votre session a expiré. Rouvrez votre carte.
```
→ Puis redirect vers `/open?c={code}`

---

## 🚫 CE QUI DISPARAÎT

### ❌ Écran "Activation" séparé
Il n'y a plus de distinction activation/login.

### ❌ Champ pour entrer le code manuellement
Le QR fait ce travail.

### ❌ Email, compte, reset password
Pas de compte = pas de reset.  
Si l'utilisateur perd sa clé, il perd son vault. Point.  
(C'est assumé, comme une clé physique.)

### ❌ Écran de confirmation "Carte activée !"
L'accès direct à l'app EST la confirmation.

### ❌ Multi-cartes en V1
Une carte = un ARCHÉ = un vault.  
Pas de sélecteur de parcours.

---

## ✅ CE QUI RESTE

### Export du Carnet
**Localisation :** Bouton dans l'app (pas sur l'écran "Ouvrir")

**Position suggérée :** 
- Dans le Carnet Parisien, en haut à droite à côté de "Exporter PDF"
- Label : "Sauvegarder" ou "Exporter mes souvenirs"

**Format V1 :** JSON téléchargeable
```json
{
  "card": "ARCHE-LUT-2847",
  "exported_at": "2026-01-09T18:00:00Z",
  "entries": [...]
}
```

**Note utilisateur (dans l'app) :**
```
Sauvegardez régulièrement vos souvenirs.  
Ce fichier vous permet de les réimporter si nécessaire.
```

---

## 🎨 DESIGN GUIDELINES (Écran "Ouvrir")

### Palette
- Fond : `#FAF8F2` (parchemin crème)
- Texte : `#1A1A1A` (noir profond)
- Accent : `#003D2C` (vert ARCHÉ)
- Erreur : `#8B0000` (rouge discret)

### Typographie
- Titre "Ouvrir mon ARCHÉ" : Cormorant Garamond, 38px, regular
- "Carte : XXX" : Inter, 11px, uppercase, letterspacing 0.06em, opacity 0.4
- Label "Clé" : Inter, 10px, uppercase, letterspacing 0.08em
- Avertissement : Cormorant Garamond, 13px, italic, opacity 0.5

### Champ Input
```css
{
  background: transparent;
  border: none;
  border-bottom: 1px solid rgba(0, 61, 44, 0.2);
  padding: 12px 0;
  font-family: 'Cormorant Garamond';
  font-size: 18px;
  color: #1A1A1A;
}

/* Focus */
input:focus {
  border-bottom-color: #003D2C;
  outline: none;
}
```

### Bouton
```css
{
  background: transparent;
  border: 1px solid #003D2C;
  padding: 14px 32px;
  font-family: Inter;
  font-size: 11px;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: #003D2C;
  cursor: pointer;
  transition: all 0.3s;
  opacity: 0.6;
}

/* Hover */
button:hover {
  background: #003D2C;
  color: #FAF8F2;
  opacity: 1;
}

/* Loading */
button:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}
```

### Grille fantôme
- MamlukGrid subtile en arrière-plan
- Pattern : `star8`
- Opacity : `0.015`
- Rotation : `45deg`

---

## 🔒 CONTRAT DE SÉCURITÉ (3 lignes)

1. **Pas de clé = pas d'accès**  
   Si l'utilisateur perd sa clé, il perd son vault. Pas de recovery.

2. **Bcrypt côté serveur**  
   La clé est hashée (bcrypt rounds 10) avant stockage dans `activation_codes.password_hash`.

3. **Token JWT éphémère**  
   Le token expire après 7 jours. L'utilisateur doit rescanner + retaper sa clé.

**Pas de chiffrement E2E en V1.**  
Le contenu du carnet est en clair dans Supabase.  
(Assumé pour prototypage. Chiffrement E2E = V2 si besoin.)

---

## 📊 TABLES SUPABASE

### `activation_codes`
```sql
CREATE TABLE activation_codes (
  code TEXT PRIMARY KEY,              -- ARCHE-LUT-2847
  vault_id UUID,                      -- Généré à la première activation
  password_hash TEXT,                 -- bcrypt du mot de passe utilisateur
  is_activated BOOLEAN DEFAULT false, -- true après première utilisation
  activated_at TIMESTAMP,             -- Date première activation
  created_at TIMESTAMP DEFAULT NOW()
);
```

### `journal_entries`
```sql
CREATE TABLE journal_entries (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  vault_id UUID NOT NULL,
  content TEXT NOT NULL,
  place_id TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

Pas besoin d'autres tables en V1.

---

## 🎬 CHECKLIST IMPLÉMENTATION

### Frontend
- [ ] Page `/open` avec extraction du param `?c=`
- [ ] Champ "Clé" (type password)
- [ ] Bouton "Entrer" avec états (normal, loading, error)
- [ ] Gestion erreurs avec copy exact
- [ ] Stockage token + vault_id dans localStorage
- [ ] Redirect automatique vers `/app` après succès
- [ ] Design selon guidelines (palette, typo, grille)

### Backend
- [ ] Endpoint `POST /unlock` avec logique activation/login unifiée
- [ ] Bcrypt pour hasher les mots de passe
- [ ] JWT pour générer les tokens (expiration 7j)
- [ ] Endpoint `GET /entries` avec auth token
- [ ] Endpoint `POST /entries` avec auth token
- [ ] (Optionnel) Endpoint `GET /export` pour JSON

### Sécurité
- [ ] Rate limiting sur `/unlock` (5 tentatives / minute / IP)
- [ ] HTTPS obligatoire en production
- [ ] Headers CORS configurés
- [ ] Validation input (longueur clé minimum 6 caractères)

### UX
- [ ] Focus automatique sur champ "Clé" au chargement
- [ ] Enter ⏎ valide le formulaire
- [ ] Animations subtiles (transitions 300ms)
- [ ] Message d'erreur disparaît quand utilisateur retape

---

## 📱 ÉCRAN SECONDAIRE (si pas de code dans URL)

### URL
```
/
```
(Racine, si l'utilisateur arrive sans QR)

### Design
```
┌────────────────────────────────────────┐
│                                        │
│                                        │
│         PETIT SOUVENIR                 │
│         ──────────────                 │
│                                        │
│         Scannez votre carte            │
│                                        │
│                                        │
│         ┌────────────┐                 │
│         │            │                 │  ← Icône QR code
│         │   📷 QR    │                 │
│         │            │                 │
│         └────────────┘                 │
│                                        │
│                                        │
│   Utilisez le QR code au dos          │
│   de votre carte ARCHÉ.                │
│                                        │
└────────────────────────────────────────┘
```

Copy minimal, pas de lien "J'ai pas ma carte" → mort simple.

---

## 🚀 RÉSUMÉ UTILISATEUR (1 phrase)

**"Scanne ta carte. Tape ta clé. Ton Paris s'ouvre."**

---

## 📞 DÉCISIONS PRODUIT FINALES

### Perte de clé
**Politique assumée :** Pas de recovery.  
Comme une clé physique de coffre-fort.  
L'utilisateur est prévenu dès le premier écran.

### Multi-device
**Supporté naturellement :** Scanner sur téléphone A, puis téléphone B = même vault.  
Tant que l'utilisateur a sa clé, il peut ouvrir n'importe où.

### Partage de carte
**Pas supporté en V1.**  
Une carte = une clé = un propriétaire.  
(Si quelqu'un d'autre a ta carte physique + ta clé, il a accès. Assumé.)

### Offline
**Pas en V1.**  
L'app nécessite connexion pour unlock + chargement entries.  
(PWA offline = V2 si besoin)

---

**VERSION : V1 Figée**  
**DATE : 9 janvier 2026**  
**STATUS : Prêt à implémenter**

---

*Cette spec est complète et ne nécessite aucune discussion supplémentaire.*  
*Tout ce qui n'est pas dans ce document n'existe pas en V1.*
