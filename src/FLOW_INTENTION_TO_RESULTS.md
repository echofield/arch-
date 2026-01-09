# FLOW COMPLET : INTENTION → QUIZ → LOADING → RESULTS

---

## 📋 VUE D'ENSEMBLE

### Objectif
Personnaliser l'expérience utilisateur en lui recommandant **1 à 2 quêtes parisiennes** basées sur :
- Son **intention du jour** (état d'esprit)
- Ses **préférences** (ambiance, moment, style de déplacement)

### Étapes du flow
1. **Intention** — Capturer l'état d'esprit du visiteur
2. **Quiz** — 3 questions rapides pour affiner le profil
3. **Loading** — Transition visuelle pendant le calcul
4. **Results** — Recommandations personnalisées avec 1-2 quêtes

---

## 🎯 ÉTAPE 1 : INTENTION

### Fichier
`/components/Intention.tsx`

### Contenu de l'écran

#### Question principale
```
Quelle est votre intention pour Paris aujourd'hui?
```

#### Options (4 chips de sélection)
1. **CALME**
2. **ÉMERVEILLEMENT**
3. **CURIOSITÉ**
4. **CONNEXION**

#### Alternative personnalisée
- Divider visuel : "ou"
- Textarea libre : "Votre intention personnelle"
- Placeholder : "Décrivez votre intention en vos propres mots..."

### Logique technique

```typescript
interface IntentionProps {
  onContinue: (intention: string) => void;
  onBack: () => void;
}

const intentionOptions = [
  "CALME",
  "ÉMERVEILLEMENT",
  "CURIOSITÉ",
  "CONNEXION"
];

const handleSubmit = () => {
  if (selectedChip) {
    onContinue(selectedChip);  // Ex: "CALME"
  } else if (customText.trim()) {
    onContinue(customText);     // Ex: "Je veux me perdre sans plan"
  }
};
```

### État capturé
- **Type** : `string`
- **Valeur** : Soit une option prédéfinie, soit texte libre
- **Utilisation actuelle** : Loggée mais non utilisée dans le matching (potentiel futur)

### Design
- **Typographie** : 
  - Titre : serif
  - Chips : sans-serif, uppercase, letterspacing
- **Couleurs** :
  - Sélectionné : `var(--green)` (#003D2C)
  - Non sélectionné : transparent avec border grise
- **Interactions** :
  - Hover : border devient `var(--ink)`, translation +4px
  - Sélection : fond vert, texte blanc

---

## 🎯 ÉTAPE 2 : QUIZ

### Fichier
`/components/Quiz.tsx`

### Structure
- **3 questions**
- **4 réponses possibles par question**
- **Progression visuelle** (barre de progression)
- **Sélection auto-avance** (pas de bouton "Suivant")

### Questions & Réponses

#### Question 1 : Ambiance
```
Quelle ambiance recherchez-vous?
```

| Index | Titre | Détail |
|-------|-------|--------|
| 0 | Artistique & Culturelle | Galeries, ateliers, musées |
| 1 | Gastronomique & Raffinée | Caves, tables, marchés |
| 2 | Paisible & Nature | Jardins, squares, promenades |
| 3 | Vivante & Nocturne | Clubs, bars, scènes |

#### Question 2 : Moment
```
Quel moment préférez-vous?
```

| Index | Titre | Détail |
|-------|-------|--------|
| 0 | Petit Déjeuner | 6h–10h |
| 1 | Après-midi | 14h–18h |
| 2 | Apéritif | 18h–20h |
| 3 | Soirée | 20h–minuit |

#### Question 3 : Style de déplacement
```
Votre style de découverte?
```

| Index | Titre | Détail |
|-------|-------|--------|
| 0 | À pied | Tranquillement |
| 1 | À vélo | Activement |
| 2 | En métro | Efficacement |
| 3 | En taxi | Confortablement |

### Logique technique

```typescript
interface QuizProps {
  onComplete: (answers: number[]) => void;
  onBack: () => void;
}

const handleSelectOption = (optionIndex: number) => {
  setSelectedOption(optionIndex);
  
  setTimeout(() => {
    const newAnswers = [...answers, optionIndex];
    setAnswers(newAnswers);
    
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);  // Question suivante
      setSelectedOption(null);
    } else {
      onComplete(newAnswers);  // Terminé → [0, 2, 1] par exemple
    }
  }, 350);  // Délai pour animation
};
```

### État capturé
- **Type** : `number[]`
- **Longueur** : Toujours 3 éléments
- **Exemple** : `[2, 1, 0]`
  - `[2]` = Paisible & Nature
  - `[1]` = Après-midi
  - `[0]` = À pied

### Design
- **Progression** :
  - 3 barres horizontales (1px de hauteur)
  - Couleur : vert pour complété, gris clair pour à venir
  - Texte : "1 sur 3", "2 sur 3", "3 sur 3"
- **Cartes de réponse** :
  - Border fine (0.5px)
  - Padding généreux (24px)
  - Titre en serif 19px
  - Détail en sans-serif 13px, opacity réduite
  - Animation : border change au hover, translation +4px

---

## 🎯 ÉTAPE 3 : LOADING

### Fichier
`/components/Loading.tsx`

### Contenu
- **Spinner minimal** :
  - Cercle 48px × 48px
  - Border 0.5px gris clair
  - Border-top vert (accent)
  - Animation : rotation 1.2s linear infinite
- **Texte** :
  - "Préparation de votre sélection..."
  - Fade pulse animation (2s)
- **Ligne décorative** :
  - 80px de large, 0.5px de hauteur

### Durée
- **2 secondes** (définie dans App.tsx)

```typescript
setTimeout(() => setCurrentScreen('results'), 2000);
```

### Design
- **Fond** : `var(--paper)` (#FAF8F2)
- **Typographie** : Serif, italic, 19px
- **Animations** :
  - Spinner : rotation continue
  - Texte : fade pulse (opacity 0.3 → 1 → 0.3)

---

## 🎯 ÉTAPE 4 : RESULTS

### Fichier
`/components/Results.tsx`

### Logique de recommandation

#### 1. **Mapping Quiz → Profil**

Fichier : `/data/travel-profiles.ts`

```typescript
export function getProfileFromQuizAnswers(answers: number[]): TravelProfile {
  const [ambiance, moment, style] = answers;

  // Paisible + À pied = Calme & Contemplatif
  if (ambiance === 2 && style === 0) {
    return TRAVEL_PROFILES[0]; // calme_contemplatif
  }

  // Artistique + À pied/En métro = Explorateur Curieux
  if (ambiance === 0 && (style === 0 || style === 2)) {
    return TRAVEL_PROFILES[1]; // explorateur_curieux
  }

  // Gastronomique = Épicurien Urbain
  if (ambiance === 1) {
    return TRAVEL_PROFILES[2]; // epicurien_urbain
  }

  // À vélo / Vivante = Horizon & Perspective
  if (style === 1 || ambiance === 3) {
    return TRAVEL_PROFILES[3]; // horizon_perspective
  }

  // Fallback intelligent selon ambiance dominante
  if (ambiance === 2) return TRAVEL_PROFILES[0]; // Paisible
  if (ambiance === 0) return TRAVEL_PROFILES[1]; // Artistique
  if (ambiance === 1) return TRAVEL_PROFILES[2]; // Gastronomique
  
  return TRAVEL_PROFILES[3]; // Vivante
}
```

#### 2. **Les 4 profils de voyage**

| ID | Archétype | Intro | Tags désirés | Tags évités | Nb quêtes |
|----|-----------|-------|--------------|-------------|-----------|
| `calme_contemplatif` | Le Méditatif | "Paris vous propose des refuges calmes..." | calme, contemplatif, nature, gratuit, intérieur, architecture | sportif, vivant, long | **2** |
| `explorateur_curieux` | L'Archiviste | "Paris dévoile ses archives secrètes..." | historique, mystère, mémoire, architecture, profond, art | vivant, gourmand | **2** |
| `epicurien_urbain` | Le Sybarite | "Le Paris des sens vous attend..." | gourmand, partage, vivant, historique, central | sportif, long, nature | **1** |
| `horizon_perspective` | Le Géomètre | "Prenez de la hauteur..." | élévation, vue, extérieur, architecture, sportif, panoramique | intérieur, calme | **1** |

#### 3. **Système de scoring**

Fichier : `/utils/questMatching.ts`

```typescript
export function scoreQuestForProfile(quest: EnrichedQuest, profile: TravelProfile): QuestScore {
  let score = 0;
  const matchedTags: string[] = [];

  // +10 points par tag désiré matché
  profile.desiredTags.forEach(desiredTag => {
    if (quest.tags.includes(desiredTag)) {
      score += 10;
      matchedTags.push(desiredTag);
    }
  });

  // -15 points par tag à éviter matché
  if (profile.avoidTags) {
    profile.avoidTags.forEach(avoidTag => {
      if (quest.tags.includes(avoidTag)) {
        score -= 15;
      }
    });
  }

  // +20 points bonus si l'archétype résonne
  const archetypeBonus = {
    'calme_contemplatif': ['Seuil', 'Refuge'],
    'explorateur_curieux': ['Mémoire', 'Liberté'],
    'epicurien_urbain': ['Partage'],
    'horizon_perspective': ['Élévation', 'Liberté']
  };

  const bonusArchetypes = archetypeBonus[profile.id] || [];
  if (bonusArchetypes.includes(quest.archetype)) {
    score += 20;
  }

  // Normaliser entre 0 et 100
  score = Math.max(0, Math.min(100, score));

  return { quest, score, matchedTags };
}

export function getRecommendedQuests(
  allQuests: EnrichedQuest[],
  profile: TravelProfile
): QuestScore[] {
  const scoredQuests = allQuests.map(quest => 
    scoreQuestForProfile(quest, profile)
  );

  const sorted = scoredQuests.sort((a, b) => b.score - a.score);
  
  return sorted.slice(0, profile.recommendedCount);
}
```

### Contenu de l'écran Results

#### Header
```
VOTRE ARCHÉTYPE
Le Méditatif

"Aujourd'hui, Paris vous propose des refuges calmes, 
des seuils secrets où le temps suspend son cours."

2 quêtes sélectionnées pour votre profil
```

#### Cartes de quêtes (1-2 quêtes)

Pour chaque quête recommandée :

```
┌─────────────────────────────────────────┐
│ ARCHÉTYPE — Seuil                       │
├─────────────────────────────────────────┤
│                                         │
│ La Quête des Passages Couverts         │
│ Sous les verrières du XIXe siècle      │
│                                         │
│ GRATUIT · CENTRAL · CONTEMPLATIF · 2KM │
│                                         │
│ Une flânerie sous les verrières du     │
│ XIXe siècle, où Paris protège encore   │
│ ses galeries marchandes couvertes...   │
│                                         │
│ ┌─────────────────────────────────┐   │
│ │ "Paris est un véritable océan.  │   │
│ │ Jetez-y la sonde, vous n'en     │   │
│ │ connaîtrez jamais la profondeur."│   │
│ │                                  │   │
│ │         — HONORÉ DE BALZAC       │   │
│ └─────────────────────────────────┘   │
│                                         │
│ MINI-QUÊTE                              │
│ Trouvez le plus vieux café encore en   │
│ activité sous une galerie couverte.    │
│                                         │
│ [Voir l'itinéraire complet (2h30)]    │
│ [Ajouter à Mon Codex]                  │
│                                         │
└─────────────────────────────────────────┘
```

#### Chaque carte contient :
1. **Tag archétype** (small-caps, vert)
2. **Titre** (serif, large)
3. **Sous-titre poétique** (italic)
4. **Badges** :
   - Coût (ex: GRATUIT, ABORDABLE)
   - Environnement (ex: CENTRAL, PÉRIPHÉRIQUE)
   - Rythme (ex: CONTEMPLATIF, SPORTIF)
   - Distance (ex: 2KM, 5KM)
5. **Description curatoriale** (paragraph descriptif)
6. **Citation littéraire** (box avec border pointillée)
7. **Mini-Quête** (petit défi optionnel)
8. **Boutons d'action** :
   - CTA principal : "Voir l'itinéraire complet (durée)" → Ouvre Google Maps
   - CTA secondaire : "Ajouter à Mon Codex" (optionnel)

#### Footer
```
"Ces quêtes ont été sélectionnées spécifiquement pour votre profil."

"Pour découvrir toutes les quêtes disponibles, 
explorez le catalogue complet."

[Voir Mon Codex]
```

---

## 📊 DONNÉES ÉCHANGÉES

### Flow de données complet

```typescript
// App.tsx (orchestrateur)
const [quizAnswers, setQuizAnswers] = useState<number[]>([]);

// INTENTION
<Intention 
  onContinue={(intention: string) => {
    console.log('Intention:', intention);
    setCurrentScreen('quiz');
  }} 
/>

// QUIZ
<Quiz 
  onComplete={(answers: number[]) => {
    setQuizAnswers(answers);  // Ex: [2, 1, 0]
    setCurrentScreen('loading');
    setTimeout(() => setCurrentScreen('results'), 2000);
  }} 
/>

// LOADING
<Loading />  // Aucune prop

// RESULTS
<Results 
  answers={quizAnswers}  // [2, 1, 0]
  onBack={() => setCurrentScreen('quiz')}
  onExperienceSelect={(id: string) => {...}}
  onViewCodex={() => setCurrentScreen('codex')}
/>
```

### Transformation des données dans Results

```typescript
// 1. Mapping Quiz → Profil
const profile = getProfileFromQuizAnswers(answers);
// Résultat: { 
//   id: 'calme_contemplatif',
//   archetypeName: 'Le Méditatif',
//   introText: '...',
//   desiredTags: ['calme', 'contemplatif', 'nature', ...],
//   recommendedCount: 2
// }

// 2. Récupération de toutes les quêtes
const allQuests = getAllEnrichedQuests();
// Résultat: EnrichedQuest[] (9 quêtes au total)

// 3. Scoring et recommandation
const recommendedQuests = getRecommendedQuests(allQuests, profile);
// Résultat: QuestScore[] (2 quêtes triées par score)
// [
//   { quest: {...}, score: 70, matchedTags: ['calme', 'contemplatif', 'gratuit'] },
//   { quest: {...}, score: 50, matchedTags: ['nature', 'calme'] }
// ]

// 4. Affichage
recommendedQuests.map(questScore => {
  const quest = questScore.quest;
  // Render quest.title, quest.curatedDescription, quest.quote, etc.
})
```

---

## 🎨 DESIGN SYSTEM UTILISÉ

### Couleurs
- **Paper** : `#FAF8F2` (fond parchemin crème)
- **Ink** : `#1B1B1B` (texte principal)
- **Green** : `#003D2C` (accent vert profond)
- **Gold** : `#C1A46B` (accent doré)
- **Grey Light** : `#E8E5DE` (borders)

### Typographie
- **Serif** : Cormorant Garamond (titres, texte principal)
- **Sans-serif** : Inter (labels, small-caps)

### Espacements
- `--space-xs`: 4px
- `--space-sm`: 8px
- `--space-md`: 16px
- `--space-lg`: 24px
- `--space-xl`: 40px
- `--space-xxl`: 64px

### Borders
- `--border-thin`: 0.5px
- `--border-medium`: 1px

---

## 🔄 PARCOURS ALTERNATIFS

### Retour arrière
- **Intention** → Retour → Landing
- **Quiz Q2/Q3** → Retour → Question précédente
- **Quiz Q1** → Retour → Intention
- **Results** → Retour → Quiz (recommence le quiz)

### Navigation depuis Results
- **Voir l'itinéraire complet** → Ouvre Google Maps (nouvelle fenêtre)
- **Ajouter à Mon Codex** → (Fonctionnalité désactivée actuellement)
- **Voir Mon Codex** → Écran Codex (ancien système, non intégré au flow actuel)

---

## 🧪 EXEMPLES DE SCÉNARIOS

### Scénario 1 : Utilisateur calme
**Input** :
- Intention : "CALME"
- Quiz : [2, 1, 0] (Paisible, Après-midi, À pied)

**Output** :
- Profil : **Le Méditatif** (calme_contemplatif)
- Quêtes recommandées : **2 quêtes**
  - Probablement : "Quête des Jardins Secrets" + "Quête des Passages Couverts"
  - Tags matchés : calme, contemplatif, nature, gratuit

### Scénario 2 : Utilisateur gastronome
**Input** :
- Intention : "ÉMERVEILLEMENT"
- Quiz : [1, 2, 0] (Gastronomique, Apéritif, À pied)

**Output** :
- Profil : **Le Sybarite** (epicurien_urbain)
- Quêtes recommandées : **1 quête signature**
  - Probablement : "Quête des Caves & Tables"
  - Tags matchés : gourmand, partage, vivant

### Scénario 3 : Utilisateur explorateur
**Input** :
- Intention : "CURIOSITÉ"
- Quiz : [0, 1, 2] (Artistique, Après-midi, En métro)

**Output** :
- Profil : **L'Archiviste** (explorateur_curieux)
- Quêtes recommandées : **2 quêtes**
  - Probablement : "Quête de la Commune" + "Quête des Ateliers"
  - Tags matchés : historique, mystère, mémoire, art

### Scénario 4 : Utilisateur sportif
**Input** :
- Intention : "CONNEXION"
- Quiz : [3, 3, 1] (Vivante, Soirée, À vélo)

**Output** :
- Profil : **Le Géomètre** (horizon_perspective)
- Quêtes recommandées : **1 quête signature**
  - Probablement : "Quête des Collines"
  - Tags matchés : élévation, vue, sportif, panoramique

---

## ⚠️ LIMITATIONS ACTUELLES

### Non implémenté
1. **Intention non utilisée dans le matching** — Actuellement loggée mais pas exploitée. Potentiel : filtrer ou booster certaines quêtes selon l'état émotionnel.

2. **Question 2 (Moment) non utilisée** — La variable `moment` est capturée mais ignorée dans le mapping profil. Pourrait être utilisée pour filtrer par horaires d'ouverture ou ambiance temporelle.

3. **"Ajouter à Mon Codex" non fonctionnel** — Le bouton existe mais `onQuestSelect` n'est pas branché.

4. **Score de match caché** — Le score de correspondance (ex: 70%) n'est pas affiché (commenté dans le code). Pourrait être affiché pour transparence.

### Améliorations possibles
1. **Intégrer l'intention** dans le scoring (boost émotionnel)
2. **Utiliser le moment** pour filtrer par horaires
3. **Afficher le score** de correspondance (opt-in transparence)
4. **Permettre re-quiz** sans revenir en arrière
5. **Sauvegarder le profil** pour personnalisation future

---

## 📦 FICHIERS CONCERNÉS

### Composants
- `/components/Intention.tsx` — Capture intention
- `/components/Quiz.tsx` — 3 questions
- `/components/Loading.tsx` — Transition
- `/components/Results.tsx` — Affichage recommandations

### Data & Logic
- `/data/travel-profiles.ts` — 4 profils avec tags
- `/data/quests-enriched.ts` — 9 quêtes enrichies
- `/utils/questMatching.ts` — Moteur de scoring

### Orchestration
- `/App.tsx` — Gestion du flow et état global

---

## 🎯 RÉSUMÉ EXÉCUTIF

### Ce qui fonctionne
✅ Capture d'intention (4 options + texte libre)  
✅ Quiz 3 questions (ambiance, moment, style)  
✅ Mapping Quiz → Profil (4 archétypes)  
✅ Scoring intelligent des quêtes (tags + archétypes)  
✅ Recommandation personnalisée (1-2 quêtes)  
✅ Affichage éditorial des résultats  

### Ce qui pourrait être amélioré
⚠️ Utiliser l'intention dans le matching  
⚠️ Exploiter la question "Moment"  
⚠️ Brancher "Ajouter à Mon Codex"  
⚠️ Afficher le score de correspondance  
⚠️ Sauvegarder le profil utilisateur  

---

**Voilà le flow complet de Intention à Results, prêt à être analysé par une autre IA ou un·e designer·euse !** 🏛✨
