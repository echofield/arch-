# PROMPT GEMINI — Enrichissement des Quêtes PETIT SOUVENIR

## CONTEXTE

Tu es **curateur éditorial** pour **PETIT SOUVENIR — CityNodes Paris**, une plateforme de découverte parisienne haut de gamme.

**Esthétique:** Luxe éditorial (Monocle, Condé Nast Traveler, The Gentlewoman)  
**Philosophie:** "Un livre qui a des coordonnées GPS" — zéro gamification, profondeur conceptuelle maximale  
**Ton:** Contemplatif, érudit, poétique mais jamais pompeux. On célèbre Paris comme une archive vivante, pas comme un parc d'attractions.

---

## TÂCHE

Enrichis ces 6 quêtes parisiennes avec de **vraies données curatoriales professionnelles**.

Chaque quête doit devenir une **invitation narrative** à voir Paris sous un angle spécifique.

---

## LES 6 QUÊTES À ENRICHIR

### 1. LA QUÊTE DES PASSAGES
**Itinéraire actuel:**
- Passage des Princes (5 Bd des Italiens, 75002)
- Passage des Panoramas (11 Bd Montmartre, 75002)
- Passage Jouffroy (10-12 Bd Montmartre, 75009)
- Galerie Vivienne (4 Rue des Petits-Champs, 75002)

**Distance:** ~1.5 km | **Durée:** 20-30 minutes

---

### 2. L'ÂME DU FLÂNEUR
**Itinéraire actuel:**
- Place des Vosges (75004)
- Pont des Arts (Quai François Mitterrand, 75006)
- Jardin du Palais Royal (2 Galerie de Montpensier, 75001)
- Jardin des Tuileries (Place de la Concorde, 75001)

**Distance:** ~4.2 km | **Durée:** 50-60 minutes

---

### 3. ÉDEN PARISIEN
**Itinéraire actuel:**
- Parc Monceau (35 Bd de Courcelles, 75008)
- Square du Vert-Galant (15 Place du Pont Neuf, 75001)
- Jardin du Luxembourg (Rue de Médicis, 75006)
- Jardin des Plantes (57 Rue Cuvier, 75005)

**Distance:** ~7.5 km | **Durée:** 1h30-1h45

---

### 4. LA ROUTE DU VIN
**Itinéraire actuel:**
- Le Baron Rouge (1 Rue Théophile Roussel, 75012)
- La Dernière Goutte (6 Rue de Bourbon le Château, 75006)
- Verjus (52 Rue de Richelieu, 75001)
- Ryst-Dupeyron (79 Rue du Bac, 75007)

**Distance:** ~5.8 km | **Durée:** 1h15-1h30

---

### 5. PARIS PANORAMIQUE
**Itinéraire actuel:**
- Parc de Belleville (47 Rue des Couronnes, 75020)
- Sacré-Cœur (35 Rue du Chevalier de la Barre, 75018)
- Panthéon (Place du Panthéon, 75005)
- Tour Montparnasse (33 Avenue du Maine, 75015)

**Distance:** ~10.5 km | **Durée:** 2h15-2h45

---

### 6. RELIQUES & MYSTÈRES
**Itinéraire actuel:**
- Catacombes de Paris (1 Av. du Colonel Henri Rol-Tanguy, 75014)
- Crypte archéologique de l'île de la Cité (7 Parvis Notre-Dame, 75004)
- Sainte-Chapelle (8 Boulevard du Palais, 75001)
- Musée Carnavalet (23 Rue de Sévigné, 75003)

**Distance:** ~4.0 km | **Durée:** 50-60 minutes

---

## FORMAT DE SORTIE ATTENDU

Pour chaque quête, génère un objet JSON avec cette structure **EXACTE**:

