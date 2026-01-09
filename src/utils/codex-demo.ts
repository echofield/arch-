/**
 * DÉMO CODEX — Créer des inscriptions de test
 * 
 * Ce fichier permet de tester le Codex avec des données exemples.
 * À supprimer en production.
 */

import { inscribeCodexEntry } from './supabase/client';
import { formatDateDisplay } from './codex-helpers';

/**
 * Créer 3 inscriptions de test dans le Codex
 * Appeler cette fonction depuis la console navigateur :
 * 
 * import { createTestInscriptions } from './utils/codex-demo';
 * await createTestInscriptions();
 */
export async function createTestInscriptions() {
  const today = new Date();
  
  // Inscription 1 : Il y a 3 jours
  const date1 = new Date(today);
  date1.setDate(date1.getDate() - 3);
  const dateDisplay1 = formatCustomDate(date1);
  
  await inscribeCodexEntry({
    dateDisplay: dateDisplay1,
    lieu: 'Passage des Panoramas',
    trace: 'Une attention a été déposée.',
    eventType: 'quest',
    questId: 'passages',
    source: 'manual'
  });
  
  console.log('✓ Inscription 1 créée');
  
  // Inscription 2 : Il y a 2 jours
  const date2 = new Date(today);
  date2.setDate(date2.getDate() - 2);
  const dateDisplay2 = formatCustomDate(date2);
  
  await inscribeCodexEntry({
    dateDisplay: dateDisplay2,
    lieu: 'Le Marais — Square du Temple',
    trace: 'Un passage a été reconnu.',
    eventType: 'quest',
    questId: 'jardins',
    source: 'manual'
  });
  
  console.log('✓ Inscription 2 créée');
  
  // Inscription 3 : Aujourd'hui
  await inscribeCodexEntry({
    dateDisplay: formatDateDisplay(),
    lieu: 'Montmartre — Rue Lepic',
    trace: 'Un seuil a été franchi.',
    eventType: 'quest',
    questId: 'facades',
    source: 'manual'
  });
  
  console.log('✓ Inscription 3 créée');
  console.log('✓ Toutes les inscriptions de test ont été créées');
  console.log('→ Navigue vers le Codex pour les voir');
}

/**
 * Format custom date display
 */
function formatCustomDate(date: Date): string {
  const day = date.getDate();
  const months = [
    'janvier', 'février', 'mars', 'avril', 'mai', 'juin',
    'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'
  ];
  const month = months[date.getMonth()];
  const year = date.getFullYear();
  return `${day} ${month} ${year}`;
}

/**
 * Vider toutes les inscriptions du Codex
 */
export function clearCodexEntries() {
  localStorage.removeItem('codex-entries');
  console.log('✓ Codex vidé');
}
