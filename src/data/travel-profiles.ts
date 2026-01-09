// PROFILS DE VOYAGE
// 4 archétypes pour personnaliser les recommandations de quêtes

export interface TravelProfile {
  id: string;
  name: string;
  archetypeName: string;
  introText: string;
  description: string;
  
  // Tags prioritaires pour le matching
  desiredTags: string[];
  
  // Tags à éviter
  avoidTags?: string[];
  
  // Nombre de quêtes à recommander
  recommendedCount: number;
}

export const TRAVEL_PROFILES: TravelProfile[] = [
  {
    id: 'calme_contemplatif',
    name: 'Calme & Contemplatif',
    archetypeName: 'Le Méditatif',
    introText: 'Aujourd\'hui, Paris vous propose des refuges calmes, des seuils secrets où le temps suspend son cours.',
    description: 'Vous cherchez la quiétude dans le tumulte urbain, les espaces où respirer et laisser l\'esprit vagabonder.',
    desiredTags: ['calme', 'contemplatif', 'nature', 'gratuit', 'intérieur', 'architecture'],
    avoidTags: ['sportif', 'vivant', 'long'],
    recommendedCount: 2  // RÉDUIT de 4 à 2
  },
  
  {
    id: 'explorateur_curieux',
    name: 'Explorateur Curieux',
    archetypeName: 'L\'Archiviste',
    introText: 'Paris dévoile ses archives secrètes, ses strates invisibles, ses récits enfouis sous le pavé.',
    description: 'Vous aimez comprendre, creuser, découvrir les histoires cachées derrière les façades.',
    desiredTags: ['historique', 'mystère', 'mémoire', 'architecture', 'profond', 'art'],
    avoidTags: ['vivant', 'gourmand'],
    recommendedCount: 2  // RÉDUIT de 4 à 2
  },
  
  {
    id: 'epicurien_urbain',
    name: 'Épicurien Urbain',
    archetypeName: 'Le Sybarite',
    introText: 'Le Paris des sens vous attend : caves millésimées, tables raffinées, et l\'art français du partage.',
    description: 'Vous célébrez les plaisirs terrestres, la conversation autour d\'un verre, le savoir-faire artisanal.',
    desiredTags: ['gourmand', 'partage', 'vivant', 'historique', 'central'],
    avoidTags: ['sportif', 'long', 'nature'],
    recommendedCount: 1  // RÉDUIT de 3 à 1 (quête signature unique!)
  },
  
  {
    id: 'horizon_perspective',
    name: 'Horizon & Perspective',
    archetypeName: 'Le Géomètre',
    introText: 'Prenez de la hauteur. Paris s\'offre comme une carte, une géométrie révélée, un ordre visible depuis les sommets.',
    description: 'Vous cherchez le point de vue surplombant, la compréhension globale, l\'effort récompensé par la vue.',
    desiredTags: ['élévation', 'vue', 'extérieur', 'architecture', 'sportif', 'panoramique'],
    avoidTags: ['intérieur', 'calme'],
    recommendedCount: 1  // RÉDUIT de 3 à 1 (quête signature unique!)
  }
];

// Helper: Get profile by ID
export function getTravelProfileById(id: string): TravelProfile | undefined {
  return TRAVEL_PROFILES.find(p => p.id === id);
}

// Helper: Map quiz answers to profile
// Quiz questions:
// 1. Ambiance: Artistique(0), Gastronomique(1), Paisible(2), Vivante(3)
// 2. Moment: Matin(0), Après-midi(1), Apéritif(2), Soirée(3)
// 3. Style: À pied(0), À vélo(1), En métro(2), En taxi(3)
export function getProfileFromQuizAnswers(answers: number[]): TravelProfile {
  if (answers.length !== 3) {
    // Fallback par défaut
    return TRAVEL_PROFILES[0];
  }

  const [ambiance, moment, style] = answers;

  // Logique de mapping
  
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