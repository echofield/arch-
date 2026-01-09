# ARCHÉ — Configuration du Système Vault

## Vue d'ensemble

ARCHÉ utilise un système de **vault sécurisé** avec activation par code unique + mot de passe personnel.

### Architecture
- **Code unique** imprimé sur carte physique (ex: `ARCHE-XY7Z-4K2P`)
- **Mot de passe** choisi par l'utilisateur lors de l'activation
- **Vault** : espace personnel sécurisé contenant le Carnet intime
- **JWT** : Token d'authentification valide 7 jours

---

## 1. Configuration initiale de la base de données

### Étape 1 : Exécuter la migration SQL

Connectez-vous à votre console Supabase et exécutez le fichier :
```
/supabase/migrations/001_vault_system.sql
```

Cela créera les tables :
- `activation_codes` : Codes uniques pour cartes physiques
- `vaults` : Espaces personnels sécurisés
- `journal_entries` : Entrées du Carnet Parisien

### Étape 2 : Vérifier les tables

Dans Supabase Dashboard → Table Editor, vous devriez voir :
- ✅ `activation_codes` (0 rows)
- ✅ `vaults` (0 rows)
- ✅ `journal_entries` (0 rows)

---

## 2. Génération des codes d'activation

### Étape 1 : Configurer les variables d'environnement

Dans votre terminal local ou dans Supabase Edge Functions :

```bash
export SUPABASE_URL="https://YOUR_PROJECT.supabase.co"
export SUPABASE_SERVICE_ROLE_KEY="YOUR_SERVICE_ROLE_KEY"
```

### Étape 2 : Exécuter le script de génération

```bash
cd supabase/functions/server
deno run --allow-env --allow-net --allow-write generate_codes.tsx 100
```

**Paramètre** : Nombre de codes à générer (ex: 100)

### Étape 3 : Récupérer les codes générés

Le script va :
1. Générer 100 codes au format `ARCHE-XXXX-XXXX`
2. Les insérer dans la table `activation_codes`
3. Afficher la liste dans le terminal
4. Sauvegarder dans `/tmp/codes_YYYY-MM-DD.txt`

**Exemple de sortie** :
```
🎯 Génération de 100 codes d'activation ARCHÉ...
✅ 10/100 codes générés...
✅ 20/100 codes générés...
...
✅ 100/100 codes générés...

📋 RÉSUMÉ
✅ Codes générés: 100
❌ Erreurs: 0

📝 CODES GÉNÉRÉS (à imprimer sur cartes):
──────────────────────────────────────────────────
001. ARCHE-XY7Z-4K2P
002. ARCHE-M3NQ-8R5T
003. ARCHE-J9WL-2H6V
...
──────────────────────────────────────────────────

💾 Codes sauvegardés dans /tmp/codes_2026-01-08.txt
```

---

## 3. Impression des cartes physiques

### Format recommandé

**RECTO** :
```
┌─────────────────────────────┐
│                             │
│         ARCHÉ               │
│    PETIT SOUVENIR           │
│                             │
│    Votre Paris intime       │
│                             │
└─────────────────────────────┘
```

**VERSO** :
```
┌─────────────────────────────┐
│                             │
│   [QR CODE]                 │
│                             │
│   ARCHE-XY7Z-4K2P          │
│                             │
│   arche.app?code=...       │
│                             │
└─────────────────────────────┘
```

### Génération du QR Code

Pour chaque code, générer un QR code pointant vers :
```
https://votre-domaine.com/?code=ARCHE-XY7Z-4K2P
```

**Outils recommandés** :
- https://www.qr-code-generator.com/
- Python : `qrcode` library
- Node.js : `qrcode` package

---

## 4. Flow utilisateur

### Première activation (nouveau vault)

1. **Scan QR** → Redirige vers `/activate?code=ARCHE-XY7Z-4K2P`
2. **Utilisateur entre** son mot de passe personnel
3. **Backend** :
   - Vérifie que le code existe et `status = 'issued'`
   - Crée un nouveau vault avec hash du password
   - Marque le code `status = 'activated'`
   - Retourne un JWT (7 jours)
4. **Frontend** : Stocke le JWT en localStorage → Accès complet

### Retour ultérieur (vault existant)

