# 🎨 PROMPT GEMINI — GÉNÉRATION DE NOUVELLES QUÊTES PARISIENNES

## CONTEXTE DU PROJET

Tu es un curateur éditorial pour **PETIT SOUVENIR — CityNodes Paris**, une plateforme de découverte parisienne haut de gamme avec une esthétique de luxe éditorial (pense Monocle meets Rizzoli books).

**Philosophie:** "Un livre qui a des coordonnées GPS" — zéro gamification, profondeur conceptuelle maximale, où la géométrie sacrée devient une lens sur le vrai Paris.

**Ton:** Littéraire, contemplatif, érudit sans pédanterie, poétique mais jamais mièvre.

---

## MISSION

Génère **3 nouvelles quêtes parisiennes** qui complètent notre catalogue actuel de 6 quêtes.

### Quêtes existantes (pour éviter redondance):
1. **Passages Couverts** — Seuils architecturaux, galeries secrètes
2. **Flâneur Classique** — Déambulation baudelairienne (Place des Vosges, Pont des Arts, Palais Royal)
3. **Jardins Secrets** — Refuges verts, respiration urbaine
4. **Reliques & Mémoire** — Mystères historiques, strates temporelles
5. **Route du Vin** — Caves, gastronomie, partage épicurien
6. **Panoramique** — Hauteurs, élévation, vues surplombantes

---

## NOUVELLES QUÊTES À GÉNÉRER

Propose 3 quêtes parmi ces thèmes (ou propose mieux):

### Option A: **Quête Littéraire**
**Concept:** Librairies anciennes, cafés d'écrivains, lieux de la littérature parisienne
**Archétype possible:** Mémoire ou Liberté
**Tags:** historique, intérieur/extérieur, calme, art, gratuit/modéré
**Personnalités:** Hemingway, Sartre, Colette, Hugo

---

### Option B: **Quête Nocturne**
**Concept:** Paris illuminé, bars clandestins, ambiances crépusculaires
**Archétype possible:** Seuil ou Partage
**Tags:** vivant, nocturne, mystère, payant
**Angle:** Le Paris qui s'éveille après le crépuscule

---

### Option C: **Quête Artisanale**
**Concept:** Ateliers d'artisans, savoir-faire, métiers d'art
**Archétype possible:** Mémoire ou Liberté
**Tags:** historique, intérieur, contemplatif, gratuit/modéré
**Angle:** Les mains qui fabriquent la ville

---

### Option D: **Quête Rive Gauche Intellectuelle**
**Concept:** Saint-Germain, Sorbonne, librairies philosophiques
**Archétype possible:** Mémoire ou Liberté
**Tags:** historique, art, contemplatif, gratuit, central
**Angle:** Le Paris des idées

---

### Option E: **Quête des Marchés**
**Concept:** Marchés couverts historiques, halles, commerce authentique
**Archétype possible:** Partage ou Refuge
**Tags:** vivant, gourmand, historique, gratuit, extérieur
**Angle:** Le ventre de Paris (Zola)

---

### Option F: **Quête Seine & Ponts**
**Concept:** Itinéraire fluvial, architecture des ponts, quais
**Archétype possible:** Liberté ou Élévation
**Tags:** extérieur, architecture, modéré, gratuit
**Angle:** La colonne vertébrale de Paris

---

## FORMAT DE SORTIE REQUIS

Pour CHAQUE quête, fournis:

### 1. IDENTITÉ
```json
{
  "id": "slug-kebab-case",
  "title": "Titre Élégant (2-4 mots)",
  "poeticSubtitle": "Sous-titre poétique évocateur (10-15 mots)",
  "archetype": "Seuil | Liberté | Refuge | Partage | Élévation | Mémoire"
}
```

### 2. DESCRIPTION CURATORIALE (150-200 mots)
**Ton:** Comme un essai du New Yorker ou une chronique de Modiano
**Contenu:** 
- Contextualise historiquement/culturellement
- Évoque des sensations, atmosphères
- Nomme 3-4 lieux spécifiques (vérifiables!)
- Explique pourquoi cette quête est unique
- Reste sobre, jamais publicitaire

**Exemple de qualité attendue:**
"Les passages couverts de Paris suspendent le temps sous leurs verrières. Construits au début du XIXe siècle comme des rues commerçantes à l'abri de la pluie, ils forment aujourd'hui un réseau secret de galeries où l'on passe d'une époque à l'autre. Le Passage des Panoramas, le plus ancien, abrite encore des graveurs et des marchands de cartes postales anciennes..."

### 3. CITATION LITTÉRAIRE AUTHENTIQUE
**Source:** Écrivain, philosophe, historien réel ayant écrit sur Paris
**Format:**
```json
{
  "text": "La citation exacte (20-50 mots)",
  "author": "Nom de l'auteur (vérifiable!)"
}
```

**Auteurs possibles:** Baudelaire, Benjamin, Hugo, Balzac, Zola, Proust, Sartre, Modiano, Hemingway, Gertrude Stein, Julien Green, Georges Perec, Annie Ernaux, etc.

**IMPORTANT:** Citations RÉELLES uniquement! Pas d'inventions.

### 4. MINI-QUÊTE VÉRIFIABLE
**Format:** Une tâche d'observation concrète, vérifiable sur place
**Exemples:**
- "Compte le nombre de colonnes de Buren au Palais Royal"
- "Trouve la devise latine sous l'horloge du Passage Jouffroy"
- "Repère la plaque commémorative de la boutique Shakespeare & Company"

