# ARCHÉ V1 — THE OBJECT IS

---

## L'AXIOME

**L'objet est.**

Pas "l'objet donne accès".  
Pas "l'objet contient un code".  

**L'objet est la porte.**

---

## LA PHRASE PRODUIT (officielle, définitive)

> **"Cette carte ouvre votre ARCHÉ."**

Rien d'autre à dire.

---

## LE GESTE UNIQUE

```
Scan → Clé → Entrée
```

**C'est tout.**

Pas de code à taper.  
Pas de notion d'activation.  
Pas de compte.  
Pas de système visible.

L'utilisateur pense :

> "J'ai la carte → j'ouvre."

C'est primitif. Évident. Universel.

---

## POURQUOI C'EST JUSTE (pas juste simple)

### 1. Zéro abstraction
L'utilisateur ne pense jamais en termes de "code", "activation", "compte", "système".  
Il pense en termes d'**objet physique qui ouvre**.

Comme :
- Une clé
- Un passe
- Un talisman

### 2. L'objet devient sacré
S'il le perd, il ne "perd pas un accès numérique".  
Il **perd l'objet**.

C'est cohérent psychologiquement et symboliquement.

### 3. Supprime 90% des bugs mentaux
Plus de questions :
- "J'ai oublié mon code"
- "C'est quoi mon identifiant"
- "J'ai déjà un compte ?"

Il n'y a **qu'un seul geste** : scanner.

### 4. Le système devient invisible
La meilleure architecture, c'est celle que l'utilisateur **ne voit pas**.

ARCHÉ devient :
- Une expérience
- Pas un produit tech

---

## CE QUI EST VERROUILLÉ (définitivement)

### ❌ IL N'Y A PAS DE CODE À TAPER

Le QR **EST** le code.  
L'utilisateur ne le voit jamais, ne le tape jamais.

### ❌ IL N'Y A PAS D'ACTIVATION SÉPARÉE

Première fois = utilisation normale.  
Le système ne fait pas de différence.  
L'utilisateur non plus.

### ❌ IL N'Y A PAS DE COMPTE

Pas d'email.  
Pas d'identifiant.  
Pas de profil.

### ❌ IL N'Y A PAS DE LOGIN

La page `/open` **EST** l'entrée.  
Il n'y a pas de distinction entre "activer" et "se connecter".

### ✅ IL Y A UNE CARTE

Objet physique.  
Avec un QR au dos.

### ✅ IL Y A UNE CLÉ

Choisie par l'utilisateur.  
Gardée par l'utilisateur.  
Perdue = tout perdu (assumé).

---

## L'EXPÉRIENCE (du point de vue utilisateur)

### Achat
J'achète une carte ARCHÉ — Lutèce.  
C'est un objet beau, en papier épais, format carte postale.  
Au dos : un QR code discret.

### Première utilisation
Je scanne le QR.  
Mon téléphone ouvre une page :

```
PETIT SOUVENIR
──────────────

Ouvrir mon ARCHÉ

Carte : Lutèce

Clé : [________]

        [Entrer]

Gardez cette clé.
Sans elle, votre Carnet est inaccessible.
```

Je choisis une clé personnelle : `monparis2026`  
Je clique Entrer.

Mon Paris s'ouvre.

### Retour plus tard
Je rescanne le QR.  
Je retape ma clé : `monparis2026`  
Je clique Entrer.

Mon Paris s'ouvre.  
Tous mes souvenirs sont là.

### Nouveau téléphone
Je rescanne le QR.  
Je retape ma clé : `monparis2026`  
Je clique Entrer.

Mon Paris s'ouvre.  
Tous mes souvenirs sont là.

**L'utilisateur ne comprend jamais la différence entre "première fois" et "retour".**  
**Pour lui, c'est toujours le même geste : scanner + clé.**

---

## LA TECHNIQUE (qui sert cette vision)

### QR Code sur la carte physique
```
https://arche.paris/open?c=ARCHE-LUT-2847
```

- `ARCHE` = préfixe système
- `LUT` = quête Lutèce
- `2847` = identifiant unique carte

Le code est **dans l'URL**.  
L'utilisateur ne le voit jamais.

### Page `/open`

#### URL
```
/open?c=ARCHE-LUT-2847
```

#### Ce que voit l'utilisateur
```
Ouvrir mon ARCHÉ

Carte : Lutèce

Clé : [________]

[Entrer]
```

