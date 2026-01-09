# 🎨 BRIEF FIGMA — V1 FINALE

**Projet :** Petit Souvenir — Édition Hôtel  
**Date :** 2025-01-13  
**Destination :** Maquettes Figma pour production  

---

## 🎯 OBJECTIF

Créer les maquettes Figma **EXACTES** pour l'intégration V1.

**Principe directeur :**
> "Cette interface doit pouvoir exister imprimée sans perdre son sens."

---

## 📐 STRUCTURE V1 — 5 ÉCRANS

### **1. HOMEPAGE — Le Grand Hôtel**
### **2. ORIGINE — Manifeste**
### **3. QUÊTES — 3 cartes**
### **4. HISTOIRE — Archives**
### **5. DÉTAIL — Texte + Maps** (3 variations)

---

## 🏛️ 1. HOMEPAGE "LE GRAND HÔTEL"

### **Layout Desktop (1440px) :**

```
┌────────────────────────────────────────────────────────────────┐
│                                                    Quêtes Histoire │ ← Nav discrète
│                                                                    │
│  ┌──────────────┐                                                 │
│  │              │       LE GRAND HÔTEL                            │
│  │              │                                                 │
│  │   [IMAGE     │       Votre Paris commence ici.                │
│  │   LUTÈCE     │                                                 │
│  │   SVG]       │       ┌────────────────────────────┐           │
│  │              │       │  DÉCOUVRIR MON PARIS       │           │
│  │              │       └────────────────────────────┘           │
│  │              │                                                 │
│  │              │       Trois manières de traverser Paris.       │
│  └──────────────┘                                                 │
│                        ┌──────┐ ┌──────┐ ┌──────┐                │
│                        │ORIGINE│ │QUÊTES│ │HISTOIRE│               │
│                        └──────┘ └──────┘ └──────┘                │
│                                                                    │
│                                           Petit Souvenir ←        │
└────────────────────────────────────────────────────────────────┘
```

### **A. IMAGE GAUCHE**
- **Dimensions :** Ratio 3:4 (ex: 400×533px)
- **Contenu :** lutece-hero.svg
- **Background :** #E7E1D8
- **Border :** 1px solid #DBD4C6
- **Padding :** 48px intérieur
- **Opacité SVG :** 85%

### **B. COLONNE DROITE**

#### **Titre :**
```
Le Grand Hôtel
```
- **Font :** Cormorant Garamond
- **Size :** 72px
- **Weight :** 600 (SemiBold)
- **Color :** #1A1A1A
- **Line-height :** 1.1
- **Letter-spacing :** -0.02em
- **Margin-bottom :** 32px

#### **Phrase de seuil :**
```
Votre Paris commence ici.
```
- **Font :** Cormorant Garamond
- **Size :** 24px
- **Weight :** 400 (Regular)
- **Style :** Italic
- **Color :** #1A1A1A
- **Opacity :** 80%
- **Line-height :** 1.6
- **Margin-bottom :** 48px

#### **CTA Principal :**
```
┌────────────────────────────┐
│   DÉCOUVRIR MON PARIS      │
└────────────────────────────┘
```
- **Background :** #003D2C
- **Color :** #FAF8F2
- **Padding :** 20px 48px
- **Font :** Inter
- **Size :** 13px
- **Weight :** 500
- **Letter-spacing :** 0.15em
- **Transform :** UPPERCASE
- **Border :** None
- **Border-radius :** 0px (angles droits)
- **Hover :** Background #00543D + translateY(-2px) + shadow

#### **Sous-titre discret :**
```
Trois manières de traverser Paris.
```
- **Font :** Cormorant Garamond
- **Size :** 14px
- **Weight :** 400
- **Style :** Italic
- **Color :** #1A1A1A
- **Opacity :** 40%
- **Margin-top :** 24px
- **Margin-bottom :** 48px

#### **3 CARTES ÉDITORIALES :**
```
┌─────────────┐  ┌─────────────┐  ┌─────────────┐
│   ORIGINE   │  │   QUÊTES    │  │  HISTOIRE   │
│             │  │             │  │             │
│ Manifeste · │  │ Lutèce ·    │  │ Archives ·  │
│ Geste ·     │  │ 1789 ·      │  │ Récits ·    │
│ Fondation   │  │ Table       │  │ Mémoire     │
└─────────────┘  └─────────────┘  └─────────────┘
```

