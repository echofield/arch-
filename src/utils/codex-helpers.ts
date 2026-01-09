// TEMPORAIRE : inscribeCodexEntry pas encore implémentée
// import { inscribeCodexEntry } from './supabase/client';

/**
 * Helpers pour générer des inscriptions Codex
 * Ces fonctions créent automatiquement des traces littéraires neutres
 */

/**
 * Format la date actuelle pour l'affichage dans le Codex
 * Ex: "6 décembre 2024"
 */
export function formatDateDisplay(date?: Date): string {
  const now = date || new Date();
  const day = now.getDate();
  const months = [
    'janvier', 'février', 'mars', 'avril', 'mai', 'juin',
    'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'
  ];
  const month = months[now.getMonth()];
  const year = now.getFullYear();
  return `${day} ${month} ${year}`;
}

/**
 * Inscrire une quête vécue dans le Codex
 * TODO: Implémenter quand inscribeCodexEntry sera prête
 */
export async function inscribeQuest(questId: string, questTitle: string, lieu: string) {
  console.log('📖 [Codex] Quest:', { questId, questTitle, lieu });
  // const traces = [
  //   "Une attention a été déposée.",
  //   "Un seuil a été franchi.",
  //   "Un passage a été reconnu.",
  //   "Une présence a été attestée.",
  //   "Une trace a été laissée.",
  //   "Un regard s'est posé.",
  //   "Une écoute a eu lieu.",
  //   "Un moment a été consigné."
  // ];
  
  // const randomTrace = traces[Math.floor(Math.random() * traces.length)];
  
  // return inscribeCodexEntry({
  //   dateDisplay: formatDateDisplay(),
  //   lieu,
  //   trace: randomTrace,
  //   eventType: 'quest',
  //   questId,
  //   source: 'manual'
  // });
}

/**
 * Inscrire un scan de lieu dans le Codex
 * TODO: Implémenter quand inscribeCodexEntry sera prête
 */
export async function inscribeScan(lieu: string) {
  console.log('📖 [Codex] Scan:', { lieu });
  // const traces = [
  //   "Un code a été déchiffré.",
  //   "Une identification a été validée.",
  //   "Un point a été révélé.",
  //   "Une connexion a été établie."
  // ];
  
  // const randomTrace = traces[Math.floor(Math.random() * traces.length)];
  
  // return inscribeCodexEntry({
  //   dateDisplay: formatDateDisplay(),
  //   lieu,
  //   trace: randomTrace,
  //   eventType: 'scan',
  //   source: 'qr_code'
  // });
}

/**
 * Inscrire une présence géolocalisée dans le Codex
 * TODO: Implémenter quand inscribeCodexEntry sera prête
 */
export async function inscribePresence(lieu: string) {
  console.log('📖 [Codex] Presence:', { lieu });
  // const traces = [
  //   "Une présence a été confirmée.",
  //   "Un lieu a été atteint.",
  //   "Un territoire a été parcouru.",
  //   "Une géographie a été vécue."
  // ];
  
  // const randomTrace = traces[Math.floor(Math.random() * traces.length)];
  
  // return inscribeCodexEntry({
  //   dateDisplay: formatDateDisplay(),
  //   lieu,
  //   trace: randomTrace,
  //   eventType: 'presence',
  //   source: 'geolocation'
  // });
}

/**
 * Inscrire une lecture d'Histoire dans le Codex
 * TODO: Implémenter quand inscribeCodexEntry sera prête
 */
export async function inscribeHistoryRead(dateKey: string) {
  console.log('📖 [Codex] History Read:', { dateKey });
  // const traces = [
  //   "Une mémoire a été consultée.",
  //   "Un fragment du passé a été lu.",
  //   "Une archive a été ouverte.",
  //   "Une chronique a été parcourue."
  // ];
  
  // const randomTrace = traces[Math.floor(Math.random() * traces.length)];
  
  // return inscribeCodexEntry({
  //   dateDisplay: formatDateDisplay(),
  //   lieu: "Paris — Archives",
  //   trace: randomTrace,
  //   eventType: 'history_read',
  //   source: 'histoire_quotidienne'
  // });
}
