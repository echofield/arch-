# NETTOYAGE — RÉCAPITULATIF

## 🗑️ Fichiers supprimés

### Anciens composants Histoire (remplacés par HistoireQuotidienne)

- ✅ `/components/HistoirePortal.tsx` — Page d'entrée vers Chronoscapes (obsolète)
- ✅ `/components/Histoire.tsx` — Ancien système d'histoires par année/arrondissement (obsolète)
- ✅ `/components/Chronoscapes.tsx` — Cartes historiques illustrées par époque (obsolète)

### Raison de la suppression

**HistoireQuotidienne.tsx** est le nouveau système actif :
- "HISTOIRE — Journal de Paris"
- Anecdotes quotidiennes liées à la date du jour
- Persistence avec Supabase/localStorage
- Tracking silencieux des lectures
- Design éditorial minimaliste

Les anciens composants (Histoire, Chronoscapes) étaient des prototypes avec une approche différente (exploration par époque/arrondissement) qui ne correspond plus à la vision actuelle.

---

## 📋 Architecture finale

### Modules actifs avec persistence

| Module | Fichier | Fonction |
|--------|---------|----------|
| **Histoire Quotidienne** | `/components/HistoireQuotidienne.tsx` | Lecture contemplative quotidienne |
| **Carnet Parisien** | `/components/CarnetParisien.tsx` | Écriture libre personnelle |
| **Codex** | `/components/Codex.tsx` | Archive automatique silencieuse |
| **Quêtes** | `/components/Quetes.tsx` + `/components/QueteDetail.tsx` | Parcours thématiques |
| **PathwaysMap** | `/components/PathwaysMap.tsx` | Carte des quêtes |

### Autres composants (sans persistence)

- `Landing.tsx` — Page d'accueil
- `Intention.tsx` — Capture d'intention
- `Quiz.tsx` — Quiz de profil
- `Results.tsx` — Résultats du quiz
- `ParisianGlyphs.tsx` — Système de glyphes (expérimental)

---

## 🔗 Navigation mise à jour

### Landing.tsx

Boutons secondaires :
- **Cartes** → PathwaysMap
- **Quêtes** → PathwaysMap
- **Histoire** → HistoireQuotidienne ✅ (corrigé)

### App.tsx

Routes actives :
- `landing`
- `intention`
- `quiz`
- `loading`
- `results`
- `codex`
- `parcours` (PathwaysMap)
- `quetes` (Quetes.tsx)
- `quetedetail` (QueteDetail.tsx)
- `carnet` (CarnetParisien)
- `glyphs` (ParisianGlyphs)
- `histoirequotidienne` (HistoireQuotidienne) ✅

**Supprimé :**
- ❌ `histoire` (ancien)
- ❌ `chronoscapes` (ancien)

---

## ✅ État final de l'application

### 🏛 Architecture de mémoire (3 modules)

1. **Histoire Quotidienne**
   - Anecdotes du jour
   - Tracking silencieux
   - Persistence : `daily_history_reads`

2. **Carnet Parisien**
   - Souvenirs écrits
   - Écriture/suppression
   - Persistence : `carnet_entries`
   - **Inscription Codex automatique** ✅

3. **Codex**
   - Archive automatique
   - Lecture seule
   - Persistence : `codex_entries`
   - **Inscriptions silencieuses activées** ✅

### 🔕 Inscriptions Codex silencieuses

Déclenchées par :
- Écriture dans Carnet Parisien
- Ouverture de PathwaysMap (1x)
- Consultation d'une quête (1x par quête)

### 📦 Stockage

Mode actuel : **localStorage** (local-only)
Mode optionnel : **Supabase** (multi-device)

---

## 🧹 Prochaines étapes (optionnel)

### Court terme
- [ ] Vérifier que tous les liens fonctionnent
- [ ] Tester le flux complet utilisateur
- [ ] Vérifier les inscriptions Codex en conditions réelles

### Moyen terme
- [ ] Supprimer les anciens fichiers de documentation qui référencent les composants supprimés (si nécessaire)
- [ ] Créer un guide utilisateur final

---

## 📖 Récapitulatif philosophique

> **Le Carnet accueille ce que tu écris.**  
> **Le Codex conserve ce qui a eu lieu.**  
> **L'Histoire rappelle ce qui fut.**

Trois modules de mémoire, trois temporalités :
- **Histoire** → Passé collectif (Paris)
- **Carnet** → Présent personnel (toi)
- **Codex** → Archive factuelle (usage)

Zéro gamification. Trace silencieuse. Mémoire discrète.
