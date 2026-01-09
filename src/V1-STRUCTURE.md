# ARCHÉ — Version 1 Minimaliste

## 🏛️ Architecture

**3 écrans uniquement** — Silence, profondeur, monumentalité

```
Homepage (HomepageV1.tsx)
    ↓
Quêtes (QuetesV1.tsx) — 3 cartes
    ↓
Détail (QueteDetail.tsx) — Texte long + Google Maps
```

---

## 📐 Structure des images

### **Homepage**
- **1 image éditoriale forte**
- Format : Vertical (ratio 3:4)
- Style : Gravure, architecture symbolique, figure humaine
- Emplacement : `/assets/homepage-hero.jpg`
- Usage : Ancrage symbolique, pose le ton
- **Pas de carrousel, pas de galerie**

### **Page Quêtes**
**3 images — 1 par carte**

| Quête | Image | Registre | Style suggéré |
|-------|-------|----------|---------------|
| **LUTÈCE** | `/assets/quete-lutece.jpg` | Fondation · Présence · Mesure | Géométrie ascendante, construction |
| **1789** | `/assets/quete-1789.jpg` | Décision · Mouvement · Liberté | Mouvement contenu, ouverture |
| **LA TABLE** | `/assets/quete-table.jpg` | Nourriture · Vin · Parole | Abondance maîtrisée, matière |

Format : Ratio 4:3 (paysage)

### **Pages Détail**
**Images optionnelles en tête**

- `/assets/quete-lutece-detail.jpg`
- `/assets/quete-1789-detail.jpg`
- `/assets/quete-table-detail.jpg`

Format : Ratio 16:9 (cinéma)

---

## 🎨 Placeholders actuels

Les composants affichent actuellement :
- ✅ **Structure complète** avec emplacements réservés
- ✅ **Symboles SVG temporaires** (géométrie, fondation, mouvement, abondance)
- ✅ **Notes discrètes** indiquant le nom du fichier à remplacer
- ✅ **Dégradés neutres** (#E7E1D8 → #DBD4C6)

**Remplacer les images :**
1. Ajouter les fichiers dans `/assets/`
2. Les chemins sont déjà configurés
3. Les images s'afficheront automatiquement

---

## 📝 Textes narratifs

### **LUTÈCE**
- **Registre** : Fondation · Présence · Mesure
- **Thème** : La naissance de Paris, avant la ville
- **Essence** : Le sol, le fleuve, les gestes initiaux
- **Narrative** : 4 paragraphes + introduction + conclusion
- **Google Maps** : À configurer (placeholder présent)

### **1789**
- **Registre** : Décision · Mouvement · Liberté
- **Thème** : La Révolution comme marche et seuil
- **Essence** : Les lieux où l'on décide, pas où l'on exécute
- **Narrative** : 4 paragraphes + introduction + conclusion
- **Google Maps** : À configurer (placeholder présent)

### **LA TABLE DE PARIS**
- **Registre** : Nourriture · Vin · Parole
- **Thème** : Manger, boire, parler comme forces historiques
- **Essence** : Vins, marchés, guinguettes, habitudes anciennes
- **Narrative** : 4 paragraphes + introduction + conclusion
- **Google Maps** : À configurer (placeholder présent)

---

## 🔗 Google Maps

Actuellement, les URLs sont des placeholders :
- `https://www.google.com/maps/d/u/0/viewer?mid=1_PLACEHOLDER_LUTECE`
- `https://www.google.com/maps/d/u/0/viewer?mid=1_PLACEHOLDER_1789`
- `https://www.google.com/maps/d/u/0/viewer?mid=1_PLACEHOLDER_TABLE`

**À remplacer** par les vrais liens Google Maps personnalisés.

---

## 🚀 Utilisation

### **Activer la V1**

Dans `/index.tsx`, remplacer :
```tsx
import App from './App';
```

Par :
```tsx
import App from './AppV1';
```

### **Retourner à la version complète**

Remettre :
```tsx
import App from './App';
```

---

## ✅ Principes respectés

- ✅ **Pas de gamification visible**
- ✅ **Pas de progression affichée**
- ✅ **Pas de logique de performance**
- ✅ **Peu d'écrans** (3 uniquement)
- ✅ **Textes lisibles, incarnés, silencieux**
- ✅ **Ghost Grid mamluk** (structure géométrique invisible)
- ✅ **Interface comme objet éditorial** (peut être imprimée)
- ✅ **Aucune liste longue**
- ✅ **Aucun effet "menu"**
- ✅ **Respiration, silence, monumentalité**

---

## 📦 Fichiers créés

```
/components/
  ├── HomepageV1.tsx       — Monument d'entrée
  ├── QuetesV1.tsx         — 3 cartes uniquement
  └── QueteDetail.tsx      — Page éditoriale longue

/AppV1.tsx                 — App minimaliste (3 écrans)
/V1-STRUCTURE.md          — Ce fichier

/assets/                   — À créer, pour les images
  ├── homepage-hero.jpg
  ├── quete-lutece.jpg
  ├── quete-1789.jpg
  ├── quete-table.jpg
  ├── quete-lutece-detail.jpg
  ├── quete-1789-detail.jpg
  └── quete-table-detail.jpg
```

---

## 🎭 Philosophie

**"ARCHÉ doit pouvoir être perçu comme :**
- **une carte**
- **un livre**
- **une estampe**

**avant d'être perçu comme une app."**

---

## 🔄 Prochaines étapes

1. **Ajouter les images réelles** dans `/assets/`
2. **Configurer les Google Maps** (URLs personnalisées)
3. **Ajuster les textes narratifs** si besoin
4. **Tester la V1** via `/AppV1.tsx`
5. **Déployer** quand prêt

---

*ARCHÉ — Petit Souvenir · CityNodes Paris*