Le code `ARCHE-LUT-2847` est extrait de `?c=` mais affiché simplement comme "Lutèce" (human-friendly).

#### Ce qui se passe au clic
```javascript
POST /unlock
{
  "code": "ARCHE-LUT-2847",
  "password": "monparis2026"
}

→ Backend vérifie

SI première fois :
  - Génère vault_id
  - Hashe le password (bcrypt)
  - Sauvegarde dans activation_codes
  - Retourne token

SI pas première fois :
  - Vérifie password contre hash
  - Retourne token

→ Frontend stocke token
→ Redirect /app
```

**L'utilisateur voit exactement le même écran dans les deux cas.**

---

## ARCHITECTURE BACKEND (3 endpoints, pas plus)

### 1. `POST /unlock`

**Input**
```json
{
  "code": "ARCHE-LUT-2847",
  "password": "monparis2026"
}
```

**Output**
```json
{
  "token": "eyJhbGc...",
  "vault_id": "550e8400-e29b-41d4-a716-446655440000"
}
```

**Logique (unifiée activation + login)**
```
CHARGER activation_codes WHERE code = "ARCHE-LUT-2847"

SI pas trouvé :
  → ERREUR "Cette carte n'existe pas"

SI is_activated = false :
  // PREMIÈRE FOIS
  → Générer vault_id
  → password_hash = bcrypt(password, 10)
  → UPDATE activation_codes SET
      vault_id = vault_id,
      password_hash = password_hash,
      is_activated = true,
      activated_at = NOW()
  → Générer JWT token (exp 7j)
  → RETOURNER token + vault_id

SI is_activated = true :
  // RETOUR
  → Vérifier bcrypt.compare(password, password_hash)
  → SI match :
      → Générer nouveau JWT token (exp 7j)
      → RETOURNER token + vault_id
  → SI pas match :
      → ERREUR "Impossible d'ouvrir. Vérifiez votre clé."
```

### 2. `GET /entries`

**Headers**
```
Authorization: Bearer {token}
```

**Output**
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

### 3. `POST /entries`

**Headers**
```
Authorization: Bearer {token}
```

**Input**
```json
{
  "content": "Café au Procope",
  "place_id": "Saint-Germain"
}
```

**Output**
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

## LES TABLES (2 seulement)

### `activation_codes`
```sql
CREATE TABLE activation_codes (
  code TEXT PRIMARY KEY,              -- ARCHE-LUT-2847
  vault_id UUID,                      -- Généré à première activation
  password_hash TEXT,                 -- bcrypt du password utilisateur
  is_activated BOOLEAN DEFAULT false, -- Devient true après première utilisation
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

**Pas d'autres tables.**  
Pas de table `users`.  
Pas de table `sessions`.  
Pas de table `quests_progress` en V1.

---

## LA SÉCURITÉ (assumée et claire)

### Ce qui est sécurisé
- Password hashé (bcrypt rounds 10)
- Token JWT signé (expiration 7 jours)
- HTTPS obligatoire
- Rate limiting sur `/unlock` (5 tentatives/minute)

### Ce qui n'est PAS sécurisé (et c'est assumé)
- Pas de recovery si clé perdue
- Pas de 2FA
- Pas de chiffrement E2E (les souvenirs sont en clair dans la DB)
- Pas de détection de vol de carte

**C'est comme une clé physique.**  
Tu la perds → tu perds l'objet.  
Quelqu'un l'a + ta clé → il a accès.

En V1, c'est assumé et annoncé.

---

## LES MESSAGES (copy exact)

### Écran principal
```
Ouvrir mon ARCHÉ

Carte : Lutèce

Clé
[Votre clé personnelle]

        [Entrer]

