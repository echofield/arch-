/**
 * ARCHÉ — Rate Limiter
 * Protection contre brute force
 */

const rateLimitStore = new Map<string, { count: number; resetAt: number }>();

/**
 * Vérifier si une clé (IP, code, etc.) est rate limited
 * @param key - Clé unique (IP address, code, etc.)
 * @param maxAttempts - Nombre max de tentatives
 * @param windowSeconds - Fenêtre de temps en secondes
 */
export function isRateLimited(key: string, maxAttempts: number, windowSeconds: number): boolean {
  const now = Date.now();
  const entry = rateLimitStore.get(key);
  
  // Si pas d'entrée ou fenêtre expirée, réinitialiser
  if (!entry || now > entry.resetAt) {
    rateLimitStore.set(key, {
      count: 1,
      resetAt: now + (windowSeconds * 1000)
    });
    return false;
  }
  
  // Incrémenter le compteur
  entry.count++;
  
  // Si dépassement, rate limit
  if (entry.count > maxAttempts) {
    return true;
  }
  
  return false;
}

/**
 * Nettoyer les entrées expirées (optionnel, pour éviter memory leak)
 */
export function cleanupExpiredEntries() {
  const now = Date.now();
  for (const [key, entry] of rateLimitStore.entries()) {
    if (now > entry.resetAt) {
      rateLimitStore.delete(key);
    }
  }
}

// Nettoyer toutes les 5 minutes
setInterval(cleanupExpiredEntries, 5 * 60 * 1000);