**Specs par carte :**
- **Width :** flex: 1 (égales)
- **Height :** auto
- **Padding :** 24px 16px
- **Border :** 0.5px solid rgba(0, 61, 44, 0.15)
- **Background :** transparent
- **Hover :** background rgba(0, 61, 44, 0.02) + border rgba(0, 61, 44, 0.3)
- **Gap entre cartes :** 16px
- **Align :** center

**Titre carte :**
- **Font :** Cormorant Garamond
- **Size :** 16px
- **Weight :** 600
- **Color :** #1A1A1A
- **Margin-bottom :** 8px

**Sous-titre carte :**
- **Font :** Inter
- **Size :** 9px
- **Weight :** 400
- **Letter-spacing :** 0.1em
- **Transform :** UPPERCASE
- **Color :** #003D2C
- **Opacity :** 50%

### **C. NAVIGATION TOP RIGHT**
```
Quêtes    Histoire
```
- **Position :** absolute top-right
- **Padding :** 48px
- **Gap :** 32px
- **Font :** Inter
- **Size :** 11px
- **Letter-spacing :** 0.08em
- **Transform :** UPPERCASE
- **Color :** #003D2C
- **Opacity :** 60%
- **Hover :** opacity 100%

### **D. SIGNATURE BOTTOM RIGHT**
```
Petit Souvenir
```
- **Position :** absolute bottom-right
- **Padding :** 32px
- **Font :** Cormorant Garamond
- **Size :** 18px
- **Color :** #1A1A1A
- **Opacity :** 15%

### **E. GHOST GRID**
- **Pattern :** star8 (géométrie mamluk)
- **Opacity :** 2%
- **Scale :** 1.5
- **Color :** #003D2C
- **Layers :** 2

### **F. BACKGROUND**
- **Color :** #FAF8F2 (parchemin)

---

## 📄 2. PAGE ORIGINE

### **Layout Desktop (1440px) :**

```
┌────────────────────────────────────────────────────────────────┐
│  ← RETOUR                                                       │ ← Header sticky
├────────────────────────────────────────────────────────────────┤
│                                                                    │
│                         ORIGINE                                    │
│                                                                    │
│               Paris comme geste fondateur                          │
│                                                                    │
│                      ──────────                                   │
│                                                                    │
│   Paris n'est pas une destination. Paris est un geste            │
│   fondateur.                                                      │
│                                                                    │
│   Ce projet ne vous guidera pas. Il ne vous dira pas où          │
│   aller, quoi voir, comment vous déplacer. Il vous propose       │
│   trois portes — trois manières de traverser la ville —          │
│   et vous laisse marcher.                                        │
│                                                                    │
│   [... texte long manifeste 10+ paragraphes ...]                 │
│                                                                    │
│                      ──────────                                   │
│                                                                    │
│              Petit Souvenir — Édition Hôtel                       │
│                                                                    │
└────────────────────────────────────────────────────────────────┘
```

### **Specs :**