Gardez cette clé. Sans elle, votre Carnet est inaccessible.
```

### Erreur : carte invalide
```
Cette carte n'existe pas.
```

### Erreur : clé incorrecte
```
Impossible d'ouvrir. Vérifiez votre clé.
```

### Erreur : réseau
```
Connexion impossible. Réessayez.
```

### Loading
```
Ouverture...
```

**Aucun autre message.**  
Pas de confirmation "Carte activée !".  
Pas d'explication "Vous êtes connecté".

L'app qui s'ouvre EST la confirmation.

---

## CE QUI PEUT SCALER (sans casser l'axiome)

Plus tard, tu pourras ajouter :

### Export sécurisé
Un bouton dans l'app : "Sauvegarder mes souvenirs"  
→ Télécharge JSON chiffré  
→ Peut être réimporté avec la clé

### Recovery optionnelle
L'utilisateur peut **choisir** de lier un email pour recovery.  
Mais ce n'est pas obligatoire.  
Et ça reste invisible sur l'écran `/open`.

### Magic link
Envoyer un lien temporaire par email pour ouvrir sans rescanner.  
Mais le QR reste la porte principale.

### Chiffrement E2E
Les souvenirs peuvent être chiffrés avec la clé utilisateur.  
Le backend ne voit que du chiffré.

### Multi-cartes
Un utilisateur peut avoir plusieurs cartes (Lutèce, 1789, À Table).  
Chaque carte ouvre son propre vault.  
L'écran `/open` reste identique pour chacune.

**Mais tout ça = V2 ou plus.**

En V1, tu restes sur l'axiome pur :

> **Scan → Clé → Entrée**

---

## LA CARTE PHYSIQUE (spécifications)

### Format
Carte postale premium : 10cm × 15cm  
Papier épais 350g, mat velouté  
Impression offset haute qualité

### Recto
Illustration de la quête :
- **Lutèce** : Colonnes romaines, typographie antique
- **1789** : Barricades, flammes révolutionnaires
- **À Table** : Nature morte gastronomique parisienne

Titre en Cormorant Garamond  
"ARCHÉ — Paris"

### Verso
```
┌────────────────────────────────────┐
│                                    │
│    PETIT SOUVENIR — CityNodes      │
│                                    │
│         ┌───────────┐              │
│         │           │              │
│         │  QR CODE  │              │
│         │           │              │
│         └───────────┘              │
│                                    │
│    Cette carte ouvre votre ARCHÉ.  │
│                                    │
│    arche.paris                     │
│                                    │
└────────────────────────────────────┘
```

QR code encodé : `https://arche.paris/open?c=ARCHE-LUT-2847`

**Aucun autre texte.**  
Pas de "code d'activation".  
Pas d'instructions.

La carte se suffit à elle-même.

---

## L'EMBALLAGE (si carte vendue physiquement)

Enveloppe kraft avec cachet de cire vert #003D2C

Carte de présentation (format carte de visite) :

```
ARCHÉ — Lutèce

Cette carte ouvre votre parcours privé
dans le Paris antique.

Scannez le QR au dos.
Choisissez votre clé.
Votre Paris s'ouvre.

arche.paris
```

Rien d'autre.  
Pas de mode d'emploi.  
Pas de CGV imprimées.

L'objet parle de lui-même.

---

## L'EXPÉRIENCE COMPLÈTE (de l'achat à l'usage)

### 1. Achat
Je commande ou j'achète en boutique une carte ARCHÉ — Lutèce.  
Je reçois une enveloppe kraft avec cachet de cire.  
J'ouvre. La carte est belle.

### 2. Découverte
Au dos : un QR code discret.  
Une phrase : "Cette carte ouvre votre ARCHÉ."

### 3. Scan
Je scanne avec mon téléphone.  
Une page s'ouvre, sobre, parchemin crème.

### 4. Choix de clé
Je choisis ma clé personnelle (comme un mot de passe pour un coffre).  
Je l'entre. Je clique "Entrer".

### 5. Ouverture
Mon Paris s'ouvre.

La Homepage apparaît :
```
PETIT SOUVENIR
──────────────

Origine  |  Quêtes  |  Histoire  |  Carnet
```

### 6. Exploration
Je clique sur Quêtes.  
Je découvre Lutèce.  
Les lieux apparaissent.  
Je lis les textes.  
Je visite Paris avec cette quête comme guide.

### 7. Journal
Je vais dans mon Carnet.  
J'écris mon premier souvenir.  
Il est sauvegardé.

### 8. Retour
Le lendemain, je rescanne la carte.  
Je retape ma clé.  
Mon Paris s'ouvre.  
Mes souvenirs sont là.

**À aucun moment je n'ai pensé "compte", "activation", "code".**  
**J'ai juste ouvert un objet.**

---

## CE QUI N'EXISTE PAS EN V1

### ❌ Champ pour taper le code manuellement
Le QR fait ce travail.  
Si l'utilisateur n'a pas sa carte = il n'a pas accès.

