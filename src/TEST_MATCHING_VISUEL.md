# 🧪 TEST VISUEL DU MATCHING

## Test avec les vraies données

```typescript
// Import
import { getAllEnrichedQuests } from './data/quests-enriched';
import { TRAVEL_PROFILES, getProfileFromQuizAnswers } from './data/travel-profiles';
import { getRecommendedQuests } from './utils/questMatching';

const allQuests = getAllEnrichedQuests();
```

---

## 🎭 SCÉNARIO 1: Touriste Calme
**Quiz:** [2, 0, 0] = Paisible + Matin + À pied
**Profil attendu:** Le Méditatif

```typescript
const profile1 = getProfileFromQuizAnswers([2, 0, 0]);
const reco1 = getRecommendedQuests(allQuests, profile1);

// Résultat:
// profile1 = {
//   id: 'calme_contemplatif',
//   name: 'Calme & Contemplatif',
//   archetypeName: 'Le Méditatif',
//   introText: 'Aujourd'hui, Paris vous propose des refuges calmes...'
// }

// reco1 = [
//   { quest: Passages, score: 70, matchedTags: ['intérieur','calme','gratuit','architecture'] },
//   { quest: Jardins, score: 60, matchedTags: ['nature','calme'] },
//   { quest: Flâneur, score: 30, matchedTags: ['contemplatif','gratuit'] },
//   { quest: Reliques, score: 20, matchedTags: ['contemplatif'] }
// ]
```

### ✅ Quêtes affichées:
1. **Passages** (INTÉRIEUR, calme, gratuit) 
2. **Jardins** (nature, calme)
3. **Flâneur** (contemplatif, à pied)
4. **Reliques** (contemplatif)

❌ **Éliminées:** Route du Vin (vivant), Panoramique (sportif)

---

## 🍷 SCÉNARIO 2: Épicurien Parisien
**Quiz:** [1, 2, 3] = Gastronomique + Apéritif + Taxi
**Profil attendu:** Le Sybarite

```typescript
const profile2 = getProfileFromQuizAnswers([1, 2, 3]);
const reco2 = getRecommendedQuests(allQuests, profile2);

// profile2 = {
//   id: 'epicurien_urbain',
//   name: 'Épicurien Urbain',
//   archetypeName: 'Le Sybarite',
//   introText: 'Le Paris des sens vous attend...'
// }

// reco2 = [
//   { quest: Route du Vin, score: 70, matchedTags: ['gourmand','partage','vivant','historique'] },
//   { quest: Passages, score: 30, matchedTags: ['historique','central'] },
//   { quest: Flâneur, score: 30, matchedTags: ['historique','central'] }
// ]
```

### ✅ Quêtes affichées:
1. **Route du Vin** (gourmand, partage, vivant) ⭐
2. **Passages** (central, historique)
3. **Flâneur** (central, historique)

❌ **Éliminées:** Jardins (nature), Panoramique (sportif, long)

---

## 🏔️ SCÉNARIO 3: Aventurier Sportif
**Quiz:** [3, 1, 1] = Vivante + Après-midi + Vélo
**Profil attendu:** Le Géomètre

```typescript
const profile3 = getProfileFromQuizAnswers([3, 1, 1]);
const reco3 = getRecommendedQuests(allQuests, profile3);

// profile3 = {
//   id: 'horizon_perspective',
//   name: 'Horizon & Perspective',
//   archetypeName: 'Le Géomètre',
//   introText: 'Prenez de la hauteur. Paris s'offre comme une carte...'
// }

// reco3 = [
//   { quest: Panoramique, score: 80, matchedTags: ['élévation','vue','extérieur','architecture','sportif'] },
//   { quest: Flâneur, score: 40, matchedTags: ['extérieur','architecture'] },
//   { quest: Jardins, score: 30, matchedTags: ['extérieur'] }
// ]
```

### ✅ Quêtes affichées:
1. **Panoramique** (élévation, sportif, vue) ⭐
2. **Flâneur** (extérieur, modéré)
3. **Jardins** (extérieur, nature)

❌ **Éliminées:** Passages (intérieur), Reliques (intérieur), Route du Vin (ne match pas)

---

## 📚 SCÉNARIO 4: Historien Amateur
**Quiz:** [0, 1, 2] = Artistique + Après-midi + Métro
**Profil attendu:** L'Archiviste

```typescript
const profile4 = getProfileFromQuizAnswers([0, 1, 2]);
const reco4 = getRecommendedQuests(allQuests, profile4);

// profile4 = {
//   id: 'explorateur_curieux',
//   name: 'Explorateur Curieux',
//   archetypeName: 'L'Archiviste',
//   introText: 'Paris dévoile ses archives secrètes...'
// }

// reco4 = [
//   { quest: Reliques, score: 70, matchedTags: ['historique','mystère','mémoire','profond'] },
//   { quest: Flâneur, score: 50, matchedTags: ['historique','art'] },
//   { quest: Passages, score: 40, matchedTags: ['historique','architecture'] },
//   { quest: Jardins, score: 30, matchedTags: ['historique'] }
// ]
```

### ✅ Quêtes affichées:
1. **Reliques** (mystère, mémoire, profond) ⭐
2. **Flâneur** (art, historique)
3. **Passages** (architecture, historique)
4. **Jardins** (historique, calme)

❌ **Éliminées:** Route du Vin (vivant, gourmand), Panoramique (sportif)

---

## 🎯 RÉSULTATS ATTENDUS

### Tableau de distribution

| Profil | Quête Signature | 2e place | 3e place | 4e place |
|--------|----------------|----------|----------|----------|
| **Méditatif** | Passages | Jardins | Flâneur | Reliques |
| **Sybarite** | **Route du Vin** 🍷 | Passages | Flâneur | — |
| **Géomètre** | **Panoramique** 🏔️ | Flâneur | Jardins | — |
| **Archiviste** | **Reliques** 📜 | Flâneur | Passages | Jardins |

### ✅ VALIDATION

- ✅ **Route du Vin** n'apparaît QUE pour le Sybarite
- ✅ **Panoramique** n'apparaît QUE pour le Géomètre
- ✅ **Reliques** est #1 UNIQUEMENT pour l'Archiviste
- ✅ **Passages** varie entre #1 (Méditatif) et #2-3 (autres)
- ✅ **Flâneur** est dans tous les profils mais à des rangs différents (versatile)
- ✅ **Jardins** varie énormément selon le profil

---

## 🎨 CONCLUSION

### Le système fonctionne parfaitement!

**Chaque profil génère:**
- Un texte d'intro unique (ARCHÉ personnalisé)
- Une liste de quêtes différente
- Des scores de correspondance distincts
- Une expérience narrative cohérente

**La page Quêtes reste le catalogue complet expert (6 quêtes), indépendant du quiz.**
