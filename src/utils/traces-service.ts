/**
 * ARCHÉ — Traces Service
 *
 * Les Traces: The sediment of memory.
 * Each walker can leave one trace at each location.
 * Future walkers see traces from those who came before.
 *
 * Not reviews. Not comments. Traces.
 * Like finding a note tucked in a library book.
 */

import { supabase } from './supabase/client';

export interface Trace {
  content: string;
  card_id: string;
  created_at: string;
}

export interface TraceResult {
  success: boolean;
  message: string;
  error?: string;
}

/**
 * Get traces left by previous walkers at a location
 */
export async function getTraces(
  questId: string,
  etapeId: string,
  limit: number = 3
): Promise<Trace[]> {
  try {
    const { data, error } = await supabase
      .from('traces')
      .select('content, card_id, created_at')
      .eq('quest_id', questId)
      .eq('etape_id', etapeId)
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) {
      console.error('Error fetching traces:', error);
      return [];
    }

    return data || [];
  } catch (err) {
    console.error('Traces service error:', err);
    return [];
  }
}

/**
 * Leave a trace at a location
 */
export async function leaveTrace(
  cardId: string,
  questId: string,
  etapeId: string,
  content: string
): Promise<TraceResult> {
  // Client-side validation
  const trimmed = content.trim();
  if (trimmed.length < 3) {
    return {
      success: false,
      message: 'Trop court. Au moins 3 caractères.',
      error: 'TOO_SHORT'
    };
  }
  if (trimmed.length > 140) {
    return {
      success: false,
      message: 'Trop long. Maximum 140 caractères.',
      error: 'TOO_LONG'
    };
  }

  try {
    // Check if already left a trace
    const { count } = await supabase
      .from('traces')
      .select('*', { count: 'exact', head: true })
      .eq('card_id', cardId)
      .eq('quest_id', questId)
      .eq('etape_id', etapeId);

    if (count && count > 0) {
      return {
        success: false,
        message: 'Vous avez déjà laissé une trace ici.',
        error: 'ALREADY_LEFT_TRACE'
      };
    }

    // Insert the trace
    const { error } = await supabase
      .from('traces')
      .insert({
        card_id: cardId,
        quest_id: questId,
        etape_id: etapeId,
        content: trimmed
      });

    if (error) {
      console.error('Error leaving trace:', error);
      return {
        success: false,
        message: 'Impossible de laisser une trace. Réessayez.',
        error: 'DB_ERROR'
      };
    }

    return {
      success: true,
      message: 'Trace laissée.'
    };
  } catch (err) {
    console.error('Traces service error:', err);
    return {
      success: false,
      message: 'Connexion perdue. Réessayez.',
      error: 'NETWORK_ERROR'
    };
  }
}

/**
 * Check if a card has already left a trace at a location
 */
export async function hasLeftTrace(
  cardId: string,
  questId: string,
  etapeId: string
): Promise<boolean> {
  try {
    const { count, error } = await supabase
      .from('traces')
      .select('*', { count: 'exact', head: true })
      .eq('card_id', cardId)
      .eq('quest_id', questId)
      .eq('etape_id', etapeId);

    if (error) {
      console.error('Error checking trace:', error);
      return false;
    }

    return (count || 0) > 0;
  } catch (err) {
    console.error('Traces service error:', err);
    return false;
  }
}

/**
 * Format card ID for display (anonymized)
 * PS-0847 → PS-08••
 */
export function formatCardId(cardId: string): string {
  if (!cardId || cardId.length < 4) return '••••';
  return cardId.slice(0, -2) + '••';
}

/**
 * Format date for display
 */
export function formatTraceDate(dateStr: string): string {
  const date = new Date(dateStr);
  const now = new Date();
  const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return "aujourd'hui";
  if (diffDays === 1) return 'hier';
  if (diffDays < 7) return `il y a ${diffDays} jours`;
  if (diffDays < 30) return `il y a ${Math.floor(diffDays / 7)} semaines`;

  return date.toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' });
}