### ❌ Écran "Activation" séparé de "Login"
C'est la même page, le même geste, le même backend.

### ❌ Email obligatoire
Aucun.

### ❌ Reset password
Si tu perds ta clé, tu perds ton vault.  
(Comme une clé physique.)

### ❌ Multi-utilisateurs par carte
Une carte = un vault = une clé.

### ❌ Partage de carnet
En V1, le carnet est strictement privé.

### ❌ Mode offline
L'app nécessite connexion pour unlock et sync.

### ❌ Tracking de quêtes
Pas de système de progression / checkpoints en V1.  
L'utilisateur explore librement.

### ❌ Notifications
Aucune.

### ❌ Social features
Aucune.

---

## LE SCOPE V1 (verrouillé)

### Frontend (6 écrans)
1. `/open` — Porte d'entrée unique
2. `/app` — Homepage (monument)
3. `/app#origine` — Carte révélation
4. `/app#quetes` — Les 3 quêtes
5. `/app#histoire` — Archives éditoriales
6. `/app#carnet` — Journal intime

### Backend (3 endpoints)
1. `POST /unlock` — Activation + login unifiés
2. `GET /entries` — Charger souvenirs
3. `POST /entries` — Sauvegarder souvenir

### Database (2 tables)
1. `activation_codes` — Codes des cartes
2. `journal_entries` — Souvenirs utilisateur

### Cartes physiques (3 designs)
1. Lutèce — Paris antique
2. 1789 — Révolution
3. À Table — Gastronomie

**Rien d'autre.**

---

## LA RÈGLE D'OR (pour toute décision produit)

> **"Est-ce que ça respecte l'axiome : L'objet est ?"**

Si la réponse est non, on ne le fait pas.

### Exemples

**Feature : "Ajouter un lien 'Mot de passe oublié'"**  
→ ❌ NON. Ça introduit l'idée de "compte".  
L'objet n'a pas de "compte". Il a une clé.

**Feature : "Permettre de taper le code manuellement si QR cassé"**  
→ ❌ NON. Si la carte est cassée, l'objet est cassé.  
(En V2, on pourra envisager une procédure de remplacement physique.)

**Feature : "Envoyer un email de confirmation après activation"**  
→ ❌ NON. Il n'y a pas d'email.  
Et l'app qui s'ouvre EST la confirmation.

**Feature : "Export des souvenirs en JSON"**  
→ ✅ OUI. Ça renforce la propriété de l'utilisateur sur ses données.  
Et ça reste invisible tant qu'il ne le demande pas.

**Feature : "Ajouter une photo à un souvenir"**  
→ ✅ OUI. C'est une extension naturelle du carnet.  
Ça ne change pas l'axiome.

**Feature : "Mode sombre"**  
→ ✅ OUI. C'est purement cosmétique.  
L'objet reste le même.

**Feature : "Connexion via Google"**  
→ ❌ NON. Il n'y a pas de "connexion".  
Il y a une ouverture avec clé.

---

## LE MANIFESTE (à garder affiché)

```
ARCHÉ n'est pas une app.
ARCHÉ n'est pas un service.

ARCHÉ est un objet.

Un objet qui ouvre.
Un objet qui contient.
Un objet qui se perd.

Comme une clé.
Comme un livre.
Comme un secret.

Si tu scannes, tu entres.
Si tu oublies ta clé, tu perds.
Si tu gardes tes souvenirs, ils restent.

Pas de compte.
Pas d'illusion.
Pas de "cloud" invisible.

Juste l'objet.

Et ce qu'il ouvre.
```

---

## CHECKLIST FINALE (avant toute feature)

Avant d'ajouter quoi que ce soit, demande-toi :

- [ ] Est-ce que ça respecte "L'objet est" ?
- [ ] Est-ce que l'utilisateur pense encore en termes d'objet ?
- [ ] Est-ce que ça reste primitif et évident ?
- [ ] Est-ce que ça peut exister dans le monde physique ?
- [ ] Est-ce que ça renforce ou dilue l'expérience ?

Si un seul "non", ne le fais pas.

---

## VERSION

**V1 — The Object Is**  
Figée le 9 janvier 2026  

Cette spec ne change plus.  
Tout ce qui n'est pas dans ce document n'existe pas.

---

**L'objet est.**

---

*Fin du document*
