/**
 * ARCHÉ — Card Service
 *
 * Handles card validation, activation, and access tracking.
 * Each physical card = one QR code = one unique experience.
 *
 * Philosophy:
 * - Single use: First scan activates the card
 * - Always alive: Activator can always return
 * - Graceful: Others can still access (we track, but don't block)
 */

import { supabase } from './supabase/client';

// Simple browser fingerprint (not for security, just for UX)
function getDeviceFingerprint(): string {
  const nav = navigator;
  const screen = window.screen;
  const data = [
    nav.userAgent,
    nav.language,
    screen.width,
    screen.height,
    screen.colorDepth,
    new Date().getTimezoneOffset(),
    nav.hardwareConcurrency || 'unknown',
    (nav as any).deviceMemory || 'unknown'
  ].join('|');

  // Simple hash
  let hash = 0;
  for (let i = 0; i < data.length; i++) {
    const char = data.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return 'fp_' + Math.abs(hash).toString(36);
}

export interface CardStatus {
  valid: boolean;
  status: 'ACTIVATED' | 'WELCOME_BACK' | 'ALREADY_ACTIVATED' | 'NOT_FOUND' | 'ERROR' | 'DEMO';
  message: string;
  cardId: string;
  accessCount?: number;
}

const STORAGE_KEY = 'arche_card_id';
const FINGERPRINT_KEY = 'arche_device_fp';

/**
 * Validate and activate a card
 */
export async function activateCard(cardId: string): Promise<CardStatus> {
  // Demo mode for development
  if (cardId.startsWith('DEMO')) {
    localStorage.setItem(STORAGE_KEY, cardId);
    return {
      valid: true,
      status: 'DEMO',
      message: 'Mode démonstration.',
      cardId
    };
  }

  try {
    const fingerprint = getDeviceFingerprint();
    localStorage.setItem(FINGERPRINT_KEY, fingerprint);

    // Call the Supabase function
    const { data, error } = await supabase.rpc('activate_card', {
      card_id: cardId,
      fingerprint: fingerprint
    });

    if (error) {
      console.error('Card activation error:', error);

      // Fallback: allow access but note the error
      localStorage.setItem(STORAGE_KEY, cardId);
      return {
        valid: true,
        status: 'ERROR',
        message: 'Connexion limitée. Accès autorisé.',
        cardId
      };
    }

    if (data.success) {
      localStorage.setItem(STORAGE_KEY, cardId);
      return {
        valid: true,
        status: data.status,
        message: data.message,
        cardId,
        accessCount: data.access_count
      };
    } else {
      return {
        valid: false,
        status: 'NOT_FOUND',
        message: data.message || 'Carte invalide.',
        cardId
      };
    }
  } catch (err) {
    console.error('Card service error:', err);

    // Graceful fallback: allow access
    localStorage.setItem(STORAGE_KEY, cardId);
    return {
      valid: true,
      status: 'ERROR',
      message: 'Hors ligne. Accès autorisé.',
      cardId
    };
  }
}

/**
 * Get stored card ID
 */
export function getStoredCard(): string | null {
  return localStorage.getItem(STORAGE_KEY);
}

/**
 * Check if user has a valid card (from URL or storage)
 */
export async function initializeCard(): Promise<CardStatus | null> {
  // Check URL params first
  const urlParams = new URLSearchParams(window.location.search);
  const cardFromUrl = urlParams.get('card');

  if (cardFromUrl) {
    // New card scanned
    console.log('🎫 Carte scannée:', cardFromUrl);
    return activateCard(cardFromUrl);
  }

  // Check localStorage
  const storedCard = getStoredCard();
  if (storedCard) {
    console.log('🎫 Carte en mémoire:', storedCard);

    // Re-validate and track access
    return activateCard(storedCard);
  }

  // No card found
  return null;
}

/**
 * Clear card (for testing)
 */
export function clearCard(): void {
  localStorage.removeItem(STORAGE_KEY);
  localStorage.removeItem(FINGERPRINT_KEY);
}
