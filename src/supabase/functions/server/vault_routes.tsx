/**
 * ARCHÉ — Vault Routes
 * Routes pour système d'activation + journal
 */

import { Hono } from 'npm:hono';
import { createClient } from 'npm:@supabase/supabase-js@2';
import { generateJWT, verifyJWT, hashPassword, comparePassword } from './auth_utils.tsx';
import { isRateLimited } from './rate_limiter.tsx';

const supabase = createClient(
  Deno.env.get('SUPABASE_URL') ?? '',
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
);

export const vaultRoutes = new Hono();

/**
 * POST /unlock
 * Activation ou connexion via code + password
 * ROUTE PUBLIQUE - Pas besoin d'auth
 */
vaultRoutes.post('/unlock', async (c) => {
  try {
    console.log('🔓 [SERVER] Tentative unlock - début du handler');
    console.log('📋 [SERVER] Headers reçus:', Object.fromEntries(c.req.header()));
    
    const body = await c.req.json();
    const { code, password } = body;
    
    console.log('📋 [SERVER] Code reçu:', code);
    console.log('🔐 [SERVER] Password reçu:', password ? '***' : 'VIDE');
    
    if (!code || !password) {
      console.error('❌ [SERVER] Code ou password manquant');
      return c.json({ error: 'Code et mot de passe requis' }, 400);
    }
    
    // Rate limiting par code
    if (isRateLimited(`unlock:${code}`, 10, 60)) {
      return c.json({ error: 'Trop de tentatives. Réessayez dans 1 minute.' }, 429);
    }
    
    // 1. Récupérer le code
    const { data: codeData, error: codeError } = await supabase
      .from('activation_codes')
      .select('*')
      .eq('code', code)
      .single();
    
    if (codeError || !codeData || codeData.status === 'revoked') {
      return c.json({ error: 'Impossible de déverrouiller ce code' }, 401);
    }
    
    // 2. Si code non activé → ACTIVATION
    if (codeData.status === 'issued') {
      const passwordHash = await hashPassword(password);
      
      // Créer vault
      const { data: vault, error: vaultError } = await supabase
        .from('vaults')
        .insert({ password_hash: passwordHash })
        .select()
        .single();
      
      if (vaultError || !vault) {
        console.error('Erreur création vault:', vaultError);
        return c.json({ error: 'Erreur lors de la création du vault' }, 500);
      }
      
      // Marquer code activé
      const { error: updateError } = await supabase
        .from('activation_codes')
        .update({
          status: 'activated',
          vault_id: vault.id,
          activated_at: new Date().toISOString()
        })
        .eq('code', code);
      
      if (updateError) {
        console.error('Erreur activation code:', updateError);
        return c.json({ error: 'Erreur lors de l\'activation' }, 500);
      }
      
      // Pas de JWT, juste renvoyer vault_id
      return c.json({ vault_id: vault.id });
    }
    
    // 3. Si code déjà activé → LOGIN
    if (codeData.status === 'activated') {
      const { data: vault, error: vaultError } = await supabase
        .from('vaults')
        .select('*')
        .eq('id', codeData.vault_id)
        .single();
      
      if (vaultError || !vault) {
        return c.json({ error: 'Impossible de déverrouiller ce code' }, 401);
      }
      
      const passwordMatch = await comparePassword(password, vault.password_hash);
      
      if (!passwordMatch) {
        return c.json({ error: 'Impossible de déverrouiller ce code' }, 401);
      }
      
      // Pas de JWT, juste renvoyer vault_id
      return c.json({ vault_id: vault.id });
    }
    
    return c.json({ error: 'Statut de code invalide' }, 400);
    
  } catch (error) {
    console.error('Erreur unlock:', error);
    return c.json({ error: 'Erreur serveur' }, 500);
  }
});

/**
 * GET /entries
 * Récupérer les entrées du journal
 */
