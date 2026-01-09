# BRIEF FIGMA — LE GRAND HÔTEL V1 (scope fermé)

## ✅ À INTÉGRER TEL QUEL — NE PAS INTERPRÉTER

---

## DÉCISION PRODUIT VALIDÉE

**SUPPRESSION DU QUIZ / QUESTIONNAIRE EN V1**

Ce n'est **pas un oubli**, c'est un **choix éditorial volontaire**.

Le Grand Hôtel ne qualifie pas, ne profile pas, n'oriente pas par algorithme.
Il propose des **portes** et laisse le choix **libre, direct, conscient**.

---

## PRINCIPE DIRECTEUR

L'interface doit pouvoir exister :
- ✅ **Imprimée** (comme un livre)
- ✅ **Sans animation** (comme une gravure)
- ✅ **Sans interaction complexe** (comme un seuil)

**Silence > Fonctionnalités**
**Peu > Trop**
**Présence > Gamification**

---

## NAVIGATION GLOBALE (V1)

```
Homepage
   ↓
Quêtes (3 cartes uniquement)
   ↓
Détail d'une quête
   ↓
Google Maps → marche réelle
```

**Navigation secondaire :**
- Histoire (lecture libre)

**C'EST TOUT.**

---

## 1. HOMEPAGE — TEXTES FINAUX

### Bloc central

**Titre principal :**
```
Le Grand Hôtel
```

**Specs typo :**
- Font : Cormorant Garamond
- Weight : 600 (Semibold)
- Size : 72px desktop / 48px mobile
- Tracking : -0.02em
- Color : #1A1A1A

---

**Phrase de seuil :**
```
Votre Paris commence ici.
```

**Specs typo :**
- Font : Cormorant Garamond
- Style : Italic
- Weight : 400
- Size : 24px desktop / 18px mobile
- Color : #1A1A1A
- Opacity : 0.8

---

**CTA unique :**
```
DÉCOUVRIR MON PARIS
```

**Specs bouton :**
- Background : #003D2C
- Color : #FAF8F2
- Padding : 20px 48px
- Font : Sans-serif
- Font-size : 13px
- Tracking : 0.15em
- Text-transform : UPPERCASE
- Weight : 500
- Hover : #00543D + translateY(-2px)

---

**Ligne discrète (sous le CTA) :**
```
Trois manières de traverser Paris.
```

**Specs typo :**
- Font : Cormorant Garamond
- Style : Italic
- Size : 14px
- Color : #1A1A1A
- Opacity : 0.4

---

### Navigation (en haut à droite, discrète)

```
QUÊTES    HISTOIRE
```

**Specs :**
- Font : Sans-serif
- Size : 11px
- Tracking : 0.08em
- Text-transform : UPPERCASE
- Color : #003D2C
- Opacity : 0.6
- Hover : opacity 1

---

### Signature (coin bas-droite, très discrète)

```
Petit Souvenir
```

**Specs :**
- Font : Cormorant Garamond
- Size : 18px
- Color : #1A1A1A
- Opacity : 0.15

---

### Image éditoriale (optionnelle)

**Si présente :**
- Format : Vertical (ratio 3:4)
- Placement : À gauche du texte (split 40/60 ou 50/50)
- Style : Gravure, architecture symbolique, figure humaine sobre
- **Pas de carrousel, pas de galerie**

---

### ❌ À RETIRER DE LA HOMEPAGE

- Quiz
- Results
- Loading
- Codex
- Glyphs
- Intention
- Cartes (en tant que section autonome)
- Score / Progression
- "Comment ça marche"
- Liste de fonctionnalités
- Vidéo de démo

---

## 2. PAGE QUÊTES — 3 CARTES UNIQUEMENT

### Header

**Titre :**
```
Trois manières de traverser Paris
```

**Specs :**
- Font : Cormorant Garamond
- Size : 72px desktop / 48px mobile
- Weight : 600
- Color : #1A1A1A

**Sous-titre :**
```
Choisissez une porte.
```

**Specs :**
- Font : Cormorant Garamond
- Style : Italic
- Size : 20px
- Color : #1A1A1A
- Opacity : 0.6

---

### LES 3 CARTES (et seulement 3)

#### Carte 1 — LUTÈCE

**Titre :**
```
LUTÈCE
```

**Registre (small-caps) :**
```
FONDATION · PRÉSENCE · MESURE
```

**Thème (italic) :**
```
La naissance de Paris, avant la ville
```

**Texte court :**
```
Lutèce, les premiers habitants, le choix du lieu. Le sol, le fleuve, les gestes initiaux.
```

**Image suggérée :**
- Géométrie ascendante
- Construction, fondation
- Sol, fleuve, ancrage

---

#### Carte 2 — 1789

**Titre :**
```
1789
```

**Registre (small-caps) :**
```
DÉCISION · MOUVEMENT · LIBERTÉ
```

**Thème (italic) :**
```
La Révolution comme marche et seuil
```

**Texte court :**
```
Les lieux où l'on décide, pas où l'on exécute. Paris en tension, mais sans violence spectaculaire.
```

**Image suggérée :**
- Mouvement contenu
- Verticalité, ouverture
- Pas d'iconographie sanglante

---

#### Carte 3 — LA TABLE DE PARIS

**Titre :**
```
LA TABLE DE PARIS
```

**Registre (small-caps) :**
```
NOURRITURE · VIN · PAROLE
```

**Thème (italic) :**
```
Manger, boire, parler comme forces historiques
```

