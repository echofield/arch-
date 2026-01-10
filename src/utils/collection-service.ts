/**
 * ARCHÉ — Service de Collection
 *
 * Gère la collection personnelle de symboles du marcheur.
 * Stocké en localStorage, lié à la carte du joueur.
 */

import { getStoredCard } from './card-service';

const COLLECTION_KEY = 'arche_collection';

export interface CollectedSymbol {
  symbolId: string;
  foundAt: string; // ISO date
  note?: string; // Note personnelle du marcheur
}

export interface Collection {
  cardId: string;
  symbols: CollectedSymbol[];
  lastUpdated: string;
}

// Récupérer la collection du joueur
export function getCollection(): Collection | null {
  try {
    const stored = localStorage.getItem(COLLECTION_KEY);
    if (!stored) return null;
    return JSON.parse(stored);
  } catch {
    return null;
  }
}

// Initialiser une nouvelle collection
export function initCollection(): Collection {
  const card = getStoredCard();
  const collection: Collection = {
    cardId: card?.cardId || 'anonymous',
    symbols: [],
    lastUpdated: new Date().toISOString()
  };
  localStorage.setItem(COLLECTION_KEY, JSON.stringify(collection));
  return collection;
}

// Ajouter un symbole à la collection
export function collectSymbol(symbolId: string, note?: string): boolean {
  let collection = getCollection();
  if (!collection) {
    collection = initCollection();
  }

  // Vérifier si déjà collecté
  if (collection.symbols.some(s => s.symbolId === symbolId)) {
    return false; // Déjà dans la collection
  }

  collection.symbols.push({
    symbolId,
    foundAt: new Date().toISOString(),
    note
  });
  collection.lastUpdated = new Date().toISOString();

  localStorage.setItem(COLLECTION_KEY, JSON.stringify(collection));
  return true;
}

// Vérifier si un symbole est collecté
export function isSymbolCollected(symbolId: string): boolean {
  const collection = getCollection();
  if (!collection) return false;
  return collection.symbols.some(s => s.symbolId === symbolId);
}

// Obtenir les symboles collectés par arrondissement
export function getCollectedByArrondissement(arrondissement: number, allSymbols: { id: string; arrondissement: number }[]): string[] {
  const collection = getCollection();
  if (!collection) return [];

  const arrSymbols = allSymbols.filter(s => s.arrondissement === arrondissement);
  return collection.symbols
    .filter(cs => arrSymbols.some(s => s.id === cs.symbolId))
    .map(cs => cs.symbolId);
}

// Statistiques de collection
export function getCollectionStats(allSymbols: { id: string; arrondissement: number }[]): {
  total: number;
  collected: number;
  byArrondissement: Record<number, { total: number; collected: number }>;
} {
  const collection = getCollection();
  const collectedIds = new Set(collection?.symbols.map(s => s.symbolId) || []);

  const byArr: Record<number, { total: number; collected: number }> = {};
  for (let i = 1; i <= 20; i++) {
    byArr[i] = { total: 0, collected: 0 };
  }

  allSymbols.forEach(s => {
    byArr[s.arrondissement].total++;
    if (collectedIds.has(s.id)) {
      byArr[s.arrondissement].collected++;
    }
  });

  return {
    total: allSymbols.length,
    collected: collectedIds.size,
    byArrondissement: byArr
  };
}

// Supprimer un symbole de la collection (rare, mais possible)
export function uncollectSymbol(symbolId: string): boolean {
  const collection = getCollection();
  if (!collection) return false;

  const index = collection.symbols.findIndex(s => s.symbolId === symbolId);
  if (index === -1) return false;

  collection.symbols.splice(index, 1);
  collection.lastUpdated = new Date().toISOString();
  localStorage.setItem(COLLECTION_KEY, JSON.stringify(collection));
  return true;
}
