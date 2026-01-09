# ✅ INTÉGRATION IMAGES COMPLÈTE — V1

## 🎨 IMAGES INTÉGRÉES

### **3 SVG éditoriaux créés et intégrés :**

1. **`/assets/lutece-hero.svg`**
   - Figure plantant / geste fondateur
   - Mandala géométrique en arrière-plan
   - Symbolique : Fondation, ancrage, origine
   - **Utilisé dans :**
     - Homepage (image principale verticale)
     - Carte Quêtes Lutèce
     - Page Détail Lutèce

2. **`/assets/table-paris.svg`**
   - Pain, vin, verre
   - Colonnade classique en arrière-plan
   - Symbolique : Nourriture, convivialité, table
   - **Utilisé dans :**
     - Carte Quêtes Table de Paris
     - Page Détail Table de Paris

3. **`/assets/1789-revolution.svg`**
   - Colonnade en perspective
   - Arbre organique (nature + architecture)
   - Symbolique : Mouvement, liberté, passage
   - **Utilisé dans :**
     - Carte Quêtes 1789
     - Page Détail 1789

---

## 📋 COMPOSANTS MIS À JOUR

### ✅ **`HomepageV1.tsx`**
```tsx
import luteceHero from '../assets/lutece-hero.svg';

// Image intégrée (vertical, 3:4)
<img src={luteceHero} alt="Lutèce — Geste fondateur" />
```

**Effet visuel :**
- Opacity : 0.85
- ObjectFit : contain
- Padding : var(--space-xl)
- Background : #E7E1D8

---

### ✅ **`QuetesV1.tsx`**
```tsx
import luteceImg from '../assets/lutece-hero.svg';
import tableImg from '../assets/table-paris.svg';
import revolutionImg from '../assets/1789-revolution.svg';

const QUETES: QueteCard[] = [
  { id: 'lutece', image: luteceImg, ... },
  { id: '1789', image: revolutionImg, ... },
  { id: 'table', image: tableImg, ... }
];
```

**Effet visuel (cartes) :**
- AspectRatio : 4/3
- Opacity : 0.8
- ObjectFit : contain
- Padding : var(--space-lg)
- Background : #E7E1D8

---

### ✅ **`QueteDetail.tsx`**
```tsx
import luteceImg from '../assets/lutece-hero.svg';
import tableImg from '../assets/table-paris.svg';
import revolutionImg from '../assets/1789-revolution.svg';

const QUETES_DATA: Record<string, QueteData> = {
  lutece: { image: luteceImg, ... },
  '1789': { image: revolutionImg, ... },
  table: { image: tableImg, ... }
};
```

**Effet visuel (détail) :**
- AspectRatio : 16/9
- Opacity : 0.75
- ObjectFit : contain
- Padding : var(--space-lg)
- Background : #E7E1D8

---

## 🎯 MAPPING IMAGES → QUÊTES

| Quête | Image | Symbolique |
|-------|-------|------------|
| **Lutèce** | `lutece-hero.svg` | Figure plantant + mandala → Fondation, ancrage, origine |
| **1789** | `1789-revolution.svg` | Colonnade + arbre → Mouvement, nature, liberté |
| **Table** | `table-paris.svg` | Pain + vin + colonnes → Nourriture, convivialité, abondance |

---

## 🎨 STYLE VISUEL UNIFIÉ

### **Palette des images :**
- Traits : #003D2C (vert profond)
- Traits secondaires : #1A1A1A (noir doux)
- Accents : #8B0000 (vin)
- Opacité générale : 0.1 - 0.8
- Background : #E7E1D8 (crème neutre)

### **Caractéristiques communes :**
- ✅ Gravure éditoriale
- ✅ Géométrie mamluk subtile
- ✅ Architecture classique
- ✅ Figures humaines symboliques
- ✅ Pas de photo, pas de réalisme
- ✅ Peut exister imprimé

---

## 🚀 RÉSULTATS

### **Homepage**
- ✅ Image Lutèce en position héroïque (gauche)
- ✅ Format vertical respecté (3:4)
- ✅ Gravure éditoriale cohérente avec le titre "Le Grand Hôtel"

### **Page Quêtes**
- ✅ 3 images distinctes, une par carte
- ✅ Format paysage (4:3)
- ✅ Hover fonctionnel avec lift + border vert

### **Pages Détail**
- ✅ Images en tête (16:9 cinéma)
- ✅ Cohérence visuelle avec les cartes
- ✅ Respiration autour du texte narratif

---

## 📐 SPECS TECHNIQUES

### **Formats SVG :**
- **Lutèce :** 400x533px (vertical)
- **Table :** 533x400px (paysage)
- **1789 :** 533x400px (paysage)

### **Imports React :**
```tsx
import imageFile from '../assets/image-name.svg';
```

### **Usage :**
```tsx
<img src={imageFile} alt="Description" style={{ ... }} />
```

**Pas de :**
- ❌ `figma:asset` (images custom, pas importées Figma)
- ❌ `require()` (utilise ES6 import)
- ❌ Base64 inline (fichiers séparés)

---

## ✅ CHECKLIST FINALE

- [x] 3 SVG créés dans `/assets`
- [x] Homepage avec image Lutèce
- [x] Quêtes avec 3 images différentes
- [x] Détails avec images correspondantes
- [x] Import React fonctionnel
- [x] Opacity et styles appliqués
- [x] Cohérence visuelle parchemin/gravure
- [x] Peut exister imprimé
- [x] Pas de dépendance figma:asset

---

## 🎭 PHILOSOPHIE VISUELLE RESPECTÉE

**Ces images sont :**
- ✅ Symboliques, pas illustratives
- ✅ Géométriques, pas décoratives
- ✅ Architecturales, pas touristiques
- ✅ Gravées, pas photographiées
- ✅ Éditorialespas promotionnelles

**Elles peuvent :**
- ✅ Être imprimées dans un livre
- ✅ Exister en noir & blanc
- ✅ Être agrandies sans perte de sens
- ✅ Coexister avec Cormorant Garamond
- ✅ Supporter le fond parchemin #FAF8F2

---

## 📦 PROCHAINES ÉTAPES (optionnel)

### **Si besoin d'amélioration visuelle :**
1. **Remplacer les SVG par tes propres gravures**
   - Même format (vertical pour Lutèce, paysage pour autres)
   - Même naming (`lutece-hero.svg`, etc.)
   - Drop dans `/assets`
   - Les imports fonctionneront automatiquement

2. **Ajouter des images détail supplémentaires**
   - Créer `/assets/lutece-detail.svg` (16:9)
   - Idem pour 1789 et Table
   - Adapter le code dans `QueteDetail.tsx`

3. **Créer des variations hover**
   - Opacity plus forte au survol
   - Transformation légère
   - Animation subtile

---

## 🎯 LIVRAISON

**Statut :** ✅ **COMPLET**

**3 écrans fonctionnels avec images intégrées :**
1. Homepage Le Grand Hôtel ✅
2. Quêtes (3 cartes) ✅
3. Détails (3 pages) ✅

**Esthétique :**
- Parchemin crème ✅
- Gravure éditoriale ✅
- Géométrie mamluk ✅
- Typographie Cormorant Garamond ✅
- Silence, respiration, monumentalité ✅

---

**Date :** 2025-01-13
**Version :** V1 avec images intégrées
**Projet :** Le Grand Hôtel — Petit Souvenir · CityNodes Paris

---

*On n'explique pas un seuil. On le traverse.*
*Maintenant, avec des images qui existent.*
