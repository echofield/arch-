# 🔍 DEBUG: FLOW COMPLET DU QUIZ D'INTENTION

## 📍 COMMENT TESTER

### Dans l'app:
1. Va sur `/Intention` (Quiz)
2. Réponds aux 3 questions
3. Regarde les résultats

### Questions du Quiz:

#### Q1: Quelle ambiance recherchez-vous?
- **[0] Artistique & Culturelle** → Tag "art" prioritaire
- **[1] Gastronomique & Raffinée** → Profile "Sybarite" direct
- **[2] Paisible & Nature** → Tags "calme", "nature" 
- **[3] Vivante & Nocturne** → Profile "Géomètre"

#### Q2: Quel moment préférez-vous?
- [0] Petit Déjeuner (6h–10h)
- [1] Après-midi (14h–18h)
- [2] Apéritif (18h–20h)
- [3] Soirée (20h–minuit)

**Note:** Cette question influence peu le matching actuel, mais pourrait être utilisée pour filtrer par moment dans une future version.

#### Q3: Votre style de découverte?
- **[0] À pied** → Calme, gratuit
- **[1] À vélo** → Profile "Géomètre" direct
- **[2] En métro** → Efficace, multi-lieux
- **[3] En taxi** → Confort

---

## 🧪 TESTS RAPIDES

### Test 1: Méditatif
```
Réponses: [2, 0, 0]
→ Paisible + Matin + À pied
→ Profile: Le Méditatif
→ Quêtes: Passages, Jardins, Flâneur, Reliques
```

### Test 2: Sybarite
```
Réponses: [1, 2, 3]
→ Gastronomique + Apéritif + Taxi
→ Profile: Le Sybarite
→ Quêtes: Route du Vin (★), Passages, Flâneur
```

### Test 3: Géomètre
```
Réponses: [3, 1, 1]
→ Vivante + Après-midi + Vélo
→ Profile: Le Géomètre
→ Quêtes: Panoramique (★), Flâneur, Jardins
```

### Test 4: Archiviste
```
Réponses: [0, 1, 0]
→ Artistique + Après-midi + À pied
→ Profile: L'Archiviste
→ Quêtes: Reliques (★), Flâneur, Passages, Jardins
```

---

## 🎯 CE QUI DOIT CHANGER À CHAQUE PROFIL

### 1. Header Results
```tsx
<p className="small-caps">Votre archétype</p>
<h1>{profile.archetypeName}</h1>
// Change: "Le Méditatif" / "Le Sybarite" / "Le Géomètre" / "L'Archiviste"

<p style={{ fontStyle: 'italic' }}>
  {profile.introText}
</p>
// Change: Texte ARCHÉ personnalisé
```

### 2. Quêtes affichées
```tsx
{recommendedQuests.map((questScore, index) => {
  const quest = questScore.quest;
  // Change: Ordre et nombre de quêtes différents
})}
```

### 3. Tags "Archétype"
```tsx
<p className="small-caps">
  Archétype — {quest.archetype}
</p>
// Change: Seuil / Liberté / Refuge / Partage / Élévation / Mémoire
```

---

## 🐛 DEBUGGING

### Si tu vois toujours les mêmes quêtes:

1. **Vérifie que Results.tsx importe bien:**
```tsx
import { getAllEnrichedQuests } from '../data/quests-enriched';
import { getProfileFromQuizAnswers } from '../data/travel-profiles';
import { getRecommendedQuests } from '../utils/questMatching';
```

2. **Vérifie que le useMemo calcule bien:**
```tsx
const profile = useMemo(() => getProfileFromQuizAnswers(answers), [answers]);
const recommendedQuests = useMemo(() => 
  getRecommendedQuests(allQuests, profile), 
  [allQuests, profile]
);
```

3. **Ajoute un console.log temporaire:**
```tsx
console.log('Profile:', profile.archetypeName);
console.log('Recommended Quests:', recommendedQuests.map(qs => 
  `${qs.quest.title} (${qs.score})`
));
```

### Si les quêtes ne changent pas:

1. Vérifie que les `answers` changent vraiment
2. Vérifie que `profile` est bien recalculé
3. Vérifie que `recommendedQuests` est trié par score

---

## ✅ COMPORTEMENT ATTENDU

### Différences clés par profil:

| Profil | Intro commence par... | Quête #1 | Particularité |
|--------|-----------------------|----------|---------------|
| **Méditatif** | "Aujourd'hui, Paris vous propose des refuges calmes..." | Passages | Évite sportif |
| **Archiviste** | "Paris dévoile ses archives secrètes..." | Reliques | Focus mystère |
| **Sybarite** | "Le Paris des sens vous attend..." | Route du Vin | Seul à avoir vin |
| **Géomètre** | "Prenez de la hauteur..." | Panoramique | Seul à avoir hauteurs |

---

## 🎨 CONFIRMATION VISUELLE

Quand tu changes de réponses au quiz, tu DOIS voir changer:

1. ✅ **Le titre de l'archétype** (Le Méditatif → Le Sybarite)
2. ✅ **Le texte d'intro** (phrase complète différente)
3. ✅ **L'ordre des quêtes** (Passages #1 → Route du Vin #1)
4. ✅ **Le nombre de quêtes** (4 quêtes → 3 quêtes selon profil)

Si ces 4 éléments changent → **LE SYSTÈME FONCTIONNE!** ✨