**Texte court :**
```
Vins, marchés, guinguettes, habitudes anciennes. Le Paris social, vivant, intense.
```

**Image suggérée :**
- Abondance maîtrisée
- Matière, chaleur
- Présence humaine implicite

---

### Footer discret

```
La quête existe dans la marche, pas dans l'écran.
```

**Specs :**
- Font : Cormorant Garamond
- Style : Italic
- Size : 14px
- Opacity : 0.5

---

## 3. PAGE DÉTAIL QUÊTE

### Structure

1. **Image en tête** (optionnelle, ratio 16:9)
2. **Titre de la quête** (56px, Cormorant Garamond)
3. **Registre** (small-caps, discret)
4. **Texte narratif long** (éditorial, 5-6 paragraphes)
   - Introduction (italic, 22px)
   - Corps (18px, léger)
   - Conclusion (italic, borderLeft)
5. **CTA Google Maps**

---

### CTA final

**Texte au-dessus :**
```
Cette quête existe maintenant dans la marche.
```

**Bouton :**
```
COMMENCER LA MARCHE
```

**Specs :**
- Même style que homepage
- Icône : ExternalLink (lucide-react)
- Ouvre Google Maps dans un nouvel onglet

---

### ❌ Pas de

- Validation
- Score
- Badge
- Progression
- "Bravo"
- Gamification

---

## 4. SECTION "CARTES" (décision)

**👉 ON ENLÈVE "CARTES" COMME SECTION AUTONOME.**

**Pourquoi :**
- "Carte" suggère exploration, choix, exhaustivité
- Affaiblit la posture éditoriale
- Recrée une logique touristique

**Nouvelle règle :**
- Les cartes sont **intégrées dans les quêtes**
- Une carte = **une page éditoriale de quête**
- Pas de carte globale interactive en V1

**👉 Menu "Cartes" supprimé**

---

## 5. SECTION "HISTOIRE"

**Rôle :**
- Espace éditorial, pas pédagogique
- Histoire quotidienne, fragments, anecdotes

**Position :**
- Accessible depuis homepage (navigation discrète)
- Secondaire par rapport aux quêtes
- Lecture libre

---

## 6. ÉLÉMENTS SUPPRIMÉS (V1)

Ces éléments **ne structurent pas l'expérience V1** :

❌ Quiz
❌ Codex
❌ Glyphs
❌ Résultats
❌ Parcours complexes
❌ Profiling utilisateur
❌ Scoring
❌ Loading screens
❌ Badges / Achievements

**Ils peuvent exister en V2 ou en maquettes internes.**
**Mais pas visibles en V1.**

---

## SCHÉMA DE NAVIGATION FINAL

```
Homepage
    ↓
    CTA "Découvrir mon Paris"
    ↓
Quêtes (3 cartes)
    ↓
    Clic sur une carte
    ↓
Page de détail (texte long)
    ↓
    CTA "Commencer la marche"
    ↓
Google Maps
    ↓
Marche réelle


Histoire (accessible depuis homepage, secondaire)
    ↓
Lecture libre
```

**C'EST TOUT.**

---

## PALETTE & TYPO (rappel)

**Couleurs :**
- Background : #FAF8F2 (parchemin crème)
- Texte principal : #1A1A1A
- Accent : #003D2C (vert profond)
- Bordures : #DBD4C6

**Typographie :**
- Titres : Cormorant Garamond (serif)
- UI : Sans-serif système (Helvetica/Arial)
- Small-caps : tracking 0.15-0.2em

---

## COMPORTEMENTS HOVER

**Boutons principaux :**
- Background : #003D2C → #00543D
- Transform : translateY(-2px)
- Box-shadow : 0 8px 24px rgba(0, 61, 44, 0.3)

**Navigation discrète :**
- Opacity : 0.6 → 1

---

## RESPONSIVE (mobile)

**Homepage :**
- Titre : 48px (pas 72px)
- Phrase : 18px (pas 24px)
- CTA : pleine largeur
- Image : passe au-dessus du texte

**Quêtes :**
- Cartes : 1 colonne (pas 3)

---

## TONALITÉ GÉNÉRALE

**Ce que cette interface dit :**
- Vous êtes arrivé quelque part
- Ce lieu vous attend
- Vous allez choisir librement
- Paris n'est pas un catalogue

**Ce qu'elle NE dit PAS :**
- "Testez votre profil"
- "Découvrez tous nos parcours"
- "Créez votre compte"
- "Commencez votre aventure"

---

## VERDICT STRATÉGIQUE

Ce scope :
- ✅ Respecte la ville
- ✅ Respecte l'intelligence du visiteur
- ✅ Crée une expérience **rare**
- ✅ Distingue radicalement du tourisme classique

**Tu ne guides pas.**
**Tu ouvres.**

---

## FILES DE RÉFÉRENCE (code déjà implémenté)

- `/components/HomepageV1.tsx` — Textes finaux intégrés
- `/components/QuetesV1.tsx` — 3 cartes verrouillées
- `/components/QueteDetail.tsx` — Pages narratives longues
- `/AppV1.tsx` — Navigation 3 écrans
- `/HOMEPAGE_TEXTES_FINAUX.md` — Specs complètes

---

**Date :** 2025-01-13
**Version :** V1 Minimaliste
**Projet :** Le Grand Hôtel — Petit Souvenir · CityNodes Paris

---

*On n'explique pas un seuil. On le traverse.*