vaultRoutes.get('/entries', async (c) => {
  try {
    // Lire vault_id depuis header X-Vault-Id (plus simple que JWT)
    const vaultId = c.req.header('X-Vault-Id');
    
    if (!vaultId) {
      console.error('❌ Pas de vault_id fourni');
      return c.json({ error: 'Non autorisé', code: 401, message: 'Vault ID manquant' }, 401);
    }
    
    console.log('🔍 Chargement entries pour vault:', vaultId);
    
    const { data: entries, error } = await supabase
      .from('journal_entries')
      .select('*')
      .eq('vault_id', vaultId)
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('❌ Erreur récupération entries:', error);
      return c.json({ error: 'Erreur lors de la récupération' }, 500);
    }
    
    console.log(`✅ ${entries?.length || 0} entries trouvées`);
    return c.json({ entries: entries || [] });
    
  } catch (error) {
    console.error('❌ Erreur GET entries:', error);
    return c.json({ error: 'Erreur serveur' }, 500);
  }
});

/**
 * POST /entries
 * Créer une nouvelle entrée
 */
vaultRoutes.post('/entries', async (c) => {
  try {
    const vaultId = c.req.header('X-Vault-Id');
    
    if (!vaultId) {
      return c.json({ error: 'Non autorisé' }, 401);
    }
    
    const { content, place_id } = await c.req.json();
    
    if (!content) {
      return c.json({ error: 'Le contenu est requis' }, 400);
    }
    
    console.log('✍️ Création entry pour vault:', vaultId);
    
    const { data: entry, error } = await supabase
      .from('journal_entries')
      .insert({
        vault_id: vaultId,
        content,
        place_id: place_id || null,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })
      .select()
      .single();
    
    if (error) {
      console.error('❌ Erreur création entry:', error);
      return c.json({ error: 'Erreur lors de la création' }, 500);
    }
    
    console.log('✅ Entry créée:', entry.id);
    return c.json({ id: entry.id, ...entry });
    
  } catch (error) {
    console.error('❌ Erreur POST entries:', error);
    return c.json({ error: 'Erreur serveur' }, 500);
  }
});

/**
 * DELETE /entries/:id
 * Supprimer une entrée
 */
vaultRoutes.delete('/entries/:id', async (c) => {
  try {
    const authHeader = c.req.header('Authorization');
    const vaultId = await verifyJWT(authHeader || null);
    
    if (!vaultId) {
      return c.json({ error: 'Non autorisé' }, 401);
    }
    
    const entryId = c.req.param('id');
    
    // Vérifier que l'entrée appartient au vault
    const { data: entry } = await supabase
      .from('journal_entries')
      .select('vault_id')
      .eq('id', entryId)
      .single();
    
    if (!entry || entry.vault_id !== vaultId) {
      return c.json({ error: 'Entrée introuvable' }, 404);
    }
    
    const { error } = await supabase
      .from('journal_entries')
      .delete()
      .eq('id', entryId);
    
    if (error) {
      console.error('Erreur suppression entry:', error);
      return c.json({ error: 'Erreur lors de la suppression' }, 500);
    }
    
    return c.json({ success: true });
    
  } catch (error) {
    console.error('Erreur DELETE entries:', error);
    return c.json({ error: 'Erreur serveur' }, 500);
  }
});

/**
 * POST /export
 * Exporter toutes les données du vault
 */
vaultRoutes.post('/export', async (c) => {
  try {
    const authHeader = c.req.header('Authorization');
    const vaultId = await verifyJWT(authHeader || null);
    
    if (!vaultId) {
      return c.json({ error: 'Non autorisé' }, 401);
    }
    
    const { data: entries, error } = await supabase
      .from('journal_entries')
      .select('*')
      .eq('vault_id', vaultId)
      .order('created_at', { ascending: true });
    
    if (error) {
      console.error('Erreur export:', error);
      return c.json({ error: 'Erreur lors de l\'export' }, 500);
    }
    
    return c.json({
      export_date: new Date().toISOString(),
      vault_id: vaultId,
      entries: entries || []
    });
    
  } catch (error) {
    console.error('Erreur POST export:', error);
    return c.json({ error: 'Erreur serveur' }, 500);
  }
});

/**
 * POST /verify-token
 * Vérifier la validité d'un token
 */
vaultRoutes.post('/verify-token', async (c) => {
  try {
    const authHeader = c.req.header('Authorization');
    const vaultId = await verifyJWT(authHeader || null);
    
    if (!vaultId) {
      return c.json({ error: 'Token invalide' }, 401);
    }
    
    return c.json({ valid: true, vault_id: vaultId });
    
  } catch (error) {
    console.error('Erreur verify-token:', error);
    return c.json({ error: 'Erreur serveur' }, 500);
  }
});
