// QUEST MATCHING ENGINE
// Score et filtre les quêtes selon les profils de voyage

import { EnrichedQuest } from '../data/quests-enriched';
import { TravelProfile } from '../data/travel-profiles';

export interface QuestScore {
  quest: EnrichedQuest;
  score: number;
  matchedTags: string[];
}

/**
 * Score une quête selon un profil de voyage
 * Retourne un score de 0 à 100
 */
export function scoreQuestForProfile(quest: EnrichedQuest, profile: TravelProfile): QuestScore {
  let score = 0;
  const matchedTags: string[] = [];

  // Points pour les tags désirés (10 points par tag matché)
  profile.desiredTags.forEach(desiredTag => {
    if (quest.tags.includes(desiredTag)) {
      score += 10;
      matchedTags.push(desiredTag);
    }
  });

  // Pénalité pour les tags à éviter (-15 points par tag à éviter)
  if (profile.avoidTags) {
    profile.avoidTags.forEach(avoidTag => {
      if (quest.tags.includes(avoidTag)) {
        score -= 15;
      }
    });
  }

  // Bonus si l'archétype de la quête résonne avec le profil
  const archetypeBonus: Record<string, string[]> = {
    'calme_contemplatif': ['Seuil', 'Refuge'],
    'explorateur_curieux': ['Mémoire', 'Liberté'],
    'epicurien_urbain': ['Partage'],
    'horizon_perspective': ['Élévation', 'Liberté']
  };

  const bonusArchetypes = archetypeBonus[profile.id] || [];
  if (bonusArchetypes.includes(quest.archetype)) {
    score += 20;
  }

  // Normaliser le score entre 0 et 100
  score = Math.max(0, Math.min(100, score));

  return {
    quest,
    score,
    matchedTags
  };
}

/**
 * Retourne les quêtes recommandées pour un profil
 * Triées par score décroissant
 */
export function getRecommendedQuests(
  allQuests: EnrichedQuest[],
  profile: TravelProfile
): QuestScore[] {
  // Scorer toutes les quêtes
  const scoredQuests = allQuests.map(quest => 
    scoreQuestForProfile(quest, profile)
  );

  // Trier par score décroissant
  const sorted = scoredQuests.sort((a, b) => b.score - a.score);

  // Retourner le nombre recommandé
  return sorted.slice(0, profile.recommendedCount);
}

/**
 * Retourne uniquement les quêtes avec un score minimum
 */
export function getQualifiedQuests(
  allQuests: EnrichedQuest[],
  profile: TravelProfile,
  minScore: number = 20
): QuestScore[] {
  const recommended = getRecommendedQuests(allQuests, profile);
  return recommended.filter(qs => qs.score >= minScore);
}
