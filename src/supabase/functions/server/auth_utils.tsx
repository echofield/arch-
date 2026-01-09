/**
 * ARCHÉ — Auth Utilities
 * JWT + Password hashing pour système vault
 */

import { create, verify } from 'https://deno.land/x/djwt@v3.0.1/mod.ts';

const JWT_SECRET = Deno.env.get('JWT_SECRET') || 'arche-secret-key-change-in-production';
const encoder = new TextEncoder();
const keyData = encoder.encode(JWT_SECRET);

// Générer une clé cryptographique pour JWT
async function getKey() {
  return await crypto.subtle.importKey(
    'raw',
    keyData,
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign', 'verify']
  );
}

/**
 * Générer un JWT avec vault_id
 */
export async function generateJWT(vaultId: string, expiresIn: string = '7d'): Promise<string> {
  const key = await getKey();
  
  // Convertir "7d" en secondes
  const expirationMap: Record<string, number> = {
    '7d': 7 * 24 * 60 * 60,
    '30d': 30 * 24 * 60 * 60,
    '1h': 60 * 60
  };
  
  const exp = Math.floor(Date.now() / 1000) + (expirationMap[expiresIn] || expirationMap['7d']);
  
  const jwt = await create(
    { alg: 'HS256', typ: 'JWT' },
    { vault_id: vaultId, exp },
    key
  );
  
  return jwt;
}

/**
 * Vérifier un JWT et extraire vault_id
 */
export async function verifyJWT(token: string | null): Promise<string | null> {
  if (!token) {
    console.log('❌ verifyJWT: pas de token fourni');
    return null;
  }
  
  // Enlever "Bearer " si présent
  const cleanToken = token.replace('Bearer ', '').trim();
  
  console.log('🔍 verifyJWT: tentative de vérification...');
  console.log('🔑 JWT_SECRET disponible:', JWT_SECRET ? 'OUI' : 'NON');
  console.log('📝 Token (premiers chars):', cleanToken.substring(0, 30) + '...');
  
  try {
    const key = await getKey();
    const payload = await verify(cleanToken, key);
    console.log('✅ JWT vérifié, vault_id:', payload.vault_id);
    return payload.vault_id as string;
  } catch (error) {
    console.error('❌ JWT verification failed:', error);
    console.error('Error details:', error instanceof Error ? error.message : error);
    return null;
  }
}

/**
 * Hasher un mot de passe avec PBKDF2 (compatible Deno Edge)
 */
export async function hashPassword(password: string): Promise<string> {
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const passwordData = encoder.encode(password);
  
  const keyMaterial = await crypto.subtle.importKey(
    'raw',
    passwordData,
    { name: 'PBKDF2' },
    false,
    ['deriveBits']
  );
  
  const hashBuffer = await crypto.subtle.deriveBits(
    {
      name: 'PBKDF2',
      salt: salt,
      iterations: 100000,
      hash: 'SHA-256'
    },
    keyMaterial,
    256
  );
  
  const hashArray = new Uint8Array(hashBuffer);
  
  // Encoder salt + hash en base64
  const combined = new Uint8Array(salt.length + hashArray.length);
  combined.set(salt);
  combined.set(hashArray, salt.length);
  
  return btoa(String.fromCharCode(...combined));
}

/**
 * Comparer un mot de passe avec son hash
 */
export async function comparePassword(password: string, hash: string): Promise<boolean> {
  try {
    // Décoder le hash stocké
    const combined = Uint8Array.from(atob(hash), c => c.charCodeAt(0));
    const salt = combined.slice(0, 16);
    const storedHash = combined.slice(16);
    
    const passwordData = encoder.encode(password);
    
    const keyMaterial = await crypto.subtle.importKey(
      'raw',
      passwordData,
      { name: 'PBKDF2' },
      false,
      ['deriveBits']
    );
    
    const hashBuffer = await crypto.subtle.deriveBits(
      {
        name: 'PBKDF2',
        salt: salt,
        iterations: 100000,
        hash: 'SHA-256'
      },
      keyMaterial,
      256
    );
    
    const computedHash = new Uint8Array(hashBuffer);
    
    // Comparer les hashes en temps constant
    if (storedHash.length !== computedHash.length) return false;
    
    let diff = 0;
    for (let i = 0; i < storedHash.length; i++) {
      diff |= storedHash[i] ^ computedHash[i];
    }
    
    return diff === 0;
  } catch (error) {
    console.error('Password comparison error:', error);
    return false;
  }
}