**Header sticky :**
- **Background :** rgba(250, 248, 242, 0.95) + blur(8px)
- **Border-bottom :** 0.5px solid rgba(0, 61, 44, 0.1)
- **Padding :** 24px 48px
- **Button :** ← RETOUR (Inter 11px uppercase, #003D2C, opacity 60%)

**Article container :**
- **Max-width :** 680px
- **Margin :** 0 auto
- **Padding :** 96px 48px

**Titre :**
- **Font :** Cormorant Garamond
- **Size :** 56px
- **Weight :** 600
- **Color :** #1A1A1A
- **Text-align :** center
- **Margin-bottom :** 16px

**Sous-titre :**
- **Font :** Inter
- **Size :** 12px
- **Letter-spacing :** 0.12em
- **Transform :** UPPERCASE
- **Color :** #003D2C
- **Opacity :** 60%
- **Text-align :** center
- **Margin-bottom :** 64px

**Ligne décorative :**
- **Width :** 80px
- **Height :** 1px
- **Background :** linear-gradient(to right, transparent, #003D2C, transparent)
- **Opacity :** 20%
- **Margin :** 0 auto 96px

**Paragraphes :**
- **Font :** Cormorant Garamond
- **Size :** 19px
- **Weight :** 400
- **Line-height :** 1.75
- **Color :** #1A1A1A
- **Opacity :** 90%
- **Margin-bottom :** 32px

**Strong (emphase) :**
- **Weight :** 600

**Italic (citations) :**
- **Style :** italic
- **Opacity :** 70%

**Signature :**
- **Border-top :** 0.5px solid rgba(0, 61, 44, 0.1)
- **Padding-top :** 48px
- **Margin-top :** 96px
- **Font :** Cormorant Garamond
- **Size :** 18px
- **Color :** #1A1A1A
- **Opacity :** 30%
- **Style :** italic
- **Text-align :** center

**Ghost Grid :**
- **Pattern :** octagon
- **Opacity :** 1.5%
- **Scale :** 1.2
- **Rotation :** 15deg

---

## 📚 3. PAGE HISTOIRE

### **Layout identique à ORIGINE mais :**

**Max-width :** 720px (plus large pour texte historique)

**6 SECTIONS chronologiques :**

```
┌────────────────────────────────────────────────────────────────┐
│                         HISTOIRE                                  │
│               Archives parisiennes                                │
│                      ──────────                                   │
│                                                                    │
│  I. 52 AV. J.-C.                                                  │
│  Lutèce — Le geste fondateur                                      │
│  [Texte 3 paragraphes]                                           │
│                                                                    │
│  II. 987–1453                                                     │
│  La ville médiévale — Fortifications & cathédrale                │
│  [Texte 3 paragraphes]                                           │
│                                                                    │
│  III. 1515–1610                                                   │
│  La Renaissance parisienne — Henri IV & le Grand Dessein         │
│  [Texte 3 paragraphes]                                           │
│                                                                    │
│  [... etc pour 6 sections ...]                                   │
│                                                                    │
└────────────────────────────────────────────────────────────────┘
```

### **Specs sections :**

**Numéro de section :**
- **Font :** Inter
- **Size :** 10px
- **Letter-spacing :** 0.12em
- **Transform :** UPPERCASE
- **Color :** #003D2C
- **Opacity :** 50%
- **Margin-bottom :** 16px

**Titre de section :**
- **Font :** Cormorant Garamond
- **Size :** 32px
- **Weight :** 600
- **Line-height :** 1.2
- **Color :** #1A1A1A
- **Margin-bottom :** 32px

**Paragraphes de section :**
- **Font :** Cormorant Garamond
- **Size :** 17px
- **Weight :** 400
- **Line-height :** 1.7
- **Color :** #1A1A1A
- **Opacity :** 85%
- **Margin-bottom :** 16px

**Espacement entre sections :**
- **Margin-bottom :** 96px

**Ghost Grid :**
- **Pattern :** cross
- **Opacity :** 1.5%
- **Scale :** 1.3
- **Rotation :** 0deg

---

## 🗺️ 4. PAGE QUÊTES

### **Layout Desktop (1440px) :**

```
┌────────────────────────────────────────────────────────────────┐
│  ← RETOUR                                                       │
├────────────────────────────────────────────────────────────────┤
│                                                                    │
│                      Trois portes                                 │
│                                                                    │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐           │
│  │              │  │              │  │              │           │
│  │  [IMAGE      │  │  [IMAGE      │  │  [IMAGE      │           │
│  │   LUTÈCE]    │  │   1789]      │  │   TABLE]     │           │
│  │              │  │              │  │              │           │
│  ├──────────────┤  ├──────────────┤  ├──────────────┤           │
│  │              │  │              │  │              │           │
│  │ LUTÈCE —     │  │ 1789 —       │  │ VIN & TABLE  │           │
│  │ ORIGINE      │  │ DÉCISION     │  │              │           │
│  │              │  │              │  │ Vie Parisienne│          │
│  │ Fondation ·  │  │ Seuil ·      │  │              │           │
│  │ Geste ·      │  │ Révolution · │  │ Nourriture · │           │
│  │ Mesure       │  │ Passage      │  │ Corps ·      │           │
│  │              │  │              │  │ Ville vivante│           │
│  │ [Texte court]│  │ [Texte court]│  │ [Texte court]│           │
│  │              │  │              │  │              │           │
│  └──────────────┘  └──────────────┘  └──────────────┘           │
│                                                                    │
└────────────────────────────────────────────────────────────────┘
```

### **Specs carte de quête :**

**Container :**
- **Width :** 360px
- **Background :** transparent
- **Border :** 1px solid rgba(0, 61, 44, 0.2)
- **Hover :** border rgba(0, 61, 44, 0.4) + translateY(-4px) + shadow
- **Transition :** all 0.3s ease

**Zone image :**
- **Height :** 400px
- **Background :** #E7E1D8
- **Border-bottom :** 1px solid rgba(0, 61, 44, 0.2)
- **Padding :** 32px
- **Display :** flex center

**Image SVG :**
- **Max-width :** 100%
- **Max-height :** 100%
- **Object-fit :** contain
- **Opacity :** 85%

**Zone texte :**
- **Padding :** 32px

**Titre quête :**
- **Font :** Cormorant Garamond
- **Size :** 28px
- **Weight :** 600
- **Line-height :** 1.2
- **Color :** #1A1A1A
- **Margin-bottom :** 16px

**Registres :**
- **Font :** Inter
- **Size :** 9px
- **Letter-spacing :** 0.1em
- **Transform :** UPPERCASE
- **Color :** #003D2C
- **Opacity :** 60%
- **Margin-bottom :** 24px
- **Separator :** " · " (middot)

**Texte court :**
- **Font :** Cormorant Garamond
- **Size :** 16px
- **Weight :** 400
- **Line-height :** 1.6
- **Color :** #1A1A1A
- **Opacity :** 75%

**Grid layout :**
- **Display :** grid
- **Columns :** 3 (repeat(3, 360px))
- **Gap :** 32px
- **Justify :** center

**Ghost Grid :**
- **Pattern :** star8
- **Opacity :** 2%

---

## 📖 5. PAGES DÉTAIL

### **Layout Desktop (1440px) :**

```
┌────────────────────────────────────────────────────────────────┐
│  ← RETOUR                                                       │
├────────────────────────────────────────────────────────────────┤
│                                                                    │
│  ┌────────────────────────────────────────────────────────────┐  │
│  │                                                            │  │
│  │           [IMAGE SVG PLEINE LARGEUR]                      │  │
│  │                                                            │  │
│  └────────────────────────────────────────────────────────────┘  │
│                                                                    │
│                      LUTÈCE — ORIGINE                             │
│                                                                    │
│                 Fondation · Geste · Mesure                        │
│                                                                    │
│                      ──────────                                   │
│                                                                    │
│   Au commencement, il n'y avait qu'une île. Un geste simple :    │
│   traverser la Seine, s'arrêter au milieu du fleuve, poser       │
│   une pierre. [...]                                              │
│                                                                    │
│   [... texte long 10+ paragraphes ...]                           │
│                                                                    │
│   ┌────────────────────────────┐                                 │
│   │  📍 Voir sur Google Maps   │                                 │
│   └────────────────────────────┘                                 │
│                                                                    │
└────────────────────────────────────────────────────────────────┘
```

### **Specs :**

**Image header :**
- **Width :** 100%
- **Height :** 500px
- **Background :** #E7E1D8
- **Border-bottom :** 1px solid #DBD4C6
- **Padding :** 64px
- **Display :** flex center

**Article container :**
- **Max-width :** 800px
- **Margin :** 0 auto
- **Padding :** 96px 48px

**Titre quête :**
- **Font :** Cormorant Garamond
- **Size :** 48px
- **Weight :** 600
- **Line-height :** 1.2
- **Color :** #1A1A1A
- **Text-align :** center
- **Margin-bottom :** 24px

**Registres :**
- **Font :** Inter
- **Size :** 11px
- **Letter-spacing :** 0.12em
- **Transform :** UPPERCASE
- **Color :** #003D2C
- **Opacity :** 60%
- **Text-align :** center
- **Margin-bottom :** 64px

**Ligne décorative :**
- **Width :** 80px
- **Height :** 1px
- **Background :** linear-gradient(to right, transparent, #003D2C, transparent)
- **Opacity :** 20%
- **Margin :** 0 auto 48px

**Paragraphes :**
- **Font :** Cormorant Garamond
- **Size :** 18px
- **Weight :** 400
- **Line-height :** 1.75
- **Color :** #1A1A1A
- **Opacity :** 90%
- **Margin-bottom :** 28px

**Bouton Google Maps :**
- **Background :** transparent
- **Border :** 1px solid #003D2C
- **Color :** #003D2C
- **Padding :** 16px 32px
- **Font :** Inter
- **Size :** 12px
- **Letter-spacing :** 0.1em
- **Transform :** UPPERCASE
- **Margin-top :** 64px
- **Display :** inline-flex center
- **Gap :** 8px (icône + texte)
- **Hover :** background rgba(0, 61, 44, 0.05)

**Icône Maps :**
- **Size :** 16px
- **Color :** #003D2C

---

## 🎨 DESIGN TOKENS GLOBAUX

### **Couleurs :**
```css
--paper: #FAF8F2;
--green: #003D2C;
--green-hover: #00543D;
--text: #1A1A1A;
--border: rgba(0, 61, 44, 0.15);
--border-hover: rgba(0, 61, 44, 0.3);
--overlay: rgba(0, 61, 44, 0.02);
--divider: rgba(0, 61, 44, 0.1);
```

### **Typographie :**
```css
--font-serif: 'Cormorant Garamond', serif;
--font-sans: 'Inter', sans-serif;
```

### **Espacements :**
```css
--space-xs: 8px;
--space-sm: 16px;
--space-md: 24px;
--space-lg: 32px;
--space-xl: 48px;
--space-xxl: 96px;
```

### **Transitions :**
```css
--transition: 0.3s cubic-bezier(0.4, 0, 0.2, 1);
```

### **Shadows (hover) :**
```css
--shadow-sm: 0 2px 8px rgba(0, 61, 44, 0.1);
--shadow-md: 0 4px 16px rgba(0, 61, 44, 0.15);
--shadow-lg: 0 8px 24px rgba(0, 61, 44, 0.2);
```

---

## 📱 RESPONSIVE (Mobile 375px)

### **Breakpoint :** max-width: 968px

**Homepage :**
- Grid → 1 colonne
- Image au-dessus
- Texte centré
- CTA full width
- Cartes éditoriales stacked verticalement

**Pages texte (Origine, Histoire, Détail) :**
- Padding réduit (24px)
- Font-size réduit (-2px)
- Max-width 100%

**Quêtes :**
- Grid → 1 colonne
- Cartes stacked
- Width 100%

**Navigation :**
- Top nav → Burger menu ou bottom nav
- Padding réduit

---

## ✅ CHECKLIST FIGMA

### **Frames à créer :**
- [ ] Homepage Desktop (1440px)
- [ ] Homepage Mobile (375px)
- [ ] Origine Desktop
- [ ] Origine Mobile
- [ ] Histoire Desktop
- [ ] Histoire Mobile
- [ ] Quêtes Desktop
- [ ] Quêtes Mobile
- [ ] Détail Lutèce Desktop
- [ ] Détail Lutèce Mobile
- [ ] Détail 1789 Desktop
- [ ] Détail 1789 Mobile
- [ ] Détail Table Desktop
- [ ] Détail Table Mobile

### **Composants à créer :**
- [ ] Button CTA (Primary)
- [ ] Button CTA (Secondary / Bordered)
- [ ] Carte éditoriale (Homepage)
- [ ] Carte de quête
- [ ] Header sticky (avec retour)
- [ ] Navigation top right
- [ ] Titre section
- [ ] Paragraphe long
- [ ] Ligne décorative
- [ ] Registres (3 mots-clés)
- [ ] Ghost Grid (3 patterns)

### **Styles à définir :**
- [ ] Colors (7 tokens)
- [ ] Typography (10 styles)
- [ ] Spacing (7 tokens)
- [ ] Effects (3 shadows)

### **Assets à intégrer :**
- [ ] lutece-hero.svg
- [ ] 1789-revolution.svg
- [ ] table-paris.svg
- [ ] Icône Maps (lucide-react)
- [ ] Icône Arrow Left (lucide-react)

---

## 🚀 EXPORT FIGMA

**Format :**
- Dev Mode activé
- Mesures en px
- Export SVG pour images
- Export PNG @2x pour preview

**Annotations :**
- Hovers states
- Transitions
- Ghost Grid (invisible mais documentée)
- Spacing tokens
- Typography specs

---

## 📦 LIVRAISON DESIGN

**Fichiers attendus :**
1. Figma file (.fig)
2. PDF export (toutes frames)
3. SVG assets (3 images)
4. Design tokens (JSON ou CSS)
5. Documentation interactions

---

**Fait le 13 janvier 2025**  
**Brief pour Figma V1**  
**Petit Souvenir — Édition Hôtel**

---

*Ce brief est l'exact reflet de l'implémentation React V1.*