**Ton:** Impératif bienveillant, précis, jamais infantilisant

### 5. TAGS DE MATCHING (5-8 tags)
**Choisir parmi:**
- **Ambiance:** calme, contemplatif, vivant, mystère
- **Lieu:** intérieur, extérieur, central, périphérique
- **Thème:** historique, art, architecture, nature, gourmand, littéraire
- **Expérience:** gratuit, payant, modéré, sportif, long, court
- **Archétype:** profond, partage, élévation, mémoire

### 6. BADGES
```json
{
  "cost": "GRATUIT | MODÉRÉ | PAYANT",
  "environment": "INTÉRIEUR | EXTÉRIEUR | MIXTE",
  "pace": "CONTEMPLATIF | MODÉRÉ | SPORTIF"
}
```

### 7. LOGISTIQUE
```json
{
  "distance": "Distance totale (ex: '3.2 km')",
  "estimatedTime": "Durée estimée (ex: '2h30')",
  "bestTime": "Meilleur moment (ex: 'Matin ou fin d'après-midi')"
}
```

### 8. ITINÉRAIRE (3-5 LIEUX RÉELS)
**Format:**
```json
{
  "stops": [
    {
      "name": "Nom du lieu exact",
      "address": "Adresse complète",
      "coordinates": { "lat": 48.xxxx, "lng": 2.xxxx },
      "description": "1 phrase évocative (20-30 mots)"
    }
  ]
}
```

**CRUCIAL:** Lieux RÉELS, coordonnées GPS EXACTES, adresses VÉRIFIABLES!

---

## CRITÈRES DE QUALITÉ

### ✅ BON EXEMPLE:
- Lieux spécifiques nommés et vérifiables
- Ton littéraire mais accessible
- Citations authentiques sourcées
- Mini-quête concrète et faisable
- Tags cohérents avec l'expérience
- Pas de clichés touristiques ("ville lumière", "cœur de Paris")

### ❌ ÉVITER:
- Généralités vagues ("Paris regorge de trésors...")
- Ton marketing/publicitaire
- Citations inventées ou approximatives
- Lieux fictifs ou trop obscurs
- Instructions floues ("Ressens l'ambiance...")
- Clichés éculés

---

## DIVERSITÉ À RESPECTER

**Thématique:** Assure que les 3 nouvelles quêtes couvrent:
- 1 quête calme/contemplative
- 1 quête sociale/vivante
- 1 quête intermédiaire

**Géographique:** Varie les arrondissements (on a déjà beaucoup de 1er-4e)

**Budget:** Au moins 1 quête gratuite parmi les 3

**Temporalité:** Varie les moments (jour/soir/flexible)

---

## OUTPUT FINAL

Fournis les 3 quêtes au format JSON structuré, prêt à intégrer dans:
```typescript
const GEMINI_ENRICHMENT: Record<string, Omit<EnrichedQuest, keyof Quest>> = {
  // ... tes nouvelles quêtes ici
}
```

---

## EXEMPLE DE STRUCTURE ATTENDUE

```json
{
  "quete-litteraire": {
    "poeticSubtitle": "Les pages jaunies, l'encre et le café — cartographie des mots parisiens",
    "curatedDescription": "Paris reste la capitale mondiale du livre imprimé. Cette quête traverse les librairies qui ont résisté au temps : Shakespeare and Company, fondée en 1951 par George Whitman sur les cendres de la librairie de Sylvia Beach, abrite toujours des écrivains voyageurs dans ses combles. La Hune, jadis rendez-vous des surréalistes, a laissé place à d'autres sentinelles. Nous remontons vers le Quartier Latin, où les bouquinistes des quais étalent leurs trésors sous les platanes. Le Café de Flore, intact depuis Sartre et Beauvoir, reste le bureau des romanciers sans domicile fixe. Cette déambulation n'est pas nostalgique : elle cherche à comprendre comment la matérialité du livre façonne encore l'urbanisme de certains quartiers. Nous sommes dans une ville qui pense que l'acte de lire mérite une architecture.",
    "quote": {
      "text": "Paris est une fête.",
      "author": "Ernest Hemingway"
    },
    "miniQuest": "À Shakespeare and Company, trouve la machine à écrire vintage dans la Library Room et note le modèle inscrit sur le châssis.",
    "tags": ["intérieur", "historique", "calme", "art", "littéraire", "gratuit", "central"],
    "badges": {
      "cost": "GRATUIT",
      "environment": "INTÉRIEUR",
      "pace": "CONTEMPLATIF"
    },
    "archetype": "Mémoire",
    "distance": "2.8 km",
    "estimatedTime": "2h30",
    "bestTime": "Matinée ou fin d'après-midi",
    "stops": [
      {
        "name": "Shakespeare and Company",
        "address": "37 Rue de la Bûcherie, 75005 Paris",
        "coordinates": { "lat": 48.8523, "lng": 2.3469 },
        "description": "Librairie mythique, refuge des écrivains vagabonds depuis 1951."
      }
      // ... autres stops
    ]
  }
}
```

---

## QUESTIONS À CLARIFIER AVANT DE GÉNÉRER

1. **Préfères-tu que je génère les 3 quêtes suggérées (Littéraire, Nocturne, Artisanale)?**
2. **Ou veux-tu que je propose d'autres thèmes?**
3. **Y a-t-il des arrondissements/quartiers à privilégier ou éviter?**
4. **Budget: faut-il au moins 2 quêtes gratuites sur 3?**

---

## PRÊT À GÉNÉRER! 🚀
