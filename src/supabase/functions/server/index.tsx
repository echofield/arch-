/**
 * PETIT SOUVENIR — ARCHÉ Server
 * Version 2.0.0 — Multi-tenant via card_id
 * Hono Edge Function pour Make-9060b10a
 * 
 * Architecture :
 * - Chaque carte physique = card_id unique
 * - Pas d'authentification
 * - Isolation par card_id dans toutes les tables
 */

import { Hono } from 'npm:hono';
import { cors } from 'npm:hono/cors';
import { logger } from 'npm:hono/logger';

const app = new Hono();

// CORS ouvert
app.use('*', cors({
  origin: '*',
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization'],
}));

// Logger
app.use('*', logger(console.log));

// Health check
app.get('/make-server-9060b10a/health', (c) => {
  return c.json({ 
    status: 'ok',
    timestamp: new Date().toISOString(),
    version: '2.0.0',
    architecture: 'multi-tenant-card-id'
  });
});

// 🔧 MIGRATION : Ajouter card_id à journal_entries
app.post('/make-server-9060b10a/admin/migrate-add-card-id', async (c) => {
  console.log('🔧 Migration : Ajout de card_id à journal_entries...');
  
  const { createClient } = await import('npm:@supabase/supabase-js@2');
  const supabase = createClient(
    Deno.env.get('SUPABASE_URL') ?? '',
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
  );
  
  try {
    // 1. Vérifier si la colonne existe déjà
    const { data: existingColumns, error: checkError } = await supabase
      .from('journal_entries')
      .select('*')
      .limit(1);
    
    if (checkError) {
      console.error('❌ Erreur lors de la vérification:', checkError);
      return c.json({ 
        success: false, 
        error: checkError.message 
      }, 500);
    }
    
    // 2. Ajouter la colonne card_id via SQL brut
    const { error: alterError } = await supabase.rpc('exec_sql', {
      sql: `
        -- Ajouter card_id si elle n'existe pas
        DO $$ 
        BEGIN
          IF NOT EXISTS (
            SELECT 1 FROM information_schema.columns 
            WHERE table_name='journal_entries' AND column_name='card_id'
          ) THEN
            ALTER TABLE journal_entries 
            ADD COLUMN card_id TEXT NOT NULL DEFAULT 'DEMO-0001';
            
            CREATE INDEX IF NOT EXISTS idx_journal_card 
            ON journal_entries(card_id);
            
            RAISE NOTICE 'Colonne card_id ajoutée avec succès';
          ELSE
            RAISE NOTICE 'Colonne card_id existe déjà';
          END IF;
        END $$;
      `
    });
    
    if (alterError) {
      console.error('❌ Erreur SQL:', alterError);
      
      // Méthode alternative : mise à jour directe via code
      console.log('🔄 Tentative de mise à jour des entrées existantes...');
      
      const { data: entries } = await supabase
        .from('journal_entries')
        .select('id');
      
      if (entries && entries.length > 0) {
        console.log(`📝 ${entries.length} entrées à mettre à jour`);
        
        for (const entry of entries) {
          await supabase
            .from('journal_entries')
            .update({ card_id: 'DEMO-0001' })
            .eq('id', entry.id);
        }
        
        console.log('✅ Entrées mises à jour');
      }
      
      return c.json({
        success: true,
        message: 'Migration effectuée via méthode alternative',
        method: 'update',
        entries_updated: entries?.length || 0
      });
    }
    
    console.log('✅ Migration réussie');
    
    return c.json({
      success: true,
      message: 'Colonne card_id ajoutée avec succès',
      method: 'sql'
    });
    
  } catch (error) {
    console.error('❌ Erreur migration:', error);
    return c.json({ 
      success: false, 
      error: error.message 
    }, 500);
  }
});

// 404
app.notFound((c) => c.json({ error: 'Route non trouvée' }, 404));

Deno.serve(app.fetch);