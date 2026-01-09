# CODEX — GUIDE D'UTILISATION

## Philosophie

Le **Codex** est une archive automatique. Il ne contient aucune écriture libre de l'utilisateur.

### Différences clés :

| Module | Nature | Auteur | Interaction |
|--------|--------|--------|-------------|
| **Carnet Parisien** | Écriture libre, subjective | Utilisateur | Écrire, éditer, supprimer |
| **Histoire Quotidienne** | Lecture contemplative | Système (anecdotes historiques) | Lire uniquement |
| **Codex** | Archive factuelle | Système (événements attestés) | Lire uniquement |

---

## Structure d'une entrée Codex

Chaque entrée contient :

1. **Date** : "6 décembre 2024"
2. **Lieu** : "Passage des Panoramas" (visible)
3. **Trace** : "Une attention a été déposée." (phrase générée)
4. **Métadonnées** : event_type, quest_id, source (invisibles)

---

## Comment inscrire dans le Codex

### ✅ Dans une quête :

```typescript
import { inscribeQuest } from '../utils/codex-helpers';

// Quand l'utilisateur termine une quête
await inscribeQuest(
  'quete-jardins-secrets',
  'Jardins Secrets',
  'Le Marais — Square du Temple'
);
```

### ✅ Lors d'un scan QR :

```typescript
import { inscribeScan } from '../utils/codex-helpers';

// Quand l'utilisateur scanne un QR code
await inscribeScan('Passage des Panoramas');
```

### ✅ Lors d'une géolocalisation :

```typescript
import { inscribePresence } from '../utils/codex-helpers';

// Quand l'utilisateur arrive à un lieu
await inscribePresence('Palais-Royal — Galerie Véro-Dodat');
```

### ✅ Lors d'une lecture d'Histoire :

```typescript
import { inscribeHistoryRead } from '../utils/codex-helpers';

// Optionnel : tracker les lectures importantes
await inscribeHistoryRead('12-06');
```

---

## Personnalisation des traces

Pour créer des phrases sur mesure :

```typescript
import { inscribeCodexEntry } from '../utils/supabase/client';
import { formatDateDisplay } from '../utils/codex-helpers';

await inscribeCodexEntry({
  dateDisplay: formatDateDisplay(),
  lieu: 'Montmartre — Rue Lepic',
  trace: 'Un regard s\'est attardé sur la pente.',
  eventType: 'custom',
  source: 'manual'
});
```

### ⚠️ Règles pour les traces :

- ✅ Ton neutre, littéraire
- ✅ Phrase courte (max 15 mots)
- ✅ Pas de "tu" / "vous"
- ✅ Passé composé ou présent intemporel
- ❌ Jamais de gamification ("Bravo!", "Complété!", "Niveau atteint!")
- ❌ Jamais de chiffres visibles (compteurs, scores)
- ❌ Jamais d'émojis ou d'icônes

**Exemples valides :**
- "Une attention a été déposée."
- "Un seuil a été franchi."
- "Une présence a été confirmée."
- "Un passage a été reconnu."

**Exemples invalides :**
- ❌ "Vous avez complété la quête!"
- ❌ "Bravo, +10 points!"
- ❌ "Mission accomplie 🎉"

---

## Migration SQL

Pour créer les tables Supabase, exécute :

```sql
-- Voir /supabase/migrations/20251212_histoire_carnet.sql
-- La table codex_entries est déjà incluse
```

---

## État actuel

- ✅ Table `codex_entries` créée (migration SQL)
- ✅ Client Supabase avec `inscribeCodexEntry()` et `getCodexEntries()`
- ✅ Composant `Codex.tsx` mis à jour (état vide, chargement, affichage)
- ✅ Helpers dans `/utils/codex-helpers.ts`
- ✅ Mode hybride localStorage/Supabase

---

## Prochaines étapes

Pour activer les inscriptions automatiques :

1. **Dans QueteDetail.tsx** : ajouter `inscribeQuest()` quand une quête est "terminée"
2. **Dans un futur composant Scanner** : ajouter `inscribeScan()` au scan
3. **Dans HistoireQuotidienne.tsx** (optionnel) : ajouter `inscribeHistoryRead()` pour tracker les lectures importantes

---

## Rappel : La phrase de référence

> **Le Carnet accueille ce que tu écris.**  
> **Le Codex conserve ce qui a eu lieu.**