```json
{
  "questId": "passages",
  "poeticSubtitle": "Sous-titre évocateur et poétique (10-15 mots max)",
  "curatedDescription": "Description enrichie en 150-200 mots. Ton éditorial contemplatif. Décris l'expérience sensorielle et intellectuelle, pas juste les lieux. Évite le langage promotionnel ('ne manquez pas', 'incontournable'). Utilise le présent de narration.",
  "quote": {
    "text": "Citation authentique d'un écrivain, philosophe ou historien sur Paris ou le thème de la quête. Doit être réelle et vérifiable.",
    "author": "Nom complet de l'auteur"
  },
  "miniQuest": "Une tâche concrète et vérifiable à accomplir pendant la quête. Exemple: 'Trouve la mosaïque représentant les quatre saisons au sol de la Galerie Vivienne' ou 'Cherche l'inscription latine sur le fronton du Panthéon'. Sois précis.",
  "tags": [
    "5 à 7 tags simples pour le matching de profils",
    "exemples: calme, historique, gourmand, intérieur, gratuit, central, contemplatif, vivant, mystère"
  ],
  "badges": {
    "cost": "GRATUIT ou PAYANT",
    "environment": "INTÉRIEUR ou EXTÉRIEUR ou MIXTE",
    "pace": "CONTEMPLATIF ou MODÉRÉ ou SPORTIF"
  },
  "archetype": "Un mot qui capture l'essence (ex: Seuil, Liberté, Refuge, Partage, Élévation, Mémoire)"
}
```

---

## CONTRAINTES ÉDITORIALES

1. **Ton:** Contemplatif, érudit mais accessible. Pense "New Yorker culture section", pas "guide touristique".

2. **Citations:** DOIVENT être authentiques et vérifiables. Privilégie:
   - Walter Benjamin (sur les passages parisiens)
   - Baudelaire (sur la flânerie)
   - Balzac, Proust, Colette (sur Paris)
   - Philosophes français contemporains

3. **Mini-Quêtes:** Doivent être:
   - Concrètes et vérifiables sur place
   - Liées à l'architecture, l'histoire ou des détails cachés
   - Formulées comme une invitation, pas un ordre
   - Exemple: ✅ "Cherche la date gravée sur la colonne Morris" ❌ "Prends une photo"

4. **Tags:** Simples et fonctionnels pour le matching. Exemples valides:
   - **Ambiance:** calme, vivant, mystère, contemplatif
   - **Lieu:** intérieur, extérieur, central, périphérique
   - **Thème:** historique, gourmand, nature, art, architecture
   - **Coût:** gratuit, payant
   - **Rythme:** lent, modéré, sportif

5. **Description curatoriale:** Structure suggérée:
   - 1ère phrase: Accroche sensorielle ou conceptuelle
   - Corps: Contexte historique/culturel léger
   - Fin: Ce que l'expérience offre (perspective, sensation, découverte)

---

## EXEMPLE DE SORTIE ATTENDUE (pour inspiration)

```json
{
  "questId": "passages",
  "poeticSubtitle": "Lumières zénithales et galeries d'antan",
  "curatedDescription": "Les passages couverts de Paris suspendent le temps sous leurs verrières. Construits au début du XIXe siècle comme des rues commerçantes à l'abri de la pluie, ils forment aujourd'hui un réseau secret de galeries où l'on passe d'une époque à l'autre. Le Passage des Panoramas, le plus ancien, abrite encore des graveurs et des marchands de cartes postales anciennes. La Galerie Vivienne déploie ses mosaïques sous une coupole de verre. Ce sont des seuils : ni dehors ni dedans, ni passé ni présent. On y marche différemment, comme si la ville acceptait de ralentir.",
  "quote": {
    "text": "Les passages sont des maisons ou des couloirs qui n'ont pas de côté extérieur — comme le rêve.",
    "author": "Walter Benjamin"
  },
  "miniQuest": "Trouve la mosaïque représentant les quatre saisons au sol de la Galerie Vivienne",
  "tags": ["intérieur", "historique", "central", "contemplatif", "mystère", "gratuit"],
  "badges": {
    "cost": "GRATUIT",
    "environment": "INTÉRIEUR",
    "pace": "CONTEMPLATIF"
  },
  "archetype": "Seuil"
}
```

---

## STRUCTURE FINALE DE LA RÉPONSE

Retourne un JSON valide avec ce format:

```json
{
  "quests": [
    { /* Quête 1: Passages */ },
    { /* Quête 2: Flâneur */ },
    { /* Quête 3: Jardins */ },
    { /* Quête 4: Caviste */ },
    { /* Quête 5: Hauteurs */ },
    { /* Quête 6: Reliques */ }
  ]
}
```

---

## CONSIGNES FINALES

- Génère les 6 quêtes dans un seul JSON
- Respecte EXACTEMENT les noms de clés (questId, poeticSubtitle, etc.)
- Les citations doivent être réelles et sourcées
- Les mini-quêtes doivent être réalisables physiquement
- Le ton doit rester cohérent : éditorial haut de gamme, jamais promotionnel

---

**C'est parti! Génère maintenant le JSON complet pour les 6 quêtes.**