1. **Scan QR** → Redirige vers `/activate?code=ARCHE-XY7Z-4K2P`
2. **Utilisateur entre** son mot de passe
3. **Backend** :
   - Vérifie que le code existe et `status = 'activated'`
   - Compare le password avec le hash du vault lié
   - Si match → Retourne JWT
   - Si erreur → Message générique "Impossible de déverrouiller"
4. **Frontend** : Stocke le JWT en localStorage → Accès complet

### Multi-device

L'utilisateur peut :
- Rescanner le QR sur un nouvel appareil
- Entrer le même mot de passe
- Accéder à son vault depuis n'importe où

**Important** : Le code est réutilisable tant que l'utilisateur connaît son mot de passe.

---

## 5. Sécurité

### Ce qui est sécurisé

✅ **Password hashé** (bcrypt côté serveur)  
✅ **JWT signé** avec secret serveur  
✅ **RLS activé** sur toutes les tables (pas d'accès direct client)  
✅ **Rate limiting** (10 tentatives/min par code)  
✅ **Réponses neutres** (pas de leak d'info sur validité code)  
✅ **HTTPS** (via Supabase/Figma Make)

### Ce qui n'est PAS (encore) sécurisé (V1)

❌ **Contenu en clair** en DB (pas de chiffrement E2E)  
❌ **Pas de recovery email** (si password oublié = perte totale)  
❌ **Pas de 2FA** (un seul facteur : password)

**Note** : Ces fonctionnalités sont prévues pour V1.5

---

## 6. Administration

### Révoquer un code

Si une carte est perdue/volée :

```sql
UPDATE activation_codes 
SET status = 'revoked' 
WHERE code = 'ARCHE-XY7Z-4K2P';
```

Le code ne pourra plus être utilisé (même avec le bon password).

### Voir les codes activés

```sql
SELECT code, activated_at 
FROM activation_codes 
WHERE status = 'activated' 
ORDER BY activated_at DESC;
```

### Voir les statistiques

```sql
SELECT 
  status, 
  COUNT(*) as count 
FROM activation_codes 
GROUP BY status;
```

Résultat attendu :
```
status     | count
-----------|------
issued     |   42
activated  |   58
revoked    |    0
```

---

## 7. API Endpoints

Tous les endpoints sont préfixés par `/make-server-9060b10a/`

### POST /unlock
**Input** : `{ code: string, password: string }`  
**Output** : `{ vault_token: string, vault_id: string }`  
**Usage** : Activation ou connexion

### GET /entries
**Headers** : `Authorization: Bearer <vault_token>`  
**Output** : `{ entries: Array<Entry> }`  
**Usage** : Récupérer le Carnet

### POST /entries
**Headers** : `Authorization: Bearer <vault_token>`  
**Input** : `{ content: string, place_id?: string }`  
**Output** : `{ id: string, entry: Entry }`  
**Usage** : Ajouter un souvenir

### POST /export
**Headers** : `Authorization: Bearer <vault_token>`  
**Output** : `{ export_date: string, vault_id: string, entries: Array<Entry> }`  
**Usage** : Export JSON complet

### POST /verify-token
**Headers** : `Authorization: Bearer <vault_token>`  
**Output** : `{ valid: true, vault_id: string }`  
**Usage** : Vérifier validité token

---

## 8. Troubleshooting

### "Impossible de déverrouiller ce code"

**Causes possibles** :
1. Code inexistant en DB → Vérifier `SELECT * FROM activation_codes WHERE code = 'XXX'`
2. Code révoqué → Statut = 'revoked'
3. Mauvais password (si déjà activé)
4. Rate limit atteint (trop de tentatives)

### "Token invalide"

**Causes possibles** :
1. Token expiré (> 7 jours)
2. Secret JWT changé côté serveur
3. localStorage vidé

**Solution** : Rescanner le QR + re-enter password

### Le Carnet ne charge pas

**Causes possibles** :
1. Token expiré → Rescanner QR
2. Problème réseau → Vérifier console navigateur
3. Supabase down → Vérifier status.supabase.com

---

## Support

Pour toute question technique : 
- Check logs : Supabase Dashboard → Edge Functions → Logs
- Check DB : Table Editor → `activation_codes`, `vaults`, `journal_entries`
- Check RLS : Database → Policies

---

**Version** : V1 (Janvier 2026)  
**Status** : Production Ready ✅
