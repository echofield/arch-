# 🔄 Basculer entre Version Complète et V1 Minimaliste

## 📦 Deux versions disponibles

### **Version Complète** (`/App.tsx`)
- Quiz + Intention + Results
- 9 Quêtes enrichies
- Carnet Parisien + Histoire Quotidienne
- Codex + PathwaysMap
- Système de cartes physiques
- Navigation complexe

### **V1 Minimaliste** (`/AppV1.tsx`)
- Homepage monumentale
- 3 Quêtes uniquement (Lutèce / 1789 / Table)
- Pages éditoriales longues
- Liens Google Maps
- **Pas de gamification, pas de quiz**

---

## 🚀 Comment basculer

### **Utiliser la V1 Minimaliste**

Dans `/App.tsx`, ajouter ce commentaire en haut :
```tsx
// Pour utiliser la V1 minimaliste, importer AppV1 depuis './AppV1'
```

Puis **changer le default export** :
```tsx
// Version complète (actuelle)
export default function App() {
  // ... code actuel ...
}
```

Vers :
```tsx
// Version minimaliste (V1)
export { default } from './AppV1';
```

**OU** créer un fichier `/index.html` qui pointe vers `AppV1.tsx` si votre bundler le permet.

---

## 📐 Structure des placeholders images (V1)

Quand tu utilises la V1, les images se trouvent dans :
```
/assets/
  ├── homepage-hero.jpg          (Vertical 3:4)
  ├── quete-lutece.jpg           (Paysage 4:3)
  ├── quete-1789.jpg             (Paysage 4:3)
  ├── quete-table.jpg            (Paysage 4:3)
  ├── quete-lutece-detail.jpg    (Cinéma 16:9)
  ├── quete-1789-detail.jpg      (Cinéma 16:9)
  └── quete-table-detail.jpg     (Cinéma 16:9)
```

**Actuellement** : Les composants affichent des placeholders SVG avec des notes discrètes indiquant le nom du fichier.

---

## ✅ Pour tester la V1 maintenant

**Option rapide** : Créer un nouveau point d'entrée temporaire.

Créer `/test-v1.html` :
```html
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>ARCHÉ — V1</title>
</head>
<body>
  <div id="root"></div>
  <script type="module">
    import { createRoot } from 'react-dom/client';
    import AppV1 from './AppV1.tsx';
    
    const root = createRoot(document.getElementById('root'));
    root.render(<AppV1 />);
  </script>
</body>
</html>
```

Puis accéder à `/test-v1.html` dans ton navigateur.

---

## 🎯 Utilisation recommandée

1. **Pendant le développement V1** :
   - Utiliser `AppV1.tsx` pour tester la version minimaliste
   - Ajouter les images dans `/assets/`
   - Configurer les Google Maps URLs

2. **Pour la production** :
   - Décider quelle version déployer (complète ou V1)
   - Mettre à jour le point d'entrée principal
   - Garder l'autre version disponible pour référence

---

## 📂 Fichiers V1

```
/AppV1.tsx                 — App minimaliste (3 écrans)
/components/
  ├── HomepageV1.tsx       — Monument d'entrée
  ├── QuetesV1.tsx         — 3 cartes uniquement
  └── QueteDetail.tsx      — Page éditoriale longue
/V1-STRUCTURE.md          — Documentation complète V1
/SWITCH_VERSION.md        — Ce fichier
```

---

*ARCHÉ — Petit Souvenir · CityNodes Paris*
